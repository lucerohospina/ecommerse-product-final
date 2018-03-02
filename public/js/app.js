
var $productsDisplay = $('.card');

$.ajax({
  url: 'https://api.mercadolibre.com/sites/MPE/search?q=juegosyjuguetes'
  
}).done(handleSuccess)
  .fail(handleError);

function handleSuccess(data) {
  console.log(data);
  console.log(data.results.length);
  console.log(data.results[0].title);
  console.log(data.results[0].price);
  output = '';
  for (i = 0; i < data.results.length; i++) {
    console.log(data.results[i].title);
    console.log(data.results[i].price);
    console.log(data.results[i].thumbnail);
    var productName = data.results[i].title;
    var productPrice = data.results[i].price;
    var productImage = data.results[i].thumbnail;
    output += `
    <img class="card-img-top img-fluid" src="${productImage}" alt="product image">
    <div class="card-body">
      <h5 class="card-title">${productName}</h5>
      <p class="card-text">Precio: ${productPrice} soles</p>
      <a href="#" class="btn btn-success">ver producto</a>
    </div>
    `;
    $productsDisplay.append(output);
  }
  
};

function handleError() {
  console.log('error');
};

// boton de paypal

paypal.Button.render({
  env: 'production', // Or 'sandbox',

  commit: true, // Show a 'Pay Now' button

  style: {
    color: 'gold',
    size: 'small'
  },

  payment: function(data, actions) {
    /* 
     * Set up the payment here 
     */
  },

  onAuthorize: function(data, actions) {
    /* 
     * Execute the payment here 
     */
  },

  onCancel: function(data, actions) {
    /* 
     * Buyer cancelled the payment 
     */
  },

  onError: function(err) {
    /* 
     * An error occurred during the transaction 
     */
  }
}, '#paypal-button');