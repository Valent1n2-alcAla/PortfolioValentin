<?php

// ── CORS — headers ajoutés avant tout démarrage Symfony ──────────────────────
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization');
header('Access-Control-Max-Age: 3600');

// Preflight OPTIONS — répondre immédiatement sans démarrer le kernel
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

use App\Kernel;

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
