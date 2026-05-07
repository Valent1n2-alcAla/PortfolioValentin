<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api', format: 'json')]
class ContactController extends AbstractController
{
    #[Route('/contact', name: 'api_contact_create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        ValidatorInterface $validator,
        MailerInterface $mailer,
    ): JsonResponse {
        // ── 1. Décodage JSON ─────────────────────────────────────────────────
        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return $this->json(
                ['error' => 'Corps de requête JSON invalide.', 'detail' => json_last_error_msg()],
                Response::HTTP_BAD_REQUEST,
            );
        }

        // ── 2. Honeypot ──────────────────────────────────────────────────────
        if (!empty($data['website'])) {
            return $this->json(['message' => 'Message enregistré avec succès.'], Response::HTTP_CREATED);
        }

        // ── 3. Rate limiting (1 envoi / IP / 60 s) ──────────────────────────
        $ip       = $request->getClientIp() ?? 'unknown';
        $cacheFile = sys_get_temp_dir() . '/contact_rate_' . md5($ip);

        if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < 60) {
            return $this->json(
                ['error' => 'Merci de patienter une minute avant de renvoyer un message.'],
                Response::HTTP_TOO_MANY_REQUESTS,
            );
        }

        // ── 4. Hydratation & validation ──────────────────────────────────────
        $contact = (new Contact())
            ->setName($data['name'] ?? '')
            ->setEmail($data['email'] ?? '')
            ->setSubject($data['subject'] ?? '')
            ->setMessage($data['message'] ?? '');

        $violations = $validator->validate($contact);

        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $v) {
                $errors[$v->getPropertyPath()] = $v->getMessage();
            }
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // ── 5. Persistance ───────────────────────────────────────────────────
        try {
            $em->persist($contact);
            $em->flush();
        } catch (\Throwable $e) {
            return $this->json(
                [
                    'error'  => 'Impossible d\'enregistrer le message en base de données.',
                    'detail' => $this->getParam('kernel.environment') === 'dev' ? $e->getMessage() : null,
                ],
                Response::HTTP_INTERNAL_SERVER_ERROR,
            );
        }

        touch($cacheFile);

        // ── 6. Notification email (non bloquante) ────────────────────────────
        try {
            $this->sendNotification($mailer, $contact);
        } catch (TransportExceptionInterface $e) {
            // L'email a échoué mais le message est déjà sauvegardé : on log et on continue
            // En production, remplace par un vrai logger (LoggerInterface)
            error_log('[Portfolio] Mailer error: ' . $e->getMessage());
        } catch (\Throwable $e) {
            error_log('[Portfolio] Unexpected mailer error: ' . $e->getMessage());
        }

        return $this->json(
            ['message' => 'Message enregistré avec succès.', 'id' => $contact->getId()],
            Response::HTTP_CREATED,
        );
    }

    private function sendNotification(MailerInterface $mailer, Contact $contact): void
    {
        $from = $_ENV['MAILER_FROM'] ?? 'noreply@portfolio-valentin.fr';
        $to   = 'alcalavalentin55@gmail.com';

        $email = (new TemplatedEmail())
            ->from(new Address($from, 'Portfolio Valentin'))
            ->to(new Address($to))
            ->replyTo(new Address($contact->getEmail(), $contact->getName()))
            ->subject('🚀 Nouveau contact Portfolio : ' . $contact->getSubject())
            ->htmlTemplate('emails/contact_notification.html.twig')
            ->context(['contact' => $contact]);

        $mailer->send($email);
    }

    private function getParam(string $name): mixed
    {
        return $this->getParameter($name);
    }
}
