
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
    var template = `<li class="subcategoria" data-id='${id}'>${name}</li>`;
    $('#container').append(template);
  });
}

$(document).on('click', '.subcategoria', function() { 
  console.log('funcionando');
  var id = $(this).data('id');
  console.log(id);
  datosItem(id);
  function datosItem(dates) {
    console.log(dates);
    $.ajax({
      url: 'https://api.mercadolibre.com/sites/MPE/search?category=' + dates + '',
      success: function(data) {
        console.log(data.results);
        var data = data.results;
        $('#container-items').html('');
        data.forEach(function(el) {
          var title = el.title;
          var imagen = el.thumbnail;
          var price = el.price;
          var template = `<div><p>${title}</p><img src="${imagen}"><p>s/. ${price}</p></div>`;
          $('#container-items').append(template);
        });
      }
    });
  }
});


