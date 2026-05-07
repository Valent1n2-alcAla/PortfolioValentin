<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', format: 'json')]
class ContactController extends AbstractController
{
    #[Route('/contact', name: 'api_contact_create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $entityManager,
        MailerInterface $mailer,
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        $contact = new Contact();
        $contact->setName($data['name'] ?? '');
        $contact->setEmail($data['email'] ?? '');
        $contact->setSubject($data['subject'] ?? 'Message depuis le portfolio');
        $contact->setMessage($data['message'] ?? '');

        // ── Persistance ──────────────────────────────────────────────────────
        $entityManager->persist($contact);
        $entityManager->flush();

        // ── Email de notification ────────────────────────────────────────────
        try {
            $html = sprintf('
                <div style="font-family:sans-serif;max-width:520px;margin:auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden">
                    <div style="background:#059669;padding:20px 24px">
                        <h2 style="margin:0;color:#fff;font-size:16px">🚀 Nouveau message — Portfolio</h2>
                    </div>
                    <div style="padding:20px 24px">
                        <p><strong>Nom :</strong> %s</p>
                        <p><strong>Email :</strong> <a href="mailto:%s">%s</a></p>
                        <p><strong>Sujet :</strong> %s</p>
                        <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">
                        <p style="white-space:pre-wrap">%s</p>
                    </div>
                    <div style="background:#f8fafc;padding:12px 24px;font-size:12px;color:#94a3b8">
                        Reçu le %s
                    </div>
                </div>',
                htmlspecialchars($contact->getName()),
                htmlspecialchars($contact->getEmail()),
                htmlspecialchars($contact->getEmail()),
                htmlspecialchars($contact->getSubject()),
                htmlspecialchars($contact->getMessage()),
                $contact->getCreatedAt()->format('d/m/Y à H:i'),
            );

            $email = (new Email())
                ->from(new Address('alcalavalentin55@gmail.com', 'Portfolio Valentin'))
                ->to('alcalavalentin55@gmail.com')
                ->replyTo(new Address($contact->getEmail(), $contact->getName()))
                ->subject('🚀 Nouveau contact : ' . $contact->getSubject())
                ->html($html);

            $mailer->send($email);

        } catch (\Throwable $e) {
            // Le message est sauvé en base — l'échec mail ne bloque pas l'utilisateur
            error_log('[Portfolio][MAIL] Erreur : ' . $e->getMessage());
        }

        return new JsonResponse([
            'status'  => 'success',
            'message' => 'Message enregistré avec succès.',
            'id'      => $contact->getId(),
        ], 201);
    }
}
