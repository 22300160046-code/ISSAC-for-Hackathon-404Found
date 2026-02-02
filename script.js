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
    
    // 如果是商业潜力，显示Markdown报告
    if (type === 'business') {
        showBusinessPotentialReport();
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

// ==================== 商业潜力报告Markdown渲染函数 ====================

function showBusinessPotentialReport() {
    const markdownContent = `# 📊 科创大赛 AI 评审 - 深度商业分析报告

---

## 🚀 项目本体画像 (Project Identity)
**项目名称**: agent-browser

**核心愿景**: *Headless browser automation CLI for AI agents*

### 📝 深度描述
agent-browser 是一个专为 AI 智能体（AI Agents）设计的命令行浏览器自动化工具，采用 Rust 编写的高性能原生 CLI，辅以 Node.js 回退方案，支持跨平台（macOS/Linux/Windows）运行。其核心创新在于'Ref-based'交互范式：通过 snapshot 命令生成带唯一引用标识（如 @e1、@e2）的可访问性树（Accessibility Tree），使 LLM 能基于语义而非脆弱的 CSS/XPath 进行稳定、可复现的元素定位与操作（click/fill/hover 等）。架构上采用 client-daemon 模式，守护进程复用 Playwright 浏览器实例，显著提升多命令执行效率；同时原生支持 Chromium、Firefox 和 WebKit，并可通过 CDP 协议对接远程或云浏览器。提供丰富的 AI 友好特性：JSON 输出、语义定位器（role/text/label/placeholder）、会话隔离（--session）、持久化配置文件（--profile）、作用域 HTTP headers 认证、流式 WebSocket 预览（streaming screencast）及云浏览器集成（Browserbase/Browser Use/Kernel）。目标客户为构建 Web 自动化任务的 AI Agent 开发者、LLM 应用工程师、测试自动化团队及 Serverless 场景下的无头浏览器使用者。

### 💰 盈利模式
B端订阅（云浏览器集成服务分润/企业版高级功能）、开发者工具生态增值（CLI 插件市场、托管调试服务）、数据服务（暂未体现，BP 中未提）

### 👥 团队背景优势
Vercel Labs 团队，具备前端基础设施、CLI 工具链与 AI 工程化交付经验；项目开源且文档完备，体现强工程落地能力

- **发展阶段**: \`Early-stage production tool（已开源、有 Vercel 官方背书、支持生产级云集成，但自身不直接收费）\`

## 🌐 赛道分析与市场量化
- **识别赛道**: Agentic Web Automation Infrastructure
- **市场规模**: USD 7.55 billion (2025)
- **复合增长率 (CAGR)**: 38.5%
- **数据来源**: GMI Insights (S1) & Precedence Research (S26)

## ⚖️ 商业深度拆解
### 🏢 商业模式可行性评述
商业模式当前呈'基础设施即插件'形态：自身开源免费，盈利依赖云浏览器服务商（Browserbase等）生态分润与企业级增值服务。优势在于极低的双边启动门槛——AI Agent 开发者可零成本集成，云服务商可无缝对接标准化 CLI 接口；但存在 G 端付费周期长、自建商业化路径模糊的风险。当前未设独立 SaaS 订阅，盈利路径依赖第三方云厂商增长，可行性高但自主性弱。

### 🛡️ 技术壁垒与护城河
核心算法+工程架构壁垒：Ref-based 元素定位机制是面向 AI 的范式创新（非纯应用层封装），结合 Rust CLI 性能优化、daemon 进程复用、多浏览器引擎抽象及安全沙箱化的 headers 作用域控制，构成差异化技术护城河；虽未声明专利，但 snapshot-ref 工作流已形成事实标准，具备数据与协议层面的隐性壁垒。

## 💎 商业潜力量化评估 (Valuation Model)
**综合评分**: \`82\` | **投资评级**: \`A\`

> **核心摘要**: 面向AI Agent的Rust优先浏览器自动化CLI，在千亿级Agentic AI市场爆发前夜切入，技术稀缺性强、团队背书扎实，但商业化路径依赖云基础设施生态，Unit Economics尚未验证。

| 评估维度 | 分数 | 满分 | 核心分析 |
| :--- | :--- | :--- | :--- |
| 市场潜力 | 16 | 20 | Agentic AI市场2025年约7.55亿美元<sup>[S26]</sup><sup>[S27]</sup>，预计2034年达199亿美元（CAGR 38.5%+），属百亿级蓝海；而'AI浏览器自动化'子赛道更聚焦——全球AI Browser市场2024年21.3亿美元，2034年预计768亿美元<sup>[S43]</sup>，叠加AI Agent对可靠、低token开销的浏览器工具刚性需求<sup>[S40]</sup>：节省93%上下文窗口），正处于政策与技术双驱动的爆发前夜（Vercel Labs背书、Browserbase等云基建融资超6750万美元<sup>[S33]</sup><sup>[S34]</sup>）。 |
| 产品与技术 | 20 | 25 | 核心创新在于'Ref-based deterministic interaction'（快照+引用ID），彻底规避传统CSS/XPath选择器在动态网页中的不稳定性，专为LLM推理链设计<sup>[S40]</sup>；Rust CLI + Node.js Daemon分层架构兼顾性能与兼容性，支持多云浏览器后端（Browserbase/Kernel/Browser Use），是当前唯一将'AI-first语义定位'（role/text/label/alt等）与生产级CLI深度耦合的开源方案（对比Playwright需手动写wait逻辑<sup>[S40]</sup><sup>[S37]</sup>）；护城河体现为架构专利性（Vercel Labs工程范式）、与主流AI编码助手（Claude Code/GitHub Copilot）的深度集成能力，但未见已授权发明专利披露，Moat暂弱于纯商业竞品。 |
| 商业模式 | 15 | 20 | 当前为Apache-2.0开源，无直接营收模式；变现路径高度依赖云浏览器基础设施生态（如Browserbase已实现$4.4M ARR<sup>[S33]</sup>），未来可能走'开源CLI + 云服务增值'（如托管会话、审计追踪、企业级Profile管理）或'开发者工具链嵌入收费'（如VS Code插件高级功能）；Unit Economics未披露，但CLI本身零边际成本，且通过Ref机制大幅降低AI token消耗<sup>[S40]</sup>，具备高毛利潜力；可扩展性极强——命令行即API，天然适配Serverless（Vercel/AWS Lambda）、CI/CD及AI Agent编排平台。 |
| 团队竞争力 | 22 | 25 | 由Vercel Labs孵化<sup>[S10]</sup>，Vercel是Next.js和边缘计算领域公认的顶级工程团队，具备从框架到基础设施的全栈交付能力；CLI采用Rust重写（非JS魔改），体现底层系统能力；文档专业度极高（含Serverless部署、CDP集成、WebSocket流式预览等），远超一般开源项目；团队配置完整：Rust系统编程+Web自动化（Playwright协议）+AI Agent交互设计三位一体，但创始人个体信息未公开，无法评估连续创业或行业纵深经验。 |
| 验证与风险 | 9 | 10 | 已获广泛技术验证：被Claude Code、GitHub Copilot等主流AI编码助手集成<sup>[S10]</sup>；在Browserbase等云浏览器平台成为事实标准CLI<sup>[S31]</sup><sup>[S33]</sup>；GitHub Star数超12k（虽未在输入中给出，但Vercel Labs项目具备强传播势能）；合规风险极低——纯客户端工具，不处理用户数据，所有网络请求由用户控制（headers scope to origin<sup>[S10]</sup>），符合GDPR/CCPA基本要求；无监管灰色地带，区别于数据爬取或UI自动化黑产工具。 |

## 🔥 VC 灵魂拷问 (The VC Grill)
**Q: agent-browser 宣称'AI-first'，但其核心能力（snapshot+ref）本质是Playwright的语义封装——既然Playwright已开源且生态成熟，你们的Rust CLI层到底创造了多少不可替代的抽象价值？请用具体性能/稳定性/调试效率数据证明。**

**A:** Rust CLI层将命令解析延迟从Node.js平均120ms压至<8ms（实测p95），且通过daemon复用避免每次启动Chromium进程（Playwright CLI每次调用需重启浏览器，冷启动耗时3.2s vs agent-browser daemon复用仅需117ms）。更重要的是，ref机制强制AI基于可验证的accessibility tree交互，规避了Playwright中CSS/XPath selector在动态DOM下的63%失效率（S38实测数据），将端到端任务成功率从58%提升至89%。

**Q: 你们支持Browserbase、Kernel等云浏览器后端，但这些服务商已收取$0.02–$0.05/次API调用费——当客户规模扩大，你们的CLI工具是否沦为云厂商的'免费引流入口'？如何构建自己的收费护城河？**

**A:** 不依赖云厂商抽成：我们已推出企业级license模式，按session并发数收费（$499/月起），包含本地持久化profile管理、审计日志、合规header沙箱等Playwright原生不支持的企业功能；同时通过AGENTS.md生态绑定AI编码助手（如Claude Code插件），向开发者收取技能集成费（$29/月/agent），已覆盖37%早期客户LTV。

**Q: 中国监管明确要求AI代理调用第三方接口需'合法授权'（S7），而agent-browser默认允许任意域名header注入——这是否构成《生成式AI服务管理暂行办法》第十七条所禁止的'未履行安全评估义务'？合规方案是否仅靠文档提示？**

**A:** 已内置合规强制开关：--compliance-mode启用后，自动禁用跨域header注入、阻断未经白名单的CDP连接、对snapshot输出脱敏PII字段，并生成GDPR/等保2.0兼容审计报告；该模式为政府及金融客户强制启用，已在某省级政务AI平台落地，通过等保三级渗透测试。

**Q: 竞品如Fellou（S21）、Genspark（S17）均主打'中文网页深度理解'，而agent-browser snapshot依赖Chromium默认英文accessibility tree——你们如何解决中文表单label识别率不足、电商网站动态SKU DOM结构混乱等本土化痛点？**

**A:** 已集成自研中文语义解析器（已开源）：针对中文label，采用OCR+DOM文本对齐双路校验，将label匹配准确率从Playwright原生的61%提至92%；针对电商SKU，新增--sku-mode参数，自动识别商品卡片区域并生成结构化JSON快照（含价格/库存/规格），该模块已被京东内部RPA团队采购用于比价爬虫。

## 🎯 痛点真实性验证
**真实性评分**: \`9/10\`

**评估逻辑**: 搜索数据S36-S40证实：现有自动化工具在AI代理场景下存在三大硬伤——selector失效（S38）、上下文窗口爆炸（S40）、调试黑盒（S37）；agent-browser的ref机制直击第一痛点，snapshot -i --json输出压缩至平均12KB（较完整DOM减少87%），且S39实测显示其将token消耗降低93%，验证了其对LLM推理成本的真实优化。

## 🎯 竞争格局与替代品
### 🏢 Browserbase
- **类型**: 直接竞品
- **分析**: 专为AI Agent设计的云浏览器基础设施服务商，提供远程CDP连接、会话持久化与企业级SLA；与agent-browser深度集成（-p browserbase），但属SaaS收费模式，不提供本地CLI原生能力。其商业化成熟度高，已获6750万美元融资，估值达3亿美元<sup>[S31]</sup><sup>[S33]</sup><sup>[S34]</sup>。

### 🏢 Playwright
- **类型**: 直接竞品
- **分析**: 微软开源的跨浏览器自动化框架，支持Rust绑定（playwright-rs），是agent-browser底层依赖之一；但定位为通用开发者工具，缺乏AI原生抽象（如refs语义引用、snapshot+ref工作流、自动状态隔离会话），需额外封装才能适配LLM任务链<sup>[S36]</sup><sup>[S37]</sup>。

### 🏢 Kernel
- **类型**: 直接竞品
- **分析**: 面向AI Agent的云浏览器平台，强调反检测（stealth mode）与持久化Profile管理，支持环境变量一键切换；与agent-browser通过-p kernel无缝对接，构成'CLI+云执行'双栈架构；已落地金融/电商等强合规场景，体现垂直领域工程化能力<sup>[S25]</sup>。

## 💹 融资生态 & 舆情研判
- **资本热度**: \`High\`
- **动态摘要**: 云浏览器基础设施赛道资本热度极高：Browserbase成立16个月即完成6750万美元融资、估值3亿美元<sup>[S31]</sup><sup>[S33]</sup>；同期，全球云基础设施支出2025年Q3达1026亿美元，同比增长25%<sup>[S46]</sup><sup>[S47]</sup>；Agentic AI整体市场预计2025–2034年CAGR达38.5%–49.6%，多份报告共识指向200亿美元量级终局<sup>[S1]</sup><sup>[S26]</sup><sup>[S29]</sup>。资本正从通用AI平台加速向'Agent+Browser'垂直中间件迁移。
- **舆情倾向**: Neutral — 总体中性，但存在关于AI代理浏览器自动化技术在企业级落地中安全边界模糊与责任归属不清的持续担忧。一方面，开发者盛赞agent-browser的refs工作流显著降低LLM幻觉导致的DOM定位失败率，并节省93%上下文窗口<sup>[S40]</sup>；另一方面，安全社区警示'代理式浏览'可能因跨域权限滥用引发企业数据泄露风险，亟需将敏感操作环境物理隔离<sup>[S6]</sup>，且中国监管明确要求第三方接口授权合法、数据交互符合开放平台协议<sup>[S7]</sup>。

## ⚠️ 核心风险识别
- 政策风险：中国网信办《生成式AI服务管理暂行办法》第14条明确要求'提供者应建立用户投诉举报机制'，而agent-browser当前无内置举报入口或内容审核hook，若被用于灰产自动化，项目方可能承担连带责任
- 技术风险：Rust CLI与Node.js daemon间IPC采用Unix socket，在Windows Subsystem for Linux（WSL）环境下存在12%概率出现socket泄漏导致daemon僵死（S12社区报告），影响serverless场景稳定性
- 商业风险：核心客户（AI coding assistant厂商）正自建轻量浏览器SDK（如Claude Code的browser-kit），一旦其完成闭环，agent-browser将退化为低毛利CLI包装层，丧失议价权
- 竞争风险：Browserbase已宣布2025Q3推出原生CLI（S34），将直接集成其$300M估值的反检测引擎，届时agent-browser的'ref+snapshot'差异化优势将被云厂商底层收编
- 合规风险：--profile持久化存储明文cookies及localStorage，未强制加密（对比Chrome的OS-level keychain），违反PCI DSS 8.2.1条款，金融客户采购需额外定制开发
- 交付风险：Linux ARM64平台依赖系统级libgbm.so，但国产麒麟V10系统预装版本过旧（v21.3.9 vs 要求v22.2+），导致35%政企客户现场部署失败，需手动编译驱动
- 生态风险：npm install -g agent-browser会覆盖全局playwright二进制，与客户现有Playwright测试套件冲突，已引发17起生产环境CI中断事故（GitHub Issues #421）
- 账期风险：云浏览器合作伙伴（Browserbase/Kernel）采用预付费模式，而agent-browser企业版销售采用季度账期，现金流错配导致硬件采购周期被迫拉长至90天，影响交付SLA

---
## 🔗 数据来源与参考文献
- **[S1] GMI Insights: 人工智能代理市场规模及份额，2025-2034 年增长机遇**: [https://www.gminsights.com/zh/industry-analysis/ai-agents-market](https://www.gminsights.com/zh/industry-analysis/ai-agents-market)
- **[S26] Precedence Research: Agentic AI Market Size to Hit USD 199.05 Billion by 2034**: [https://www.precedenceresearch.com/agentic-ai-market](https://www.precedenceresearch.com/agentic-ai-market)
- **[S31] Upstarts Media: Browserbase Raises $40M To Help AI Agents Work With ...**: [https://www.upstartsmedia.com/p/browserbase-raises-40m-and-launches-director](https://www.upstartsmedia.com/p/browserbase-raises-40m-and-launches-director)
- **[S33] Latka: How Browserbase hit $4.4M revenue with a 40 person team in ...**: [https://getlatka.com/companies/browserbase.com](https://getlatka.com/companies/browserbase.com)
- **[S34] YouTube: How Browserbase Raised $67.5M to Power AI Agents & ...**: [https://www.youtube.com/watch?v=Xx_ylwTwStE](https://www.youtube.com/watch?v=Xx_ylwTwStE)
- **[S36] Bright Data Blog: Agent Browser vs Puppeteer & Playwright: Key Differences**: [https://brightdata.com/blog/ai/agent-browser-vs-puppeteer-playwright](https://brightdata.com/blog/ai/agent-browser-vs-puppeteer-playwright)
- **[S37] LinkedIn Pulse: Why I Ditched Playwright MCP for Vercel's agent-browser ...**: [https://www.linkedin.com/pulse/why-i-ditched-playwright-mcp-vercels-agent-browser-saved-gross-glqfe](https://www.linkedin.com/pulse/why-i-ditched-playwright-mcp-vercels-agent-browser-saved-gross-glqfe)
- **[S40] Medium: Agent-Browser: AI-First Browser Automation That Saves 93% of Your Context Window**: [https://medium.com/@richardhightower/agent-browser-ai-first-browser-automation-that-saves-93-of-your-context-window-7a2c52562f8c](https://medium.com/@richardhightower/agent-browser-ai-first-browser-automation-that-saves-93-of-your-context-window-7a2c52562f8c)
- **[S6] TechOrange: 【瀏覽器裡的內鬼】AI 助手獲跨網域權限，企業資安面臨哪些 ...**: [https://techorange.com/2026/01/23/agentic-browser/](https://techorange.com/2026/01/23/agentic-browser/)
- **[S7] SecRSS: 企业在中国境内部署及应用AI Agent的主要法律问题**: [https://www.secrss.com/articles/85992](https://www.secrss.com/articles/85992)

---
*报告生成时间: 2026-02-01 13:07:41*

*本次分析总耗时: 34.5 秒*`;

    // 简单的Markdown转HTML函数
    function markdownToHTML(md) {
        let html = md;
        
        // 处理标题
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // 处理粗体
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // 处理斜体
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // 处理行内代码
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
        
        // 处理链接
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // 处理上标
        html = html.replace(/<sup>\[([^\]]+)\]<\/sup>/g, '<sup>[$1]</sup>');
        
        // 处理水平线
        html = html.replace(/^---$/gim, '<hr>');
        
        // 处理引用块
        html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
        
        // 处理无序列表
        html = html.replace(/^\- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        
        // 处理表格
        const tableRegex = /\|(.+)\|\n\|[\s\-:]+\|\n((?:\|.+\|\n?)+)/g;
        html = html.replace(tableRegex, (match, header, body) => {
            const headers = header.split('|').filter(h => h.trim()).map(h => `<th>${h.trim()}</th>`).join('');
            const rows = body.trim().split('\n').map(row => {
                const cells = row.split('|').filter(c => c.trim()).map(c => `<td>${c.trim()}</td>`).join('');
                return `<tr>${cells}</tr>`;
            }).join('');
            return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
        });
        
        // 处理段落
        html = html.split('\n\n').map(para => {
            if (para.match(/^<h[1-6]>/) || para.match(/^<table>/) || 
                para.match(/^<ul>/) || para.match(/^<blockquote>/) || 
                para.match(/^<hr>/) || para.trim() === '') {
                return para;
            }
            return `<p>${para}</p>`;
        }).join('\n');
        
        return html;
    }
    
    const htmlContent = markdownToHTML(markdownContent);
    
    // 创建弹窗
    const modal = document.createElement('div');
    modal.className = 'markdown-modal';
    modal.innerHTML = `
        <div class="markdown-modal-content">
            <button class="markdown-modal-close" onclick="this.closest('.markdown-modal').remove()">×</button>
            <div class="markdown-reader">
                ${htmlContent}
            </div>
        </div>
    `;
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    // ESC键关闭
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    document.body.appendChild(modal);
}
// ============================================
// 文件上传和URL输入功能
// ============================================

// 全局变量存储用户输入
let uploadedFile = null;
let projectUrl = '';

// 触发文件选择
function triggerFileUpload() {
    document.getElementById('fileInput').click();
}

// 处理文件选择
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        uploadedFile = file;
        displayFile(file);
    }
}

// 显示已选择的文件
function displayFile(file) {
    const fileDisplay = document.getElementById('fileDisplay');
    const fileName = document.getElementById('fileName');
    const fileIcon = document.getElementById('fileIcon');
    const uploadBtn = document.querySelector('.upload-btn');
    
    // 根据文件类型设置图标
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const iconMap = {
        'pdf': '📕',
        'doc': '📘',
        'docx': '📘',
        'txt': '📄',
        'md': '📝'
    };
    
    fileIcon.textContent = iconMap[fileExtension] || '📄';
    fileName.textContent = file.name;
    
    // 隐藏上传按钮,显示文件信息
    uploadBtn.style.display = 'none';
    fileDisplay.style.display = 'flex';
}

// 移除文件
function removeFile() {
    uploadedFile = null;
    document.getElementById('fileInput').value = '';
    document.getElementById('fileDisplay').style.display = 'none';
    document.querySelector('.upload-btn').style.display = 'flex';
}

// 开始评估 - 收集用户输入并调用后端接口
function startEvaluation() {
    // 获取URL输入
    projectUrl = document.getElementById('urlInput').value.trim();
    
    // 验证输入
    if (!projectUrl && !uploadedFile) {
        alert('请至少输入项目URL或上传项目文档！');
        return;
    }
    
    // 准备数据
    const evaluationData = {
        url: projectUrl,
        file: uploadedFile,
        timestamp: new Date().toISOString()
    };
    
    // 调用后端接口 - 这里预留接口给后端代码
    // 后端开发者可以通过以下方式获取数据:
    // 1. evaluationData.url - 用户输入的GitHub URL
    // 2. evaluationData.file - 用户上传的文件对象
    
    console.log('评估数据:', evaluationData);
    console.log('项目URL:', projectUrl);
    console.log('上传文件:', uploadedFile);
    
    // TODO: 后端接口调用
    // 示例: await callBackendAPI(evaluationData);
    // 或者: submitEvaluationRequest(projectUrl, uploadedFile);
    
    // 暂时使用模拟流程,跳转到加载页面
    scrollToSection('loading');
}

// ============================================
// 后端接口预留函数
// ============================================

/**
 * 后端开发者可以实现这个函数来处理评估请求
 * @param {string} url - GitHub项目URL
 * @param {File} file - 上传的项目文档文件
 * @returns {Promise} - 返回评估结果
 */
async function callBackendAPI(url, file) {
    // 创建FormData对象
    const formData = new FormData();
    formData.append('url', url);
    if (file) {
        formData.append('file', file);
    }
    
    // 发送到后端API
    try {
        const response = await fetch('/api/evaluate', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('评估请求失败');
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('后端API调用失败:', error);
        throw error;
    }
}

/**
 * 获取当前用户输入的数据
 * 后端可以调用这个函数来获取前端收集的数据
 */
function getEvaluationData() {
    return {
        url: projectUrl,
        file: uploadedFile,
        hasUrl: !!projectUrl,
        hasFile: !!uploadedFile
    };
}

// ============================================
// 智能进度条系统
// ============================================

// 进度条状态
let progressState = 'LOADING'; // LOADING, RECEIVED, WAITING, COMPLETED
let progressValue = 0;
let progressStartTime = null;
let progressAnimationFrame = null;
let evaluationResult = null;

// 进度条配置
const PROGRESS_CONFIG = {
    TOTAL_TIME: 120000, // 120秒 (毫秒)
    PHASE1_TIME: 30000,  // 0-30秒
    PHASE2_TIME: 60000,  // 30-90秒
    PHASE3_TIME: 30000,  // 90-120秒
    PHASE1_END: 50,      // 第一阶段结束进度
    PHASE2_END: 80,      // 第二阶段结束进度
    PHASE3_END: 95,      // 第三阶段结束进度 (停在95%)
    MAX_PROGRESS: 100    // 最大进度
};

// 状态文字配置
const STATUS_MESSAGES = {
    0: '正在初始化评估引擎...',
    10: '正在分析代码仓库...',
    20: '正在调用AI模型...',
    30: '正在评估代码质量...',
    40: '正在分析商业潜力...',
    50: '正在评估技术创新...',
    60: '正在分析社会效益...',
    70: '正在生成评估报告...',
    80: '正在汇总评估结果...',
    90: '即将完成评估...',
    95: '等待后端响应...',
    100: '评估完成！正在跳转...'
};

/**
 * 启动智能进度条
 */
function startSmartProgress() {
    progressState = 'LOADING';
    progressValue = 0;
    progressStartTime = Date.now();
    evaluationResult = null;
    
    updateProgressUI();
    animateProgress();
}

/**
 * 计算当前应该在的进度值
 */
function calculateTargetProgress() {
    const elapsed = Date.now() - progressStartTime;
    
    if (progressState === 'RECEIVED' || progressState === 'COMPLETED') {
        return PROGRESS_CONFIG.MAX_PROGRESS;
    }
    
    // 阶段1: 0-30秒, 0%-50%
    if (elapsed < PROGRESS_CONFIG.PHASE1_TIME) {
        const progress = (elapsed / PROGRESS_CONFIG.PHASE1_TIME) * PROGRESS_CONFIG.PHASE1_END;
        return Math.min(progress, PROGRESS_CONFIG.PHASE1_END);
    }
    
    // 阶段2: 30-90秒, 50%-80%
    if (elapsed < PROGRESS_CONFIG.PHASE1_TIME + PROGRESS_CONFIG.PHASE2_TIME) {
        const phase2Elapsed = elapsed - PROGRESS_CONFIG.PHASE1_TIME;
        const phase2Progress = (phase2Elapsed / PROGRESS_CONFIG.PHASE2_TIME) * 
                               (PROGRESS_CONFIG.PHASE2_END - PROGRESS_CONFIG.PHASE1_END);
        return Math.min(PROGRESS_CONFIG.PHASE1_END + phase2Progress, PROGRESS_CONFIG.PHASE2_END);
    }
    
    // 阶段3: 90-120秒, 80%-95%
    if (elapsed < PROGRESS_CONFIG.TOTAL_TIME) {
        const phase3Elapsed = elapsed - PROGRESS_CONFIG.PHASE1_TIME - PROGRESS_CONFIG.PHASE2_TIME;
        const phase3Progress = (phase3Elapsed / PROGRESS_CONFIG.PHASE3_TIME) * 
                               (PROGRESS_CONFIG.PHASE3_END - PROGRESS_CONFIG.PHASE2_END);
        return Math.min(PROGRESS_CONFIG.PHASE2_END + phase3Progress, PROGRESS_CONFIG.PHASE3_END);
    }
    
    // 超过120秒,停在95%,进入等待状态
    if (progressState === 'LOADING') {
        progressState = 'WAITING';
        updateStatusMessage('等待后端响应...', 'waiting');
    }
    
    return PROGRESS_CONFIG.PHASE3_END;
}

/**
 * 动画循环
 */
function animateProgress() {
    if (progressState === 'COMPLETED') {
        return;
    }
    
    const targetProgress = calculateTargetProgress();
    
    // 平滑插值到目标进度
    if (progressState === 'RECEIVED') {
        // 收到输出后快速完成
        progressValue += (targetProgress - progressValue) * 0.2;
    } else {
        // 正常加载时平滑过渡
        progressValue += (targetProgress - progressValue) * 0.05;
    }
    
    // 更新UI
    updateProgressUI();
    
    // 检查是否完成
    if (progressValue >= 99.9 && progressState === 'RECEIVED') {
        progressValue = 100;
        progressState = 'COMPLETED';
        updateProgressUI();
        updateStatusMessage('评估完成！正在跳转...', 'completed');
        
        // 0.5秒后跳转到结果页
        setTimeout(() => {
            scrollToSection('results');
        }, 500);
        
        return;
    }
    
    // 继续动画
    progressAnimationFrame = requestAnimationFrame(animateProgress);
}

/**
 * 更新进度条UI
 */
function updateProgressUI() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = progressValue + '%';
    }
    
    if (progressText) {
        progressText.textContent = Math.floor(progressValue) + '%';
    }
    
    // 更新状态文字
    const currentProgress = Math.floor(progressValue);
    const milestones = Object.keys(STATUS_MESSAGES).map(Number).sort((a, b) => a - b);
    
    for (let i = milestones.length - 1; i >= 0; i--) {
        if (currentProgress >= milestones[i]) {
            updateStatusMessage(STATUS_MESSAGES[milestones[i]]);
            break;
        }
    }
}

/**
 * 更新状态文字
 */
function updateStatusMessage(message, className = '') {
    const statusElement = document.getElementById('progressStatus');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = 'progress-status ' + className;
    }
}

/**
 * 后端完成回调 - 供后端调用
 * @param {Object} result - 评估结果
 */
function onBackendComplete(result) {
    console.log('收到后端评估结果:', result);
    progressState = 'RECEIVED';
    evaluationResult = result;
    updateStatusMessage('收到评估结果，正在完成...', 'completed');
}

/**
 * 停止进度条动画
 */
function stopProgress() {
    if (progressAnimationFrame) {
        cancelAnimationFrame(progressAnimationFrame);
        progressAnimationFrame = null;
    }
}

/**
 * 重置进度条
 */
function resetProgress() {
    stopProgress();
    progressState = 'LOADING';
    progressValue = 0;
    progressStartTime = null;
    evaluationResult = null;
    updateProgressUI();
}

// ============================================
// 页面滚动时自动启动进度条
// ============================================

// 监听滚动到loading页面
const originalScrollToSection = window.scrollToSection;
window.scrollToSection = function(sectionId) {
    if (sectionId === 'loading') {
        // 延迟100ms启动进度条,确保页面已滚动到位
        setTimeout(() => {
            startSmartProgress();
        }, 100);
    }
    
    if (originalScrollToSection) {
        originalScrollToSection(sectionId);
    } else {
        // 如果原函数不存在,使用默认滚动
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

// ============================================
// 测试按钮和模拟功能
// ============================================

/**
 * 模拟后端完成 - 供测试使用
 */
function simulateBackendComplete() {
    console.log('🧪 模拟后端完成被触发');
    
    // 模拟后端返回的评估结果
    const mockResult = {
        projectName: 'ChronoML',
        overallScore: 85,
        scores: {
            codeQuality: 87,
            businessPotential: 78,
            technicalInnovation: 88,
            socialImpact: 82
        },
        timestamp: new Date().toISOString()
    };
    
    // 显示提示
    updateStatusMessage('🧪 测试模式：模拟收到后端结果', 'completed');
    
    // 调用后端完成回调
    setTimeout(() => {
        onBackendComplete(mockResult);
    }, 500);
}

/**
 * 显示/隐藏测试按钮
 */
function toggleTestButton(show) {
    const testButton = document.getElementById('testButton');
    if (testButton) {
        testButton.style.display = show ? 'block' : 'none';
    }
}

// 页面加载完成后初始化测试按钮
document.addEventListener('DOMContentLoaded', function() {
    // 测试按钮默认显示
    toggleTestButton(true);
    
    // 可以通过URL参数控制是否显示测试按钮
    // 例如: ?test=false 隐藏测试按钮
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('test') === 'false') {
        toggleTestButton(false);
    }
});
