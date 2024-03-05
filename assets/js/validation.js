$(document).ready(function () {
   // Кэширование элементов DOM
   var $inputs = $("input");
   var $name = $("#name");
   var $mail = $("#email");
   var $phone = $("#phone");
   var $file = $("#fileInput");
   var $form = $("[data-form]");
   var $modal = $("[data-modal]");
   var $body = $("body");

   $inputs.on("keyup", function () {
      $(this).toggleClass("validate", $(this).val().trim().length > 0);
   });

   $inputs.focus(function () {
      $(this).removeClass("error");
   });

   IMask($("#phone")[0], {
      mask: "+{7}(000)000-00-00"
   });

   $form.on("submit", function (e) {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }
      // Собираем данные с формы

      const formData = new FormData(this);

      // Отправляем данные
      $.ajax({
         url: "contact.php",
         type: "post",
         data: formData,
         processData: false,
         contentType: false,
         error: function () {
            console.log("error");
         },
         success: function (result) {
            $inputs.removeClass("error validate").val("");
            $("[data-modal-close").click();
         }
      });
   });

   function validate($input) {
      $input.each(function () {
         var $input = $(this);
         var inputID = $input.attr("id");
         var value = $input.val();
         $form.find(".error-msg").remove();

         
         const emailPattern =
            /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;

         if (inputID === "phone" && !value.length < 16 && !validateRuPhone(value)) {
            $input.addClass("error");
         }

         if (inputID === "mail" && !emailPattern.test($mail.val().trim())) {
            $input.addClass("error");
         }

         if (value.trim() === "" && inputID !== "fileInput") {
            $input.addClass("error");
         }

         if (inputID === "fileInput") {
            var file = $input[0].files[0];
            if (file) {
               var fileSize = file.size; // Размер файла в байтах
               var maxFileSize = 10 * 1024 * 1024; // Максимальный размер файла (в данном случае 10 MB)
              
               if (fileSize > maxFileSize) {
                  $input.addClass('error')
                  $('.file-field').append('<div class="error-msg">Файл слишком большой</div>')
               }else{
                  $input.removeClass('error')
                  $('.file-field').find('.error-msg').remove()
               }
            } else {
               // Если файл не выбран, можно добавить сообщение об ошибке или что-то еще по вашему усмотрению
               $input.addClass("error");
            }
         }
      });
   }

   function validateForm() {
      validate($form.find("input"));
      return !$form.find(".error").length;
   }

   function validateRuPhone(str) {
      return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(str);
   }
});
