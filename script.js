 <script>
    {/* Mobile menu toggle */}
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        {/*  Smooth scrolling for navigation links */}
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    navLinks.classList.remove('active');
                }
            });
        });

        {/* // Header background on scroll */}
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
{/* 
        // Form submission */}
        {/* document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simulate form submission
            alert(`Thank you, ${name}! Your message regarding "${subject}" has been received. I'll get back to you soon at ${email}.`);
            
            // Reset form
            this.reset();
        }); */}

        // Add scroll-triggered animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.skill-card, .publication-item, .education-item, .experience-card, .highlight-card, .metric-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px)';
            observer.observe(el);
        });

        {/* Counter animation for metrics */}
        function animateCounters() {
            const counters = document.querySelectorAll('.metric-number');
            
            counters.forEach(counter => {
                const target = counter.textContent;
                const isPercentage = target.includes('%');
                const isKW = target.includes('kW');
                const isPlus = target.includes('+');
                
                let numericTarget = parseInt(target.replace(/[^\d]/g, ''));
                let current = 0;
                
                const increment = numericTarget / 50;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericTarget) {
                        current = numericTarget;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(current);
                    if (isPercentage) displayValue += '%';
                    if (isKW) displayValue += 'kW';
                    if (isPlus) displayValue += '+';
                    
                    counter.textContent = displayValue;
                }, 50);
            });
        }

        // Trigger counter animation when metrics section is visible
        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    metricsObserver.unobserve(entry.target);
                }
            });
        });

        const metricsSection = document.querySelector('.research-metrics');
        if (metricsSection) {
            metricsObserver.observe(metricsSection);
        }

        // Typing animation for hero subtitle
        function typeWriter(element, text, speed = 50) {
            let i = 0;
            element.innerHTML = '';
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        // Initialize typing animation after page load
        window.addEventListener('load', () => {
            const heroSubtitle = document.querySelector('.hero .subtitle');
            if (heroSubtitle) {
                const originalText = heroSubtitle.textContent;
                setTimeout(() => {
                    typeWriter(heroSubtitle, originalText, 100);
                }, 1000);
            }
        });