window.addEventListener('DOMContentLoaded', function() {
    const splash = document.getElementById('splash');
    const video = document.getElementById('splash-video');

    // Hide splash after video ends
    video.addEventListener('ended', () => {
        splash.classList.add('hide');
    });
});