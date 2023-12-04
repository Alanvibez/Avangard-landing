<?php
    $to      = 'lkm-trade@yandex.ru';
    $to2 = 'kraskioptom92@mail.ru';
    $subject = 'Письмо от клиента';
    $name = $_POST['name'];
    $email = $_POST['email'];
    mail(
        $to,
        $subject,
        'Имя потенциального клиента: '.$name.
        '. Его контакт: '.$email.
    );
    mail(
        $to2,
        $subject,
        'Имя потенциального клиента: '.$name.
        '. Его контакт: '.$email.
    );
?>