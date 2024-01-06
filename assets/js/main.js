$(document).ready(() => {
   // Табы
   $("[data-tab]").on("click", function () {
      const index = $(this).index();

      if (!$(this).hasClass("active")) {
         const parent = $(this).parent();
         const tabs = parent.find("[data-tab]");
         const block = $("[data-tab-content]");

         tabs.removeClass("active");
         $(this).addClass("active");
         block.hide().eq(index).show();
      }
   });

   // Якорь
   const href = localStorage.getItem("section");

   function scrollTo(target) {
      const targetElement = $(target);

      if (targetElement.length) {
         $("html, body").animate(
            {
               scrollTop: targetElement.offset().top
            },
            1000
         );
      } else {
         localStorage.setItem("section", target);
         location.replace("/");
      }
   }

   $("[data-anchor]").on("click", function (e) {
      e.preventDefault();
      const targetSection = $(this).attr("href");

      if (
         $(this).closest(".header__menu") &&
         $("[data-burger]").hasClass("active")
      ) {
         $("[data-burger]").click();
      }

      scrollTo(targetSection);
   });

   if (href) {
      scrollTo(href);
      localStorage.removeItem("section");
   }

   // Бургер
   $("[data-burger]").on("click", function () {
      $(this).toggleClass("active");
      const $menu = $(".header__menu");
      $menu.fadeToggle(200);
      $("body").css("overflow", $(this).hasClass("active") ? "hidden" : "");
   });


   $("[data-modal-close]").on("click", function () {
      $(this).closest(".modal").removeClass("open");
      $("body").css("overflow", "");
   });

   // Слайдер
   $("[data-slider-container]").each(function () {
      const $parent = $(this);
      const $slider = $parent.find("[data-slider]")[0];
      const sliderType = $parent.find("[data-slider]").attr("data-slider");

      let settings = {
         direction: "horizontal",
         loop: true,
         initialSlide: 1,
         navigation: {
            nextEl: $parent.find("[data-slider-arrow=right]")[0],
            prevEl: $parent.find("[data-slider-arrow=left]")[0]
         }
      };

      if (sliderType === "gallery") {
         settings = {
            ...settings,
            slidesPerView: "auto",
            centeredSlides: true,
            spaceBetween: 20,
            speed: 600
         };
      }

      if (sliderType === "news") {
         settings = {
            ...settings,
            slidesPerView: 1,
            breakpoints: {
               900: {
                  slidesPerView: 2
               }
            }
         };

         if (
            $parent.find(".swiper-slide").length <= 2 &&
            $(window).width() >= 900
         ) {
            $parent.find(".slider-arrows").remove();
         }
      }

      const slider = new Swiper($slider, settings);
      slider.init();
   });
});
