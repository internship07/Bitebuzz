<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include database configuration
include 'conf.php';

// Decode JSON input
$data = json_decode(file_get_contents("php://input"), true);

if (!is_array($data)) {
    echo json_encode(["success" => false, "message" => "Invalid request format."]);
    exit;
}

// Sanitize inputs
$username = mysqli_real_escape_string($conn, $data['username']);
$phone = mysqli_real_escape_string($conn, $data['phone']);
$password = mysqli_real_escape_string($conn, $data['password']); // Store plain text password

// Check for existing user
$stmt = $conn->prepare("SELECT * FROM user WHERE username = ? OR phone = ?");
$stmt->bind_param("ss", $username, $phone);
$stmt->execute();
$result = $stmt->get_result();

if (mysqli_num_rows($result) > 0) {
    echo json_encode(["success" => false, "message" => "Username or phone already exists."]);
    exit;
}

// Insert user into database securely (without hashing the password)
$stmt = $conn->prepare("INSERT INTO user (username, phone, password) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $username, $phone, $password);
if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "User registered successfully.", "redirect" => "homepage.html"]);
} else {
    echo json_encode(["success" => false, "message" => "Database insertion failed."]);
}

mysqli_close($conn);
?>