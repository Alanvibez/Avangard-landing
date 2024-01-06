$(document).ready(function () {
   // Форма и инпуты
   $("input").on("keyup", function () {
      $(this).toggleClass("validate", $(this).val().trim().length > 0);
   });

   $("input").focus(function () {
      $(this).removeClass("error");
   });

   const mask = IMask($("#phone")[0], {
      mask: "+{7}(000)000-00-00"
   });

   $("[data-form]").on("submit", function (e) {
      e.preventDefault();

      const $inputs = $(this).find("input")
      const $name = $("#name");
      const $mail = $("#email");
      const $phone = $("#phone");

      if (!validateForm($(this))) {
        return
      }

       // собираем данные с формы
       let user_name = $name.val();
       let user_email = $mail.val();
       let user_phone = $phone.val();
       // отправляем данные
       $.ajax({
          url: "contact.php",
          type: "post",
          data: {
             name: user_name,
             email: user_email,
             phone: user_phone
          },
          error: function () {
             console.log("error");
          },
          success: function (result) {
             /* В случае удачной обработки и отправки выполнится следующий код*/
             $inputs.removeClass("error validate").val("");
             $("[data-modal]").addClass("open");
             $("body").css("overflow", "hidden");
          }
       });
   });

   function validate($input) {
      $input.each(function () {
         var $input = $(this);
         var inputID = $input.attr("id");
         var value = $input.val();

         const emailPattern =
         /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;

         if (inputID === "phone" && !value.length < 16 && !validateRuPhone(value)) {
            $input.addClass("error");
         }

         if (inputID === "mail" && !emailPattern.test($mail.val().trim())) {
            $input.addClass("error");
         }

         if (value.trim() === "") {
            $input.addClass("error");
         }
      });
   }

   function validateForm($form) {
    validate($form.find("input"));
    return !$form.find(".error").length;
}

   function validateRuPhone(str) {
      return /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
         str
      );
   }
});
