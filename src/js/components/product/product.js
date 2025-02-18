import { accordionData } from '../../../data/accordion-data/accordion-data.js';
import { loadAccordion } from '../accordion/accordion.js';
import { loadBreadcrumb } from '../breadcrumb/breadcrumb.js';
import { loadHeader } from '../header/header.js';
import { loadSwiper } from '../slider/slider.js';
import { productsData } from '../../../data/products/products-data.js';
import { sliderData } from '../../../data/slider-data/slider-data.js';

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadAccordion('product-accordion', accordionData);
    loadSwiper('similar-products-slider', sliderData, 'You may also like');

    //Added two products for example (switch between  and 1)
    loadProductInfo(productsData[0]);

    //Add to cart click handler and animation for toast message
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            showToastMessage('Added to cart!');
        });
    }
});

//Dynamicly add product data
function loadProductInfo(product) {
    const titleElement = document.querySelector('.product-info__title h1');
    const subTitleElement = document.querySelector('.product-info__title p');
    const descriptionElement = document.querySelector(
        '.product-info__description'
    );
    const declarationsContainer = document.querySelector(
        '.product-info__declarations'
    );

    loadBreadcrumb('.product-info__breadcrumb-mobile', product);
    loadBreadcrumb('.product-info__breadcrumb-desktop', product);

    titleElement.textContent = product.title;
    subTitleElement.textContent = product.subtitle;
    descriptionElement.textContent = product.description;

    declarationsContainer.innerHTML = '';

    product.declarations.forEach((declaration) => {
        const declarationElement = document.createElement('div');
        declarationElement.classList.add('product-info__declaration');

        const iconElement = document.createElement('img');
        iconElement.src = declaration.icon;
        iconElement.alt = 'Declaration icon';
        iconElement.classList.add('product-info__declaration-icon');

        const titleElement = document.createElement('p');
        titleElement.classList.add('product-info__declaration-title');
        titleElement.textContent = declaration.title;

        declarationElement.appendChild(iconElement);
        declarationElement.appendChild(titleElement);

        declarationsContainer.appendChild(declarationElement);
    });
}

function showToastMessage(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;

    const button = document.getElementById('add-to-cart-btn');
    const container = button.parentNode;

    container.insertBefore(toast, button);

    setTimeout(() => {
        toast.classList.add('toast-message--show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('toast-message--show');
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 4000);
}
