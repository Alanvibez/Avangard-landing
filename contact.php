<?php
    
    $to  = 'lkm-trade@yandex.ru';
    $to2 = 'kraskioptom92@mail.ru';
    $subject = 'Письмо от ';

    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];

    // Проверяем, был ли передан файл
    if(isset($_FILES['fileInput']) && $_FILES['fileInput']['error'] === UPLOAD_ERR_OK) {
        // Если файл передан, отправляем сообщение для потенциального работника
        $subject .= 'Потенциальный работник';
        $message = "Имя потенциального работника: $name\n";
        $message .= "Его контакт: $email\n";
        $message .= "Его телефон: $phone\n";
        $message .= "Прикрепленное резюме: ".$_FILES['fileInput']['name'];
    } else {
        // Если файл не передан, отправляем обычное сообщение
        $subject .= 'клиента';
        $message = "Имя потенциального клиента: $name\n";
        $message .= "Его контакт: $email\n";
        $message .= "Его телефон: $phone\n";
    }

    // Отправляем сообщение на первый адрес
    mail(
        $to,
        $subject,
        $message
    );

    // Отправляем сообщение на второй адрес
    mail(
        $to2,
        $subject,
        $message
    );
?>
