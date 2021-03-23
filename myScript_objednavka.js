
let produkty;

let ceny = [];

$(document).ready(function(){

  /*-- Pridanie dát do tabulky kosika --*/
  produkty=JSON.parse(localStorage.getItem("produkty"));
   
  for(let i= 0; i<produkty.length; i++){
  /* pocet = document.getElementById("pocet").value */
  $('#tabulka2').append(`<tr><td>${produkty[i].id }</td><td>${produkty[i].nazov}</td><td>${produkty[i].pocet}</td><td id="aktcena${i}">${produkty[i].cena} eur</td><td><input id="checkBox${i}" class=checkBox type="checkbox"></td></tr>`);
  }
  
  /*$(":input").on('keyup mouseup', function () {

  for(let i= 0; i<produkty.length; i++){
  
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
 /* localStorage.setItem("produkty",JSON.stringify(produkty));*/

  
   /*-- Vypocet ceny veci v kosiku: Bez dph/Spolu --*/
 /* if(produkty!=0){
  let reducer = (accumulator, currentValue) => accumulator + currentValue ;
  let spolu = ceny.reduce(reducer)
  console.log(spolu)
  $("#spolu").val(spolu+" " + "EUR");

  let spoluBezDph = spolu -( spolu * 0.19);
  console.log(spoluBezDph);
  $("#spoluBezDph").val(spoluBezDph+" " + "EUR");
  }

}) */


  /*-- Vypocet ceny veci v kosiku: Bez dph/Spolu --*/
 
     ceny=[];
   for(let i= 0; i<produkty.length; i++){
    let cena = produkty[i].cena
    let cena1 =  cena * produkty[i].pocet
    ceny.push(cena1);
    
    console.log(ceny);
  
  }


  console.log(ceny);

  if(produkty!=0){
    let reducer = (accumulator, currentValue) => accumulator + currentValue;
    let spolu = ceny.reduce(reducer)
    console.log(spolu);
    $("#spolu").val(spolu + " " +"EUR");

    
    let spoluBezDph = spolu -( spolu * 0.19);
    $("#spoluBezDph").val(spoluBezDph+" " + "EUR");
  }

  /*-- Button : zmazat zvolenu polozku v kosiku --*/
  $('#button4').on('click',function deleteItem() {
  for(let i=produkty.length; i>=0; i--){
   let status = $(`#checkBox${i}:checked`).val();
    if(status){
      produkty.splice(i,1);    
  }

  }
  localStorage.setItem("produkty",JSON.stringify(produkty));
  location.reload()
  
  })
  /*-- Buuton : odoslat objednavku/data na server a vyprazdnit kosik --*/
  $('#button1').on('click',function deleteItem() {
    let postData = $("#myForm").serialize()
    alert("Tieto data posielam na server" + " " + postData +" " + localStorage.getItem("produkty"));
  
    for(let i=produkty.length; i>=0; i--){
    produkty.splice(i,1);
    
  }
  localStorage.setItem("produkty",JSON.stringify(produkty));
  location.reload()
  }) 

  /*-- Vypocet ceny veci v kosiku: Bez dph/Spolu --*/
  for(let i= 0; i<produkty.length; i++){
    let cena = produkty[i].cena
    let cena1=parseInt(cena)
    ceny.push(cena1)
  }

  let reducer = (accumulator, currentValue) => accumulator + currentValue;
  let spolu = ceny.reduce(reducer)
  $("#spolu").val(spolu+ " " +"EUR");

  let spoluBezDph = spolu -( spolu * 0.19);
  $("#spoluBezDph").val(spoluBezDph+" " + "EUR");


})
 /*-- Pocitadlo kosika po nacitani stranky --*/
 function pocitadlo() {
  let kosik = 0;
  kosik = JSON.parse(localStorage.getItem("produkty")); 
  $(`#pocitadlo`).html(kosik.length);
  /*  console.log(kosik.length); */
  
  }
  pocitadlo();

