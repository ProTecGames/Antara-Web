document.addEventListener('DOMContentLoaded', function () {
    // Set the duration for the splash screen in milliseconds (e.g., 3000ms for 3 seconds)
    const splashDuration = 3000;

    // Wait for the specified duration and then redirect to home.html
    setTimeout(function () {
        window.location.href = 'home.html';
    }, splashDuration);
});
