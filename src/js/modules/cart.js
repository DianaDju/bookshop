export let cart = JSON.parse(localStorage.getItem('bookshop_cart')) || [];

export function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cart.length;
        cartBadge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

export function toggleCartItem(id) {
    const idx = cart.indexOf(id);
    if (idx === -1) {
        cart.push(id);
        return true; // Добавлено
    } else {
        cart.splice(idx, 1);
        return false; // Удалено
    }
}

export function saveCart() {
    localStorage.setItem('bookshop_cart', JSON.stringify(cart));
    updateCartBadge();
}