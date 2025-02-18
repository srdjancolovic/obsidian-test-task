import arrowBack from '../../../assets/icons/arrowBack.svg';

export function loadBreadcrumb(targetSelector, product) {
    try {
        const breadcrumbHtml = `
            <div class="product-info__breadcrumb">
                <a href="../../index.html">
                    <img src=${arrowBack} alt="Arrow back" />
                </a>
                <div class="product-info__breadcrumb-data">
                    <a href="../../index.html">All products</a>
                    <span class="product-info__breadcrumb-data-separator">/</span>
                    <a href="#" class="product-info__breadcrumb-category"></a>
                    <span class="product-info__breadcrumb-data-separator">/</span>
                    <p class="product-info__breadcrumb-product-title"></p>
                </div>
            </div>
        `;

        const targetElement = document.querySelector(targetSelector);

        if (!targetElement) {
            console.error(`Target element '${targetSelector}' not found!`);
            return;
        }

        targetElement.innerHTML = '';

        targetElement.insertAdjacentHTML('beforeend', breadcrumbHtml);

        const breadcrumbCategory = targetElement.querySelector(
            '.product-info__breadcrumb-category'
        );
        const breadcrumbProductTitle = targetElement.querySelector(
            '.product-info__breadcrumb-product-title'
        );

        if (breadcrumbCategory && breadcrumbProductTitle) {
            breadcrumbCategory.textContent = product.category;
            breadcrumbProductTitle.textContent = product.title;

            // Here we can add option to directly filter some category if needed
            breadcrumbCategory.setAttribute(
                'href',
                `product.html?category=${product.category}`
            );
        }
    } catch (error) {
        console.error('Error loading Breadcrumb:', error);
    }
}
