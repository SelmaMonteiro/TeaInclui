<?php
// Processa envio de feedback e salva em JSON
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /index.php?page=feedback');
    exit;
}

function sanitize($value) {
    return trim(filter_var($value, FILTER_SANITIZE_STRING));
}

$name = sanitize($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = sanitize($_POST['message'] ?? '');

// Validação simples
if ($name === '' || $message === '') {
    header('Location: /index.php?page=feedback&error=1');
    exit;
}

if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: /index.php?page=feedback&error=email');
    exit;
}

$entry = [
    'name' => $name,
    'email' => $email,
    'message' => $message,
    'created_at' => date('c'),
    'ip' => $_SERVER['REMOTE_ADDR'] ?? ''
];

$path = dirname(__DIR__) . '/data/messages.json';
if (!file_exists($path)) {
    @mkdir(dirname($path), 0777, true);
    file_put_contents($path, json_encode([], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
}

$data = [];
$raw = @file_get_contents($path);
if ($raw !== false) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}

$data[] = $entry;
file_put_contents($path, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

header('Location: /index.php?page=feedback&ok=1');
exit;