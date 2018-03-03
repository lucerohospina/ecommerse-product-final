let subcategories = $('#subcategories-container');
let itemsContainer = $('#items-container');

page('/Cartas', showItems);
page('/Figuras de Accion', showItems);
page('/Juegos de Mesa', showItems);
page('/Modelismo', showItems);
page('/Muñecas y Muñecos', showItems);
page('/Vehículos para Niños', showItems);
page('/Otros', showItems);
page();

$.ajax({
  url: 'https://api.mercadolibre.com/categories/MPE1132',
  success: function(data) {
    // console.log(data.children_categories);
    var item = data.children_categories;
    console.log(item);
    createItem(item);
  }
});

function createItem(arr) {
  arr.forEach(function(el) {
    var name = el.name;
    var id = el.id;
    var template = `
    <li class="nav-item subcategory" data-id='${id}'>
    <a class="nav-link" href="/${name}">${name}</a>
    </li>
    `;
    subcategories.append(template);
  });
}

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
      // itemsContainer.html('');
      data.forEach(function(el) {
        var title = el.title;
        var image = el.thumbnail;
        var price = el.price;
        console.log(title);
        console.log(image);
        console.log(price);
        var template = `
          <div class="card">
          <img class="card-img-top img-fluid" src="${image}" alt="item-image">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">s/. ${price}</p>
          </div>
          </div>
          `;
        itemsContainer.append(template);
      });
    }
  });
}  


