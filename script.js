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
        // Letter-by-letter animation
        quoteSpan.textContent = "";
        let i = 0;
        function typeLetter() {
            if (i <= randomQuote.length) {
                quoteSpan.textContent = randomQuote.slice(0, i);
                i++;
                setTimeout(typeLetter, 18); // Adjust speed here (ms per letter)
            }
        }
        typeLetter();
    }
    if (splash) {
        setTimeout(() => splash.classList.add('hide'), 2500 + (quoteSpan ? quotes[0].length * 18 : 0));
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

    // --- Age animation on About tab click ---
    let ageAnimated = false;
    const ageSpan = document.getElementById("age");
    const aboutLink = document.querySelector('.navbar a[data-section="about"]');
    if (aboutLink && ageSpan) {
        aboutLink.addEventListener('click', function() {
            if (!ageAnimated) {
                const age = calculateAge("2009-12-02"); // <-- your birthdate
                animateAge(age, ageSpan);
                ageAnimated = true;
            }
        });
    }
});

// Copy theme link function
function copyThemeLink(id) {
    const code = document.getElementById(id).innerText;
    navigator.clipboard.writeText(code);
}

function calculateAge(birthDateString) {
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getIndefiniteArticle(number) {
    // Use "an" if the age starts with 8 or 11, 18, etc. (for "eight", "eighteen", "eleven")
    const ageStr = number.toString();
    const firstDigit = ageStr[0];
    if (
        ageStr === "11" ||
        ageStr === "18" ||
        firstDigit === "8"
    ) {
        return "an";
    }
    return "a";
}

function animateAge(targetAge, element) {
    let current = 1;
    const article = getIndefiniteArticle(targetAge);
    // Only unique, playful, or decorative fonts
    const fonts = [
        "'Comic Sans MS', cursive, sans-serif",
        "'Impact', fantasy, sans-serif",
        "'Papyrus', fantasy, sans-serif",
        "'Brush Script MT', cursive, sans-serif",
        "'Copperplate', fantasy, serif",
        "'Bangers', cursive, sans-serif",
        "'Orbitron', sans-serif",
        "'Permanent Marker', cursive, sans-serif",
        "'Press Start 2P', cursive, monospace",
        "'Creepster', cursive, sans-serif",
        "'Lobster', cursive, sans-serif",
        "'Figtree', sans-serif"
    ];

    // Inject CSS for smooth transitions if not already present
    if (!document.getElementById('age-slide-style')) {
        const style = document.createElement('style');
        style.id = 'age-slide-style';
        style.textContent = `
            .age-slide {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                overflow: hidden;
                width: 8em;
                position: relative;
                padding: 0 2em;
            }
            .age-slide-inner {
                display: flex;
                flex-direction: row;
                align-items: center;
            }
            .age-number {
                transition: 
                    font-size 0.35s cubic-bezier(.4,1.4,.6,1),
                    opacity 0.35s cubic-bezier(.4,1.4,.6,1),
                    filter 0.35s cubic-bezier(.4,1.4,.6,1),
                    font-family 0.35s cubic-bezier(.4,1.4,.6,1),
                    color 0.35s cubic-bezier(.4,1.4,.6,1);
            }
        `;
        document.head.appendChild(style);
    }

    function getRandomFont(excludeFont) {
        let font;
        do {
            font = fonts[Math.floor(Math.random() * (fonts.length - 1))];
        } while (font === excludeFont);
        return font;
    }

    function step() {
        // Only show previous, current, and next number (no sliding)
        let numbersHtml = '';
        for (let i = current - 1; i <= current + 1; i++) {
            if (i < 1 || i > targetAge + 1) continue;
            let style = "min-width:1.5em;text-align:center;";
            if (i === current) {
                let centerFont = (current === targetAge) ? fonts[fonts.length - 1] : fonts[Math.floor(Math.random() * (fonts.length - 1))];
                style += `font-family:${centerFont};z-index:2;`;
            } else {
                style += `font-size:2em;opacity:0.5;filter:blur(2px);font-family:${getRandomFont(fonts[fonts.length - 1])};z-index:1;`;
            }
            numbersHtml += `<span class="age-number" style="${style}">${i}</span>`;
        }

        element.innerHTML = `
            ${article}<br>
            <div class="age-slide">
                <div class="age-slide-inner">
                    ${numbersHtml}
                </div>
            </div>
        `;

        if (current < targetAge) {
            current++;
            const progress = current / targetAge;
            const minDelay = 25;
            const maxDelay = 250;
            const delay = minDelay + (maxDelay - minDelay) * progress;
            setTimeout(step, delay);
        } else {
            // Final state: show targetAge centered, targetAge+1 on right, both in normal font
            let finalHtml = '';
            for (let i = targetAge - 1; i <= targetAge + 1; i++) {
                if (i < 1 || i > targetAge + 1) continue;
                let style = "min-width:1.5em;text-align:center;";
                if (i === targetAge) {
                    style += `font-family:${fonts[fonts.length - 1]};z-index:2;`;
                } else {
                    style += `font-size:2em;opacity:0.5;filter:blur(2px);font-family:${getRandomFont(fonts[fonts.length - 1])};z-index:1;`;
                }
                finalHtml += `<span class="age-number" style="${style}">${i}</span>`;
            }
            element.innerHTML = `
                ${article}<br>
                <div class="age-slide">
                    <div class="age-slide-inner">
                        ${finalHtml}
                    </div>
                </div>
            `;
        }
    }
    step();
}