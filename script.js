document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Premium Intersection Observer with Staggering
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -80px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed for absolute performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-scroll, .slide-left, .slide-right');
    animatedElements.forEach(el => observer.observe(el));

    // Form submission interaction
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.querySelector('.submit-button');
            const originalText = btn.textContent;
            btn.textContent = "Sending...";

            setTimeout(() => {
                document.getElementById('form-message').style.display = 'block';
                form.reset();
                btn.textContent = originalText;

                setTimeout(() => {
                    document.getElementById('form-message').style.display = 'none';
                }, 4000);
            }, 1000);
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

// Mobile Hamburger Menu Toggle
(function() {
    var hamburger = document.getElementById('hamburger');
    var navMenu = document.querySelector('.nav-menu');
    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('open');
        document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a top-level link is clicked (non-dropdown)
    document.querySelectorAll('.nav-links > li > a').forEach(function(link) {
        link.addEventListener('click', function(e) {
            var parent = this.closest('li');
            var megaMenu = parent.querySelector('.mega-menu');
            if (megaMenu) {
                e.preventDefault();
                parent.classList.toggle('open');
            } else {
                hamburger.classList.remove('open');
                navMenu.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on resize to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 900) {
            hamburger.classList.remove('open');
            navMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
})();
