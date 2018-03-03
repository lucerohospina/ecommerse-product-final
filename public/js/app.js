let subcategories = $('#subcategories-container');
let itemsContainer = $('#items-container');

$.ajax({
  url: 'https://api.mercadolibre.com/categories/MPE1132', // cambiar el
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
    var template = `<li class="subcategory" data-id='${id}'>${name}</li>`;
    subcategories.append(template);
  });
}

$(document).on('click', '.subcategory', function() { 
  console.log('funcionando');
  var id = $(this).data('id');
  console.log(id);
  datosItem(id);

  function datosItem(id) {
    console.log(id);
    $.ajax({
      url: 'https://api.mercadolibre.com/sites/MPE/search?category=' + id + '',
      success: function(data) {
        console.log(data.results);
        var data = data.results;
        itemsContainer.html('');
        data.forEach(function(el) {
          var title = el.title;
          var image = el.thumbnail;
          var price = el.price;
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
});


