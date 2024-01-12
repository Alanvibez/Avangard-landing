$(document).ready(function () {
   $("[data-city]").on("click", function () {
      if ($(this).hasClass("active")) {
         return;
      }

      $("[data-city]").removeClass("active");
      $(this).addClass("active");
      $("[data-select-city]").text($(this).text());
      $(".contacts__city-container").slideToggle();
      const city = $(this).attr('data-city')
      changeCityInfo(city);
   });

   $(".contacts__city-select").on("click", function () {
      $(".contacts__city-container").slideToggle();
      $(this).toggleClass('open')
   });

   var cityData = {
      stpetersburg: {
         name: "Санкт-Петербург",
         address: "ШУШАРЫ НОВГОРОДСКИЙ ПРОСПЕКТ ДОМ 26 КОРПУС 1",
         phoneNumber: ["+8 911 705 23 41"],
         mail: ["lkm-trade@yandex.ru", "spb@kraskioptom.com"],
         mapLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2006.4473826202245!2d30.3663527513791!3d59.80848717946434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469624ffd227def7%3A0x50352d0e6d54bb54!2z0J3QvtCy0LPQvtGA0L7QtNGB0LrQuNC5INC_0YAuLCAyNiwg0KHQsNC90LrRgi3Qn9C10YLQtdGA0LHRg9GA0LMsINCg0L7RgdGB0LjRjywgMTk2NjI2!5e0!3m2!1sru!2sby!4v1646399743195!5m2!1sru!2sby"
      },
      moscow: {
         name: "Москва",
         address: "МОСКОВСКАЯ ОБЛАСТЬ, ЛЮБЕРЕЦКИЙ РАЙОН П.ТОМИЛИНО",
         phoneNumber: ["+7 926 708 73 79", "+8 495 646 16 54"],
         mail: ["msk@kraskioptom.com"],
         mapLink:
            "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d4704.93764964855!2d37.91754033022943!3d55.645200754569245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e0!4m3!3m2!1d55.6428243!2d37.9179411!4m5!1s0x414ab78c6dd1d52d%3A0x1cd04124459cb97f!2z0J7QntCeINCi0JDQndCU0JXQnCwg0KLQvtC80LjQu9C40L3Qviwg0JzQvtGB0LrQvtCy0YHQutCw0Y8g0L7QsdC7Liwg0KDQvtGB0YHQuNGPLCAxNDAwNzM!3m2!1d55.6456059!2d37.9224215!5e0!3m2!1sru!2sby!4v1659100875837!5m2!1sru!2sby"
      },
      kazan: {
         name: "Казань",
         address: "ТЭЦЕВСКАЯ 295",
         phoneNumber: ["+8 917 390 17 59"],
         mail: ["lkm-trade@yandex.ru"],
         mapLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2239.1376416533367!2d48.99783935121607!3d55.86027829107015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415953556f81073b%3A0x5930427efe862bea!2z0YPQuy4g0KLRjdGG0LXQstGB0LrQsNGPLCAyOTUsINCa0LDQt9Cw0L3RjCwg0KDQtdGB0L8uINCi0LDRgtCw0YDRgdGC0LDQvSwg0KDQvtGB0YHQuNGPLCA0MjAwNTE!5e0!3m2!1sru!2sby!4v1646399872943!5m2!1sru!2sby"
      },
      ekaterenburg: {
         name: "Екатеринбург",
         address: "ул. Маневровая 34 В",
         phoneNumber: ["+8 987 679 22 29", "+8 922 128 75 75"],
         mail: ["kraskioptom92@mail.ru"],
         mapLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6439.320460427919!2d60.53406468936267!3d56.87816055509608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43c171deeb06fdfd%3A0xa6aa6924b94ec81d!2z0YPQuy4g0JzQsNC90LXQstGA0L7QstCw0Y8sIDM00LIsINCV0LrQsNGC0LXRgNC40L3QsdGD0YDQsywg0KHQstC10YDQtNC70L7QstGB0LrQsNGPINC-0LHQuy4sINCg0L7RgdGB0LjRjywgNjIwMDUw!5e0!3m2!1sru!2sby!4v1653344966503!5m2!1sru!2sby"
      },
      cheboksary: {
         name: "Чебоксары",
         address: "г. Новочебоксарск ул. Советская 45а",
         phoneNumber: ["+8 835 276 32 01", "+8 937 953 45 02"],
         mail: ["kraskioptom92@mail.ru"],
         mapLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2224.269154336679!2d47.46101105122653!3d56.11786197114976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x415a33fd356a9f15%3A0x70f0dd867f845e79!2z0YPQuy4g0KHQvtCy0LXRgtGB0LrQsNGPLCA0NdCQLCDQndC-0LLQvtGH0LXQsdC-0LrRgdCw0YDRgdC6LCDQp9GD0LLQsNGI0YHQutCw0Y8g0KDQtdGB0L8uLCDQoNC-0YHRgdC40Y8sIDQyOTk2NQ!5e0!3m2!1sru!2sby!4v1653345049766!5m2!1sru!2sby"
      },
      rostov: {
         name: "Ростов",
         address: "УЛ. ДОВАТОРА 154/1",
         phoneNumber: ["+8 918 580 01 51"],
         mail: ["rostov@kraskioptom.com"],
         mapLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2708.7025170921293!2d39.58862325089116!3d47.24196452098682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40e3c7493ef49dcf%3A0x473c4247691d870!2z0YPQuy4g0JTQvtCy0LDRgtC-0YDQsCwgMTU0LzEsINCg0L7RgdGC0L7Qsi3QvdCwLdCU0L7QvdGDLCDQoNC-0YHRgtC-0LLRgdC60LDRjyDQvtCx0LsuLCDQoNC-0YHRgdC40Y8sIDM0NDAxNg!5e0!3m2!1sru!2sby!4v1646401186380!5m2!1sru!2sby"
      },
      novosibirsk: {
         name: "Новосибирск",
         address: "Адрес склада: Выборная, 221/4",
         phoneNumber: ["+7 903 076 73 16", "+7 383 209 12 75"],
         mail: ["nsk@kraskioptom.com"],
         mapLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1924.629261311545!2d83.05349598911336!3d54.994441849864685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42dfe9b7b5d661ff%3A0x451fcb7c79b43733!2z0YPQuy4g0JLRi9Cx0L7RgNC90LDRjywgMjIxLCDQndC-0LLQvtGB0LjQsdC40YDRgdC6LCDQndC-0LLQvtGB0LjQsdC40YDRgdC60LDRjyDQvtCx0LsuLCA2MzAxMTQ!5e0!3m2!1sru!2sru!4v1701772881102!5m2!1sru!2sru"
      },
      omsk: {
         name: "Омск",
         address: "улица 20 лет РККА 300/3",
         phoneNumber: ["+8 381 240 50 05", "+8 906 197 37 68"],
         mail: ["rekord-omsk@mail.ru"],
         mapLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2289.7105411595094!2d73.44381065118084!3d54.9781751588369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x43aafc295b3c3c29%3A0x60d4f42e829870b2!2z0YPQuy4gMjAg0LvQtdGCINCg0JrQmtCQLCAzMDAg0LrQvtGA0L_Rg9GBIDMsINCe0LzRgdC6LCDQntC80YHQutCw0Y8g0L7QsdC7Liwg0KDQvtGB0YHQuNGPLCA2NDQwMjc!5e0!3m2!1sru!2sby!4v1654070323047!5m2!1sru!2sby"
      },
      minsk: {
         name: "Минск",
         address: "г. Минск, ул. Станиславского, 1, склад 2А",
         phoneNumber: ["+375(29) 384-52-36", "+375(29) 315-19-21"],
         mail: ["skpluss@yandex.ru", "ost.bel@yandex.ru"],
         mapLink:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2351.240062363066!2d27.58482499382116!3d53.89193696273871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbce335edd0b91%3A0xb6199339ffd0294b!2z0YPQuy4g0KHRgtCw0L3QuNGB0LvQsNCy0YHQutC-0LPQviAxLCDQnNC40L3RgdC6LCDQnNC40L3RgdC60LDRjyDQvtCx0LvQsNGB0YLRjCAyMjAwMzMsINCR0LXQu9Cw0YDRg9GB0Yw!5e0!3m2!1sru!2sru!4v1701775902692!5m2!1sru!2sru"
      }
   };

   const changeCityInfo = (city) => {
      const addressContainer = $("[data-address]");
      const mailContainer = $("[data-mail]");
      const phoneContainer = $("[data-phone]");
      const mapFrame = $("[data-map]");

      addressContainer.text(cityData[city].address);

      phoneContainer.empty();
      cityData[city].phoneNumber.forEach((number) => {
         phoneContainer.append(`<a href="tel:${number}" class="contacts__info-contact">${number}</a>`);
      });

      mailContainer.empty();
      cityData[city].mail.forEach((mail) => {
         mailContainer.append(`<a href="mailto:${mail}" class="contacts__info-contact">${mail}</a>`);
      });

      mapFrame.attr(`src`, cityData[city].mapLink);
   };
});
