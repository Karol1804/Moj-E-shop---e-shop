
let produkty;

$(document).ready(function () {

  /*-- Adding data to the kosika table --*/
  produkty = JSON.parse(localStorage.getItem("produkty"));

  for (let i = 0; i < produkty.length; i++) {
    $('#tabulka2').append(`<tr><td>${produkty[i].id}</td><td>${produkty[i].nazov}</td><td><input id="pocet${i}" style="width: 15%;" type="number" min=1 class=number name="pocet" value="${produkty[i].pocet}"></td><td id="aktcena${i}">${produkty[i].cena * produkty[i].pocet}</td><td><input id="checkBox${i}" class=checkBox type="checkbox"></td></tr>`);
  }

  $(":input").on('keyup mouseup', function () {
    let ceny = [];
    for (let i = 0; i < produkty.length; i++) {

      this.cena = produkty[i].cena
      let cena1 = parseInt(this.cena);
      let aktcena = cena1 * parseInt($(`#pocet${i}`).val());
      aktcena = parseInt(aktcena)
      console.log(aktcena);
      document.getElementById(`aktcena${i}`).innerHTML = aktcena
      ceny.push(aktcena);
      console.log(ceny);

      produkty[i].pocet = parseInt($(`#pocet${i}`).val());
    }
    localStorage.setItem("produkty", JSON.stringify(produkty));


    /*-- Calculation of the price of the item in the box: Excluding VAT/Total--*/
    if (produkty != 0) {
      let reducer = (accumulator, currentValue) => accumulator + currentValue;
      let spolu = ceny.reduce(reducer)
      console.log(spolu)
      $("#spolu").val(spolu + " " + "EUR");

      let spoluBezDph = spolu - (spolu * 0.19);
      console.log(spoluBezDph);
      $("#spoluBezDph").val(spoluBezDph + " " + "EUR");
    }

  })

  /*-- Calculation of the price of the item in the box: Excluding VAT/Total --*/
  let ceny1 = [];
  for (let i = 0; i < produkty.length; i++) {
    let cena = produkty[i].cena
    cena1 = parseInt(cena)
    aktcena = cena1 * parseInt($(`#pocet${i}`).val());
    aktcena = parseInt(aktcena)
    ceny1.push(aktcena)
  }

  if (produkty != 0) {
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let spolu = ceny1.reduce(reducer)
    $("#spolu").val(spolu + " " + "EUR");
    let spoluBezDph = spolu - (spolu * 0.19);
    $("#spoluBezDph").val(spoluBezDph + " " + "EUR");
  }


  /*-- Button : delete the selected item in the box --*/
  $('#button4').on('click', function deleteItem() {
    for (let i = produkty.length; i >= 0; i--) {
      let status = $(`#checkBox${i}:checked`).val();
      if (status) {
        produkty.splice(i, 1);
      }

    }
    localStorage.setItem("produkty", JSON.stringify(produkty));
    location.reload()

  })
  /*-- Buuton : send the order/data to the server and empty the basket --*/
  $('#button1').on('click', function deleteItem() {
    let postData = $("#myForm").serialize()
    alert("Tieto data posielam na server" + " " + postData + " " + localStorage.getItem("produkty"));

    for (let i = produkty.length; i >= 0; i--) {
      produkty.splice(i, 1);

    }
    localStorage.setItem("produkty", JSON.stringify(produkty));
    location.reload()
  })


})

/*-- Counter of cart after loading page --*/
function pocitadlo() {
  let kosik = 0;
  kosik = JSON.parse(localStorage.getItem("produkty"));
  $(`#pocitadlo`).html(kosik.length);
  /*  console.log(kosik.length); */

}
pocitadlo();

