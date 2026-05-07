<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api', format: 'json')]
class ContactController extends AbstractController
{
    #[Route('/contact', name: 'api_contact_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        return new JsonResponse(['message' => 'Test OK'], 201);
    }
}
