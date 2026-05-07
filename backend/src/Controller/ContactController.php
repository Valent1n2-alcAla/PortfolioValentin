<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
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
            error_log('[Portfolio][JSON] Décodage échoué : ' . json_last_error_msg());
            return $this->json(
                ['error' => 'Corps JSON invalide.', 'detail' => json_last_error_msg()],
                Response::HTTP_BAD_REQUEST,
            );
        }

        // ── 2. Honeypot ──────────────────────────────────────────────────────
        if (!empty($data['website'])) {
            return $this->json(['message' => 'Message enregistré avec succès.'], Response::HTTP_CREATED);
        }

        // ── 3. Rate limiting (1 envoi / IP / 60 s) ───────────────────────────
        $ip        = $request->getClientIp() ?? 'unknown';
        $cacheFile = sys_get_temp_dir() . '/contact_rate_' . md5($ip);

        if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < 60) {
            return $this->json(
                ['error' => 'Merci de patienter une minute avant de renvoyer un message.'],
                Response::HTTP_TOO_MANY_REQUESTS,
            );
        }

        // ── 4. Hydratation & validation ──────────────────────────────────────
        $contact = (new Contact())
            ->setName(trim($data['name'] ?? ''))
            ->setEmail(trim($data['email'] ?? ''))
            ->setSubject(trim($data['subject'] ?? ''))
            ->setMessage(trim($data['message'] ?? ''));

        $violations = $validator->validate($contact);

        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $v) {
                $errors[$v->getPropertyPath()] = $v->getMessage();
            }
            return $this->json(['errors' => $errors], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // ── 5. Persistance (try/catch indépendant) ───────────────────────────
        try {
            $em->persist($contact);
            $em->flush();
            touch($cacheFile);
            error_log('[Portfolio][DB] Message #' . $contact->getId() . ' enregistré.');
        } catch (\Throwable $e) {
            error_log('[Portfolio][DB] ERREUR flush : ' . $e->getMessage());
            return $this->json(
                ['error' => 'Impossible d\'enregistrer le message.', 'detail' => $e->getMessage()],
                Response::HTTP_INTERNAL_SERVER_ERROR,
            );
        }

        // ── 6. Notification email (try/catch indépendant — non bloquant) ─────
        try {
            $this->sendNotification($mailer, $contact);
            error_log('[Portfolio][MAIL] Email envoyé à alcalavalentin55@gmail.com.');
        } catch (\Throwable $e) {
            // Le message est déjà en base — on ne bloque pas le succès utilisateur
            error_log('[Portfolio][MAIL] ERREUR envoi : ' . $e->getMessage());
        }

        // ── 7. Réponse succès ────────────────────────────────────────────────
        return $this->json(
            ['message' => 'Message enregistré avec succès.', 'id' => $contact->getId()],
            Response::HTTP_CREATED,
        );
    }

    private function sendNotification(MailerInterface $mailer, Contact $contact): void
    {
        $from = $_ENV['MAILER_FROM'] ?? 'noreply@portfolio-valentin.fr';

        $html = sprintf(
            '<!DOCTYPE html><html lang="fr"><body style="font-family:sans-serif;background:#f8fafc;padding:32px">
            <div style="max-width:520px;margin:auto;background:#fff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
              <div style="background:#059669;padding:24px 28px">
                <h2 style="margin:0;color:#fff;font-size:17px">🚀 Nouveau message — Portfolio</h2>
              </div>
              <div style="padding:24px 28px">
                <p style="margin:0 0 8px"><strong>Nom :</strong> %s</p>
                <p style="margin:0 0 8px"><strong>Email :</strong> <a href="mailto:%s">%s</a></p>
                <p style="margin:0 0 8px"><strong>Sujet :</strong> %s</p>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">
                <p style="margin:0;white-space:pre-wrap">%s</p>
              </div>
              <div style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:14px 28px;font-size:12px;color:#94a3b8">
                Reçu le %s
              </div>
            </div></body></html>',
            htmlspecialchars($contact->getName()),
            htmlspecialchars($contact->getEmail()),
            htmlspecialchars($contact->getEmail()),
            htmlspecialchars($contact->getSubject()),
            htmlspecialchars($contact->getMessage()),
            $contact->getCreatedAt()->format('d/m/Y à H:i'),
        );

        $email = (new Email())
            ->from(new Address($from, 'Portfolio Valentin'))
            ->to('alcalavalentin55@gmail.com')
            ->replyTo(new Address($contact->getEmail(), $contact->getName()))
            ->subject('🚀 Nouveau contact Portfolio : ' . $contact->getSubject())
            ->html($html);

        $mailer->send($email);
    }
}
