import "../scss/main.scss";
import { fetchBooks } from "./modules/api.js";
import { renderBooks } from "./modules/render.js";
import { updateCartBadge } from "./modules/cart.js";
import { initSlider } from "./modules/slider.js";

const state = {
  currentCategory: "Architecture",
  startIndex: 0,
  maxResults: 6,
};

const elements = {
  booksGrid: document.getElementById("books-grid"),
  loadMoreBtn: document.getElementById("load-more-btn"),
  categoryItems: document.querySelectorAll(".category-item"),
  navLinks: document.querySelectorAll(".nav-list a"),
};

// Функция загрузки книг
async function loadBooks(append = false) {
  if (!append) elements.booksGrid.innerHTML = "";
  const data = await fetchBooks(state.currentCategory, state.startIndex);

  if (data && data.items) {
    renderBooks(data.items, elements.booksGrid);
    elements.loadMoreBtn.style.display = "block";
  } else {
    elements.loadMoreBtn.style.display = "none";
  }
}

// Инициализация событий категорий
elements.categoryItems.forEach((item) => {
  item.addEventListener("click", () => {
    elements.categoryItems.forEach((i) => i.classList.remove("active"));
    item.classList.add("active");
    state.currentCategory = item.getAttribute("data-category");
    state.startIndex = 0;
    loadBooks();
  });
});

// Кнопка подгрузки новых книг
elements.loadMoreBtn.addEventListener("click", () => {
  state.startIndex += state.maxResults;
  loadBooks(true);
});

// Активные ссылки навигации
elements.navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    elements.navLinks.forEach((l) => l.classList.remove("active"));
    e.currentTarget.classList.add("active");
  });
});

updateCartBadge();
loadBooks();
initSlider();
