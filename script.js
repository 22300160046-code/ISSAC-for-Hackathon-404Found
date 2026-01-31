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
        },
        social: {
            title: '🌍 Social Impact - 82%',
            content: 'This project demonstrates significant potential for positive social impact by democratizing access to time-series prediction technology. ChronoML empowers developers, researchers, and organizations across various sectors to leverage advanced forecasting capabilities without requiring deep expertise. Key social benefits include: enabling better decision-making in healthcare, environmental monitoring, and public resource allocation; reducing barriers to AI adoption for underserved communities; promoting open-source collaboration and knowledge sharing; and supporting sustainable development goals through improved predictive analytics. The project shows strong commitment to accessibility, ethical AI practices, and creating tools that serve the broader public good.'
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
            title: 'Jensen Huang - CEO of NVIDIA',
            content: `ChronoML 这个项目让我看到了新一轮"AI工业革命"的缩影。时序数据是物理世界和数字世界的交汇点,从工厂的传感器数据流,到自动驾驶汽车的轨迹预测,再到整个电网的负载平衡,本质上都是大规模的时序问题。ChronoML 不仅仅是一个算法库,它更像是一个面向未来的"时序数据操作系统"的雏形。

我尤其欣赏这个项目在架构设计上的前瞻性。它没有满足于单机运行,而是从一开始就考虑了分布式计算和并行处理。这意味着当数据规模从GB扩展到TB甚至PB级别时,ChronoML 的核心架构依然能够从容应对。这种'全栈加速'(Full-Stack Acceleration)的思维至关重要。我可以看到,未来 ChronoML 可以无缝地集成到CUDA和TensorRT这样的加速计算平台中,在数据中心级别为海量的时序任务提供前所未有的处理能力。想象一下,当成千上万个物联网设备产生的数据洪流,能够被一个统一的、高效的平台实时分析和预测,这将催生出我们今天难以想象的'数字孪生'(Digital Twin)应用。

对于下一步的发展,我建议团队将目光投向更宏大的场景。不要只把自己看作一个模型工具,而要将 ChronoML 定位为一个'平台'。构建一个强大的生态系统,开放API,让第三方开发者可以轻松地将他们的专用模型、数据源甚至硬件解决方案集成进来。一个成功的平台,胜利不取决于自己做了什么,而取决于赋能了多少人去做他们想做的事。

ChronoML 团队拥有正确的基因:他们不仅懂算法,更懂系统和规模化。这个项目正在构建的,是未来AI基础设施中不可或缺的一块基石。继续加速,未来可期。`
        },
        2: {
            title: 'Fei-Fei Li - Stanford AI Lab Director',
            content: `看到 ChronoML 这个项目,我感到非常欣慰。它体现了AI技术发展的核心方向之一:从'感知智能'走向'认知与决策智能'。时序数据不仅仅是冰冷的数字,它背后记录的是真实世界中每一个个体、每一个系统的行为与脉搏。ChronoML 正在努力解读这些脉搏,并赋予我们预测未来的能力,这其中蕴含着巨大的、以人为本的潜力。

这个项目最打动我的一点,是它致力于降低AI应用的门槛。正如我们在ImageNet项目上所做的那样,一个标准化的、高质量的工具集,对于推动整个领域的科学研究和应用落地至关重要。ChronoML 通过自动化的模型选择和特征工程,让AI不再是少数顶尖专家的专利。我能想象,一位年轻的流行病学家,可以利用 ChronoML 快速构建传染病传播模型;一位城市规划者,可以用它来预测交通流量,优化公共资源。这种赋能,正是技术服务于人类福祉的最佳体现。

在肯定其价值的同时,我也想从一个'以人为本的AI'(Human-Centered AI)的视角,提出几点思考和建议:关注数据中的偏见与公平性。时序数据同样存在偏见。例如,来自不同地区、不同人群的医疗数据可能存在巨大的差异。我希望 ChronoML 在未来的版本中,能够加入对数据偏见的检测和修正工具,确保模型做出的预测对于每一个群体都是公平和可靠的。这不仅仅是技术问题,更是深刻的伦理问题。

ChronoML 团队的工作,让我看到了AI技术在解决现实世界复杂问题上的巨大潜力。我希望你们在追求技术卓越的同时,永远不要忘记技术背后的人。继续保持这份初心,你们的工作将为社会带来不可估量的积极影响。`
        },
        3: {
            title: 'Andrew Ng - AI Pioneer & Educator',
            content: `首先,ChronoML 团队在解决一个非常重要且普遍存在的问题——时序数据预测的自动化。从金融市场的波动到供应链的需求管理,再到流行病的传播预测,时序分析是连接数据与现实世界决策的关键桥梁。这个项目选择了一个极具价值的赛道,这本身就值得赞赏。

我看到项目中一个非常出色的地方,在于它对 '模型集成' (Model Ensembling) 和 '特征工程自动化' (Automated Feature Engineering) 的处理方式。很多时候,一个项目的成功并不取决于发明一个全新的、最复杂的算法,而在于如何巧妙地将现有成熟的技术系统化、流程化,从而大幅降低应用门槛。ChronoML 正是这样做的。它不仅集成了从ARIMA到LSTM等多种经典模型,更重要的是,它构建了一套智能化的特征提取流水线。这让那些不具备深厚领域知识的开发者,也能够快速上手并获得一个相当不错的基准模型(Baseline Model)。这正是技术民主化的体现,也是AI工程化的核心价值所在——让强大的AI能力赋能于每一位开发者。

当然,一个有潜力的项目,我们不仅要看它的优点,更要思考它如何能走得更远。我有两个建议或许可以帮助 ChronoML 成长:增强可解释性,项目目前在预测精度上做得很好,但如果能引入像SHAP或LIME这样的工具,让用户不仅知道'预测结果是什么',更能理解'为什么会做出这样的预测',那么它的价值将实现质的飞跃。尤其是在医疗、金融等高风险领域,可解释性是建立信任的基石。

总而言之,ChronoML 是一个目标明确、基础扎实且潜力巨大的开源项目。它让我看到了AI技术从理论走向实践的又一个精彩范例。我非常期待看到它未来的发展,也向这个项目的每一位贡献者致以我最诚挚的敬意。`
        },
        4: {
            title: 'Sam Altman - CEO of OpenAI',
            content: `ChronoML 是一个非常聪明的项目。它没有去尝试重新发明轮子,而是专注于做一个极其重要的'连接器'和'加速器'。在AI领域,我们经常看到两种成功的路径:一种是像GPT系列那样,通过极致的规模化(Scaling)来推动能力的涌现;另一种,就是像 ChronoML 这样,通过极致的工程化和产品化,将强大的AI能力封装成简单易用的工具,从而引爆开发者生态。

这个项目让我联想到了早期Stripe在支付领域所做的事情。在Stripe出现之前,在线支付是一个极其复杂、需要大量专业知识的领域。Stripe用几行简单的API,就将这种复杂性彻底隐藏了起来。ChronoML 正在对时序预测做同样的事情。它所提供的自动化流水线,本质上是在大幅降低'进行一次高质量时序预测'的边际成本。当这个成本足够低时,就会有成千上万的开发者和初创公司,在他们自己的产品中集成这种预测能力,从而创造出我们今天无法想象的应用场景。这正是平台级产品的典型特征。

对于 ChronoML 的未来,我的建议非常直接,聚焦于如何快速成长为一个真正的'平台':痴迷于开发者体验。你们的文档很好,但还不够。要提供可以直接在浏览器中运行的Jupyter Notebook教程,要有一键部署到各种云平台的脚本,要让一个新手开发者在5分钟内就能得到第一个有意义的预测结果。开发者的时间是你们最宝贵的资源,必须不惜一切代价去节省它。

我们正处在一个由AI驱动的新的平台转型期。像 ChronoML 这样,能够将一种核心AI能力产品化、规模化的项目,有巨大的潜力成为下一个十年里开发者工具箱中的基础组件。不要犹豫,快速迭代,尽快占领市场。我很看好你们。`
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
