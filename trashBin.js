"use strict";

const cartAmountEl = document.querySelector('.fifth_img img');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');
const theNumberCartEl = document.querySelector('.fifth_img .countCartEl');
const basketTotalEl = document.querySelector('.basketTotal');

cartAmountEl.addEventListener('click', () => {
  basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.first_product_line').addEventListener('click', event => {
  if (!event.target.closest('.hover_img_link')) {
    return;
  }
  const productEl = event.target.closest('.product_elements');
  const id = +productEl.dataset.id;
  const name = productEl.dataset.name;
  const price = +productEl.dataset.price;
  addToCart(id, name, price);
});

function addToCart(id, name, price) {
  if (!(id in basket)) {
    basket[id] = { id, name, price, count: 0 };
  }
  basket[id].count++;
  theNumberCartEl.textContent = getTotalBasketCount().toString();
  basketTotalValueEl.textContent = getTotalBasketPrice().toString();
  renderProductInBasket(id);
}

function getTotalBasketCount() {
  const productsCart = Object.values(basket);
  let count = 0;
  productsCart.forEach((element) => {
    count += element.count;
  });
  return count;
}

function getTotalBasketPrice() {
  const productsCart = Object.values(basket);
  let price = 0;
  Object.values(basket).forEach((element) => {
    price += element.price * element.count;
  });
  return price;
}


function renderProductInBasket(productId) {
  const basketRowEl = basketEl
    .querySelector(`.basketRow[data-id="${productId}"]`);
  if (!basketRowEl) {
    renderNewProductInBasket(productId);
    return;
  }
  const product = basket[productId];
  basketRowEl.querySelector('.productCount').textContent = product.count;
  basketRowEl
    .querySelector('.productTotalRow')
    .textContent = (product.price * product.count);
}

function renderNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}


