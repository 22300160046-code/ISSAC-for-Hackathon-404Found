// Get elements
const diagram1 = document.getElementById('diagram1');
const diagram2 = document.getElementById('diagram2');
const imageModal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const analyzeBtn = document.getElementById('analyzeBtn');
const attachBtn = document.getElementById('attachBtn');
const uploadModal = document.getElementById('uploadModal');
const uploadClose = document.getElementById('uploadClose');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const closeButtons = document.querySelectorAll('.close');

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
    // Add transition animation
    document.getElementById('homeContent').classList.add('slide-out');
    
    setTimeout(() => {
        window.location.href = 'loading.html';
    }, 500);
});

// Open upload modal when attach button is clicked
attachBtn.addEventListener('click', () => {
    uploadModal.style.display = 'block';
});

// Click upload area to trigger file input
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Handle file selection
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        fileName.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        fileInfo.style.display = 'block';
        
        // Auto close modal after 2 seconds
        setTimeout(() => {
            uploadModal.style.display = 'none';
            fileInfo.style.display = 'none';
        }, 2000);
    }
});

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#52C41A';
    uploadArea.style.background = 'rgba(82, 196, 26, 0.05)';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#444';
    uploadArea.style.background = 'transparent';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#444';
    uploadArea.style.background = 'transparent';
    
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.doc') || file.name.endsWith('.txt'))) {
        fileName.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
        fileInfo.style.display = 'block';
        
        setTimeout(() => {
            uploadModal.style.display = 'none';
            fileInfo.style.display = 'none';
        }, 2000);
    }
});

// Close modals when X is clicked
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        imageModal.style.display = 'none';
        uploadModal.style.display = 'none';
    });
});

uploadClose.addEventListener('click', () => {
    uploadModal.style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = 'none';
    }
    if (e.target === uploadModal) {
        uploadModal.style.display = 'none';
    }
});

// Page transition animation on load
window.addEventListener('load', () => {
    document.getElementById('homeContent').classList.add('slide-in');
});
