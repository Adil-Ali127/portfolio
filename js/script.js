document.addEventListener('DOMContentLoaded', () => {

    // ===== Form Validation =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            // Name validation
            const name = document.getElementById('name');
            const nameError = document.getElementById('nameError');
            if (name.value.trim() === '') {
                nameError.style.display = 'block';
                name.style.borderColor = '#e53e3e';
                isValid = false;
            } else {
                nameError.style.display = 'none';
                name.style.borderColor = '#38b2ac';
            }

            // Email validation
            const email = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.value.trim())) {
                emailError.style.display = 'block';
                email.style.borderColor = '#e53e3e';
                isValid = false;
            } else {
                emailError.style.display = 'none';
                email.style.borderColor = '#38b2ac';
            }

            // Subject validation
            const subject = document.getElementById('subject');
            const subjectError = document.getElementById('subjectError');
            if (subject.value.trim() === '') {
                subjectError.style.display = 'block';
                subject.style.borderColor = '#e53e3e';
                isValid = false;
            } else {
                subjectError.style.display = 'none';
                subject.style.borderColor = '#38b2ac';
            }

            // Message validation
            const message = document.getElementById('message');
            const messageError = document.getElementById('messageError');
            if (message.value.trim() === '') {
                messageError.style.display = 'block';
                message.style.borderColor = '#e53e3e';
                isValid = false;
            } else {
                messageError.style.display = 'none';
                message.style.borderColor = '#38b2ac';
            }

            // If form is valid
            if (isValid) {
                // TEMP: Safe alert instead of fetch to localhost
                alert("Form validation successful (backend disabled)");
                contactForm.reset();
                document.querySelectorAll('.form-control').forEach(input => {
                    input.style.borderColor = '#e2e8f0';
                });
            }
        });
    }

    // Reset validation on input
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', function () {
            const errorElement = document.getElementById(this.id + 'Error');
            if (errorElement) {
                errorElement.style.display = 'none';
                this.style.borderColor = '#e2e8f0';
            }
        });
    });

    // ===== Fade-in animation =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // ===== Smooth scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Theme Toggle =====
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        class ThemeManager {
            constructor() {
                this.themeToggle = themeToggle;
                this.toggleThumb = document.querySelector('.toggle-thumb');
                this.toggleLabel = document.querySelector('.toggle-label');
                this.preferredTheme = localStorage.getItem('theme');
                this.systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
                this.init();
            }
            init() {
                this.applyTheme();
                this.themeToggle.addEventListener('click', () => this.toggleTheme());
                this.systemPrefersDark.addEventListener('change', (e) => {
                    if (!localStorage.getItem('theme')) {
                        this.setTheme(e.matches ? 'dark' : 'light');
                    }
                });
                document.body.classList.add('theme-transition');
            }
            applyTheme() {
                let theme = 'light';
                if (this.preferredTheme) theme = this.preferredTheme;
                else if (this.systemPrefersDark.matches) theme = 'dark';
                this.setTheme(theme);
            }
            setTheme(theme) {
                const isDark = theme === 'dark';
                if (isDark) document.body.classList.add('dark-theme');
                else document.body.classList.remove('dark-theme');
                if (this.toggleThumb && this.toggleLabel) {
                    this.toggleLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
                    this.toggleThumb.style.transform = isDark ? 'translateX(30px)' : 'translateX(3px)';
                }
                localStorage.setItem('theme', theme);
                document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme } }));
            }
            toggleTheme() {
                this.setTheme(document.body.classList.contains('dark-theme') ? 'light' : 'dark');
            }
            getCurrentTheme() {
                return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
            }
        }

        const themeManager = new ThemeManager();
        window.themeManager = themeManager;
    }

    // ===== Hamburger Menu =====
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (hamburgerBtn && mobileNav) {
        function toggleMobileMenu() {
            hamburgerBtn.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = hamburgerBtn.classList.contains('active') ? 'hidden' : '';
        }
        function closeMobileMenu() {
            hamburgerBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
        mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileMenu));
        document.addEventListener('click', (e) => {
            if (mobileNav.classList.contains('active') &&
                !mobileNav.contains(e.target) &&
                !hamburgerBtn.contains(e.target)) closeMobileMenu();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) closeMobileMenu();
        });
    }

    // ===== Typing Animation =====
    const titleElement = document.querySelector('.hero-text .title');
    if (titleElement) {
        const text = titleElement.textContent;
        titleElement.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                titleElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // ===== Navbar Scroll Effect =====
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.padding = '0.5rem 0';
                header.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.2)';
                header.classList.add('scrolled');
            } else {
                header.style.padding = '1.2rem 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                header.classList.remove('scrolled');
            }
        }
    });

    console.log('JS Loaded Successfully!');

}); // End of DOMContentLoaded

// Smooth scroll for CTA button
document.querySelector('.nav-cta').addEventListener('click', function (e) {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        window.scrollTo({
            top: contactSection.offsetTop - 80,
            behavior: 'smooth'
        });
    }
});

// Button hover effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });
});

// Floating dots animation enhancement
const dots = document.querySelectorAll('.dot');
dots.forEach((dot, index) => {
    dot.style.animationDuration = `${15 + index * 2}s`;
});

// Tech icons hover effect
const techIcons = document.querySelectorAll('.tech-icon');
techIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        this.style.color = '#2563eb';
        this.style.transform = 'translateY(-3px) scale(1.2)';
    });

    icon.addEventListener('mouseleave', function () {
        this.style.color = '#94a3b8';
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Simple page load animation
document.addEventListener('DOMContentLoaded', function () {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroImage.style.opacity = '0';
    heroImage.style.transform = 'translateY(30px)';

    setTimeout(() => {
        heroContent.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';

        heroImage.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateY(0)';
    }, 300);
});