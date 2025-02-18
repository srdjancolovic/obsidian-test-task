import sliderArrowLeft from '../../../assets/icons/sliderArrowLeft.svg';
import sliderArrowRight from '../../../assets/icons/sliderArrowRight.svg';

export function loadSwiper(targetSelector, sliderData, title = '') {
    try {
        const swiperHtml = `
            <div class="slider">
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <!-- Dynamic slide data will be inserted here -->
                    </div>
                </div>
                <button class="slider__button-prev">
                    <img src="${sliderArrowLeft}" alt="Arrow left" />
                </button>
                <button class="slider__button-next">
                    <img src="${sliderArrowRight}" alt="Arrow right" />
                </button>
            </div>
        `;

        const targetElement = document.getElementById(targetSelector);

        if (!targetElement) {
            console.error(`Target element '${targetSelector}' not found!`);
            return;
        }

        targetElement.innerHTML = '';

        //Title above slider if data is passed
        if (title) {
            const titleElement = document.createElement('h2');
            titleElement.textContent = title;
            titleElement.classList.add('swiper-title');
            targetElement.appendChild(titleElement);
        }

        targetElement.insertAdjacentHTML('beforeend', swiperHtml);

        const swiperWrapper = targetElement.querySelector('.swiper-wrapper');
        if (!swiperWrapper) {
            console.error('Swiper wrapper not found!');
            return;
        }

        swiperWrapper.innerHTML = '';

        // Dynamic slides
        sliderData.forEach((item) => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            slide.innerHTML = `
                <div class="slider__content">
                    <img src="${item.image}" alt="${item.title}" />
                    <h3 class="slider__slide-title">${item.title}</h3>
                    <p class="slider__slide-description">${item.description}</p>
                    <p class="slider__slide-price">${item.price} KR</p>
                </div>
            `;
            swiperWrapper.appendChild(slide);
        });

        new Swiper('.swiper-container', {
            loop: true,
            spaceBetween: 40,

            breakpoints: {
                550: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                },

                1100: {
                    slidesPerView: 3,
                    spaceBetween: 62,
                },
            },

            navigation: {
                prevEl: '.slider__button-prev',
                nextEl: '.slider__button-next',
            },
        });
    } catch (error) {
        console.error('Error loading Swiper:', error);
    }
}
