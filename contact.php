<?php
    $to      = 'lkm-trade@yandex.ru';
    $subject = 'Письмо от клиента';
    $name = $_POST['name'];
    $email = $_POST['email'];
    mail(
        $to,
        $subject,
        'Имя потенциального клиента: '.$name.
        '. Его контакт: '.$email.
    );
?>