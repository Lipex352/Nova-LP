document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Scroll Handler
    const header = document.querySelector('.header-container');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileNav.classList.toggle('open');
            const isOpen = mobileNav.classList.contains('open');
            mobileToggle.innerHTML = isOpen 
                ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' 
                : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
        });

        // Close menu when clicking links
        const mobileLinks = mobileNav.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileNav.classList.remove('open');
                mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
            }
        });
    }

    // 3. FAQ Accordion Handler
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-content').style.maxHeight = null;
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // 4. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Once animated, stop tracking it
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add('revealed');
        });
    }

    // 5. WhatsApp Floating Balloon Delayed Popup
    const waBalloon = document.getElementById('wa-balloon');
    if (waBalloon) {
        setTimeout(() => {
            waBalloon.classList.add('show');
        }, 3500);

        // Hide balloon after scrolling a lot down or clicking it
        window.addEventListener('scroll', function hideOnScroll() {
            if (window.scrollY > 600) {
                waBalloon.classList.remove('show');
                window.removeEventListener('scroll', hideOnScroll);
            }
        });
        
        waBalloon.addEventListener('click', () => {
            waBalloon.classList.remove('show');
        });
    }
});
