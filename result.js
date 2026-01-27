// Get elements
const exportBtn = document.getElementById('exportBtn');
const homeBtn = document.getElementById('homeBtn');
const scoreCards = document.querySelectorAll('.score-card');
const judgeCards = document.querySelectorAll('.judge-card');
const metricModal = document.getElementById('metricModal');
const judgeModal = document.getElementById('judgeModal');
const metricClose = document.getElementById('metricClose');
const judgeClose = document.getElementById('judgeClose');

// Metric details data
const metricDetails = {
    'code-quality': {
        title: '代码质量评估',
        detail: '该项目的代码质量得分为87%，表现优秀。主要优势包括：\n\n1. 代码结构清晰，模块化设计良好\n2. 遵循最佳实践和编码规范\n3. 测试覆盖率达到85%以上\n4. 文档完善，注释详细\n5. 代码复用性高，耦合度低\n\n改进建议：\n- 部分复杂函数可以进一步拆分\n- 可以增加更多的边界情况测试'
    },
    'business-potential': {
        title: '商业潜力评估',
        detail: '该项目的商业潜力得分为92%，前景广阔。主要亮点包括：\n\n1. 市场需求明确，目标用户群体清晰\n2. 商业模式可行，变现路径明确\n3. 竞争优势显著，差异化定位准确\n4. 可扩展性强，增长潜力大\n5. 团队背景优秀，执行力强\n\n市场机会：\n- 目标市场规模达到50亿美元\n- 年增长率预计超过30%'
    },
    'technical-innovation': {
        title: '技术创新性评估',
        detail: '该项目的技术创新性得分为85%，创新点突出。主要特色包括：\n\n1. 采用了最新的技术栈和架构模式\n2. 算法设计新颖，性能优化出色\n3. 解决了行业痛点问题\n4. 技术实现难度较高，壁垒明显\n5. 具备技术领先性和前瞻性\n\n创新亮点：\n- 独创的分布式处理架构\n- 创新的AI模型训练方法'
    }
};

// Judge full comments data
const judgeComments = {
    'paul-graham': {
        name: 'Paul Graham',
        title: 'Y Combinator',
        score: '85.82',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Paul',
        comment: '这个项目展现了出色的技术架构和清晰的商业逻辑。从创业的角度来看，团队对市场的理解非常深刻，产品定位精准。代码质量达到了YC项目的平均水平以上，特别是在用户体验和性能优化方面做得很好。\n\n我特别欣赏团队在MVP阶段就考虑到了可扩展性，这说明他们有长远的规划。商业模式清晰，变现路径明确，这在早期项目中并不常见。\n\n建议团队在接下来的发展中，重点关注用户增长和市场推广，技术基础已经打得很扎实了。'
    },
    'andrew-ng': {
        name: 'Andrew Ng',
        title: 'Deeplearning.ai',
        score: '85.28',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andrew',
        comment: '从机器学习的角度来看，该项目的算法设计非常合理。模型训练流程规范，数据处理管道完善，特征工程做得很细致。\n\n特别值得称赞的是，团队在模型可解释性方面做了很多工作，这在实际应用中非常重要。性能指标也达到了行业领先水平。\n\n建议在模型部署和监控方面再加强一些，确保生产环境的稳定性。整体来说，这是一个技术实力很强的项目。'
    },
    'sam-altman': {
        name: 'Sam Altman',
        title: 'OpenAI',
        score: '86.94',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam',
        comment: '这是一个具有变革潜力的项目，技术实现扎实。从OpenAI的视角来看，项目在AI技术的应用上很有创新性，特别是在提示工程和模型微调方面。\n\n团队对AGI时代的发展趋势有很好的把握，产品设计考虑到了未来的技术演进。商业价值明确，市场时机把握得很好。\n\n建议团队保持技术领先性，持续关注最新的AI研究进展，将前沿技术快速应用到产品中。这个项目有成为独角兽的潜力。'
    },
    'feifei-li': {
        name: 'Feifei Li',
        title: 'ImageNet',
        score: '86.53',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Feifei',
        comment: '项目在计算机视觉领域的应用前景广阔，代码质量优秀。数据集的构建和标注工作做得很专业，模型架构设计合理。\n\n我特别欣赏团队在数据多样性和模型泛化能力方面的努力，这对于实际应用至关重要。评估指标全面，实验设计严谨。\n\n建议在跨领域迁移学习方面做更多探索，这将大大提升项目的应用范围。整体来说，这是一个学术和工程结合得很好的项目。'
    }
};

// Export button click
exportBtn.addEventListener('click', () => {
    alert('评估结果已导出！（演示功能）');
});

// Home button click
homeBtn.addEventListener('click', () => {
    window.location.href = 'home.html';
});

// Score card click
scoreCards.forEach(card => {
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
        document.getElementById('judgeModalScore').textContent = '评分: ' + data.score;
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
