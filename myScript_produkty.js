
$(document).ready(function () {
  /*-- Pridanie dat z JSON do html --*/
  $.get("db.json", function (produkty) {
    for (i = 4; i < produkty.length; i++) {
      $(`#art${i + 1} h2`).html(produkty[i].nazov);
      $(`#art${i + 1} h3`).html(produkty[i].nazov1);
      $(`#img${i + 1}`).attr("src", produkty[i].img)
    }
  })

  /*-- Filter n search podla nazvu--*/
  $.get("db.json", function () {
    $("#inputsearch").on("keyup", function () {
      let value = $(this).val().toLowerCase();
      $("#produkty div.col-lg-3.col-md-3.col-sm-6.text-center").filter(function () {
        if ($(this).text().toLowerCase().indexOf(value) > -1) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    });
  });

  /*-- Pridanie do kosika button --*/
  let produkt1 = JSON.parse(localStorage.getItem("produkty"));
  $('button.btn2').on('click', function (event) {

    let klikloSaNa = $(event.target).attr('idproduktu');

    $.get("db.json", function (produktyDB) {

      for (let produkt of produktyDB) {
        if (klikloSaNa == produkt.id) {
          produkt1.push(produkt);
          localStorage.setItem("produkty", JSON.stringify(produkt1))
          return;
        }
      }

    });
    /*-- Pocitadlo kosika --*/
    function pocitadlo() {
      let kosik = JSON.parse(localStorage.getItem("produkty"));
      $(`#pocitadlo`).html(kosik.length + 1);
      console.log(kosik.length);

    }
    pocitadlo();
  });

  /*-- Detail produktu button --*/
  $("button.btn1").on('click', function (event) {
    let klikloSaNa1 = $(event.target).attr('idproduktu');
    window.location.replace("./detail.html?id=" + klikloSaNa1);

    let sPageURL = window.location.search.substring(1);
    let i;
    for (i = sPageURL.length - 1; i > 0; i--) {
      if (sPageURL[i] == ("="))
        break;
    }


  });

  /*-- Pocitadlo kosika po nacitani stranky --*/
  function pocitadlo() {
    let kosik = [];
    if (JSON.parse(localStorage.getItem("produkty")) === null) {
      kosik.length = 0;
      $(`#pocitadlo`).html(kosik.length);
    }
    else{
      kosik = JSON.parse(localStorage.getItem("produkty"));
      $(`#pocitadlo`).html(kosik.length);
  }}
  pocitadlo();

  /*-- Na sklade show/hide --*/
  $("#nasklade").change(function () {
    if ($(this).prop('checked')) {
      $.get("db.json", function (produktyDB) {
        for (let produkt of produktyDB) {
          if (produkt.nasklade > 0) {

            $(`#art${produkt.id}`).parent().show();
          }
          else {
            $(`#art${produkt.id}`).parent().hide();
          }

        }
      })

    }
    else {
      $.get("db.json", function (produktyDB) {
        for (let produkt of produktyDB) {
          $(`#art${produkt.id}`).parent().show();
        }

      })
    }
  })

  /*--Triedenie od najlacnejsieho--*/
  $('#najlacnejsi').on('click', function () {
    $.get("db.json", function (produktyDB) {
      let produkty2 = produktyDB.slice(4);
      let vytriedene = produkty2.sort(function (a, b) { return a.cena - b.cena });

      for (i = 0; i < vytriedene.length; i++) {
        $(`#art${i + 5} h2`).html(vytriedene[i].nazov);
        $(`#art${i + 5} h3`).html(vytriedene[i].nazov1);
        $(`#img${i + 5}`).attr("src", vytriedene[i].img);

        console.log(vytriedene[i].id)

        /*-- Hladanie Id buttonov --*/
        for (buton of $(`#art${i + 5}`).find("button")) {
          $(buton).attr("idproduktu", vytriedene[i].id)
        }


      }
    })

  })

  /*--Triedenie od najdrahsieho--*/
  $('#najdrahsi').on('click', function () {
    $.get("db.json", function (produktyDB) {
      let produkty2 = produktyDB.slice(4);
      let vytriedene = produkty2.sort(function (a, b) { return b.cena - a.cena });

      for (i = 0; i < vytriedene.length; i++) {
        $(`#art${i + 5} h2`).html(vytriedene[i].nazov);
        $(`#art${i + 5} h3`).html(vytriedene[i].nazov1);
        $(`#img${i + 5}`).attr("src", vytriedene[i].img);

        console.log(vytriedene[i].id)

        /*-- Hladanie Id buttonov --*/
        for (buton of $(`#art${i + 5}`).find("button")) {
          $(buton).attr("idproduktu", vytriedene[i].id)
        }

      }
    })
  })

})
