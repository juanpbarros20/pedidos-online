const sandwiches = [
  {
    name: "Sanduíche de Frango",
    image: "src/images/sanduiche-frango.jpg",
    ingredients: ["Pão integral", "Peito de frango grelhado", "Alface", "Tomate"],
    price: 10.00
  },
  {
    name: "Sanduíche de Atum",
    image: "src/images/sanduiche-atum.jpg",
    ingredients: ["Pão integral", "Atum", "Maionese", "Cenoura ralada"],
    price: 10.00
  },

  {
    name: "Sanduíche Natural",
    image: "src/images/sanduiche-natural.jpg",
    ingredients: ["Pão integral", "Presunto", "Queijo branco", "Alface", "Tomate", "Maionese"],
    price: 8.00
  },

];


const sandwichesContainer = document.getElementById('sandwiches-container');
const cart = document.getElementById('cart');
const cartItemsList = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');
const cartImage = document.getElementById('cart-image');
const cartImagePopup = document.getElementById('cart-image-popup');
const hideCartBtn = document.getElementById('hide-cart-btn');
let cartItems = [];

function showCart() {
  cart.classList.remove('hide');
}

function hideCart() {
  cart.classList.add('hide');
}

function addItemToCart(item) {
  cartItems.push(item);
  renderCartItems();
  showCart();
}

function removeItemFromCart(item) {
  const index = cartItems.indexOf(item);
  if (index !== -1) {
    cartItems.splice(index, 1);
    renderCartItems();
  }
}

function renderCartItems() {
  cartItemsList.innerHTML = '';
  if (cartItems.length === 0) {
    const emptyCartText = document.createElement('p');
    emptyCartText.textContent = 'Carrinho Vazio';
    cartItemsList.appendChild(emptyCartText);
  } else {
    cartItems.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Remover';
      removeBtn.addEventListener('click', () => {
        removeItemFromCart(item);
      });
      li.appendChild(removeBtn);
      cartItemsList.appendChild(li);
    });
  }
}

function showIngredients(sandwich, card) {
  const ingredients = document.createElement('p');
  ingredients.classList.add('ingredients');
  ingredients.textContent = 'Ingredientes: ' + sandwich.ingredients.join(', ');

  card.appendChild(ingredients);
}

function createSandwichCard(sandwich) {
  const card = document.createElement('div');
  card.classList.add('sandwich-card');

  const image = document.createElement('img');
  image.src = sandwich.image;
  image.alt = sandwich.name;
  card.appendChild(image);

  const name = document.createElement('h3');
  name.textContent = sandwich.name;
  card.appendChild(name);

  const price = document.createElement('p');
  price.textContent = `R$ ${sandwich.price.toFixed(2)}`;
  card.appendChild(price);

  const addButton = document.createElement('button');
  addButton.textContent = 'Adicionar ao Carrinho';
  addButton.addEventListener('click', (event) => {
    event.stopPropagation();
    addItemToCart(sandwich.name);
  });
  card.appendChild(addButton);

  card.addEventListener('click', () => {
    if (!card.querySelector('.ingredients')) {
      showIngredients(sandwich, card);
    } else {
      card.querySelector('.ingredients').remove();
    }
  });

  return card;
}

function renderSandwiches() {
  sandwichesContainer.innerHTML = '';
  sandwiches.forEach(sandwich => {
    const card = createSandwichCard(sandwich);
    sandwichesContainer.appendChild(card);
  });
}

checkoutBtn.addEventListener('click', () => {
  const orderText = cartItems.join('\n');
  const whatsappLink = `https://api.whatsapp.com/send?phone=SEU_NUMERO_DE_TELEFONE&text=${encodeURIComponent(
    'Olá, gostaria de fazer o seguinte pedido:\n' + orderText
  )}`;
  window.open(whatsappLink, '_blank');
});

cartImage.addEventListener('click', () => {
  if (cartItems.length > 0) {
    showCart();
  }
});

hideCartBtn.addEventListener('click', () => {
  hideCart();
});

renderSandwiches();
