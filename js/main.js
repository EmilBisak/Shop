localStorage.setItem("id",'1')

$.ajax({
    url: 'https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json',
    type: 'get',
    dataType: 'json'
  })
  .done(function(res) {
    startApp(res)
  })


let template = $('#myTemplate').html();
let mainRow = $('#mainRow');
let rg = new RegExp('{{productTitle}}', 'gi');
let text = "";

let colBtns = $('[data-col]');
let catBtns = $('[data-cat]');

let searchInput = $('#searchInput');
let sliderH = $('[data-hide="this"]');
let shopBag = $('.shopCart');





function cartCounter() {
  let buyCounter = localStorage.getItem("buyCounter");
  buyCounter = JSON.parse(buyCounter);
  $(shopBag).html(buyCounter);
}



function liveSearch(res) {
  searchInput.on('keyup', function(e) {
    console.log(searchInput);
    if (this.value.length >= 3) {
      sliderH.hide('400', function() {});

      let inputValue = this.value.toUpperCase();
      let filterSearch = res.filter(function(el) {
        if (el.model.toUpperCase().includes(inputValue)  || el.productTitle.toUpperCase().includes(inputValue)) {
          return el
        }
      })
      displayProducts(filterSearch);
    } else {
      sliderH.show('400', function() {});
      displayProducts(res);
    }
  });
}



function filterCat(res) {
  catBtns.on('click', function(event) {
    let cat = $(this).attr('data-cat');
    $('.cat').removeClass('active');
    $(this).parent().addClass('active');
    event.preventDefault();
    text = "";
    let filterCat = res.filter(function(el) {
      return el[cat];
    })
    displayProducts(filterCat);
  });
}



function filterCol(res) {
  colBtns.on('click', function(event) {
    event.preventDefault();
    let dataCollection = $(this).attr('data-col');
    text = "";
    let filterCol = res.filter(function(el) {
      return el.colection == dataCollection;
    })
    displayProducts(filterCol);
  })
}



function displayProducts(cat) {
  text = "";
  cat.forEach(function(el) {
    text += template.replace('{{imgSrc}}', el.imgSrc)
      .replace(rg, el.productTitle)
      .replace('{{model}}', el.model)
      .replace('{{price}}', el.price)
  })
  mainRow.html("");
  mainRow.append(text);
}



function productFun(res) {
      res.forEach(function(el) {
        text += template.replace('{{imgSrc}}', el.imgSrc)
          .replace(rg, el.productTitle)
          .replace('{{model}}', el.model)
          .replace('{{price}}', el.price)
          })
      mainRow.append(text)
      addId();
}



function addId() {
  let product = $('.pro-img-holder')
  product.each(function (e) {
  let id =  $(this).children('a').children('img').attr('src').match(/\d/g);
  id = id.join("");
  $(this).attr('id', id);
  $(this).on('click',function () {
    localStorage.id = JSON.stringify(id);
  })
  })
}



function startApp(res) {
  liveSearch(res);
  filterCat(res);
  filterCol(res);
  productFun(res);
  cartCounter();
}
