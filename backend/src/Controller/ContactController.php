<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
    ): JsonResponse {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json(['error' => 'Corps de requête JSON invalide.'], Response::HTTP_BAD_REQUEST);
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

        return $this->json(
            ['message' => 'Message enregistré avec succès.', 'id' => $contact->getId()],
            Response::HTTP_CREATED,
        );
    }
}
