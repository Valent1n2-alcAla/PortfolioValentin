<?php

namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', format: 'json')]
class ContactController extends AbstractController
{
    #[Route('/contact', name: 'api_contact_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $contact = new Contact();
        $contact->setName($data['name'] ?? '');
        $contact->setEmail($data['email'] ?? '');
        $contact->setSubject($data['subject'] ?? 'Message depuis le portfolio');
        $contact->setMessage($data['message'] ?? '');

        $entityManager->persist($contact);
        $entityManager->flush();

        return new JsonResponse([
            'status'  => 'success',
            'message' => 'Message enregistré avec succès.',
            'id'      => $contact->getId(),
        ], 201);
    }
}
