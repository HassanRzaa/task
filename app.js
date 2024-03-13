window.addEventListener('scroll', function() {
    let navbar = document.getElementById('row1');

    if (window.scrollY > 0) {
        navbar.style.position = 'fixed';
        navbar.style.top = '30px';
    } else {
        navbar.style.position = 'static';
    }
});
function startTimer() {
    let startTime = Date.now();
    let timerContainers = document.querySelectorAll('.timer-container');
    let interval = setInterval(updateTimer, 1000);

    function updateTimer() {
        let currentTime = Date.now();
        let timeDiff = currentTime - startTime;

        let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = formatTime(days);
        document.getElementById('hours').innerText = formatTime(hours);
        document.getElementById('minutes').innerText = formatTime(minutes);
        document.getElementById('seconds').innerText = formatTime(seconds);
    }

    function formatTime(time) {
        return time < 10 ? "0" + time : time;
    }

    // Reset timer on page refresh
    window.addEventListener('beforeunload', function() {
        clearInterval(interval);
        localStorage.setItem('startTime', startTime);
    });
}

// Check if timer was already running
let storedStartTime = localStorage.getItem('startTime');
if (storedStartTime) {
    let lastStartTime = parseInt(storedStartTime);
    let currentTime = Date.now();
    let timeDiff = currentTime - lastStartTime;
    
    // If timer was running for less than a day, start from stored time
    if (timeDiff < 1000 * 60 * 60 * 24) {
        startTimer();
    } else {
        localStorage.removeItem('startTime'); // Clear stored start time
        startTimer(); // Start new timer
    }
} else {
    startTimer(); // Start new timer
}