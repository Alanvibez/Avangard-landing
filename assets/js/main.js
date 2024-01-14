$(document).ready(() => {
   // Табы
   const tabs = $("[data-tab]");
   $("[data-tab]").on("click", function () {
      const index = tabs.index(this);

      if (!$(this).hasClass("active")) {
         const parent = $(this).closest("[data-tabs-container]");
         const tabs = parent.find("[data-tab]");
         const block = parent.find("[data-tab-content]");

         tabs.removeClass("active");
         $(this).addClass("active");
         block.hide().eq(index).show();
      }
   });

   $("#fileInput").change(function () {
      // Получаем название файла
      var fileName = $(this).val().split("\\").pop();

      // Выводим название файла рядом с инпутом
      $(".input__file-name").text("Название файла: " + fileName);
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

      if ($(this).closest(".header__menu") && $("[data-burger]").hasClass("active")) {
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

   $("[data-modal-open]").on("click", function (e) {
      e.preventDefault();
      const modal = $(this).attr("data-modal-open");
      $(`[data-modal=${modal}]`).addClass("open");
   });

   // Слайдер
   $("[data-slider-container]").each(function () {
      const $parent = $(this);
      const $slider = $parent.find("[data-slider]")[0];
      const sliderType = $parent.find("[data-slider]").attr("data-slider");
      const rightArrow = $parent.find("[data-slider-arrow=right]")[0];
      const leftArrow = $parent.find("[data-slider-arrow=left]")[0];

      let settings = {
         direction: "horizontal",
         loop: true,
         initialSlide: 1,
         navigation: {
            nextEl: rightArrow,
            prevEl: leftArrow
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

      if (sliderType === "product") {
         settings = {
            ...settings,
            slidesPerView: 4,
            loop: false,
            breakpoints: {
               1200: {
                  slidesPerView: 5
               }
            }
         };

         const switchTabs = (direction) => {
            const tabs = $parent.find("[data-tab]");
            const currentIndex = tabs.index(tabs.filter(".active"));
        
            if ((currentIndex === 0 && direction === "left") || (currentIndex === tabs.length - 1 && direction === "right")) {
                return;
            }
        
            const newIndex = direction === "right" ? currentIndex + 1 : currentIndex - 1;
        
            tabs.removeClass("active").eq(newIndex).trigger('click').addClass("active")
        };

         $(rightArrow).on("click", () => switchTabs("right"));

         $(leftArrow).on("click", () => switchTabs("left"));
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

         if ($parent.find(".swiper-slide").length <= 2 && $(window).width() >= 900) {
            $parent.find(".slider-arrows").remove();
         }
      }

      const slider = new Swiper($slider, settings);
      slider.init();
   });
});
