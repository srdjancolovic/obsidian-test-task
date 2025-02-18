import bagIcon from '../../../assets/icons/bagIcon.svg';
import logo from '../../../assets/logo/logo.svg';
import menuIcon from '../../../assets/icons/menuIcon.svg';
import { navLinks } from '../../../data/nav-links/nav-links.js';
import searchIcon from '../../../assets/icons/searchIcon.svg';
import userIcon from '../../../assets/icons/userIcon.svg';

function generateNavLinks(links) {
    return links
        .map(
            (link) => `<li><a href="${link.linkTo}">${link.linkTitle}</a></li>`
        )
        .join('');
}

export async function loadHeader() {
    try {
        if (document.querySelector('.header')) {
            return;
        }

        console.log('logo', logo);

        const headerHTML = `
            <header class="header">
                <nav class="header__nav">
                    <a href="../../index.html" class="header__logo">
                        <img src=${logo} alt="Logo" />
                    </a>
                    <div class="header__mobile-menu-search">
                        <button>
                            <img src=${menuIcon} class='header__menu-icon' alt="Menu" />
                        </button>
                        <button class="header__search-btn--hide-on-desktop">
                            <img src=${searchIcon} class='header__search-icon' alt="Search" />
                        </button>
                    </div>
                    <ul class="header__menu"></ul>
                    <div class="header__buttons">
                        <button class="header__search-btn--hide-on-mobile">
                            <img src=${searchIcon} class='header__search-icon' alt="Search" />
                        </button>
                        <button>
                            <img src=${userIcon} class='header__user-icon' alt="User" />
                        </button>
                        <button>
                            <img src=${bagIcon} class='header__bag-icon' alt="Bag" />
                        </button>
                    </div>
                </nav>
            </header>
        `;

        // Only insert the header once
        document.body.insertAdjacentHTML('beforebegin', headerHTML);

        // Dynamically add navigation links
        const navMenu = document.querySelector('.header__menu');
        if (navMenu) {
            navMenu.innerHTML = generateNavLinks(navLinks);
        }
    } catch (error) {
        console.error('Error loading header:', error);
    }
}
