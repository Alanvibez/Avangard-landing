$(document).ready(function () {
   $("[data-select-city]").on("click", function () {});

   $("[data-city]").on("click", function () {
      const city = $(this).attr("data-city");
      console.log(city);
   });

   var cityData = {
      moscow: {
         name: "Москва",
         address: "ТЭЦЕВСКАЯ 295",
         phoneNumber: ['+8 843 204 24 51', "+8 917 390 17 59"],
         mail:['lkm-trade@yandex.ru'],
         
      },
      stpetersburg: {
         name: "Санкт-Петербург",
         address: "Невский проспект, 2",
         phoneNumber: "+7 999 444-55-66"
      }
   };
});
