import { toggleCartItem, saveCart, cart } from "./cart.js";

function renderRatingStars(rating) {
  if (!rating) return "";
  let starsHtml = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      starsHtml += "★";
    } else {
      starsHtml += '<span style="color: #E0E0E0">★</span>';
    }
  }
  starsHtml += "</div>";
  return starsHtml;
}

export function renderBooks(books, gridElement) {
  books.forEach((book, i) => {
    const info = book.volumeInfo;
    const bookId = book.id;
    const isInCart = cart.includes(bookId);
    const placeholderUrl =
      "https://placehold.jp/24/eeeeee/999999/212x300.png?text=No%20Cover";
    const cover = info.imageLinks ? info.imageLinks.thumbnail : placeholderUrl;

    // 1. Проверяем наличие цены и создаем HTML-строку только если цена есть
    const saleInfo = book.saleInfo;
    const hasPrice =
      saleInfo && saleInfo.retailPrice && saleInfo.retailPrice.amount;

    const priceHtml = hasPrice
      ? `<p class="book-card__price">${saleInfo.retailPrice.amount} ${saleInfo.retailPrice.currencyCode}</p>`
      : ""; // Если цены нет — здесь будет пустая строка

    const card = document.createElement("div");
    card.className = "book-card";
    card.style.animationDelay = `${i * 0.1}s`;

    card.innerHTML = `
            <div class="book-card__image"><img src="${cover}" alt="${info.title}"></div>
            <div class="book-card__info">
                <p class="book-card__author">${info.authors?.join(", ") || "Unknown"}</p>
                <h3 class="book-card__title">${info.title}</h3>
                <div class="book-card__rating">
                    ${renderRatingStars(info.averageRating)}
                    <span class="reviews-count">${info.ratingsCount || 0} reviews</span>
                </div>
                <p class="book-card__description">${info.description || "No description."}</p>
                
                ${priceHtml} <button class="book-card__buy-btn ${isInCart ? "in-cart" : ""}">
                    ${isInCart ? "In the cart" : "Buy now"}
                </button>
            </div>
        `;

    const buyBtn = card.querySelector(".book-card__buy-btn");
    buyBtn.addEventListener("click", () => {
      const added = toggleCartItem(bookId);
      buyBtn.textContent = added ? "In the cart" : "Buy now";
      buyBtn.classList.toggle("in-cart", added);
      saveCart();
    });

    gridElement.appendChild(card);
  });
}
