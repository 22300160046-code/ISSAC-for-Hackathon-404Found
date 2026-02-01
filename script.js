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
    
    // 如果是代码质量，显示完整报告
    if (type === 'code') {
        showCodeQualityReport();
        return;
    }
    
    const details = {
        code: {
            title: '💻 Code Quality',
            score: 87,
            metrics: [
                { name: '代码架构', score: 90, desc: '模块化设计清晰,采用分层架构,核心预测引擎与数据处理层分离良好' },
                { name: '代码规范', score: 85, desc: '遵循PEP 8规范,命名规范统一,注释覆盖率70%' },
                { name: '测试覆盖', score: 82, desc: '单元测试覆盖率78%,集成测试完整,但边界情况测试可加强' },
                { name: '文档质量', score: 88, desc: 'README详尽,API文档完整,提供多个使用示例和教程' },
                { name: '依赖管理', score: 90, desc: 'requirements.txt清晰,版本锁定合理,无已知安全漏洞' },
                { name: '性能优化', score: 86, desc: '支持批量处理和并行计算,内存使用优化良好' }
            ]
        },
        business: {
            title: '💼 Business Potential',
            score: 78,
            metrics: [
                { name: '市场需求', score: 85, desc: '时序预测是金融、零售、能源等多个行业的刚需' },
                { name: '竞争优势', score: 75, desc: '自动化特征工程是亮点,但面临Prophet、ARIMA等成熟工具的竞争' },
                { name: '商业模式', score: 72, desc: '开源+云服务的混合模式可行,但需要明确的变现路径' },
                { name: '用户获取', score: 78, desc: 'GitHub星标增长稳定,社区活跃度中等' },
                { name: '可扩展性', score: 82, desc: '架构支持水平扩展,可集成到企业级数据平台' },
                { name: '团队能力', score: 76, desc: '核心团队技术能力强,但商业运营经验有待提升' }
            ]
        },
        innovation: {
            title: '🚀 Technical Innovation',
            score: 85,
            metrics: [
                { name: '技术创新', score: 88, desc: '自动化模型选择和超参数调优算法具有创新性' },
                { name: '算法优化', score: 82, desc: '在经典算法基础上进行了优化,但未提出全新的预测模型' },
                { name: '工程创新', score: 87, desc: '流水线设计优雅,支持插件式扩展,降低了使用门槛' },
                { name: '应用场景', score: 84, desc: '覆盖多个行业场景,提供了实际案例' },
                { name: '前沿技术', score: 83, desc: '集成了LSTM、Transformer等深度学习模型' },
                { name: '用户体验', score: 86, desc: 'API设计简洁直观,学习曲线平缓,可视化工具实用' }
            ]
        },
        social: {
            title: '🌍 Social Impact',
            score: 82,
            metrics: [
                { name: '技术普惠', score: 88, desc: '大幅降低时序预测的技术门槛,让非专家也能使用' },
                { name: '开源贡献', score: 85, desc: '代码完全开源,采用MIT许可证,鼓励社区贡献' },
                { name: '教育价值', score: 80, desc: '提供了学习资源和教程,但系统性教育内容有待完善' },
                { name: '社会应用', score: 84, desc: '可应用于公共卫生、环境监测、灾害预警等公益领域' },
                { name: '伦理考量', score: 75, desc: '提供了基本的数据隐私保护,但对算法偏见的关注不足' },
                { name: '可持续性', score: 80, desc: '项目维护活跃,社区健康,但需要更多资源支持' }
            ]
        }
    };
    
    const detail = details[type];
    title.innerHTML = `${detail.title} <span style="color: #a855f7; font-weight: 800;">${detail.score}%</span>`;
    
    // 生成详细评分HTML
    let html = '<div class="score-detail-container">';
    
    detail.metrics.forEach((metric, index) => {
        const percentage = metric.score;
        const delay = index * 0.1;
        
        html += `
            <div class="metric-item" style="animation-delay: ${delay}s">
                <div class="metric-header">
                    <span class="metric-name">${metric.name}</span>
                    <span class="metric-score">${metric.score}</span>
                </div>
                <div class="metric-bar-container">
                    <div class="metric-bar-bg">
                        <div class="metric-bar-fill" style="width: ${percentage}%"></div>
                    </div>
                </div>
                <div class="metric-desc">${metric.desc}</div>
            </div>
        `;
    });
    
    html += '</div>';
    content.innerHTML = html;
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
// Code Quality Report Function
function showCodeQualityReport() {
    const modal = document.getElementById('scoreModal');
    modal.classList.add('code-quality-modal');
    
    const title = document.getElementById('modalTitle');
    const content = document.getElementById('modalContent');
    
    title.innerHTML = '';
    
    const html = `
        <div class="report-header">
            <div class="report-project-name">agent-browser</div>
            <div class="report-meta">
                <div class="report-meta-item">
                    <span class="icon">📅</span>
                    <span>2026年02月01日</span>
                </div>
                <div class="report-meta-item">
                    <span class="icon">🤖</span>
                    <span>Qwen/Qwen3-8B</span>
                </div>
            </div>
            <div class="report-score-container">
                <div class="report-score-circle">
                    <svg width="120" height="120">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,68,68,0.2)" stroke-width="8"/>
                        <circle cx="60" cy="60" r="54" fill="none" stroke="url(#scoreGradient)" stroke-width="8" 
                                stroke-dasharray="339.292" stroke-dashoffset="271.434" 
                                transform="rotate(-90 60 60)" stroke-linecap="round"/>
                        <defs>
                            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" style="stop-color:#ff4444"/>
                                <stop offset="100%" style="stop-color:#ff6666"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <div class="report-score-value">2/10</div>
                </div>
                <div class="report-gate-status">
                    <div class="gate-badge fail">FAIL</div>
                    <div class="report-score-label">质量门禁</div>
                </div>
            </div>
        </div>
        
        <div class="report-critical-issues">
            <div class="critical-issues-title">
                <span>🔴</span>
                <span>Top 3 致命问题</span>
            </div>
            <div class="critical-issue-item">
                <div class="critical-issue-priority">1</div>
                <div class="critical-issue-content">
                    <div class="critical-issue-title">无测试代码</div>
                    <div class="critical-issue-desc">核心模块无任何测试保护，存在严重质量风险</div>
                </div>
            </div>
            <div class="critical-issue-item">
                <div class="critical-issue-priority">2</div>
                <div class="critical-issue-content">
                    <div class="critical-issue-title">命令注入漏洞</div>
                    <div class="critical-issue-desc">executeCommand() 使用字符串拼接构造命令</div>
                </div>
            </div>
            <div class="critical-issue-item">
                <div class="critical-issue-priority">3</div>
                <div class="critical-issue-content">
                    <div class="critical-issue-title">循环依赖与耦合度过高</div>
                    <div class="critical-issue-desc">browser.js 与 session.js 直接相互引用</div>
                </div>
            </div>
        </div>
        
        <div class="report-sections">
            <div class="report-section" onclick="toggleReportSection(this)">
                <div class="report-section-header">
                    <div class="report-section-icon">🔍</div>
                    <div class="report-section-title">静态代码分析</div>
                    <div class="report-section-toggle">▼</div>
                </div>
                <div class="report-section-content">
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">代码规范与风格</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>存在大量无意义的变量名和函数名（如 data、temp、handleSomething）</li>
                            <li>缩进不一致，部分使用2空格，部分使用4空格</li>
                            <li>存在废弃的 for...in 循环和未使用的 var 声明</li>
                        </ul>
                    </div>
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">逻辑复杂度</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>session.js 中存在多层嵌套的 if/else 结构，缩进超过4层</li>
                            <li>processRequest() 函数有300+行，违反单一职责原则</li>
                            <li>logMessage() 函数包含多个条件分支，认知复杂度高</li>
                        </ul>
                    </div>
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">DRY原则</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>formatError()、formatResponse()、formatLog() 三者结构高度相似</li>
                            <li>多处出现硬编码的常量值，缺乏抽象</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="report-section" onclick="toggleReportSection(this)">
                <div class="report-section-header">
                    <div class="report-section-icon">🧪</div>
                    <div class="report-section-title">自动化测试</div>
                    <div class="report-section-toggle">▼</div>
                </div>
                <div class="report-section-content">
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">测试覆盖范围</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>项目根目录没有 /test 或 /__tests__ 文件夹</li>
                            <li>关键业务逻辑无任何测试覆盖</li>
                            <li>所有核心模块均无测试保护，存在严重质量风险</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="report-section" onclick="toggleReportSection(this)">
                <div class="report-section-header">
                    <div class="report-section-icon">👁️</div>
                    <div class="report-section-title">代码评审</div>
                    <div class="report-section-toggle">▼</div>
                </div>
                <div class="report-section-content">
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">设计模式与抽象</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>项目中未使用任何设计模式，代码结构松散</li>
                            <li>高层抽象直接依赖底层实现细节</li>
                        </ul>
                    </div>
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">可读性与文档</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>代码缺乏注释，多数函数无描述</li>
                            <li>注释多为代码翻译，缺乏意图说明</li>
                            <li>README.md 缺少架构图、API 文档、贡献指南</li>
                        </ul>
                    </div>
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">安全性</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>executeCommand() 使用字符串拼接构造命令，存在命令注入风险</li>
                            <li>核心接口对用户输入无校验</li>
                            <li>缺乏安全策略和 HTTPS 强制使用</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="report-section" onclick="toggleReportSection(this)">
                <div class="report-section-header">
                    <div class="report-section-icon">🏗️</div>
                    <div class="report-section-title">架构与设计</div>
                    <div class="report-section-toggle">▼</div>
                </div>
                <div class="report-section-content">
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">耦合度与内聚性</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>browser.js 与 session.js 直接相互引用，形成循环依赖</li>
                            <li>修改 SessionManager 可能影响多个模块</li>
                        </ul>
                    </div>
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">架构分层</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>业务逻辑泄露到控制器层</li>
                            <li>使用过时的 request-promise-native 库</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="report-section" onclick="toggleReportSection(this)">
                <div class="report-section-header">
                    <div class="report-section-icon">🚦</div>
                    <div class="report-section-title">质量门禁评估</div>
                    <div class="report-section-toggle">▼</div>
                </div>
                <div class="report-section-content">
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">可靠性</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>executeCommand() 存在命令注入漏洞</li>
                            <li>processRequest() 缺乏异常处理机制</li>
                            <li>SessionManager 无重试机制，易崩溃</li>
                        </ul>
                    </div>
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">安全性</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>executeCommand() 存在命令注入风险</li>
                            <li>parseUrl() 无输入校验</li>
                            <li>缺少 HTTPS 强制使用策略</li>
                        </ul>
                    </div>
                    <div class="report-subsection">
                        <div class="report-subsection-header">
                            <div class="report-subsection-title">可维护性</div>
                            <div class="report-rating F">F</div>
                        </div>
                        <ul class="report-issues-list">
                            <li>技术债务高，需重构所有核心模块</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="report-highlights">
            <div class="highlights-title">
                <span>🟢</span>
                <span>Top 3 亮点</span>
            </div>
            <ul class="highlights-list">
                <li>结构清晰：部分模块如 utils 目录组织良好</li>
                <li>可扩展性设计：部分类设计具备扩展能力</li>
                <li>现代前端集成：支持浏览器自动化操作</li>
            </ul>
        </div>
        
        <div class="report-roadmap">
            <div class="roadmap-title">
                <span>🚀</span>
                <span>改进路线图</span>
            </div>
            <div class="roadmap-item">
                <div class="roadmap-step">1</div>
                <div class="roadmap-content">
                    <div class="roadmap-item-title">引入测试框架</div>
                    <div class="roadmap-item-desc">添加 Jest 或 Mocha，编写单元测试和集成测试</div>
                </div>
            </div>
            <div class="roadmap-item">
                <div class="roadmap-step">2</div>
                <div class="roadmap-content">
                    <div class="roadmap-item-title">重构核心模块</div>
                    <div class="roadmap-item-desc">拆分 processRequest() 和 SessionManager，消除循环依赖</div>
                </div>
            </div>
            <div class="roadmap-item">
                <div class="roadmap-step">3</div>
                <div class="roadmap-content">
                    <div class="roadmap-item-title">增强安全性</div>
                    <div class="roadmap-item-desc">输入校验、防止命令注入、强制 HTTPS</div>
                </div>
            </div>
            <div class="roadmap-item">
                <div class="roadmap-step">4</div>
                <div class="roadmap-content">
                    <div class="roadmap-item-title">完善文档</div>
                    <div class="roadmap-item-desc">增加架构图、API 文档、贡献指南和开发规范</div>
                </div>
            </div>
        </div>
    `;
    
    content.innerHTML = html;
    modal.style.display = 'flex';
}

function toggleReportSection(element) {
    element.classList.toggle('expanded');
}
