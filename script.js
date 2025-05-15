window.addEventListener('DOMContentLoaded', function() {
    const splash = document.getElementById('splash');
    const quoteSpan = document.getElementById('splash-quote');
    const quotes = [
        "Anyone can love a rose, but it takes a great deal to love a leaf. It’s ordinary to love the beautiful, but it’s beautiful to love the ordinary.",
        "Wise men speak because they have something to say; Fools speak because they have to say something."
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