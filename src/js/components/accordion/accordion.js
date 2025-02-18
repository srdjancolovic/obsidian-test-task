export async function loadAccordion(targetSelector, accordionData) {
    try {
        let accordionContainer = document.getElementById(targetSelector);

        if (!accordionContainer) {
            console.error('Accordion container not found!');
            return;
        }

        accordionContainer.innerHTML = '';

        accordionData.forEach((item, index) => {
            const accordionItem = document.createElement('div');
            accordionItem.classList.add('accordion__item');
            if (index === 0) accordionItem.classList.add('active');

            const title = document.createElement('h3');
            title.classList.add('accordion__title');
            title.textContent = item.title;

            const icon = document.createElement('span');
            icon.classList.add('accordion__icon');
            icon.innerHTML = index === 0 ? '−' : '+';

            const description = document.createElement('p');
            description.classList.add('accordion__content');
            description.textContent = item.description;

            // Show only the first accordion content by default
            if (index !== 0) {
                description.style.display = 'none';
            }

            // Toggle accordion
            title.addEventListener('click', () => {
                document.querySelectorAll('.accordion__item').forEach((el) => {
                    const content = el.querySelector('.accordion__content');
                    const iconEl = el.querySelector('.accordion__icon');

                    if (el === accordionItem) {
                        el.classList.toggle('active');
                        content.style.display = el.classList.contains('active')
                            ? 'block'
                            : 'none';
                        iconEl.innerHTML = el.classList.contains('active')
                            ? '−'
                            : '+';
                    } else {
                        // Close other accordions
                        el.classList.remove('active');
                        content.style.display = 'none';
                        iconEl.innerHTML = '+';
                    }
                });
            });

            title.appendChild(icon);
            accordionItem.appendChild(title);
            accordionItem.appendChild(description);
            accordionContainer.appendChild(accordionItem);
        });
    } catch (error) {
        console.error('Error loading accordion:', error);
    }
}
