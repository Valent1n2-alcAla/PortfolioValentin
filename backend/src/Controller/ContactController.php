<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Corps de requête JSON invalide.'], Response::HTTP_BAD_REQUEST);
        }

        // ── Honeypot : champ "website" doit rester vide (invisible pour les humains)
        if (!empty($data['website'])) {
            // On répond 201 pour ne pas signaler au bot qu'il a été détecté
            return $this->json(['message' => 'Message enregistré avec succès.'], Response::HTTP_CREATED);
        }

        // ── Rate limiting basique : 1 envoi par IP toutes les 60 secondes
        $ip = $request->getClientIp();
        $cacheKey = 'contact_rate_' . md5((string) $ip);
        $cacheFile = sys_get_temp_dir() . '/' . $cacheKey;

        if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < 60) {
            return $this->json(
                ['error' => 'Merci de patienter une minute avant de renvoyer un message.'],
                Response::HTTP_TOO_MANY_REQUESTS,
            );
        }

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

        $em->persist($contact);
        $em->flush();

        // Marque l'IP comme ayant soumis
        touch($cacheFile);

        $this->sendNotification($mailer, $contact);

        return $this->json(
            ['message' => 'Message enregistré avec succès.', 'id' => $contact->getId()],
            Response::HTTP_CREATED,
        );
    }

    private function sendNotification(MailerInterface $mailer, Contact $contact): void
    {
        $email = (new TemplatedEmail())
            ->from(new Address($_ENV['MAILER_FROM'], 'Portfolio Valentin'))
            ->to(new Address($_ENV['MAILER_TO']))
            ->replyTo(new Address($contact->getEmail(), $contact->getName()))
            ->subject('🚀 Nouveau contact Portfolio : ' . $contact->getSubject())
            ->htmlTemplate('emails/contact_notification.html.twig')
            ->context(['contact' => $contact]);

        $mailer->send($email);
    }
}
