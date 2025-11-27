<?php
session_start();

$page = $_GET['page'] ?? 'home';
$allowed = ['home', 'cards', 'recursos', 'feedback'];
if (!in_array($page, $allowed, true)) {
    $page = 'home';
}

$baseDir = dirname(__DIR__);

include $baseDir . '/templates/header.php';
include $baseDir . '/pages/' . $page . '.php';
include $baseDir . '/templates/footer.php';