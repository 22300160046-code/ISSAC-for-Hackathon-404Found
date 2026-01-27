// Get modal element
const modal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.querySelector('.close');
const nextBtn = document.getElementById('nextBtn');

// Open modal when login button is clicked
loginBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Navigate to home page when next button is clicked
nextBtn.addEventListener('click', () => {
    window.location.href = 'home.html';
});
