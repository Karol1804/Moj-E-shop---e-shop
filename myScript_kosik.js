 let status;
 let produkty;
 let ceny = []
 let spolu;
 let spoluBezDph;
 let pocet;

$(document).ready(function(){

  /*-- Pridanie dát do tabulky kosika --*/
  produkty=JSON.parse(localStorage.getItem("produkty"));
   
  for(let i= 0; i<produkty.length; i++){
  /* pocet = document.getElementById("pocet").value */
  $('#tabulka1').append(`<tr><td>${produkty[i].id }</td><td>${produkty[i].nazov}</td><td><input id="pocet${i}" style="width: 15%;" type="number" min=1 class=number name="pocet" value="${produkty[i].pocet}"></td><td id="aktcena${i}">${produkty[i].cena * produkty[i].pocet } eur</td><td><input id="checkBox${i}" class=checkBox type="checkbox"></td></tr>`);
  }
  
  $(":input").on('keyup mouseup', function () {
  let ceny=[];
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
  localStorage.setItem("produkty",JSON.stringify(produkty));

  
   /*-- Vypocet ceny veci v kosiku: Bez dph/Spolu --*/
  if(produkty!=0){
  let reducer = (accumulator, currentValue) => accumulator + currentValue ;
  spolu = ceny.reduce(reducer)
  console.log(spolu)
  $("#spolu").val(spolu+" " + "EUR");

  spoluBezDph = spolu -( spolu * 0.19);
  console.log(spoluBezDph);
  $("#spoluBezDph").val(spoluBezDph+" " + "EUR");
  }

})


  /*-- Vypocet ceny veci v kosiku: Bez dph/Spolu --*/
  for(let i= 0; i<produkty.length; i++){
    let cena = produkty[i].cena
    cena1=parseInt(cena)
    aktcena = cena1 * parseInt($(`#pocet${i}`).val());
    aktcena = parseInt(aktcena)
    ceny.push(aktcena)
  }

  if(produkty!=0){
  let reducer = (accumulator, currentValue) => accumulator + currentValue;
  spolu = ceny.reduce(reducer)
  $("#spolu").val(spolu+ " " +"EUR");

  spoluBezDph = spolu -( spolu * 0.19);
  $("#spoluBezDph").val(spoluBezDph+" " + "EUR");
  }

  /*-- Button : vyprazdnit kosik --*/
  $('#button2').on('click',function deleteItem() {
    for(let i=produkty.length; i>=0; i--){
        produkty.splice(i,1);
        
    }
    localStorage.setItem("produkty",JSON.stringify(produkty));
    location.reload()
  }) 


  /*-- Button : zmazat zvolenu polozku v kosiku --*/
  $('#button3').on('click',function deleteItem() {
    for(let i=produkty.length; i>=0; i--){
      status = $(`#checkBox${i}:checked`).val();
      if(status){
        produkty.splice(i,1);
        
    }
    }
    localStorage.setItem("produkty",JSON.stringify(produkty));
    location.reload();
    
  })



})
