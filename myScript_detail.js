
$(document).ready(function(){

 /*-- Pridanie dat z JSON do html --*/  
  $.get("db.json",function(produkt){

  for(let i= 0; i<produkt.length; i++){
    let produktId = produkt[i].id
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let idUrl= urlParams.get('id')
    if(produktId == idUrl){

      $('#detail').append(`<img class="zoom4" src="${produkt[i].img}"></img><h2>${produkt[i].nazov}</h2><h3>${produkt[i].nazov1}</h3><h4>Cena: ${produkt[i].cena} eur</h4><button idproduktu=1 class="btn btn-default zoom1" type="submit">Pridaj do <span class="glyphicon glyphicon-shopping-cart"></span></button><b class="nasklade">Na sklade: ${produkt[i].nasklade}ks</b><p><b>Popis produktu:</b><br><br>${produkt[i].popis}</p>`);
    }
    }

 /*--Pridanie produktu do kosika button --*/
 let produkt1 = JSON.parse(localStorage.getItem("produkty"));
 $('button').on('click',function(){ 
  let sPageURL = window.location.search.substring(1);
  let i;
  let u;
  for(i = sPageURL.length - 1;i>0;i--){
    if(sPageURL[i] == ("="))
     break
  u = sPageURL.substring(i, sPageURL.length);
  }
  $.get("db.json",function(produktyDB){
     for(let produkt of produktyDB ){
         if(u == produkt.id){
             produkt1.push(produkt);
             localStorage.setItem("produkty", JSON.stringify(produkt1))
             return;
         }
     }

     });

    /*-- Pocitadlo kosika --*/
      function pocitadlo() {
      let kosik = JSON.parse(localStorage.getItem("produkty")); 
      $(`#pocitadlo`).html(kosik.length+1);
      console.log(kosik.length);
      
    }
      pocitadlo();
 });
 }) 
  /*-- Pocitadlo kosika po nacitani stranky --*/
  function pocitadlo() {
    let kosik = 0;
    kosik = JSON.parse(localStorage.getItem("produkty")); 
    $(`#pocitadlo`).html(kosik.length);
  /*  console.log(kosik.length); */
  
  }
  pocitadlo();

}) 