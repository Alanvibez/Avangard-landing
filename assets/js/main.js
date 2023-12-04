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

    $('.nav__list li a').on('click', function(e){
        e.preventDefault()
        const targetSection = $(this).attr('href')
        
        if($(this).closest('.header__menu') && $('[data-burger]').hasClass('active')){
            $('[data-burger]').click()
        }

        $('html, body').animate({
            scrollTop: $(targetSection).offset().top
        }, 1000);
    })

    // Бургер
    $("[data-burger]").on("click", function () {
        $(this).toggleClass("active");
        const $menu = $(".header__menu");
        $menu.fadeToggle(200);
        $("body").css("overflow", $(this).hasClass("active") ? "hidden" : "");
    });

    // Форма и инпуты
    $("input").on("keyup", function () {
        $(this).toggleClass("validate", $(this).val().trim().length > 0);
    });

    $("input").focus(function () {
        $(this).removeClass("error");
    });

    $("[data-form]").on("submit", function (e) {
        e.preventDefault();

        const $inputs = $(this).find(".input");
        const $name = $("#name");
        const $mail = $("#email");
        const isValid = true

        // Валидация на пустую строку
        if ($name.val().trim() === "" || $mail.val().trim() === "") {
            $inputs.addClass("error");
            isValid = false;
        }

        const emailPattern =
            /^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]([-a-z0-9]{0,61}[a-z0-9])?\.)*(?:aero|arpa|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|[a-z][a-z])$/;
        if (!emailPattern.test($mail.val().trim())) {
            $mail.addClass("error");
            sValid = false;
        }

        

        if(isValid){
        $inputs.removeClass("error validate").val("");
        // собираем данные с формы
        let user_name = $name.val();
        let user_email = $mail.val();
        // отправляем данные
        $.ajax({
            url: "contact.php",
            type: "post",
            data: {
                "name": user_name,
                "email": user_email,
            },
            error: function () {
                $("#erconts").html("Произошла ошибка!");
            },
            success: function (result) {
                /* В случае удачной обработки и отправки выполнится следующий код*/
                $name.val('');
                // $('#tel-desktop').val('');
                $mail.val('');
            }
        });
        }
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
        }

        const slider = new Swiper($slider, settings);
        slider.init();
    });
});
