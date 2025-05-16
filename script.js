window.addEventListener('DOMContentLoaded', function() {
    const splash = document.getElementById('splash');
    const quoteSpan = document.getElementById('splash-quote');
    const quotes = [
        "Anyone can love a rose, but it takes a great deal to love a leaf. It’s ordinary to love the beautiful, but it’s beautiful to love the ordinary.",
        "Wise men speak because they have something to say; Fools speak because they have to say something.",
        "It's not what happens to you, but how you react to it that matters.",
        "Lust will cause a man to want something, even if he has everything",
        "Never argue with an idiot. He will drag you down to his level and beat you with experience.",
    ];

    // Pick a random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteSpan.textContent = randomQuote;

    // Hide splash after 2.5 seconds or on click
    setTimeout(() => {
        splash.classList.add('hide');
    }, 2500);

    splash.addEventListener('click', () => {
        splash.classList.add('hide');
    });
});

window.addEventListener('DOMContentLoaded', function() {
    // Social Modal Logic
    const socialBtn = document.getElementById('social-btn');
    const socialModal = document.getElementById('social-modal');
    const closeModal = document.getElementById('close-modal');

    if (socialBtn && socialModal && closeModal) {
        socialBtn.addEventListener('click', function(e) {
            e.preventDefault();
            socialModal.classList.add('show');
        });
        closeModal.addEventListener('click', function() {
            socialModal.classList.remove('show');
        });
        // Optional: close modal when clicking outside content
        socialModal.addEventListener('click', function(e) {
            if (e.target === socialModal) {
                socialModal.classList.remove('show');
            }
        });
    }
});