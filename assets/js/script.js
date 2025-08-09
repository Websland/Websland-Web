// assets/js/script.js
// Toggle modo claro/oscuro
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const savedTheme = localStorage.getItem('theme');

// URLs de los logos
const lightLogoURL = 'https://i.imgur.com/ugK3HIo.png';
const darkLogoURL = 'https://i.imgur.com/4NCvb42.png';
const headerLogo = document.getElementById('headerLogo');
const footerLogo = document.getElementById('footerLogo');

// Función para actualizar los logos según el tema
function updateLogos() {
    if (body.classList.contains('dark-mode')) {
        if (headerLogo) headerLogo.src = darkLogoURL;
        if (footerLogo) footerLogo.src = darkLogoURL;
    } else {
        if (headerLogo) headerLogo.src = lightLogoURL;
        if (footerLogo) footerLogo.src = lightLogoURL;
    }
}

// Aplicar tema guardado al cargar
if (savedTheme) {
    body.classList.add(savedTheme);
    themeToggle.innerHTML = savedTheme === 'dark-mode' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    updateLogos(); // Actualizar logos según el tema guardado
}

// Evento para cambiar tema
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('theme', '');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    updateLogos(); // Actualizar logos al cambiar el tema
});

// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// Animación de escritura
const typewriter = document.getElementById('typewriter');
if (typewriter) {
    const texts = ["Webs.land", "Diseño de Frontend", "Resultados Profesionales", "Clientes Satisfechos"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriter.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typewriter.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    // Iniciar efecto máquina de escribir después de un breve retraso
    setTimeout(type, 1000);
}

// Slider de testimonios
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.slider-dot');
if (testimonials.length > 0 && dots.length > 0) {
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + testimonials.length) % testimonials.length;
        
        testimonials[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            showSlide(parseInt(dot.getAttribute('data-slide')));
        });
    });
    
    // Cambio automático de slides
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Animaciones al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Para animaciones específicas de la página Nosotros
            if (entry.target.classList.contains('timeline-item')) {
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }, 100);
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animaciones
document.querySelectorAll('.service-card, .project-card, .team-member, .mission, .vision, .timeline-item').forEach(item => {
    observer.observe(item);
});

// Observar footer para animación
const footer = document.getElementById('footer');
if (footer) {
    observer.observe(footer);
}

// Efecto scroll en header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    }
    
    // Animar footer cuando entra en la vista
    if (footer) {
        const footerPosition = footer.getBoundingClientRect();
        if (footerPosition.top < window.innerHeight - 100) {
            footer.classList.add('visible');
        }
    }
});

// Activar animaciones al cargar la página
window.addEventListener('load', () => {
    // Animación inicial para hero
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtns = document.querySelector('.hero-btns');
    
    if (heroTitle) {
        heroTitle.style.animation = 'fadeUp 1s forwards 0.3s';
    }
    if (heroSubtitle) {
        heroSubtitle.style.animation = 'fadeUp 1s forwards 0.6s';
    }
    if (heroBtns) {
        heroBtns.style.animation = 'fadeUp 1s forwards 0.9s';
    }
    
    // FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            item.classList.toggle('active');
        });
    });
    
    // Filtros de proyectos
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover activo de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Añadir activo al botón clickeado
            btn.classList.add('active');
            
            // Filtrar proyectos (simulado)
            // En una implementación real, aquí iría la lógica de filtrado
        });
    });
    
    // Modal de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    const projectModal = document.querySelector('.project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const modalDots = document.querySelectorAll('.modal-dot');
    
    if (projectModal) {
        // Abrir modal
        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                projectModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Cerrar modal
        modalClose.addEventListener('click', () => {
            projectModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Cerrar al hacer clic fuera del contenido
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                projectModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
        
        // Navegación del modal
        if (modalPrev && modalNext) {
            modalPrev.addEventListener('click', () => {
                // Lógica para slide anterior
            });
            
            modalNext.addEventListener('click', () => {
                // Lógica para slide siguiente
            });
        }
        
        // Navegación por dots
        modalDots.forEach(dot => {
            dot.addEventListener('click', () => {
                // Lógica para mostrar slide correspondiente
            });
        });
    }
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Aquí iría la lógica para enviar el formulario
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            contactForm.reset();
        });
    }

    // Actualizar logos al cargar (por si acaso)
    updateLogos();
});