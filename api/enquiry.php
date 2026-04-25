<?php
/**
 * Headshot Cape Town — enquiry endpoint
 * Drop into Hostinger: public_html/api/enquiry.php
 *
 * Receives form POST from headshotcapetown.co.za, sends email via Resend.
 */

// ===== CONFIG — fill these in =====
const RESEND_API_KEY = 'YOUR_RESEND_API_KEY';
const TO_EMAIL = 'headshots@jurgen.co.za';
const FROM_EMAIL = 'enquiries@headshotcapetown.co.za';
const ALLOWED_ORIGIN = 'https://headshotcapetown.co.za';
// ==================================

header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); exit('Method not allowed'); }

// Honeypot — if a bot fills "website" we silently 200 and do nothing.
if (!empty($_POST['website'])) { echo 'ok'; exit; }

$fields = ['name','email','phone','company','type','size','when','notes'];
$data = [];
foreach ($fields as $f) { $data[$f] = trim($_POST[$f] ?? ''); }

if (empty($data['name']) || empty($data['email'])) {
  http_response_code(400);
  echo 'Missing required fields';
  exit;
}

$body = "New enquiry from headshotcapetown.co.za\n\n";
foreach ($data as $k => $v) {
  if ($v !== '') $body .= ucfirst($k) . ": " . $v . "\n";
}

$payload = [
  'from' => 'Headshot Cape Town <' . FROM_EMAIL . '>',
  'to' => [TO_EMAIL],
  'reply_to' => $data['email'],
  'subject' => 'New enquiry — ' . $data['name'] . ($data['company'] ? ' (' . $data['company'] . ')' : ''),
  'text' => $body,
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POST => true,
  CURLOPT_HTTPHEADER => [
    'Authorization: Bearer ' . RESEND_API_KEY,
    'Content-Type: application/json',
  ],
  CURLOPT_POSTFIELDS => json_encode($payload),
]);
$res = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($code >= 200 && $code < 300) {
  echo 'ok';
} else {
  http_response_code(500);
  error_log('Resend error: ' . $res);
  echo 'Email send failed';
}
