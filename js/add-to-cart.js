//  <button
//   class="{{ snippet_name }}__button button--tertiary js--add-to-cart"
//   type="button"
//   data-variant-id="{{ variant.id }}"
//   data-quantity="1"
//   data-featured-image="{{ featured_image | image_url: width: 200 }}" // optional data attribute
// >
//   <span class="button__title">{% if available %}Add to Cart{% else %}Unavailable{% endif %}</span>
// </button>

( document.querySelectorAll('.js--add-to-cart') || [] ).forEach( button => {
  button.addEventListener('click', event => {
    event.preventDefault();
    addProductToCartFromButton( button );
  });
});

function notify( $products = [] ) {
  if ( $products ) {
    $products.forEach( product => {
      alert(`${product.title} Added to Cart!`);
    });
  }
};

function getCartItemsCount() {
  let config = {
    method: 'get',
    url: window.Shopify.routes.root + 'cart.js'
  };
  axios( config ).then(function (response) {
    console.log( response );
    printCartItemsCount( response.data.item_count );
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});
};

function printCartItemsCount( $count = 0 ) {
  ( document.querySelectorAll('.js--cart-items-total') || [] ).forEach( item => {
    item.innerHTML = `(${$count})`;
    if ( $count > 0 ) {
      item.classList.add('has-items');
    } else {
      item.classList.remove('has-items');
    }
  });
};

function updateCartItemsCount() {
  getCartItemsCount();
};

function addProductToCartFromButton( $button = false ) {

 

  let variantID = parseInt( $button.dataset.variantId ) || 123456;
  let quantity =  document.querySelector('.quantity__input').value;
  let image = $button.dataset.featuredImage || '';
  let config = {
    method: 'post',
    url: window.Shopify.routes.root + 'cart/add.js',
    headers: { 'Content-Type': 'application/json' },
    data: { 'items': [{ 'id': variantID, 'quantity': quantity }] }
  };

  axios( config ).then(function (response) {
    notify( response.data.items );
    updateCartItemsCount();
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {});

};

