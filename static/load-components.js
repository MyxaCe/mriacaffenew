document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/static/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });

    // Load footer
    fetch('/static/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });

    // Динамічне модальне вікно
    const productModal = document.getElementById('product-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalPrice = document.getElementById('modal-price');

    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const image = card.getAttribute('data-image');
            const price = card.getAttribute('data-price');

            modalTitle.textContent = title;
            modalImage.src = image;
            modalImage.alt = title;
            modalPrice.textContent = `Ціна: ${price} грн`;

            const modal = new bootstrap.Modal(productModal);
            modal.show();
        });
    });

    // Динамічне заповнення товарів
    const productsContainer = document.getElementById('products-container');
    const productTemplate = document.getElementById('product-template');

    if (productsContainer) {
        const products = JSON.parse(productsContainer.getAttribute('data-products'));

        products.forEach(product => {
            const productElement = productTemplate.content.cloneNode(true);
            productElement.querySelector('.product-card').setAttribute('data-product-id', product.id);
            productElement.querySelector('.product-image').src = product.image;
            productElement.querySelector('.product-image').alt = product.title;
            productElement.querySelector('.product-title').textContent = product.title;
            productElement.querySelector('.product-price').textContent = product.price;

            productsContainer.appendChild(productElement);
        });
    }
});