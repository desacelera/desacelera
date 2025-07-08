// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add initial styles for animation
    const animatedElements = document.querySelectorAll('.bonus-item, .thing-item, .testimonial-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add hover effects to purchase buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });

    // Add click effect to video placeholder
    const videoPlaceholder = document.querySelector('.video-thumbnail');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            // Simulate video play (you can replace this with actual video embed)
            this.style.background = 'linear-gradient(45deg, #2c3e50, #34495e)';
            this.innerHTML = '<div style="font-size: 24px; margin-bottom: 20px;">🎬</div><p>Video would play here</p>';
        });
    }

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add typing effect to main title
    const mainTitle = document.querySelector('.book-title h2');
    if (mainTitle) {
        const text = mainTitle.textContent;
        mainTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                mainTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 1000);
    }

    // Add counter animation for the badge
    const badge = document.querySelector('.copies-sold');
    if (badge) {
        let count = 0;
        const target = 25;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (count < target) {
                count += increment;
                badge.textContent = `OVER ${Math.floor(count)} MILLION COPIES SOLD`;
                setTimeout(updateCounter, 50);
            } else {
                badge.textContent = 'OVER 25 MILLION COPIES SOLD';
            }
        };
        
        // Start counter when badge is visible
        const badgeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    badgeObserver.unobserve(entry.target);
                }
            });
        });
        
        badgeObserver.observe(badge);
    }

    // Add floating animation to book image
    const bookImage = document.querySelector('.book-image img');
    if (bookImage) {
        let floatDirection = 1;
        let floatAmount = 0;
        
        const float = () => {
            floatAmount += floatDirection * 0.5;
            if (floatAmount > 10 || floatAmount < -10) {
                floatDirection *= -1;
            }
            bookImage.style.transform = `perspective(1000px) rotateY(-5deg) translateY(${floatAmount}px)`;
            requestAnimationFrame(float);
        };
        
        float();
    }

    // Add stagger animation to testimonials
    const testimonials = document.querySelectorAll('.testimonial-card');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.animationDelay = `${index * 0.1}s`;
    });

    // Add click tracking for purchase buttons (for analytics)
    const purchaseButtons = document.querySelectorAll('.btn');
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default for demo purposes
            e.preventDefault();
            
            // Add visual feedback
            this.style.background = '#2c3e50';
            this.textContent = 'Redirecting...';
            
            setTimeout(() => {
                this.style.background = '';
                this.textContent = this.getAttribute('data-original-text') || 'Purchase';
            }, 2000);
            
            // Here you would typically track the click event
            console.log(`Purchase button clicked: ${this.textContent}`);
        });
    });

    // Add scroll progress indicator
    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = scrollPercent + '%';
        });
    };
    
    createScrollIndicator();

    // Add easter egg - Konami code
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.length === konamiSequence.length && 
            konamiCode.every((code, index) => code === konamiSequence[index])) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
                document.head.removeChild(style);
            }, 5000);
        }
    });
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', () => {
    // Adjust hero content layout on resize
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && window.innerWidth <= 768) {
        heroContent.style.gridTemplateColumns = '1fr';
    } else if (heroContent) {
        heroContent.style.gridTemplateColumns = '1fr 2fr 1fr';
    }
});

// Performance optimization: Lazy load images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

