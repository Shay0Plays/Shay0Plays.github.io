window.addEventListener('DOMContentLoaded', function() {
    // Splash logic
    const splash = document.getElementById('splash');
    const quoteSpan = document.getElementById('splash-quote');
    const quotes = [
        "Anyone can love a rose, but it takes a great deal to love a leaf. It’s ordinary to love the beautiful, but it’s beautiful to love the ordinary.",
        "Wise men speak because they have something to say; Fools speak because they have to say something.",
        "It's not what happens to you, but how you react to it that matters.",
        "Lust will cause a man to want something, even if he has everything",
        "Never argue with an idiot. He will drag you down to his level and beat you with experience.",
        "All truths are easy to understand once they are discovered; the point is to discover them.",
    ];
    if (quoteSpan) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteSpan.textContent = randomQuote;
    }
    if (splash) {
        setTimeout(() => splash.classList.add('hide'), 2500);
        splash.addEventListener('click', () => splash.classList.add('hide'));
    }

    // Navigation logic
    const navLinks = document.querySelectorAll('.navbar a[data-section]');
    const sections = document.querySelectorAll('.page-section');
    let currentSection = document.querySelector('.page-section.active');
    let isAnimating = false;

    function centerActiveNav() {
        const navbar = document.querySelector('.navbar');
        const navbarUl = navbar.querySelector('ul');
        const activeLink = navbarUl.querySelector('a.active');
        if (activeLink && navbar && navbarUl) {
            const navbarWidth = navbar.offsetWidth;
            const linkLeft = activeLink.offsetLeft;
            const linkWidth = activeLink.offsetWidth;
            const linkCenter = linkLeft + linkWidth / 2;
            const shift = navbarWidth / 2 - linkCenter;
            navbarUl.style.transition = "transform 0.4s cubic-bezier(.4,1.4,.6,1)";
            navbarUl.style.transform = `translateX(${shift}px)`;
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            if (isAnimating) return;

            // Remove active from all links and add to this one
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            centerActiveNav(); // Animate navbar immediately

            // Section switching
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            if (!targetSection || targetSection === currentSection) {
                return;
            }

            isAnimating = true;

            // Slide animation
            const sectionOrder = Array.from(sections);
            const currentIdx = sectionOrder.indexOf(currentSection);
            const targetIdx = sectionOrder.indexOf(targetSection);
            const slideOutClass = targetIdx > currentIdx ? 'slide-out-left' : 'slide-out-right';
            const slideInClass = targetIdx > currentIdx ? 'slide-in-right' : 'slide-in-left';

            currentSection.classList.remove('active');
            currentSection.classList.add(slideOutClass);
            targetSection.classList.add(slideInClass, 'active');

            setTimeout(() => {
                currentSection.classList.remove(slideOutClass);
                targetSection.classList.remove(slideInClass);
                currentSection = targetSection;
                isAnimating = false;
            }, 500);
        });
    });

    // Center on load and resize
    centerActiveNav();
    window.addEventListener('resize', centerActiveNav);

    // Card tilt effect for textbook covers (only when hovering the image, not the text)
    document.querySelectorAll('.cover-img-wrap').forEach(wrap => {
        const img = wrap.querySelector('.cover-img');
        if (!img) return;

        wrap.addEventListener('mousemove', e => {
            const rect = wrap.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            const maxTilt = 18;
            const tiltX = maxTilt * percentY * -1;
            const tiltY = maxTilt * percentX;

            img.style.transform = `translateX(-10px) rotateY(${tiltY}deg) rotateX(${tiltX}deg) scale(1.04)`;
            img.style.filter = "";
        });

        wrap.addEventListener('mouseleave', () => {
            img.style.transform = "";
            img.style.filter = "";
        });
    });
});

// Copy theme link function
function copyThemeLink(id) {
    const code = document.getElementById(id).innerText;
    navigator.clipboard.writeText(code);
}