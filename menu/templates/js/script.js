document.addEventListener('DOMContentLoaded', function() {
    // Функция для настройки динамической цены
    function setupDynamicPrice(selectId, priceId) {
        const select = document.getElementById(selectId);
        const price = document.getElementById(priceId);
        if (select && price) {
            select.addEventListener('change', function() {
                price.textContent = this.value + ' грн';
            });
        }
    }

    // Настройка всех селектов с динамической ценой
    const dynamicPriceItems = [
        { select: 'riznsoli-select', price: 'riznsoli-price' },
        { select: 'myaso-kovbasy-select', price: 'myaso-kovbasy-price' },
        { select: 'modal-myaso-kovbasy-select', price: 'modal-myaso-kovbasy-price' },
        { select: 'salo-select', price: 'salo-price' },
        { select: 'modal-salo-select', price: 'modal-salo-price' },
        { select: 'vinegret-select', price: 'vinegret-price' },
        { select: 'modal-vinegret-select', price: 'modal-vinegret-price' },
        { select: 'borsch-chef-select', price: 'borsch-chef-price' },
        { select: 'modal-borsch-chef-select', price: 'modal-borsch-chef-price' },
        { select: 'fried-smelt-select', price: 'fried-smelt-price' },
        { select: 'modal-fried-smelt-select', price: 'modal-fried-smelt-price' },
        { select: 'pelmeni-select', price: 'pelmeni-price' },
        { select: 'modal-pelmeni-select', price: 'modal-pelmeni-price' },
        { select: 'deruny-select', price: 'deruny-price' },
        { select: 'modal-deruny-select', price: 'modal-deruny-price' },
        { select: 'zucchini-select', price: 'zucchini-price' },
        { select: 'modal-zucchini-select', price: 'modal-zucchini-price' },
        { select: 'pies-select', price: 'pies-price' },
        { select: 'modal-pies-select', price: 'modal-pies-price' },
        { select: 'sauces-select', price: 'sauces-price' },
        { select: 'modal-sauces-select', price: 'modal-sauces-price' }
    ];

    dynamicPriceItems.forEach(item => {
        setupDynamicPrice(item.select, item.price);
    });
    // --- Фильтрация товаров по категориям ---
    const categoryMap = [
        { btn: 'Хіти', className: 'category-popular' },
        { btn: 'Набори', className: 'category-sets' },
        { btn: 'Закуски', className: 'category-snacks' },
        { btn: 'Сендвічі/Бутерброди', className: 'category-sandwiches' },
        { btn: 'Сало', className: 'category-salo' },
        { btn: 'Салати', className: 'category-salads' },
        { btn: 'Супи', className: 'category-soups' },
        { btn: 'Гарячі страви', className: 'category-hot' },
        { btn: 'Гарніри', className: 'category-sides' },
        { btn: 'Пельмені та вареники', className: 'category-dumplings' },
        { btn: 'Деруни та не тільки', className: 'category-deruny' },
        { btn: 'Випічка', className: 'category-bakery' },
        { btn: 'Десерти', className: 'category-desserts' },
        { btn: 'Напої', className: 'category-drinks' },
        { btn: 'Хліб', className: 'category-bread' },
        { btn: 'Фірмові заготівлі', className: 'category-specials' },
        { btn: 'Торти (по замовленню)', className: 'category-cakes' },
        { btn: 'Соуси', className: 'category-sauces'},
        
    ];

    const categoryBtns = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');

    function showCategory(className) {
        productCards.forEach(card => {
            if (card.classList.contains(className)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // По умолчанию показываем только "Хіти"
    showCategory('category-popular');
    categoryBtns[0].classList.add('active');

    // Обработка кликов по кнопкам категорий
    categoryBtns.forEach((btn, idx) => {
        btn.addEventListener('click', function() {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            showCategory(categoryMap[idx].className);
        });
    });

    // --- Quantity controls ---
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            const currentValue = parseInt(input.value);
            if (this.classList.contains('plus')) {
                input.value = currentValue + 1;
            } else if (this.classList.contains('minus') && currentValue > 1) {
                input.value = currentValue - 1;
            }
        });
    });

    // --- Modal functionality ---
    const overlay = document.querySelector('.modal-overlay');
    const modals = document.querySelectorAll('.product-modal');

    // Функция для открытия модального окна
    function openModal(productId) {
        const modal = document.getElementById('modal-' + productId);
        if (modal) {
            modal.style.display = 'block';
            overlay.style.display = 'block';
        } else {
            console.log('Modal not found:', productId);
        }
    }

    // Функция для закрытия всех модальных окон
    function closeAllModals() {
        modals.forEach(modal => modal.style.display = 'none');
        overlay.style.display = 'none';
    }

    // Обработчик клика по карточке товара
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.quantity-control') && 
                !e.target.closest('.order-btn') && 
                !e.target.closest('.form-select')) {
                const productId = this.getAttribute('data-product-id');
                if (productId) {
                    openModal(productId);
                }
            }
        });
    });

    // Обработчик клика по кнопке закрытия
    document.querySelectorAll('.modal-close').forEach(close => {
        close.addEventListener('click', closeAllModals);
    });

    // Обработчик клика по оверлею
    overlay.addEventListener('click', closeAllModals);
});

document.addEventListener('DOMContentLoaded', function() {
    
    const frozenSelect = document.getElementById('frozen-select');
    const productCard = frozenSelect.closest('.product-card');
    const priceElement = productCard.querySelector('.product-price');
    const imageElement = productCard.querySelector('.product-image');
    
    frozenSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const price = selectedOption.value;
        const imageSrc = selectedOption.getAttribute('data-image');
        
        // Оновлення ціни
        priceElement.textContent = price + ' грн';
        
        // Оновлення зображення
        if (imageSrc) {
            imageElement.src = imageSrc;
            imageElement.alt = selectedOption.text;
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const cakesSelect = document.getElementById('cakes-select');
    const productCard = cakesSelect.closest('.product-card');
    const priceElement = productCard.querySelector('.product-price');
    const imageElement = productCard.querySelector('.product-image');
    
    cakesSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const price = selectedOption.value;
        const imageSrc = selectedOption.getAttribute('data-image');
        
        // Оновлення ціни
        priceElement.textContent = price + ' грн';
        
        // Оновлення зображення
        if (imageSrc) {
            imageElement.src = imageSrc;
            imageElement.alt = selectedOption.text;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    let cart = [];
    const cartBtn = document.getElementById('cart-btn');
    const cartButtonAlt = document.querySelector('.cart-button'); // кнопка из старой разметки
    const cartModalEl = document.getElementById('cart-modal');
    const cartModal = cartModalEl ? new bootstrap.Modal(cartModalEl) : null;
    const cartItems = document.getElementById('cart-items');
    // поддерживаем оба варианта бейджа: #cart-count и .cart-count (в разметке есть оба)
    let cartCount = document.getElementById('cart-count') || document.querySelector('.cart-count');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    
    // Ensure badge exists (создаём #cart-count если отсутствует)
    function ensureCartBadge() {
        if (!cartBtn && !cartButtonAlt) return;
        if (!cartCount) {
            const span = document.createElement('span');
            span.id = 'cart-count';
            span.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger';
            span.style.minWidth = '20px';
            span.style.display = 'none';
            span.textContent = '0';
            const target = cartBtn || cartButtonAlt;
            // make parent relatively positioned to keep badge position
            if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
            target.appendChild(span);
            cartCount = span;
        }
    }
    ensureCartBadge();

    // helper: обновляем любое существующее отображение счётчика (id и класс)
    function updateBadgeDisplay(qty) {
        // основной элемент (id)
        const byId = document.getElementById('cart-count');
        if (byId) {
            byId.textContent = qty;
            byId.style.display = qty > 0 ? '' : 'none';
            byId.setAttribute('aria-label', `${qty} items in cart`);
        }
        // старый элемент по классу (если есть)
        const byClass = document.querySelector('.cart-count');
        if (byClass) {
            byClass.textContent = qty;
            byClass.style.display = qty > 0 ? '' : 'none';
        }
    }

    // Обновление корзины — обновляет оба бейджа
    function updateCart() {
        ensureCartBadge();
        if (!cartItems) return;
        cartItems.innerHTML = '';
        let total = 0;
        const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
        cart.forEach((item, idx) => {
            total += item.price * item.qty;
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <div>
                  <div class="fw-bold">${item.title}</div>
                  <small class="text-muted">${item.price} грн × ${item.qty} шт.</small>
                </div>
                <div class="text-end">
                  <div class="fw-semibold">${item.price * item.qty} грн</div>
                  <div class="btn-group btn-group-sm mt-1" role="group">
                    <button class="btn btn-outline-secondary decrease-item" data-idx="${idx}">−</button>
                    <button class="btn btn-outline-secondary increase-item" data-idx="${idx}">+</button>
                    <button class="btn btn-outline-danger ms-2 remove-item" data-idx="${idx}">✕</button>
                  </div>
                </div>
            `;
            cartItems.appendChild(li);
        });

        updateBadgeDisplay(totalQty);

        if (cartTotal) cartTotal.innerText = total + ' грн';

        // handlers
        cartItems.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const idx = parseInt(this.getAttribute('data-idx'));
                if (!isNaN(idx)) {
                    cart.splice(idx, 1);
                    updateCart();
                }
            });
        });
        cartItems.querySelectorAll('.increase-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const idx = parseInt(this.getAttribute('data-idx'));
                if (!isNaN(idx)) {
                    cart[idx].qty += 1;
                    updateCart();
                }
            });
        });
        cartItems.querySelectorAll('.decrease-item').forEach(btn => {
            btn.addEventListener('click', function () {
                const idx = parseInt(this.getAttribute('data-idx'));
                if (!isNaN(idx) && cart[idx].qty > 1) {
                    cart[idx].qty -= 1;
                    updateCart();
                }
            });
        });
    }

    // функция открытия корзины (поддерживает отсутствие bootstrap)
    function openCartModal() {
        if (cartModal) cartModal.show();
        else {
            // fallback: если модал нет, показать содержимое в alert (на время отладки)
            alert('Корзина:\n' + cart.map(i => `${i.title} x${i.qty}`).join('\n') || 'порожня');
        }
    }

    // Повесить обработчики на обе возможные кнопки
    if (cartBtn) cartBtn.addEventListener('click', openCartModal);
    if (cartButtonAlt) cartButtonAlt.addEventListener('click', openCartModal);

    // --- Оформление заказа ---
    const inputName = document.getElementById('customer-name');
    const inputPhone = document.getElementById('customer-phone');
    const inputAddress = document.getElementById('customer-address');
    const inputNote = document.getElementById('customer-note');
    const deliveryType = document.getElementById('delivery-type');
    const addressGroup = document.getElementById('address-group');

    // Показ/скрытие поля адреса при выборе типа доставки
    deliveryType.addEventListener('change', function () {
        if (this.value === 'delivery') addressGroup.style.display = '';
        else addressGroup.style.display = 'none';
    });

    // Универсальная функция получения данных товара из кнопки (и её род. элементов)
    function getProductInfoFromElement(el) {
        // если кнопка внутри модалки продукта
        const modal = el.closest('.product-modal');
        if (modal) {
            const titleEl = modal.querySelector('h2');
            const priceEl = modal.querySelector('.product-price');
            const title = titleEl ? titleEl.innerText.trim() : (modal.dataset.title || 'Товар');
            const price = priceEl ? parseInt(priceEl.textContent) || 0 : (parseInt(modal.datasetPrice) || 0);
            return { title, price };
        }
        // если кнопка внутри карточки продукта
        const card = el.closest('.product-card');
        if (card) {
            const titleEl = card.querySelector('.product-title') || card.querySelector('h3') || card.querySelector('.card-title');
            const priceEl = card.querySelector('.product-price');
            const title = titleEl ? titleEl.innerText.trim() : (card.dataset.title || 'Товар');
            const price = priceEl ? parseInt(priceEl.textContent) || 0 : (parseInt(card.datasetPrice) || 0);
            return { title, price };
        }
        // fallback: data-атрибуты на кнопке
        const title = el.getAttribute('data-title') || 'Товар';
        const price = parseInt(el.getAttribute('data-price')) || 0;
        return { title, price };
    }

    // Добавление товара в корзину
    function addToCart(title, price, qty = 1) {
        const existing = cart.find(item => item.title === title);
        if (existing) {
            existing.qty += qty;
        } else {
            cart.push({ title, price, qty });
        }
        updateCart();
    }

    // Привязываем все кнопки .order-btn (внутри модалок и снаружи)
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const info = getProductInfoFromElement(btn);
            addToCart(info.title, info.price, 1);
            cartModal.show();
        });
    });

    // Очистка корзины
    clearCartBtn.addEventListener('click', function () {
        if (confirm('Очистити корзину?')) {
            cart = [];
            updateCart();
        }
    });

    // Оформление заказа
    checkoutBtn.addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Корзина порожня!');
            return;
        }
        const name = inputName.value.trim();
        const phone = inputPhone.value.trim();
        const type = deliveryType.value;
        const address = inputAddress.value.trim();
        if (!name || !phone) {
            alert('Будь ласка, вкажіть ім\'я та телефон.');
            return;
        }
        if (type === 'delivery' && !address) {
            alert('Будь ласка, вкажіть адресу доставки.');
            return;
        }

        const summary = [
            `Замовлення:`,
            ...cart.map(i => `${i.title} x${i.qty} — ${i.price * i.qty} грн`),
            `Сума: ${cart.reduce((s, it) => s + it.price * it.qty, 0)} грн`,
            '',
            `Кому: ${name}`,
            `Телефон: ${phone}`,
            `Тип: ${type === 'delivery' ? 'Доставка' : 'Самовивіз'}`,
            type === 'delivery' ? `Адреса: ${address}` : '',
            `Коментар: ${inputNote.value.trim() || '-'}`,
        ].filter(Boolean).join('\n');

        // Пока показываем summary. Здесь можно отправить на сервер (fetch).
        alert(summary);

        // Очистка после оформления
        cart = [];
        updateCart();
        inputName.value = '';
        inputPhone.value = '';
        inputAddress.value = '';
        inputNote.value = '';
        deliveryType.value = 'pickup';
        addressGroup.style.display = 'none';
        cartModal.hide();
    });

    updateCart();
});

