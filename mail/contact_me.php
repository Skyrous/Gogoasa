<?php
ini_set("include_path", '/home/r127885dora/php:' . ini_get("include_path"));
require_once 'Mail.php';
require_once 'Mail/mime.php';
require 'vendor/autoload.php';

use Dotenv\Dotenv;

// Load environment variables from api.env file
if (file_exists(__DIR__ . '/api.env')) {
    $dotenv = Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    if (empty($name) || empty($email) || empty($message) || !validateEmail($email)) {
        http_response_code(400);
        echo json_encode(['message' => 'No arguments provided!']);
        exit;
    }

    $email_subject = "Dora Catering Contact: $name";
    $email_body = "Ai primit un nou mesaj de contact.\n\nAici sunt detaliile:\n\nNume: $name\n\nEmail: $email\n\nMesaj:\n$message";

    $from = 'noreply@trial-ynrw7gy7x8jg2k8e.mlsender.net';
    $to = 'cornelse24ro@yahoo.com';
    $headers = [
        'From' => $from,
        'To' => $to,
        'Subject' => $email_subject,
    ];

    $mime = new Mail_mime();
    $mime->setTXTBody($email_body);
    $mime->setHTMLBody(nl2br($email_body));

    $body = $mime->get();
    $headers = $mime->headers($headers);

    $smtp = Mail::factory('smtp', [
        'host' => $_ENV['SMTP_HOST'],
        'port' => $_ENV['SMTP_PORT'],
        'auth' => true,
        'username' => $_ENV['SMTP_USERNAME'],
        'password' => $_ENV['SMTP_PASSWORD'],
    ]);

    $mail = $smtp->send($to, $headers, $body);

    if (PEAR::isError($mail)) {
        http_response_code(500);
        echo json_encode(['message' => "Message could not be sent. Mailer Error: " . $mail->getMessage()]);
    } else {
        echo json_encode(['message' => 'Message sent successfully!']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>