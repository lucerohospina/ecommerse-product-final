$(document).ready(function() {
  // declacion de variables.
  let subcategories = $('#subcategories-container');
  let itemsContainer = $('#items-container');
  
  // funcionalidad de routing por medio de page.js
  page('/Cartas', showItems);
  page('/Figuras de Accion', showItems);
  page('/Juegos de Mesa', showItems);
  page('/modelismo', showItems);
  page('/Muñecas y Muñecos', showItems);
  page('/Vehículos para Niños', showItems);
  page('/Otros', showItems);
  page();
  
  // peticion al api de ML para llamar a las subcategorias de Juegos y Juguetes.
  $.ajax({
    url: 'https://api.mercadolibre.com/categories/MPE1132',
    success: function(data) {
      // console.log(data.children_categories);
      var item = data.children_categories;
      console.log(item);
      createItem(item);
    }
  });
  
  // funcion dentro de peticion que coloca en el DOM las subcategorias.
  function createItem(arr) {
    arr.forEach(function(el) {
      var name = el.name;
      var id = el.id;
      console.log(id);
      var template = `
      <li class="subcategory font-weight-bold" data-id='${id}'>
      <a class="nav-link text-dark" href="/${name}">${name}</a>
      </li>
      `;
      subcategories.append(template);
    });
  }


  // funcion para mostrar items al click de cada subcategoria.
  function showItems(context) {
    console.log(context);
    itemsContainer.html('');
    let categories = context.path;
    let subName = categories.substr(1);
    console.log(subName);
  
    $.ajax({
      url: `https://api.mercadolibre.com/sites/MPE/search?condition=new&q=${subName}`,
      success: function(data) {
        console.log(data.results);
        var data = data.results;
        itemsContainer.html('');
        data.forEach(function(el) {
          var title = el.title;
          var image = el.thumbnail;
          var price = el.price;
          console.log(title);
          console.log(image);
          console.log(price);
          var template = `
            <div class="card col-12 col-sm-4 col-md-4 my-1">
            <img class="card-img-top align-self-center" src="${image}" alt="item-image">
            <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <p class="card-text d-flex justify-content-center">s/. ${price}</p>
            </div>
            </div>
            `;
          itemsContainer.append(template);
        });
      }
    });
  }

  // funcion para mostrar items al cargar la pagina.
  function load() {
    itemsContainer.html('');
    $.ajax({
      url: 'https://api.mercadolibre.com/sites/MPE/search?category=MPE1132',
      success: function(data) {
        console.log(data.results);
        var items = data.results;
        console.log(items);
        items.forEach(function(element) {
          console.log(element);
          var output = `
          <div class="card col-12 col-sm-4 col-md-4 my-1 m-md-0">
          <img class="card-img-top align-self-center" src="${element.thumbnail}" alt="item-image">
          <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text d-flex justify-content-center">s/. ${element.price}</p>
          </div>
          </div>
          `;
          itemsContainer.append(output);
        });
      }
    });
  }
  load();
});


