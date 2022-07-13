
$(document).ready(function () {

  /*-- Pridanie dat z JSON do Top produkty,slider --*/

  $.get("db.json", function (produkty) {
    for (i = 0; i < 4; i++) {

      $(`#slid${i + 1} h2`).html(produkty[i].nazov);
      $(`#slid${i + 1} h3`).html(produkty[i].nazov1);
      $(`#img${i + 1}`).attr("src", produkty[i].img);
    }
  });

  /*-- Tlacidlo na pridanie do kosika --*/
  let produkt1 = JSON.parse(localStorage.getItem("produkty"));
  $("button.btn4").on('click', function (event) {
    let produkt = JSON.parse(localStorage.getItem("produkty"));
    if (produkt == null) {
      produkt = [];
    }

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
    function pocitadlo() {
      let kosik = JSON.parse(localStorage.getItem("produkty"));
      $(`#pocitadlo`).html(kosik.length + 1);
    }
    pocitadlo();

  });

  /*-- Prechod na detail produktu --*/
  $("button.btn3").on('click', function (event) {
    klikloSaNa1 = $(event.target).attr('idproduktu');
    window.location.replace("./detail.html?id=" + klikloSaNa1);

  });

  /*-- Odoslanie dat z kontaktneho formulara --*/
  $('#odoslat').on('click', function () {
    var postData = $("#myForm1").serialize()
    alert("Tieto data posielam na server" + " " + postData);

  });
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
});