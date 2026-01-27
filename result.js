// Get elements
const exportBtn = document.getElementById('exportBtn');
const homeBtn = document.getElementById('homeBtn');
const metricCards = document.querySelectorAll('.metric-card-new');
const judgeCards = document.querySelectorAll('.judge-card-new');
const metricModal = document.getElementById('metricModal');
const judgeModal = document.getElementById('judgeModal');
const metricClose = document.getElementById('metricClose');
const judgeClose = document.getElementById('judgeClose');

// Metric details data
const metricDetails = {
    'code-quality': {
        title: 'Code Quality Assessment',
        detail: 'The project achieved a code quality score of 87%, demonstrating excellent performance. Key strengths include:\n\n1. Clear code structure with well-designed modularity\n2. Adherence to best practices and coding standards\n3. Test coverage exceeding 85%\n4. Comprehensive documentation with detailed comments\n5. High code reusability with low coupling\n\nImprovement suggestions:\n- Some complex functions could be further decomposed\n- Additional edge case testing could be beneficial'
    },
    'business-potential': {
        title: 'Business Potential Assessment',
        detail: 'The project scored 92% in business potential, indicating promising prospects. Key highlights include:\n\n1. Clear market demand with well-defined target audience\n2. Viable business model with clear monetization path\n3. Significant competitive advantages with accurate differentiation\n4. Strong scalability with high growth potential\n5. Excellent team background with strong execution capability\n\nMarket opportunity:\n- Target market size reaches $5 billion\n- Annual growth rate expected to exceed 30%'
    },
    'technical-innovation': {
        title: 'Technical Innovation Assessment',
        detail: 'The project achieved 85% in technical innovation, with outstanding innovative features. Key characteristics include:\n\n1. Adoption of latest technology stack and architectural patterns\n2. Novel algorithm design with excellent performance optimization\n3. Addresses industry pain points effectively\n4. High technical implementation difficulty creating clear barriers\n5. Technical leadership and forward-thinking approach\n\nInnovation highlights:\n- Proprietary distributed processing architecture\n- Innovative AI model training methodology'
    }
};

// Judge full comments data
const judgeComments = {
    'paul-graham': {
        name: 'Dr. Alex Chen',
        title: 'AI Research Lead',
        score: '85.82',
        avatar: 'images/avatar1.png',
        comment: 'This project demonstrates exceptional technical architecture and clear business logic. From an entrepreneurial perspective, the team shows deep market understanding with precise product positioning. Code quality exceeds average standards, particularly in user experience and performance optimization.\n\nI especially appreciate that the team considered scalability during the MVP stage, indicating long-term planning. The business model is clear with well-defined monetization paths, which is uncommon in early-stage projects.\n\nI recommend the team focus on user growth and market promotion in the next phase, as the technical foundation is already solid.'
    },
    'andrew-ng': {
        name: 'Dr. Sarah Kim',
        title: 'ML Systems Architect',
        score: '85.28',
        avatar: 'images/avatar2.png',
        comment: 'From a machine learning perspective, the algorithm design is remarkably sound. The model training process is well-structured, data processing pipeline is comprehensive, and feature engineering is meticulously executed.\n\nParticularly commendable is the team\'s extensive work on model interpretability, which is crucial for practical applications. Performance metrics also reach industry-leading levels.\n\nI suggest strengthening model deployment and monitoring to ensure production environment stability. Overall, this is a project with strong technical capabilities.'
    },
    'sam-altman': {
        name: 'Dr. Marcus Rivera',
        title: 'Innovation Director',
        score: '86.94',
        avatar: 'images/avatar3.png',
        comment: 'A project with transformative potential and solid technical implementation. From an innovation perspective, the project shows creativity in AI technology application, particularly in prompt engineering and model fine-tuning.\n\nThe team demonstrates excellent grasp of AGI era development trends, with product design considering future technological evolution. Business value is clear with well-timed market entry.\n\nI recommend maintaining technical leadership, continuously monitoring latest AI research developments, and rapidly applying cutting-edge technology to the product. This project has unicorn potential.'
    },
    'feifei-li': {
        name: 'Dr. Maya Patel',
        title: 'Computer Vision Expert',
        score: '86.53',
        avatar: 'images/avatar4.png',
        comment: 'The application prospects in computer vision are extensive, with excellent code quality. Dataset construction and annotation work are professionally executed, and model architecture design is well-reasoned.\n\nI particularly appreciate the team\'s efforts in data diversity and model generalization capability, which are crucial for practical applications. Evaluation metrics are comprehensive, and experimental design is rigorous.\n\nI suggest more exploration in cross-domain transfer learning, which would significantly expand the project\'s application scope. Overall, this is a project that successfully combines academic rigor with engineering excellence.'
    }
};

// Export button click
exportBtn.addEventListener('click', () => {
    alert('Evaluation report exported successfully! (Demo feature)');
});

// Home button click
homeBtn.addEventListener('click', () => {
    document.getElementById('resultContent').classList.add('slide-out');
    
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 500);
});

// Metric card click
metricCards.forEach(card => {
    card.addEventListener('click', () => {
        const metric = card.dataset.metric;
        const data = metricDetails[metric];
        document.getElementById('metricTitle').textContent = data.title;
        document.getElementById('metricDetail').textContent = data.detail;
        metricModal.style.display = 'block';
    });
});

// Judge card click
judgeCards.forEach(card => {
    card.addEventListener('click', () => {
        const judge = card.dataset.judge;
        const data = judgeComments[judge];
        document.getElementById('judgeModalAvatar').src = data.avatar;
        document.getElementById('judgeModalName').textContent = data.name;
        document.getElementById('judgeModalTitle').textContent = data.title;
        document.getElementById('judgeModalScore').textContent = 'Score: ' + data.score;
        document.getElementById('judgeModalComment').textContent = data.comment;
        judgeModal.style.display = 'block';
    });
});

// Close modals
metricClose.addEventListener('click', () => {
    metricModal.style.display = 'none';
});

judgeClose.addEventListener('click', () => {
    judgeModal.style.display = 'none';
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === metricModal) {
        metricModal.style.display = 'none';
    }
    if (e.target === judgeModal) {
        judgeModal.style.display = 'none';
    }
});

// Page transition animation on load
window.addEventListener('load', () => {
    document.getElementById('resultContent').classList.add('slide-in');
});
