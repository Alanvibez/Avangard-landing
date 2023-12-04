<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];

    // Другие поля формы

    $to = "ваша_почта@example.com";
    $subject = "Новая заявка с лендинга";
    $message = "Имя: $name\nEmail: $email\n";

    // Добавьте обработку других полей формы к $message

    mail($to, $subject, $message);
}
?>