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
        $raw  = $request->getContent();
        $data = json_decode($raw, true);

        error_log('[Portfolio][STEP1] Body brut reçu : ' . $raw);

        if (!is_array($data)) {
            return new JsonResponse(
                ['status' => 'error_json', 'detail' => json_last_error_msg()],
                400,
            );
        }

        // ── 2. Hydratation ───────────────────────────────────────────────────
        $name    = trim($data['name']    ?? '');
        $email   = trim($data['email']   ?? '');
        $subject = trim($data['subject'] ?? 'Message depuis le portfolio');
        $message = trim($data['message'] ?? '');

        error_log(sprintf(
            '[Portfolio][STEP2] Données : name="%s" email="%s" subject="%s" message="%s"',
            $name, $email, $subject, mb_substr($message, 0, 60),
        ));

        // ── 3. Validation ────────────────────────────────────────────────────
        $contact = (new Contact())
            ->setName($name)
            ->setEmail($email)
            ->setSubject($subject)
            ->setMessage($message);

        $violations = $validator->validate($contact);

        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $v) {
                $errors[$v->getPropertyPath()] = $v->getMessage();
            }
            error_log('[Portfolio][STEP3] Validation échouée : ' . json_encode($errors));
            return new JsonResponse(['status' => 'error_validation', 'errors' => $errors], 422);
        }

        error_log('[Portfolio][STEP3] Validation OK.');

        // ── 4. Persistance ───────────────────────────────────────────────────
        try {
            $em->persist($contact);
            $em->flush();
            error_log('[Portfolio][STEP4] flush() OK — id=' . $contact->getId());
        } catch (\Throwable $e) {
            error_log('[Portfolio][STEP4] ERREUR flush : ' . $e->getMessage());
            return new JsonResponse(
                ['status' => 'error_db', 'detail' => $e->getMessage()],
                500,
            );
        }

        // ── 5. Envoi email ───────────────────────────────────────────────────
        try {
            $this->sendNotification($mailer, $contact);
            error_log('[Portfolio][STEP5] Email envoyé.');
        } catch (\Throwable $e) {
            error_log('[Portfolio][STEP5] ERREUR mailer : ' . $e->getMessage());
            // Message sauvé en base — on retourne le succès mais on expose l'erreur mail
            return new JsonResponse([
                'status'       => 'success_db_mail_failed',
                'message'      => 'Message enregistré, mais l\'envoi d\'email a échoué.',
                'mail_error'   => $e->getMessage(),
                'id'           => $contact->getId(),
            ], 201);
        }

        // ── 6. Succès complet ────────────────────────────────────────────────
        return new JsonResponse(
            ['status' => 'success', 'message' => 'Message enregistré avec succès.', 'id' => $contact->getId()],
            201,
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
                <p><strong>Nom :</strong> %s</p>
                <p><strong>Email :</strong> <a href="mailto:%s">%s</a></p>
                <p><strong>Sujet :</strong> %s</p>
                <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0">
                <p style="white-space:pre-wrap">%s</p>
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
