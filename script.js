document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Smooth Scroll for local links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// WhatsApp Widget Logic
function toggleWaPopup() {
    var popup = document.getElementById('dvWaPopup');
    if(popup) {
        popup.classList.toggle('active');
    }
}

// Global click listener for all buttons to open the questionnaire popup
document.addEventListener('click', function(e) {
    var botaoClicado = e.target.closest('.btn');
    if (botaoClicado) {
        e.preventDefault(); 
        var popup = document.getElementById('dvWaPopup');
        if(popup) {
            popup.classList.add('active');
        }
    }
});

function sendToWa() {
    var nome = document.getElementById('wa_nome').value.trim();
    var empresa = document.getElementById('wa_empresa').value;
    var valor = document.querySelector('input[name="wa_valor"]:checked');
    var situacao = document.querySelector('input[name="wa_situacao"]:checked');
    
    if(!nome || !empresa || !valor || !situacao) {
        alert("Por favor, preencha todos os campos para iniciarmos sua análise gratuita.");
        return;
    }
    
    var msg = "Olá! Gostaria de uma avaliação sobre Multipropriedade.\n\n" + 
              "*Nome:* " + nome +
              "\n*Multipropriedade:* " + empresa + 
              "\n*Valor Investido:* " + valor.value + 
              "\n*Situação:* " + situacao.value;
              
    var phoneNumber = "5585992082821"; 
    var url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(msg);
    window.open(url, '_blank');
}

// Carousel Functionality
function initTestimonialCarousel() {
    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    
    if (!track || !nextBtn || !prevBtn) return;
    
    let currentIndex = 0;
    
    function getCardsToShow() {
        if (window.innerWidth > 1024) return 3;
        if (window.innerWidth > 768) return 2;
        return 1;
    }
    
    function updateCarousel() {
        const cardsToShow = getCardsToShow();
        const cardWidth = track.firstElementChild.offsetWidth + 20; // width + gap
        const maxIndex = track.children.length - cardsToShow;
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }
    
    nextBtn.addEventListener('click', () => {
        const cardsToShow = getCardsToShow();
        const maxIndex = track.children.length - cardsToShow;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    window.addEventListener('resize', updateCarousel);
    updateCarousel();
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initTestimonialCarousel();
});
