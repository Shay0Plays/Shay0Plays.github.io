window.addEventListener('DOMContentLoaded', function() {
    const splash = document.getElementById('splash');
    const video = document.getElementById('splash-video');

    // Hide splash after video ends, or after 5 seconds as fallback
    video.addEventListener('ended', () => {
        splash.classList.add('hide');
    });

    setTimeout(() => {
        splash.classList.add('hide');
    }, 5000);
});