/* script.js */
document.addEventListener("DOMContentLoaded", () => {
    // WhatsApp floating message logic
    const waMessage = document.getElementById('wa-message');
    const waContainer = document.getElementById('wa-container');

    if (waMessage && waContainer) {
        // Show after 3 seconds
        setTimeout(() => {
            waMessage.classList.add('show');
        }, 3000);

        // Show on hover
        waContainer.addEventListener('mouseenter', () => {
            waMessage.classList.add('show');
        });
        
        waContainer.addEventListener('mouseleave', () => {
            // Optional: hide on mouse leave after a delay
            // setTimeout(() => waMessage.classList.remove('show'), 2000);
        });
    }

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('#mobile-menu a');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('button');
        btn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
