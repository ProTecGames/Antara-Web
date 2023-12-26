document.addEventListener('DOMContentLoaded', function () {
    // Set the duration for the splash screen in milliseconds (e.g., 3000ms for 3 seconds)
    const splashDuration = 3000;

    // Wait for the specified duration and then redirect to home.html
    setTimeout(function () {
        window.location.href = 'antara-web/home/';
    }, splashDuration);

    // Add event listener for hover effect on the text
    const splashScreen = document.querySelector('.splash-screen p');
    splashScreen.addEventListener('mouseenter', function () {
        splashScreen.style.color = '#ff4500'; // Change text color on hover
    });

    splashScreen.addEventListener('mouseleave', function () {
        splashScreen.style.color = '#333'; // Reset text color when not hovering
    });
});
