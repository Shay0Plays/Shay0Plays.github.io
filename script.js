window.addEventListener('DOMContentLoaded', function() {
    // Splash logic (your existing code)
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
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteSpan.textContent = randomQuote;
    setTimeout(() => splash.classList.add('hide'), 2500);
    splash.addEventListener('click', () => splash.classList.add('hide'));

    // Page navigation logic with slide animation
    const navLinks = document.querySelectorAll('.navbar a[data-section]');
    const sections = document.querySelectorAll('.page-section');
    let currentSection = document.querySelector('.page-section.active');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);

            if (targetSection === currentSection) return;

            // Determine direction
            const sectionOrder = Array.from(sections);
            const currentIdx = sectionOrder.indexOf(currentSection);
            const targetIdx = sectionOrder.indexOf(targetSection);
            const slideOutClass = targetIdx > currentIdx ? 'slide-out-left' : 'slide-out-right';
            const slideInClass = targetIdx > currentIdx ? 'slide-in-right' : 'slide-in-left';

            // Slide out current
            currentSection.classList.remove('active');
            currentSection.classList.add(slideOutClass);

            // Slide in target
            targetSection.classList.add(slideInClass, 'active');

            // After animation, clean up classes
            setTimeout(() => {
                currentSection.classList.remove(slideOutClass);
                targetSection.classList.remove(slideInClass);
                currentSection = targetSection;
            }, 500);
        });
    });
});
function copyThemeLink(id) {
  const code = document.getElementById(id).innerText;
  navigator.clipboard.writeText(code);
}