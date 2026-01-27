// Get elements
const diagram1 = document.getElementById('diagram1');
const diagram2 = document.getElementById('diagram2');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const analyzeModal = document.getElementById('analyzeModal');
const closeButtons = document.querySelectorAll('.close');
const analyzeClose = document.getElementById('analyzeClose');

// Open image modal when diagram is clicked
diagram1.addEventListener('click', () => {
    imageModal.style.display = 'block';
    modalImage.src = 'images/diagram1.png';
});

diagram2.addEventListener('click', () => {
    imageModal.style.display = 'block';
    modalImage.src = 'images/diagram2.jpg';
});

// Open analyze modal when analyze button is clicked
analyzeBtn.addEventListener('click', () => {
    analyzeModal.style.display = 'block';
});

// Close modals when X is clicked
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        imageModal.style.display = 'none';
        analyzeModal.style.display = 'none';
    });
});

// Close analyze modal specifically
analyzeClose.addEventListener('click', () => {
    analyzeModal.style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
    }
    if (e.target === analyzeModal) {
        analyzeModal.style.display = 'none';
    }
});
