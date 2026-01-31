// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // If scrolling to loading section, start the loading animation
        if (sectionId === 'loading') {
            setTimeout(() => {
                startLoadingAnimation();
            }, 500);
        }
    }
}

// Loading Animation
let loadingStarted = false;

function startLoadingAnimation() {
    if (loadingStarted) return;
    loadingStarted = true;
    
    const progressBar = document.getElementById('progressBar');
    const duration = 10000; // 10 seconds
    const startTime = Date.now();
    
    // Progress bar animation
    const progressInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min((elapsed / duration) * 100, 100);
        progressBar.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            // Auto scroll to results after completion
            setTimeout(() => {
                scrollToSection('results');
                loadingStarted = false; // Reset for next time
            }, 500);
        }
    }, 50);
    
    // Stream 1 animation (starts from index 2)
    const stream1Items = document.querySelectorAll('#stream1 .stream-item');
    const stream1Start = 2;
    const stream1Interval = 10000 / (stream1Items.length - stream1Start); // Distribute over 10 seconds
    
    stream1Items.forEach((item, index) => {
        if (index >= stream1Start) {
            setTimeout(() => {
                item.classList.remove('pending');
                item.classList.add('completed');
                item.textContent = item.textContent.replace('○', '✓');
            }, (index - stream1Start) * stream1Interval);
        }
    });
    
    // Stream 2 animation (starts from index 4)
    const stream2Items = document.querySelectorAll('#stream2 .stream-item');
    const stream2Start = 4;
    const stream2Interval = 10000 / (stream2Items.length - stream2Start);
    
    stream2Items.forEach((item, index) => {
        if (index >= stream2Start) {
            setTimeout(() => {
                item.classList.remove('pending');
                item.classList.add('completed');
                item.textContent = item.textContent.replace('○', '✓');
            }, (index - stream2Start) * stream2Interval);
        }
    });
    
    // Stream 3 animation (starts from index 2)
    const stream3Items = document.querySelectorAll('#stream3 .stream-item');
    const stream3Start = 2;
    const stream3Interval = 10000 / (stream3Items.length - stream3Start);
    
    stream3Items.forEach((item, index) => {
        if (index >= stream3Start) {
            setTimeout(() => {
                item.classList.remove('pending');
                item.classList.add('completed');
                item.textContent = item.textContent.replace('○', '✓');
            }, (index - stream3Start) * stream3Interval);
        }
    });
}

// File Upload Modal
function openFileUpload() {
    const modal = document.getElementById('uploadModal');
    modal.style.display = 'flex';
}

function handleFileUpload() {
    const fileInput = document.getElementById('modalFileInput');
    if (fileInput.files.length > 0) {
        const fileName = fileInput.files[0].name;
        alert(`File "${fileName}" uploaded successfully!`);
        closeModal('uploadModal');
    } else {
        alert('Please select a file first.');
    }
}

// Score Detail Modal
function showScoreDetail(type) {
    const modal = document.getElementById('scoreModal');
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    const details = {
        code: {
            title: '💻 Code Quality - 87%',
            content: 'This project demonstrates exceptional code quality with well-structured architecture, comprehensive test coverage, and adherence to best practices. The codebase is maintainable, scalable, and follows industry standards. Key strengths include: clean code principles, effective error handling, comprehensive documentation, and efficient algorithms. Areas for improvement include: increasing test coverage in edge cases and optimizing some database queries.'
        },
        business: {
            title: '💼 Business Potential - 78%',
            content: 'The project shows strong business potential with a clear value proposition and market fit. The solution addresses a real pain point in the industry and has a viable monetization strategy. Key strengths include: large target market, competitive advantages, scalable business model, and strong user demand. Areas for improvement include: clearer go-to-market strategy, more detailed financial projections, and stronger competitive analysis.'
        },
        innovation: {
            title: '🚀 Technical Innovation - 85%',
            content: 'This project showcases impressive technical innovation with novel approaches to solving complex problems. The implementation leverages cutting-edge technologies and demonstrates creative problem-solving. Key strengths include: innovative algorithms, unique architecture patterns, effective use of modern frameworks, and forward-thinking design. Areas for improvement include: more extensive performance benchmarking and exploration of additional optimization techniques.'
        }
    };
    
    title.textContent = details[type].title;
    content.textContent = details[type].content;
    modal.style.display = 'flex';
}

// Judge Review Modal
function showJudgeReview(judgeId) {
    const modal = document.getElementById('judgeModal');
    const title = document.getElementById('judgeModalTitle');
    const content = document.getElementById('judgeModalContent');
    
    const reviews = {
        1: {
            title: 'Dr. James Chen - Senior Investment Director',
            content: 'This project demonstrates exceptional code architecture and scalability potential. The technical foundation is solid, with well-thought-out design patterns and clean code practices. From an investment perspective, I see strong potential for growth and market adoption. The team has clearly put significant effort into building a robust and maintainable system. I particularly appreciate the attention to detail in the documentation and the comprehensive test coverage. My score of 85.82 reflects the high quality of the technical execution combined with the promising business outlook. I would recommend this project for further consideration and potential funding.'
        },
        2: {
            title: 'Dr. Emily Roberts - Tech Innovation Advisor',
            content: 'The technical innovation shown here is remarkable, particularly in how the team has approached solving complex problems with elegant solutions. The use of modern frameworks and cutting-edge technologies demonstrates a forward-thinking mindset. I am impressed by the creative approaches to performance optimization and the innovative architecture patterns employed. The project shows great promise in pushing the boundaries of what is currently possible in this space. My score of 85.28 reflects the strong innovation factor, though there is room for even more ambitious technical exploration. Overall, this is a project that stands out for its technical creativity and innovation.'
        },
        3: {
            title: 'Dr. Marcus Johnson - Business Strategy Expert',
            content: 'From a business perspective, this project has strong market potential and a clear value proposition. The solution addresses a genuine pain point in the industry, and the team has demonstrated a solid understanding of their target market. The business model is scalable and has multiple revenue streams, which is encouraging from an investment standpoint. I particularly appreciate the thorough market research and competitive analysis that has gone into the project. My score of 86.94 is the highest among the judges, reflecting my confidence in the business viability and growth potential. With the right execution and go-to-market strategy, this project could become a significant player in its market segment.'
        },
        4: {
            title: 'Dr. Priya Sharma - AI Systems Architect',
            content: 'The AI implementation is sophisticated and well-designed, showing a deep understanding of machine learning principles and best practices. The system architecture is robust and scalable, with careful consideration given to data pipelines and model deployment. I am particularly impressed by the attention to AI ethics and responsible AI practices, which are often overlooked in early-stage projects. The use of state-of-the-art models and techniques demonstrates technical excellence. My score of 86.53 reflects the high quality of the AI implementation and the thoughtful approach to system design. There are opportunities to further optimize model performance and explore additional AI capabilities, but overall this is a strong technical foundation for an AI-powered solution.'
        }
    };
    
    title.textContent = reviews[judgeId].title;
    content.textContent = reviews[judgeId].content;
    modal.style.display = 'flex';
}

// Close Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('SAGE website loaded successfully!');
});
