const hourElement = document.getElementById('hour');
const minuteElement = document.getElementById('minute');
const secondElement = document.getElementById('second');
const ampmElement = document.getElementById('ampm');
const fullDateElement = document.getElementById('fullDate');
const dayOfYearElement = document.getElementById('dayOfYear');
const timezoneElement = document.getElementById('timezone');
const themeToggle = document.getElementById('themeToggle');

// Format time with leading zeros
const formatTime = (time) => (time < 10 ? '0' : '') + time;

// Get day of year
const getDayOfYear = (date) => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
};

// Update the clock display
function updateClock() {
    const now = new Date();

    // Get time components
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Update time display
    hourElement.textContent = formatTime(hours);
    minuteElement.textContent = formatTime(minutes);
    secondElement.textContent = formatTime(seconds);
    ampmElement.textContent = ampm;

    // Add animation to seconds
    secondElement.classList.add('updating');
    setTimeout(() => secondElement.classList.remove('updating'), 500);

    // Update date display
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    fullDateElement.textContent = now.toLocaleDateString('en-US', options);

    // Update day of year
    dayOfYearElement.textContent = formatTime(getDayOfYear(now));

    // Update timezone
    timezoneElement.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Toggle between light and dark mode
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    // Save preference to localStorage
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// Initialize theme from localStorage or system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    }
}

// Initialize and update clock every second
function initClock() {
    initTheme();
    updateClock();
    setInterval(updateClock, 1000);
}

// Event listeners
themeToggle.addEventListener('change', toggleTheme);

// Initialize clock when page loads
window.addEventListener('DOMContentLoaded', initClock);
