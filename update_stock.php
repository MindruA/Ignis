<?php
$mysqli = new mysqli("localhost", "username", "password", "database");

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

$lighter_id = $_POST['id'];
$quantity = $_POST['quantity'];

$query = "UPDATE lighters SET stock = stock - $quantity WHERE id = $lighter_id AND stock >= $quantity";
$mysqli->query($query);

if ($mysqli->affected_rows > 0) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Stock insufficient']);
}

$mysqli->close();
?>
