/* ============================================================
   StudentAuth.js — Authentication + Submit + Report Engine
   Lean Six Sigma Interactive Platform
   ============================================================
   ARCHITECTURE: Zero-backend, localStorage-first
   LOADS ON: Every tool page (via <script> tag)
   ============================================================ */

// ── CONFIG ───────────────────────────────────────
const SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxD7Vk6R6b7amHbOhHnaFiMSDCQZvDAOcCG-4uv8iveiYCzXTEvAkTrATCcPai2wGpB/exec'; // Phase 5: paste Google Apps Script URL here

// Inject CSS
if (!document.querySelector('link[href*="StudentAuth.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'StudentAuth.css';
    document.head.appendChild(link);
}

// ── TOOL REGISTRY (LSSMBB Core) ──────────────────
const TOOL_REGISTRY = {
    // Archetypes: A=Stat, B=Process, C=Risk, D=Strat, E=Improv
    'Tool_BoxPlot.html': { type: 'A', primary: 'Analyze', phases: ['Measure', 'Analyze'], trigger: 'outlier,range,quartiles' },
    'Tool_Histogram.html': { type: 'A', primary: 'Measure', phases: ['Measure', 'Analyze'], trigger: 'skew,modal,capability' },
    'Calculator_ANOVA.html': { type: 'A', primary: 'Analyze', phases: ['Analyze'], trigger: 'anova,variance' },
    'Tool_ANOVA_Premium.html': { type: 'A', primary: 'Analyze', phases: ['Analyze'], trigger: 'anova,variance' },
    'Tool_8Wastes_DOWNTIME.html': { type: 'E', primary: 'Measure', phases: ['Measure', 'Analyze'], trigger: 'waste,downtime,non-value' },
    'Tool_5S_Audit.html': { type: 'E', primary: 'Control', phases: ['Control'], trigger: '5s,audit,standard' },
    'Tool_SIPOC_Premium.html': { type: 'B', primary: 'Define', phases: ['Define'], trigger: 'sipoc,process,scope' },
    'Tool_SOP_Premium.html': { type: 'E', primary: 'Control', phases: ['Control'], trigger: 'sop,standard,compliance' },
    'Tool_QFD_HouseOfQuality.html': { type: 'D', primary: 'Define', phases: ['Define'], trigger: 'qfd,voice,requirement' },
    'Tool_KanoModel.html': { type: 'D', primary: 'Define', phases: ['Define'], trigger: 'kano,delighter,satisfaction' },
    'Tool_PokaYoke_Premium.html': { type: 'E', primary: 'Improve', phases: ['Improve', 'Control'], trigger: 'poka-yoke,error,prevention' },
    'Tool_ChangeMgmt_ADKAR.html': { type: 'D', primary: 'Improve', phases: ['Improve', 'Control'], trigger: 'adkar,change,culture' },
    'Tool_ScatterPlot.html': { type: 'A', primary: 'Analyze', phases: ['Analyze', 'Control'], trigger: 'correlation,trend,linear' },
    'Tool_ParetoAnalysis.html': { type: 'A', primary: 'Analyze', phases: ['Analyze', 'Control'], trigger: 'vital,80/20,critical' },
    'Tool_DistributionPowerLab.html': { type: 'A', primary: 'Measure', phases: ['Measure', 'Analyze'], trigger: 'probability,normal,std' },
    'Tool_HypothesisWizard.html': { type: 'A', primary: 'Analyze', phases: ['Analyze'], trigger: 'p-value,null,alternate' },
    'Tool_HypothesisWizard_Premium.html': { type: 'A', primary: 'Analyze', phases: ['Analyze'], trigger: 'p-value,alpha,beta' },
    'Tool_Forecast.html': { type: 'A', primary: 'Improve', phases: ['Improve', 'Control'], trigger: 'prediction,interval,seasonality' },
    'Tool_MSA_Premium.html': { type: 'A', primary: 'Measure', phases: ['Measure', 'Control'], trigger: 'bias,stability,repeatability' },
    'Tool_DOE_Premium.html': { type: 'A', primary: 'Improve', phases: ['Analyze', 'Improve'], trigger: 'interaction,factor,response' },
    'Tool_AdvancedAnalytics.html': { type: 'A', primary: 'Analyze', phases: ['Analyze', 'Improve'], trigger: 'regression,variance,anova' },
    'Tool_GaugeChart.html': { type: 'A', primary: 'Measure', phases: ['Measure', 'Control'], trigger: 'tolerance,precision,accuracy' },
    'Tool_VSM.html': { type: 'B', primary: 'Measure', phases: ['Measure', 'Improve'], trigger: 'bottleneck,lead,value-add' },
    'Tool_Swimlane_Advanced.html': { type: 'B', primary: 'Measure', phases: ['Measure', 'Improve'], trigger: 'handover,redundancy,queue' },
    'Tool_ProjectCharter_Premium.html': { type: 'B', primary: 'Define', phases: ['Define', 'Control'], trigger: 'scope,objective,milestone' },
    'Tool_GanttChart.html': { type: 'B', primary: 'Improve', phases: ['Define', 'Improve', 'Control'], trigger: 'critical,dependency,timeline' },
    'Tool_RACI_Premium.html': { type: 'B', primary: 'Define', phases: ['Define', 'Improve', 'Control'], trigger: 'accountable,responsible,informed' },
    'Tool_ImplementationPlan_Premium.html': { type: 'B', primary: 'Improve', phases: ['Improve', 'Control'], trigger: 'resource,action,deadline' },
    'Tool_DFMEA_Premium.html': { type: 'C', primary: 'Analyze', phases: ['Define', 'Analyze'], trigger: 'rpn,mitigation,severity' },
    'Tool_DVPR_Premium.html': { type: 'C', primary: 'Control', phases: ['Analyze', 'Control'], trigger: 'validation,test,pass-fail' },
    'Tool_MiniFMEA_Premium.html': { type: 'C', primary: 'Analyze', phases: ['Analyze'], trigger: 'probability,occurrence,detect' },
    'Tool_RiskRegistrar_Premium.html': { type: 'C', primary: 'Analyze', phases: ['Analyze', 'Control'], trigger: 'residual,consequence,level' },
    'Tool_PughMatrix_Premium.html': { type: 'D', primary: 'Analyze', phases: ['Analyze', 'Improve'], trigger: 'selection,baseline,weighted' },
    'Tool_StakeholderAnalysis.html': { type: 'D', primary: 'Define', phases: ['Define', 'Improve'], trigger: 'influence,interest,engagement' },
    'Tool_Benchmarking.html': { type: 'D', primary: 'Measure', phases: ['Measure', 'Analyze'], trigger: 'best-practice,gap,ratio' },
    'Tool_ProjectTriage.html': { type: 'D', primary: 'Define', phases: ['Define'], trigger: 'urgency,impact,priority' },
    'Tool_TeamDynamics.html': { type: 'D', primary: 'Define', phases: ['Define'], trigger: 'storming,norming,cohesion' },
    'Tool_BeforeAfter_Premium.html': { type: 'D', primary: 'Improve', phases: ['Measure', 'Improve', 'Control'], trigger: 'delta,saving,baseline' },
    'Tool_Financials_ROI.html': { type: 'D', primary: 'Improve', phases: ['Define', 'Improve'], trigger: 'payback,investment,npv' },
    'Tool_KaizenPDCA.html': { type: 'E', primary: 'Improve', phases: ['Measure', 'Improve'], trigger: 'plan-do-check-act,incremental' },
    'Tool_KaizenGemba_Premium.html': { type: 'E', primary: 'Measure', phases: ['Measure', 'Analyze'], trigger: 'observation,walk,non-value' },
    'Tool_KaizenPrioritization_Premium.html': { type: 'E', primary: 'Improve', phases: ['Analyze', 'Improve'], trigger: 'impact,effort,pick' },
    'Tool_KaizenVerify_Premium.html': { type: 'E', primary: 'Control', phases: ['Improve', 'Control'], trigger: 'sustain,audit,standardize' },
    'Tool_Improve_Control_Suite.html': { type: 'E', primary: 'Control', phases: ['Improve', 'Control'], trigger: 'monitoring,dash,stabilize' },
    'Tool_LeanWorkshop.html': { type: 'E', primary: 'Improve', phases: ['Improve'], trigger: 'facilitate,engagement,event' },
    'Tool_LeanLeadership.html': { type: 'E', primary: 'Improve', phases: ['Improve', 'Control'], trigger: 'coaching,culture,poka' },
    'Tool_PilotExecution_Premium.html': { type: 'E', primary: 'Improve', phases: ['Improve'], trigger: 'test,rollback,scaling' },
    'Tool_LSS_Fundamentals.html': { type: 'E', primary: 'Define', phases: ['Define', 'Measure'], trigger: 'dmaic,sigma,process' }
};

// ── TOOL-SPECIFIC QUIZ REGISTRY ──────────────────
const TOOL_QUIZ = {
    'Tool_8Wastes_DOWNTIME.html': {
        q1: { type: 'tf', text: "'Defects' represent any work that results in rework or scrap.", ans: "true" },
        q2: { type: 'mcq', text: "Which waste is being addressed by minimizing patient walking distance?", opts: ["Transport", "Motion", "Inventory"], ans: 1 },
        q3: { type: 'mcq', text: "'No-Value' activity in Healthcare typically accounts for up to ____% of a process.", opts: ["10%", "90%", "50%"], ans: 1 },
        q4: { type: 'open', text: "Which DOWNTIME waste was most prevalent in your analysis?" },
        q5: { type: 'open', text: "Propose a countermeasure for the 'Waiting' waste you identified." }
    },
    'Tool_PokaYoke_Premium.html': {
        q1: { type: 'tf', text: "Poka-Yoke is about preventing errors, not just inspecting them.", ans: "true" },
        q2: { type: 'mcq', text: "A 'Prevention' device is superior to a 'Detection' device because it...", opts: ["Stops errors before they happen", "Is cheaper", "Is faster"], ans: 0 },
        q3: { type: 'mcq', text: "In Healthcare, a barcode scan of a patient wristband is a...", opts: ["Check", "Poka-Yoke", "Record"], ans: 1 },
        q4: { type: 'open', text: "Detail the Poka-Yoke you designed. How does it stop human error?" },
        q5: { type: 'open', text: "Why is 'Human Error' a symptom, not the root cause?" }
    },
    'Tool_BoxPlot.html': {
        q1: { type: 'tf', text: "Whiskers represent the full range excluding outliers.", ans: "true" },
        q2: { type: 'mcq', text: "If the Median line is at the bottom of the box, the data is...", opts: ["Positively Skewed", "Negatively Skewed", "Symmetrical"], ans: 0 },
        q3: { type: 'mcq', text: "Non-overlapping boxes between two groups strongly suggest...", opts: ["Significant difference", "No difference", "Equal variance"], ans: 0 },
        q4: { type: 'open', text: "Which group had the highest variability? What is the cause?" },
        q5: { type: 'open', text: "How will you use this chart to prove 'Group B' is failing?" }
    },
    'Tool_Histogram.html': {
        q1: { type: 'tf', text: "A Bimodal distribution suggests data is coming from a single stable source.", ans: "false" },
        q2: { type: 'mcq', text: "If the Histogram tail extends to the far right, it is...", opts: ["Negatively Skewed", "Positively Skewed", "Normal"], ans: 1 },
        q3: { type: 'mcq', text: "A 'Normal' distribution suggests your process is...", opts: ["Predictable/Capable", "Inefficient", "Chaotic"], ans: 0 },
        q4: { type: 'open', text: "Which 'Bin' has the highest frequency? What is the likely cause?" },
        q5: { type: 'open', text: "If data is highly skewed, what healthcare factor is driving the delay?" }
    },
    'Tool_ParetoAnalysis.html': {
        q1: { type: 'tf', text: "80% of effects come from 20% of causes.", ans: "true" },
        q2: { type: 'mcq', text: "The 'Vital Few' are the categories on the _____ of the chart.", opts: ["Left", "Right", "Center"], ans: 0 },
        q3: { type: 'mcq', text: "Strategically, a Pareto Chart helps to...", opts: ["Fix everything", "Prioritize resources", "Document costs"], ans: 1 },
        q4: { type: 'open', text: "Which 2 categories are your 'Vital Few' today?" },
        q5: { type: 'open', text: "What is your #1 countermeasure for the top Pareto item?" }
    },
    'Tool_ScatterPlot.html': {
        q1: { type: 'tf', text: "Correlation does not imply causation.", ans: "true" },
        q2: { type: 'mcq', text: "If data points form a tight upward line, R is close to...", opts: ["-1", "0", "+1"], ans: 2 },
        q3: { type: 'mcq', text: "Strong Negative correlation between 'Staff' and 'Wait' implies...", opts: ["More staff = More wait", "More staff = Less wait", "No link"], ans: 1 },
        q4: { type: 'open', text: "Describe any clusters or trends you see." },
        q5: { type: 'open', text: "How will you test this relationship in a pilot?" }
    },
    'Tool_VSM.html': {
        q1: { type: 'tf', text: "Future State maps must eliminate non-value added time.", ans: "true" },
        q2: { type: 'mcq', text: "'Takt Time' is the rate at which...", opts: ["Machines work", "Process flows", "Customer demands service"], ans: 2 },
        q3: { type: 'mcq', text: "Kaizen bursts on a VSM indicate...", opts: ["Areas needing help", "Success", "Past events"], ans: 0 },
        q4: { type: 'open', text: "What is the 'Lead Time' reduction in your Future State map?" },
        q5: { type: 'open', text: "Identify one 'Push' system in your Current State. How did you fix it?" }
    },
    'Tool_MSA_Premium.html': {
        q1: { type: 'tf', text: "Reproducibility measures variation between different appraisers.", ans: "true" },
        q2: { type: 'mcq', text: "If 'Equipment' variation is higher than 'Appraiser', you must...", opts: ["Retrain staff", "Calibrate device", "Ignore"], ans: 1 },
        q3: { type: 'mcq', text: "A GR&R % of 45% indicates the measurement system is...", opts: ["Pass", "Acceptable", "Unacceptable"], ans: 2 },
        q4: { type: 'open', text: "Is your variation from 'Man' or 'Machine'?" },
        q5: { type: 'open', text: "What SOP needs updating to fix this measurement gap?" }
    },
    'Tool_ProjectCharter_Premium.html': {
        q1: { type: 'tf', text: "The Goal Statement must be SMART (Specific, Measurable, Achievable, Relevant, Timely).", ans: "true" },
        q2: { type: 'mcq', text: "Which section defines the boundaries of what this project will NOT address?", opts: ["Business Case", "Out of Scope", "Stakeholder List"], ans: 1 },
        q3: { type: 'mcq', text: "The primary purpose of a Project Charter is to...", opts: ["Obtain executive authorization", "Track daily tasks", "Hire staff"], ans: 0 },
        q4: { type: 'open', text: "Define your project's 'Big Y' metric. What is the target improvement %?" },
        q5: { type: 'open', text: "Who is your primary 'Executive Sponsor' and what is their role?" }
    },
    'Tool_QFD_HouseOfQuality.html': {
        q1: { type: 'tf', text: "The HOQ maps the correlations between technical requirements.", ans: "true" },
        q2: { type: 'mcq', text: "If a Customer Requirement has a '9' weight and a '3' relationship, the raw score is...", opts: ["12", "27", "3"], ans: 1 },
        q3: { type: 'mcq', text: "The primary goal of QFD is to translate...", opts: ["VOC to Technical Specs", "Cost to Profit", "Tasks to People"], ans: 0 },
        q4: { type: 'open', text: "Which Technical Requirement (HOW) emerged as your top priority?" },
        q5: { type: 'open', text: "How does this requirement directly impact patient satisfaction?" }
    },
    'Tool_KanoModel.html': {
        q1: { type: 'tf', text: "'Delighter' features generate high satisfaction even if they are not fully functional.", ans: "true" },
        q2: { type: 'mcq', text: "If a feature is 'Must-Be', its absence leads to...", opts: ["Extreme Dissatisfaction", "Neutrality", "Satisfaction"], ans: 0 },
        q3: { type: 'mcq', text: "Kano 'One-Dimensional' features provide satisfaction...", opts: ["Linearly with performance", "Suddenly", "Never"], ans: 0 },
        q4: { type: 'open', text: "Identify one 'Delighter' you found. Why is it a delighter?" },
        q5: { type: 'open', text: "As products mature, what happens to 'Delighters' in the Kano model?" }
    },
    'Tool_StakeholderAnalysis.html': {
        q1: { type: 'tf', text: "Stakeholders in 'Keep Satisfied' have high power but low interest.", ans: "true" },
        q2: { type: 'mcq', text: "A 'Resistant' stakeholder with 'High Power' must be...", opts: ["Targeted for close engagement", "Monitored", "Ignored"], ans: 0 },
        q3: { type: 'mcq', text: "The goal of Stakeholder Analysis is to...", opts: ["Manage project buy-in", "List employees", "Track payroll"], ans: 0 },
        q4: { type: 'open', text: "Who is your most 'Critical Stakeholder'? What is your win-win strategy?" },
        q5: { type: 'open', text: "How will you manage the 'Interest' of the influential but skeptical leadership?" }
    },
    'Tool_ProjectTriage.html': {
        q1: { type: 'tf', text: "Triage prioritizes projects based on Urgency and Impact.", ans: "true" },
        q2: { type: 'mcq', text: "A project with 'High Impact' but 'Low Urgency' should be...", opts: ["Done now", "Planned for later", "Dropped"], ans: 1 },
        q3: { type: 'mcq', text: "In Healthcare, 'Risk to Patient' creates...", opts: ["High Urgency", "Low Priority", "Admin Delay"], ans: 0 },
        q4: { type: 'open', text: "Which project was discarded during your triage? Why?" },
        q5: { type: 'open', text: "How do you handle a project that is 'Critical' but 'Impossible'?" }
    },
    'Tool_TeamDynamics.html': {
        q1: { type: 'tf', text: "In the 'Storming' phase, conflict is natural and necessary.", ans: "true" },
        q2: { type: 'mcq', text: "At which stage does the team achieve maximum analytical synergy?", opts: ["Forming", "Norming", "Performing"], ans: 2 },
        q3: { type: 'mcq', text: "Which stage focuses on goal alignment and consensus?", opts: ["Forming", "Storming", "Norming"], ans: 2 },
        q4: { type: 'open', text: "In which stage is your current team? What is the evidence?" },
        q5: { type: 'open', text: "What is your primary leadership role during 'Storming'?" }
    },
    'Tool_Financials_ROI.html': {
        q1: { type: 'tf', text: "NPV accounts for the time-value of money.", ans: "true" },
        q2: { type: 'mcq', text: "If Cost is $10k and Annual Saving is $20k, Payback is...", opts: ["6 months", "2 years", "1 month"], ans: 0 },
        q3: { type: 'mcq', text: "ROI % calculates...", opts: ["Profit", "(Gain - Cost)/Cost", "Effort"], ans: 1 },
        q4: { type: 'open', text: "Calculate your project's 3-year ROI." },
        q5: { type: 'open', text: "What is the biggest 'Soft Saving' you identified?" }
    }
};

// ── SENSEI PENTAGON QUIZ REGISTRY (Archetype Fallback) ──
const ARCHETYPE_QUIZ = {
    'A': { // Statistical
        q1: { type: 'tf', text: "A process is statistically stable only if no data points exceed the +/- 3 Sigma control limits.", ans: "true" },
        q2: { type: 'mcq', text: "Which metric best represents the central tendency and target accuracy of your data?", opts: ["Mean", "Standard Deviation", "Range", "Variance"], ans: 0 },
        q3: { type: 'mcq', text: "The primary Healthcare goal of this statistical tool is to...", opts: ["Reduce Cost", "Eliminate variation-based errors", "Increase Speed"], ans: 1 },
        q4: { type: 'open', text: "What specific outlier or variation pattern did you observe in your charts?", min: 15 },
        q5: { type: 'open', text: "What specific control or improvement is needed to move the Sigma level?" }
    },
    'B': { // Process
        q1: { type: 'tf', text: "Cycle Time represents the total time from start to finish, including all wait times.", ans: "false" }, // False: Lead Time
        q2: { type: 'mcq', text: "Which element represents the most critical bottleneck in your current process map?", opts: ["Staff Count", "Longest Cycle Time Step", "Admin Delay"], ans: 1 },
        q3: { type: 'mcq', text: "Eliminating Non-Value-Add (NVA) steps primarily improves...", opts: ["Patient Throughput", "Revenue", "Staff Stress"], ans: 0 },
        q4: { type: 'open', text: "Where exactly is the biggest bottleneck or 'wait time' in this flow?", min: 15 },
        q5: { type: 'open', text: "What is the first step in your implementation plan to streamline this flow?" }
    },
    'C': { // Risk
        q1: { type: 'tf', text: "The Risk Priority Number (RPN) is calculated by multiplying Severity x Occurrence x Detection.", ans: "true" },
        q2: { type: 'mcq', text: "Which specific risk factor should be prioritized for immediate action?", opts: ["High Severity", "High RPN", "Low Detection"], ans: 1 },
        q3: { type: 'mcq', text: "The primary goal of FMEA in Healthcare is to...", opts: ["Identify Mistakes", "Prevent patient harm", "Assign blame"], ans: 1 },
        q4: { type: 'open', text: "Which specific risk factor did you identify as the most critical and why?", min: 15 },
        q5: { type: 'open', text: "What is your primary mitigation strategy to bring the RPN to an acceptable level?" }
    },
    'D': { // Strategic
        q1: { type: 'tf', text: "A Pugh Matrix is used to objectively compare multiple improvement concepts against a baseline.", ans: "true" },
        q2: { type: 'mcq', text: "Which component of ADKAR represents the student's motivation for change?", opts: ["Knowledge", "Awareness", "Desire"], ans: 2 },
        q3: { type: 'mcq', text: "The primary goal of Stakeholder Engagement is to...", opts: ["Manage Politics", "Ensure buy-in and sustainability", "Assign tasks"], ans: 1 },
        q4: { type: 'open', text: "What critical synthesis or trend did you identify from your strategic findings?", min: 15 },
        q5: { type: 'open', text: "What is the most important executive decision that must be made next?" }
    },
    'E': { // Improvement
        q1: { type: 'tf', text: "Kaizen events are designed for major transformations that take 6+ months to implement.", ans: "false" },
        q2: { type: 'mcq', text: "Which of the 8 Wastes is being addressed by minimizing patient motion?", opts: ["Transportation", "Motion", "Waiting"], ans: 1 },
        q3: { type: 'mcq', text: "Visual Management primarily helps teams to...", opts: ["Monitor KPIs", "Identify Abnormalities instantly", "Assign shifts"], ans: 1 },
        q4: { type: 'open', text: "What was the single biggest 'Muda' (Waste) uncovered in your analysis?", min: 15 },
        q5: { type: 'open', text: "How will you sustain the improvements gained from this Kaizen activity?" }
    }
};

// ── BOOT ─────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    // Inject CSS
    _injectAsset('link', { rel: 'stylesheet', href: 'StudentAuth.css' });

    // Inject Font Awesome if missing
    if (!document.querySelector('link[href*="font-awesome"]'))
        _injectAsset('link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css' });

    // Inject Google Fonts if missing
    if (!document.querySelector('link[href*="fonts.googleapis"]'))
        _injectAsset('link', { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Orbitron:wght@400;500;600;700;800;900&display=swap" });

    // Track tool interactions (for scoring)
    window._lssInteracted = false;
    document.body.addEventListener('click', e => {
        const tag = e.target.tagName;
        if (['INPUT','BUTTON','SELECT','TEXTAREA'].includes(tag)) {
            if (!e.target.closest('#lss-login-overlay') && !e.target.closest('#lss-identity-pill'))
                window._lssInteracted = true;
        }
    });

    // Build the login modal (always inject into DOM)
    _buildLoginModal();

    // Check for existing profile
    const profile = _getProfile();
    if (!profile) {
        document.getElementById('lss-login-overlay').style.display = 'flex';
    } else {
        _initUI(profile);
        _buildCommandHub(); // Deploy the MBB Command Hub
    }
});

// ── HELPERS ──────────────────────────────────────
function _injectAsset(tag, attrs) {
    const el = document.createElement(tag);
    Object.entries(attrs).forEach(([k, v]) => el[k] = v);
    document.head.appendChild(el);
}

function _getProfile() {
    try { return JSON.parse(localStorage.getItem('LSS_Profile')); } catch { return null; }
}

function _getProgress() {
    try { return JSON.parse(localStorage.getItem('LSS_Progress')) || {}; } catch { return {}; }
}

function _getToolName() {
    return document.title.split('|')[0].trim() || 'This Tool';
}

function _getToolKey() {
    return window.location.pathname.split('/').pop() || '';
}

// ── SENSEI MBB COMMAND HUB ────────────────────────
function _buildCommandHub() {
    // Only show Hub on tool pages, not Dashboard or Certificate
    const path = window.location.pathname.toLowerCase();
    if (path.includes('dashboard') || path.includes('certificate')) return;

    const existing = document.getElementById('lss-command-hub');
    if (existing) existing.remove();

    const toolName = _getToolName();
    const progress = _getProgress();
    const isSubmitted = progress[toolName] && progress[toolName].reportHtml;

    const hub = document.createElement('div');
    hub.id = 'lss-command-hub';
    
    // Position persistence
    const savedPos = localStorage.getItem('LSS_HubPos');
    if (savedPos) {
        try {
            const { left, top } = JSON.parse(savedPos);
            hub.style.left = left;
            hub.style.top = top;
            hub.style.right = 'auto';
            hub.style.bottom = 'auto';
        } catch(e) {}
    }

    hub.innerHTML = `
        <div class="hub-header">SENSEI MBB CONTROL</div>
        <div class="hub-grid">
            <button class="hub-quadrant q-submit" id="hub-q-submit" title="Submit Assessment for Validation">
                <i class="fas fa-bullseye"></i>
                <span>Submit Verification</span>
            </button>
            <button class="hub-quadrant q-refine ${isSubmitted ? '' : 'disabled'}" id="hub-q-refine" title="Edit your analysis and response">
                <i class="fas fa-edit"></i>
                <span>Edit your response</span>
            </button>
            <button class="hub-quadrant q-dash" id="hub-q-dash" title="Open Master Portfolio">
                <i class="fas fa-chart-line"></i>
                <span>Strategic Dashboard</span>
            </button>
            <button class="hub-quadrant q-report ${isSubmitted ? '' : 'disabled'}" id="hub-q-audit" title="View surgical analysis record">
                <i class="fas fa-file-contract"></i>
                <span>View Audit Report</span>
            </button>
        </div>
        <div class="hub-footer">
            <div class="mode-switcher">
                <button onclick="lssSetTheme('day')" title="Corporate Tech (Day)"><i class="fas fa-sun"></i></button>
                <button onclick="lssSetTheme('twilight')" title="Twilight Horizon (Balanced)"><i class="fas fa-moon"></i></button>
                <button onclick="lssSetTheme('night')" title="Futuristic Studio (Night)"><i class="fas fa-rocket"></i></button>
            </div>
        </div>

    `;

    document.body.appendChild(hub);

    // Bind Actions
    document.getElementById('hub-q-submit').onclick = () => lssSubmitProgress();
    document.getElementById('hub-q-dash').onclick = () => window.location.href = 'Student_Dashboard.html';

    const refineBtn = document.getElementById('hub-q-refine');
    const auditBtn = document.getElementById('hub-q-audit');

    if (isSubmitted) {
        // Refine Phase: Return to Tool for Editing first
        refineBtn.onclick = () => {
            // Close any open modals
            document.getElementById('lss-success-modal').style.display = 'none';
            document.getElementById('lss-sensei-modal').style.display = 'none';
            // Scroll to tool inputs
            window.scrollTo({ top: 0, behavior: 'smooth' });
            // Sensei Guidance
            const banner = document.getElementById('lss-sensei-banner');
            if (banner) banner.innerHTML = `"Master, Research your data carefully. Once your tool inputs are refined, use the <strong>🎯 Submit Verification</strong> quadrant to re-examine your logic."`;
        };

        auditBtn.onclick = () => {
            _openReportPreview(progress[toolName].reportHtml, toolName);
        };
    } else {
        refineBtn.onclick = () => alert("Initiate 'Submit Verification' first to enable Refinement.");
        auditBtn.onclick = () => alert("Audit Report generates after Master Validation.");
    }

    // Hide standard submit to prevent UI clutter
    const oldBtn = document.getElementById('lss-submit-btn');
    if (oldBtn) oldBtn.style.display = 'none';

    // Initialize Draggable Logic
    _initDraggable(hub, hub.querySelector('.hub-header'));
}

function _initDraggable(el, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    handle.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
        el.style.right = 'auto';
        el.style.bottom = 'auto';
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        // Save Position
        localStorage.setItem('LSS_HubPos', JSON.stringify({
            top: el.style.top,
            left: el.style.left
        }));
    }
}

// ── THEME SWITCHER ──────────────────────────────
window.lssSetTheme = function(theme) {
    document.body.classList.remove('theme-day', 'theme-night', 'theme-twilight');
    if (theme === 'day') document.body.classList.add('theme-day');
    else if (theme === 'night') document.body.classList.add('theme-night');
    else if (theme === 'twilight') document.body.classList.add('theme-twilight');
    
    // Persist preference
    localStorage.setItem('LSS_Theme', theme);
    
    // Sync UI if there are local setTheme functions on pages
    if (typeof window.setTheme === 'function') {
        window.setTheme(theme);
    }
};

// Apply saved theme on load
(function() {
    const saved = localStorage.getItem('LSS_Theme');
    if (saved) {
        document.addEventListener('DOMContentLoaded', () => lssSetTheme(saved));
    }
})();

function _getToolInfo() {

    const key = _getToolKey();
    return TOOL_REGISTRY[key] || null;
}

function _generateStudentId() {
    const year = new Date().getFullYear();
    const rand = Math.floor(1000 + Math.random() * 9000);
    return `STU-${year}-${rand}`;
}

// ── LOGIN MODAL ──────────────────────────────────
function _buildLoginModal() {
    const html = `
    <div id="lss-login-overlay">
        <div class="lss-login-card">
            <div class="lss-login-brand">
                <div class="brand-icon">⚡</div>
                <h2>Student Portal</h2>
                <p>Track your Lean Six Sigma mastery journey</p>
            </div>

            <div class="lss-field-group">
                <label>Full Name</label>
                <input type="text" id="lss-f-name" class="lss-field-input" placeholder="e.g. Ahmed Al-Dhaheri" autocomplete="name">
                <i class="fas fa-user field-icon"></i>
            </div>

            <div class="lss-field-group">
                <label>Email</label>
                <input type="email" id="lss-f-email" class="lss-field-input" placeholder="e.g. ahmed@company.com" autocomplete="email">
                <i class="fas fa-envelope field-icon"></i>
            </div>

            <div class="lss-field-group">
                <label>Organization</label>
                <input type="text" id="lss-f-org" class="lss-field-input" placeholder="e.g. Ministry of Health" autocomplete="organization">
                <i class="fas fa-building field-icon"></i>
            </div>

            <div class="lss-field-group">
                <label>Target Belt</label>
                <select id="lss-f-belt" class="lss-field-select">
                    <option value="Yellow Belt">🟡 Yellow Belt</option>
                    <option value="Green Belt" selected>🟢 Green Belt</option>
                    <option value="Black Belt">⚫ Black Belt</option>
                    <option value="Master Black Belt">🏆 Master Black Belt</option>
                </select>
                <i class="fas fa-award field-icon"></i>
            </div>

            <button class="lss-login-btn" onclick="lssSignIn()">
                <i class="fas fa-rocket"></i> Start My Journey
            </button>

            <div class="lss-login-footer">
                <i class="fas fa-shield-halved"></i> Your progress is saved locally & synced to your instructor.<br>
                No password required — just your name to get started.
            </div>
        </div>
    </div>

    <!-- SENSEI MBB CONSULTATION MODAL -->
    <div id="lss-sensei-modal">
        <div class="lss-modal-content">
            <!-- PORTAL TOP BAR -->
            <div class="portal-header">
                <div class="portal-brand">
                    <div class="mbb-badge-mini">MBB</div>
                    <div class="portal-title">Master Black Belt Verification Portal</div>
                </div>
                <div class="portal-header-actions">
                    <i class="far fa-bell" style="color: #64748B; cursor: pointer;"></i>
                    <div id="lss-user-initials" style="width: 32px; height: 32px; background: #E2E8F0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #475569;">MBB</div>
                    <button class="portal-close-btn" onclick="document.getElementById('lss-sensei-modal').style.display='none'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>

            <div class="portal-main">
                <!-- SIDEBAR: MASTERY PILLARS -->
                <div class="portal-sidebar">
                    <div class="sidebar-label">Verification Progress</div>
                    
                    <div class="pillar-item done">
                        <div class="pillar-num">1</div>
                        <div class="pillar-info">
                            <h4>Technical Mastery</h4>
                            <div class="pillar-desc">
                                <i class="fas fa-database"></i> Complete 100% of required tool data inputs.
                            </div>
                        </div>
                    </div>

                    <div class="pillar-item active">
                        <div class="pillar-num">2</div>
                        <div class="pillar-info">
                            <h4>Analytical Rigor</h4>
                            <div class="pillar-desc">
                                <i class="fas fa-microscope"></i> Achieve high precision in logic verification.
                            </div>
                        </div>
                    </div>

                    <div class="pillar-item">
                        <div class="pillar-num">3</div>
                        <div class="pillar-info">
                            <h4>Synthesis & Influence</h4>
                            <div class="pillar-desc">
                                <i class="fas fa-brain"></i> Provide expert-level reflection and assessment.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- MAIN CONTENT AREA -->
                <div class="portal-body">
                    <div class="content-header">Verification Questions | Section 2: Analytical Rigor</div>
                    
                    <div class="sensei-message" id="lss-sensei-banner">
                        "Reflect deeply, Master. Accuracy is the foundation of Black Belt excellence."
                    </div>

                    <div id="lss-quiz-container">
                        <!-- Questions injected here -->
                    </div>

                    <div class="quiz-question-box" style="margin-top:20px; border-top:1px solid #E2E8F0; padding-top:25px;">
                        <label>Synthesis Self-Assessment</label>
                        <p style="font-size:14px; color:#475569; margin-bottom:15px;">Rate your confidence in the strategic application of this tool.</p>
                        <div class="star-rating">
                            <input type="radio" id="star5" name="lss-stars" value="5"><label for="star5" title="Mastery"></label>
                            <input type="radio" id="star4" name="lss-stars" value="4"><label for="star4" title="Proficient"></label>
                            <input type="radio" id="star3" name="lss-stars" value="3" checked><label for="star3" title="Developing"></label>
                            <input type="radio" id="star2" name="lss-stars" value="2"><label for="star2" title="Needs Attention"></label>
                            <input type="radio" id="star1" name="lss-stars" value="1"><label for="star1" title="Novice"></label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- PORTAL FOOTER -->
            <div class="portal-footer">
                <button class="btn-portal-white" onclick="document.getElementById('lss-sensei-modal').style.display='none'">Cancel</button>
                <button class="btn-portal-blue" onclick="lssConsultSensei()" id="lss-sensei-submit-btn">
                    Master Verdict <i class="fas fa-arrow-right" style="margin-left:8px;"></i>
                </button>
            </div>
        </div>
    </div>

    <!-- GENERATING OVERLAY -->
    <div id="lss-generating-overlay" style="background: rgba(248, 250, 252, 0.9);">
        <div class="generating-spinner" style="border-top-color: #2563EB;"></div>
        <div class="generating-text" style="color: #0F172A;">CALCULATING MASTER VERDICT</div>
        <div class="generating-sub">The Master is evaluating your analytical synthesis...</div>
    </div>

    <!-- SUCCESS MODAL (WIDE EXECUTIVE VERDICT) -->
    <div id="lss-success-modal">
        <div class="success-card">
            <div class="verdict-left">
                <div class="score-orbit">
                    <div class="score-inner">
                        <span id="lss-success-score">0%</span>
                        <label>Verified Mastery</label>
                    </div>
                </div>
                <div class="badge-pill" id="lss-success-badge" style="margin-top:25px; margin-bottom:0;">Determining...</div>
                
                <div style="margin-top:40px; text-align:center;">
                    <div style="font-size:10px; font-weight:800; color:#94A3B8; text-transform:uppercase; letter-spacing:1px; margin-bottom:10px;">Audit Integrity</div>
                    <div style="display:flex; justify-content:center; gap:8px;">
                        <i class="fas fa-shield-check" style="color:#10B981;"></i>
                        <i class="fas fa-database" style="color:#2563EB;"></i>
                        <i class="fas fa-lock" style="color:#64748B;"></i>
                    </div>
                </div>
            </div>
            <div class="verdict-right">
                <div class="verdict-header">
                    <h2>Sensei's Verdict Received</h2>
                    <p>Your LSSMBB institutional audit trail has been successfully finalized with high-fidelity verification.</p>
                </div>
                
                <div id="lss-modal-audit-reveal">
                    <!-- Performance Breakdown & Gaps injected here -->
                </div>

                <div class="verdict-footer" style="display:flex; align-items:center; gap:20px; margin-top:30px; padding-top:25px; border-top:1px solid #E2E8F0;">
                    <button class="action-main" onclick="document.getElementById('lss-success-modal').style.display='none'">
                        <i class="fas fa-check-circle" style="margin-right:8px;"></i> Acknowledge
                    </button>
                    <button id="lss-view-report-btn" class="btn-portal-white" style="border:1px solid #E2E8F0; padding:12px 20px;">
                        <i class="fas fa-file-pdf" style="margin-right:8px;"></i> View Audit Dossier
                    </button>
                    <div style="flex:1; text-align:right;">
                         <i id="lss-redo-analysis-btn" class="fas fa-sync" style="color:#CBD5E1; cursor:pointer;" title="Re-run Master Verification"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('beforeend', html);
}

// ── SIGN IN ──────────────────────────────────────
function lssSignIn() {
    const name  = document.getElementById('lss-f-name').value.trim();
    const email = document.getElementById('lss-f-email').value.trim();
    const org   = document.getElementById('lss-f-org').value.trim();
    const belt  = document.getElementById('lss-f-belt').value;

    if (!name) { _shake('lss-f-name'); return; }

    const profile = {
        id:    _generateStudentId(),
        name,
        email,
        org,
        belt,
        joined: new Date().toISOString()
    };

    // Check if returning student (by email)
    const existing = _getProfile();
    if (existing && existing.email === email) {
        profile.id = existing.id;
        profile.joined = existing.joined;
    }

    localStorage.setItem('LSS_Profile', JSON.stringify(profile));
    document.getElementById('lss-login-overlay').style.display = 'none';
    _initUI(profile);
}

function _shake(id) {
    const el = document.getElementById(id);
    el.style.borderColor = '#ef4444';
    el.style.animation = 'shake 0.4s ease';
    el.focus();
    setTimeout(() => { el.style.animation = ''; el.style.borderColor = ''; }, 500);
}

function _initUI(profile) {
    // Identity Pill removed as requested - MBB Command Hub is now the active action center.
}

// ── EDIT PROFILE ─────────────────────────────────
function lssEditProfile() {
    const p = _getProfile() || {};
    document.getElementById('lss-f-name').value  = p.name  || '';
    document.getElementById('lss-f-email').value = p.email || '';
    document.getElementById('lss-f-org').value   = p.org   || '';
    document.getElementById('lss-f-belt').value  = p.belt  || 'Green Belt';
    document.getElementById('lss-login-overlay').style.display = 'flex';
}

// ============================================================
// PHASE 3: SUBMIT & REPORT ENGINE
// ============================================================

function lssSubmitProgress() {
    const toolName = _getToolName();
    const progress = _getProgress();
    const hasPriorSubmission = progress[toolName] && progress[toolName].reportHtml;

    // The Exam always happens here
    const toolKey = _getToolKey();
    const toolInfo = _getToolInfo() || { type: 'A' };
    const quiz = TOOL_QUIZ[toolKey] || ARCHETYPE_QUIZ[toolInfo.type] || ARCHETYPE_QUIZ['A'];
    
    const container = document.getElementById('lss-quiz-container');
    container.innerHTML = '';

    // If this is a refinement (already submitted once), restore old answers
    const prevAnswers = hasPriorSubmission ? (progress[toolName].masteryQuiz || {}) : {};
    const banner = document.getElementById('lss-sensei-banner');
    
    if (hasPriorSubmission && banner) {
        banner.innerHTML = `"Master, I have restored your previous responses. <strong>Refine your logic</strong> based on your updated tool data to reach 🏆 Mastery."`;
        banner.style.background = '#fef3c7';
        banner.style.borderColor = '#f59e0b';
    } else if (banner) {
        banner.innerHTML = `"Reflect deeply, Master. Accuracy is the foundation of Black Belt excellence."`;
        banner.style.background = '';
        banner.style.borderColor = '';
    }

    // Inject Quiz HTML
    Object.keys(quiz).forEach((k, i) => {
        const q = quiz[k];
        const oldVal = prevAnswers[k] || '';
        const qBox = document.createElement('div');
        qBox.className = 'quiz-question-box';
        qBox.innerHTML = `<label>TEST ${i+1}: ${q.type.toUpperCase()}</label>
                          <p>${q.text}</p>`;
        
        if (q.type === 'tf') {
            qBox.innerHTML += `
                <div class="portal-options" id="lss-q-${k}">
                    <label class="option-pill">
                        <input type="radio" name="lss-radio-${k}" value="true" ${oldVal === 'true' ? 'checked' : ''}>
                        <span class="option-box">A) True</span>
                    </label>
                    <label class="option-pill">
                        <input type="radio" name="lss-radio-${k}" value="false" ${oldVal === 'false' ? 'checked' : ''}>
                        <span class="option-box">B) False</span>
                    </label>
                </div>`;
        } else if (q.type === 'mcq') {
            const letters = ['A', 'B', 'C', 'D'];
            qBox.innerHTML += `
                <div class="portal-options" id="lss-q-${k}">
                    ${q.opts.map((o, idx) => `
                        <label class="option-pill">
                            <input type="radio" name="lss-radio-${k}" value="${idx}" ${oldVal == idx ? 'checked' : ''}>
                            <span class="option-box">${letters[idx]}) ${o}</span>
                        </label>
                    `).join('')}
                </div>`;
        } else {
            qBox.innerHTML += `
                <textarea id="lss-q-${k}" class="lss-field-input" placeholder="Type your expert analysis here..." style="width:100%; height:100px; padding:15px;">${oldVal}</textarea>`;
        }
        container.appendChild(qBox);
    });

    // Populate dynamic initials
    const prof = _getProfile();
    const initials = prof?.name ? prof.name.split(' ').map(n=>n[0]).join('').toUpperCase() : 'MBB';
    const initEl = document.getElementById('lss-user-initials');
    if (initEl) initEl.innerText = initials;

    // --- Dynamically Update Side Pillars based on current state ---
    const scanData = _scanPage();
    const allInputs = document.querySelectorAll('input, select, textarea');
    // Filter out modal inputs themselves dynamically
    let modalInputCount = document.getElementById('lss-sensei-modal') ? document.getElementById('lss-sensei-modal').querySelectorAll('input, select, textarea').length : 0;
    let hubInputCount = document.getElementById('lss-command-hub') ? document.getElementById('lss-command-hub').querySelectorAll('input, select, textarea').length : 0;
    let loginInputCount = document.getElementById('lss-login-overlay') ? document.getElementById('lss-login-overlay').querySelectorAll('input, select, textarea').length : 0;
    const totalInputs = Math.max(1, allInputs.length - (modalInputCount + hubInputCount + loginInputCount));
    
    const filledInputs = scanData.inputs.length;
    const completionRate = Math.min(filledInputs / totalInputs, 1);
    const p1_percent = Math.round(completionRate * 100);

    const pillars = document.querySelectorAll('.pillar-item');
    if (pillars.length >= 3) {
        // Pillar 1: Technical Mastery
        pillars[0].className = p1_percent === 100 ? 'pillar-item done' : (p1_percent > 0 ? 'pillar-item active' : 'pillar-item');

        // Pillar 2: Exam (Previous or Pending)
        const p2_percent = hasPriorSubmission ? Math.round((progress[toolName].breakdown.exam / 50) * 100) : 0;
        pillars[1].className = p2_percent > 0 ? 'pillar-item done' : 'pillar-item active';

        // Pillar 3: Synthesis (Previous or Pending)
        const p3_percent = hasPriorSubmission ? Math.round((progress[toolName].breakdown.synthesis / 20) * 100) : 0;
        pillars[2].className = p3_percent > 0 ? 'pillar-item done' : 'pillar-item';
    }

    // Show Exam
    document.getElementById('lss-sensei-modal').style.display = 'flex';
}

function lssConsultSensei() {
    const toolName = _getToolName();
    const toolKey = _getToolKey();
    const toolInfo = _getToolInfo() || { type: 'A' };
    const quiz = TOOL_QUIZ[toolKey] || ARCHETYPE_QUIZ[toolInfo.type] || ARCHETYPE_QUIZ['A'];
    
    const modal = document.getElementById('lss-sensei-modal');
    modal.style.display = 'none';

    // Step 1: Score the Quiz (Tier 2: 40%)
    let quizPoints = 0;
    const studentAnswers = {};
    const incorrectQuestions = [];

    Object.keys(quiz).forEach(k => {
        const q = quiz[k];
        let val = '';

        if (q.type === 'tf' || q.type === 'mcq') {
            const checked = document.querySelector(`input[name="lss-radio-${k}"]:checked`);
            val = checked ? checked.value : '';
        } else {
            val = document.getElementById(`lss-q-${k}`).value.trim();
        }
        
        studentAnswers[k] = val;

        if (q.type === 'tf' || q.type === 'mcq') {
            if (val == q.ans) {
                quizPoints += 8;
            } else {
                let masterAns = q.ans;
                if (q.type === 'mcq') masterAns = q.opts[q.ans];
                incorrectQuestions.push({ q: q.text, user: (q.type === 'mcq' ? q.opts[val] : val), master: masterAns });
            }
        } else {
            // Open Response logic (8 pts each)
            const words = val.split(/\s+/).filter(w => w.length > 2);
            if (words.length >= 15) quizPoints += 8;
            else {
                if (words.length >= 5) quizPoints += 4;
                else if (words.length > 0) quizPoints += 1;
                incorrectQuestions.push({ q: q.text, user: val || "No reflection provided", master: "Master level synthesis requires 15+ deep analytical words." });
            }
        }
    });

    // Get reflection score
    const starEl = document.querySelector('input[name="lss-stars"]:checked');
    const stars = starEl ? parseInt(starEl.value) : 3;

    // Show processing
    const overlay = document.getElementById('lss-generating-overlay');
    overlay.style.display = 'flex';

    // Step 2: Scan Tool Data
    const data = _scanPage();
    data.masteryQuiz = studentAnswers; // Store for report

    // Step 3: 3-PILLAR CALCULATION (Completion 30% | Exam 50% | Synthesis 20%)
    setTimeout(() => {
        // Calculate Pillar 1: Completion (Fields filled vs total)
        const totalInputs = document.querySelectorAll('input, select, textarea').length - 5; 
        const filledInputs = data.inputs.length;
        const completionRate = Math.min(filledInputs / (totalInputs || 1), 1);
        const p1_points = completionRate * 30;

        // Calculate Pillar 2: Exam (quizPoints was out of 40, now re-scale to 50)
        const p2_points = (quizPoints / 40) * 50;

        // Calculate Pillar 3: Synthesis (Synthesis depth/stars)
        const p3_points = (stars / 5) * 20;
        
        const score = _calculateScore(data, p1_points, p2_points, p3_points);
        score.gaps = incorrectQuestions; // Audit log
        
        // Add metadata for Sheets Sync
        data.stars = stars;
        data.interacted = window._lssInteracted ? 'Yes' : 'No';
        data.keyTakeaway = studentAnswers['q5'] || studentAnswers['q4'] || 'General Analysis';
        
        const reportHtml = _buildReport(data, score);
        
        _saveProgress(toolName, score, reportHtml);
        _syncToSheets(toolName, score, data);

        overlay.style.display = 'none';
        _buildCommandHub(); // Refresh Hub states
        _showSuccessModal(score, reportHtml, toolName);
    }, 2800);
}

function _saveProgress(toolName, score, reportHtml) {
    const progress = _getProgress();
    const toolInfo = _getToolInfo() || { type: 'A', primary: 'General', phases: ['General'] };

    progress[toolName] = {
        score: score.total,
        badge: score.badge,
        breakdown: score.breakdown,
        date: new Date().toISOString(),
        reportHtml: reportHtml,
        result: score.result,
        type: toolInfo.type,
        primaryPhase: toolInfo.primary,
        eligiblePhases: toolInfo.phases,
        toolFile: _getToolKey()
    };
    localStorage.setItem('LSS_Progress', JSON.stringify(progress));

    // Update button state in the UI
    const btn = document.getElementById('lss-submit-btn');
    if (btn) {
        btn.classList.add('completed');
        btn.innerHTML = '<i class="fas fa-check-circle"></i> View Report';
    }
}

// ── SUCCESS MODAL LOGIC ─────────────────────────
function _showSuccessModal(score, reportHtml, toolName) {
    const modal = document.getElementById('lss-success-modal');
    const scoreEl = document.getElementById('lss-success-score');
    const badgeEl = document.getElementById('lss-success-badge');
    const reportBtn = document.getElementById('lss-view-report-btn');

    modal.style.display = 'flex';
    badgeEl.innerText = score.badge;
    scoreEl.style.color = score.color;
    badgeEl.style.color = score.color;

    // Result Label (PASS/FAIL) — Executive Stamp Utility
    const resultHtml = `
        <div id="lss-verdict-result" style="
            margin-top:25px; 
            font-family: 'Orbitron', sans-serif; 
            font-size: 14px; 
            font-weight: 900; 
            color: #fff; 
            letter-spacing: 2px;
            text-align: center;
            background: ${score.resultColor};
            padding: 10px 20px;
            border-radius: 50px;
            box-shadow: 0 4px 15px ${score.resultColor}44;
            display: inline-block;
            text-transform: uppercase;
            border: 1px solid rgba(255,255,255,0.2);
        ">
            <i class="fas ${score.result === 'PASS' ? 'fa-check-double' : 'fa-times-circle'}" style="margin-right:8px;"></i>
            ${score.result} VERDICT
        </div>
    `;
    const existingResult = document.getElementById('lss-verdict-result');
    if (existingResult) existingResult.remove();
    badgeEl.insertAdjacentHTML('afterend', `<div style="text-align:center;">${resultHtml}</div>`);

    // Enterprise-Grade Mastery Reveal (Executive Blue)
    let auditHtml = `
        <div class="verdict-pillars">
            ${[
                {label: 'Technical', val: score.breakdown.completion, max: 30},
                {label: 'Analytical', val: score.breakdown.exam, max: 50},
                {label: 'Synthesis', val: score.breakdown.synthesis, max: 20}
            ].map(p => `
                <div class="pillar-score-box">
                    <label>${p.label}</label>
                    <div class="score-val">${p.val}<span style="font-size:12px; color:#94A3B8; margin-left:4px;">/${p.max}</span></div>
                </div>
            `).join('')}
        </div>
    `;

    if (score.gaps && score.gaps.length > 0) {
        auditHtml += `
            <div style="margin-top:15px;">
                <p style="color:#64748B; font-size:11px; font-weight:800; text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;">Critical Verification Gaps Found (${score.gaps.length})</p>
                <div style="max-height:240px; overflow-y:auto; padding-right:10px; display:grid; grid-template-columns: repeat(${score.gaps.length > 3 ? 2 : 1}, 1fr); gap:10px;">
                    ${score.gaps.map(gap => `
                        <div style="padding:12px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; display:flex; flex-direction:column; gap:6px;">
                            <p style="font-size:11px; font-weight:600; color:#475569; margin:0; line-height:1.4; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">${gap.q}</p>
                            <div style="font-size:10px; color:#DC2626; font-weight:800; background:rgba(239, 68, 68, 0.08); padding:4px 8px; border-radius:4px; border-left:3px solid #EF4444;">
                                 MASTER LOGIC: ${gap.master}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        auditHtml += `
            <div style="background:#F0FDF4; border:1px solid #DCFCE7; padding:20px; border-radius:16px; text-align:center; display:flex; align-items:center; gap:20px;">
                <div style="font-size:24px;">🏆</div>
                <div style="text-align:left;">
                    <p style="color:#16A34A; font-size:14px; font-weight:700; margin:0;">Master Integrity Verified</p>
                    <p style="color:#16A34A; font-size:12px; margin-top:2px;">Zero logic discrepancies detected in the verification audit.</p>
                </div>
            </div>
        `;
    }
    auditHtml += `</div>`;

    // Inject into new reveal area
    const auditDiv = document.getElementById('lss-modal-audit-reveal');
    if (auditDiv) auditDiv.innerHTML = auditHtml;

    // Animate the score
    _animateValue(scoreEl, 0, score.total, 1200);

    // Setup report button
    reportBtn.onclick = () => {
        _openReportPreview(reportHtml, toolName);
    };

    // Setup redo button
    const redoBtn = document.getElementById('lss-redo-analysis-btn');
    if (redoBtn) {
        if (score.total < 90) {
            redoBtn.innerHTML = '<i class="fas fa-edit"></i> 🔄 Refine Reflections for Mastery';
            redoBtn.style.color = '#fff';
        } else {
            redoBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Re-Run Analysis (Update Score)';
            redoBtn.style.background = 'rgba(59, 130, 246, 0.05)';
            redoBtn.style.color = '#3b82f6';
        }

        redoBtn.onclick = () => {
            modal.style.display = 'none';
            lssSubmitProgress(true); // Signal force redo
        };
    }
}

function _animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const val = Math.floor(progress * (end - start) + start);
        obj.innerText = val + "%";
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ── PAGE SCANNER ─────────────────────────────────
function _scanPage() {
    const data = {
        title: '',
        inputs: [],
        charts: [],
        tables: [],
        stats: [],
        interpretations: [],
        verdicts: [],
        recommendations: [],
        processMaps: [],
        canvasImages: [],
        summaries: []
    };

    // 1. Title
    const h1 = document.querySelector('.container h1, h1');
    data.title = h1 ? h1.textContent.trim().replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim() : _getToolName();

    // 2. Input fields with values (Surgically Filtered)
    document.querySelectorAll('input, textarea, select').forEach(el => {
        if (el.closest('#lss-login-overlay') || el.closest('#lss-command-hub') || el.closest('#lss-sensei-modal')) return;
        
        const val = el.value ? el.value.trim() : '';
        if (!val || val === '0' || val === '-- Select --' || val === 'on') return;

        let label = '';
        const group = el.closest('.form-group, .meta-box, .progress-form-group');
        if (group) {
            const lblEl = group.querySelector('label, h4, .meta-label');
            if (lblEl) label = lblEl.innerText.trim();
        }
        if (!label) {
            const header = el.closest('.card')?.querySelector('h3, h4, .section-header-modern h2');
            if (header) label = header.innerText.trim() + ' (Field)';
        }
        if (!label) {
            const prev = el.previousElementSibling;
            if (prev && prev.innerText && prev.innerText.length < 50) label = prev.innerText;
        }
        if (!label && el.id) label = el.id.replace(/[-_]/g, ' ').toUpperCase();
        if (!label) label = el.placeholder || 'Verification Logic';

        // Filter out useless general fields
        if (['SEARCH', 'FILTER'].includes(label.toUpperCase())) return;

        data.inputs.push({ label, value: val });
    });

    // 3. Canvas elements (Visual Evidence Capture)
    document.querySelectorAll('canvas').forEach(canvas => {
        if (canvas.closest('#lss-login-overlay') || canvas.closest('#lss-command-hub')) return;
        try {
            const img = canvas.toDataURL("image/png");
            if (img && img.length > 500) { // Only capture significant plots
                data.canvasImages.push(img);
            }
        } catch(e) { console.warn("Canvas capture skipped (tainted)."); }
    });

    // 4. Tables with data (SIPOC, FMEA, Registers)
    document.querySelectorAll('table').forEach(table => {
        if (table.closest('#lss-login-overlay') || table.closest('#lss-command-hub') || table.closest('#lss-sensei-modal')) return;
        const rows = table.querySelectorAll('tr');
        if (rows.length < 2) return;

        const tableData = [];
        rows.forEach(row => {
            const cells = [];
            row.querySelectorAll('th, td').forEach(cell => {
                const input = cell.querySelector('input, textarea, select');
                const text = input ? input.value.trim() : cell.textContent.trim();
                cells.push(text);
            });
            // Only add row if it has actual data (not just empty strings)
            if (cells.some(c => c.length > 0 && c !== '0')) tableData.push(cells);
        });
        if (tableData.length > 1) data.tables.push(tableData);
    });

    // 5. Statistics / Key values
    const statSelectors = '.stat-value, .stat-card, .key-stat, .metric-value, .result-value, .calc-result, [id*="result"], [id*="stat"], [id*="output"], [id*="Score"], [id*="mean"], [id*="median"], [id*="sigma"], [id*="cpk"], [id*="pValue"]';
    document.querySelectorAll(statSelectors).forEach(el => {
        if (el.closest('#lss-login-overlay')) return;
        const text = el.textContent.trim();
        if (text && text.length > 0 && text.length < 200) {
            let label = '';
            const parent = el.closest('.stat-card, .metric-card, .result-card, .key-stat');
            if (parent) {
                const lbl = parent.querySelector('label, .stat-label, .metric-label, h4, h5, small');
                if (lbl) label = lbl.textContent.trim();
            }
            if (!label) label = el.id || '';
            data.stats.push({ label: label.replace(/([A-Z])/g, ' $1').trim(), value: text });
        }
    });

    // 6. Interpretations & Analysis text
    const interpSelectors = '.interpretation, .analysis-text, .ai-panel, #aiOutput, #aiPanel, .result-text, [id*="interpretation"], [id*="analysis"], .executive-summary';
    document.querySelectorAll(interpSelectors).forEach(el => {
        if (el.closest('#lss-login-overlay')) return;
        if (el.style.display === 'none' || el.offsetParent === null) return;
        const text = el.textContent.trim();
        if (text && text.length > 20) {
            data.interpretations.push(text.substring(0, 1500));
        }
    });

    // 7. Verdicts
    document.querySelectorAll('.verdict, [id*="verdict"], .conclusion, [id*="conclusion"]').forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 5) data.verdicts.push(text);
    });

    // 8. Recommendations
    document.querySelectorAll('.recommendation, [id*="recommendation"], [id*="nextStep"]').forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 5) data.recommendations.push(text);
    });

    // 9. Process / Timeline items
    document.querySelectorAll('.process-step, .timeline-item, .swimlane-row, .step-card').forEach(el => {
        const text = el.textContent.trim();
        if (text && text.length > 5) data.processMaps.push(text.substring(0, 300));
    });

    // 10. SVG visualizations → convert to image
    document.querySelectorAll('svg').forEach(svg => {
        if (svg.closest('#lss-login-overlay') || svg.closest('.zoom-controls')) return;
        if (svg.getBoundingClientRect().width < 50) return;
        try {
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(svgBlob);
            data.canvasImages.push({ type: 'svg', url: url });
        } catch (e) { /* skip */ }
    });

    return data;
}

// ── SCORING ENGINE (SENSEI MBB 3-PILLAR SIMPLIFIED) ────
function _calculateScore(data, p1, p2, p3) {
    const total = Math.round(p1 + p2 + p3);
    const breakdown = { completion: Math.round(p1), exam: Math.round(p2), synthesis: Math.round(p3) };

    const result = total >= 70 ? 'PASS' : 'FAIL';
    const resultColor = total >= 70 ? '#10B981' : '#EF4444';

    // Badge Assignment
    let badge = '', color = '';
    if (total >= 90) { badge = '🏆 Mastery'; color = '#10b981'; } 
    else if (total >= 75) { badge = '✅ Proficient'; color = '#3b82f6'; } 
    else if (total >= 50) { badge = '🟡 Developing'; color = '#facc15'; } 
    else { badge = '🔴 Needs Attention'; color = '#ef4444'; }

    return { total: Math.min(total, 100), badge, color, result, resultColor, breakdown };
}

// ── REPORT BUILDER ───────────────────────────────
// ── REPORT BUILDER ───────────────────────────────
function _buildReport(data, score) {
    const profile = _getProfile() || { name: 'Student', belt: 'LSS', org: '', email: '', id: '' };
    const toolName = _getToolName();
    const toolKey = _getToolKey();
    const quiz = TOOL_QUIZ[toolKey] || ARCHETYPE_QUIZ['A'];
    const quizMap = (score.masteryQuiz || {});

    // Build Evidence Visuals (Charts)
    const chartHtml = data.canvasImages && data.canvasImages.length > 0 ? `
        <div style="margin-top:40px; border-top:2px solid #eee; padding-top:20px;">
            <h3 style="color:#1D4ED8; font-size:16px; margin-bottom:20px;">SECTION II: VISUAL ANALYTIC EVIDENCE</h3>
            <div style="display:grid; grid-template-columns: 1fr; gap:30px;">
                ${data.canvasImages.map((img, i) => `
                    <div style="background:#f8fafc; padding:20px; border-radius:12px; border:1px solid #e2e8f0; text-align:center;">
                        <img src="${img}" style="max-width:100%; height:auto; border-radius:4px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                        <p style="font-size:10px; color:#64748b; margin-top:10px; text-transform:uppercase;">EV-0${i+1}: SENSEI ANALYTICAL PLOT</p>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    // Build Master Logic Ledger (Pentagon)
    const logicHtml = `
        <div style="margin-top:40px; border-top:2px solid #eee; padding-top:20px; background:#f1f5f9; padding:25px; border-radius:16px; margin-bottom:30px;">
            <h3 style="color:#111827; font-size:16px; margin-bottom:15px;">SECTION III: MASTER LOGIC VERIFICATION (PENTAGON)</h3>
            <div style="display:flex; flex-direction:column; gap:15px;">
                ${Object.keys(quiz).map((k, i) => {
                    const q = quiz[k];
                    const ans = quizMap[k] || 'No Response';
                    let displayAns = ans;
                    if (q.type === 'mcq' && q.opts) displayAns = q.opts[ans] || ans;
                    return `
                        <div style="background:#fff; padding:15px; border-radius:8px; border-left:4px solid #1D4ED8;">
                            <p style="font-size:9px; color:#1D4ED8; font-weight:800; margin:0 0 5px 0;">VERIFICATION LOGIC TEST 0${i+1}: ${q.type.toUpperCase()}</p>
                            <p style="font-size:12px; color:#334155; margin:0 0 8px 0; line-height:1.4;">${q.text}</p>
                            <div style="font-size:13px; color:#111827; font-weight:600; padding:8px; background:#f8fafc; border-radius:4px;">${displayAns}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    // Build Operational Tables (SIPOC, FMEA, Registers)
    const tableHtml = data.tables && data.tables.length > 0 ? `
        <div style="margin-top:40px; border-top:2px solid #eee; padding-top:20px;">
            <h3 style="color:#1D4ED8; font-size:16px; margin-bottom:15px;">SECTION IV: OPERATIONAL DATA LEDGER (SIPOC/GRID)</h3>
            ${data.tables.map((table, i) => `
                <div style="margin-bottom:30px; background:#fff; border:1px solid #e2e8f0; border-radius:8px; overflow:hidden;">
                    <table style="width:100%; border-collapse:collapse; font-size:12px;">
                        <thead>
                            <tr style="background:#f8fafc; border-bottom:2px solid #e2e8f0;">
                                ${table[0].map(cell => `<th style="padding:12px; text-align:left; font-weight:800; color:#475569; text-transform:uppercase;">${cell}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${table.slice(1).map(row => `
                                <tr style="border-bottom:1px solid #f1f5f9;">
                                    ${row.map(cell => `<td style="padding:10px 12px; color:#111827; font-weight:500;">${cell}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <p style="font-size:9px; color:#94a3b8; padding:8px; margin:0; background:#f9fafb; text-align:right;">TABLE-0${i+1}: SENSEI VERIFIED SOURCE DATA</p>
                </div>
            `).join('')}
        </div>
    ` : '';

    // Build Process Architecture (Steps / Timelines)
    const processHtml = data.processMaps && data.processMaps.length > 0 ? `
        <div style="margin-top:40px; border-top:2px solid #eee; padding-top:20px;">
            <h3 style="color:#1D4ED8; font-size:16px; margin-bottom:15px;">SECTION V: PROCESS ARCHITECTURE MAP</h3>
            <div style="display:flex; flex-direction:column; gap:10px;">
                ${data.processMaps.map((step, i) => `
                    <div style="display:flex; align-items:center; gap:20px; background:#f9fafb; padding:15px; border-radius:12px; border-left:4px solid #1D4ED8;">
                        <div style="background:#1D4ED8; color:#fff; width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:800; flex-shrink:0;">${i+1}</div>
                        <div style="font-size:14px; color:#111827; font-weight:600;">${step}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    ` : '';

    const fullHtml = `<!DOCTYPE html><html lang="en"><head>
    <meta charset="UTF-8">
    <title>MBB AUDIT DOSSIER — ${toolName}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <style>
        body { margin: 0; padding: 0; background: #f4f7f6; font-family:'Inter', sans-serif; }
        .report-container { background:#fff; color:#111827; padding:60px 40px; max-width:850px; margin:40px auto; border: 1px solid #e5e7eb; box-shadow: 0 20px 50px rgba(0,0,0,0.05); min-height:100vh; position:relative; }
        .no-print { position: fixed; bottom: 30px; right: 30px; z-index: 1000; }
        .pdf-btn { background: #1D4ED8; color: white; border: none; padding: 15px 25px; border-radius: 50px; font-weight: 800; cursor: pointer; box-shadow: 0 10px 20px rgba(29, 78, 216, 0.3); transition: 0.3s; display: flex; align-items: center; gap: 10px; }
        .pdf-btn:hover { transform: translateY(-3px); background: #1e40af; }
        @media print { .no-print { display: none; } .report-container { margin: 0; border: none; box-shadow: none; } }
    </style>
    </head><body>
    
    <div class="no-print">
        <button class="pdf-btn" id="pdf-download-btn" onclick="downloadPDF()">
            <i class="fas fa-file-pdf"></i> Download Official PDF
        </button>
    </div>

    <div class="report-container">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:60px; border-bottom:3px solid #1D4ED8; padding-bottom:30px;">
            <div>
                <h1 style="font-size:24px; margin:0; color:#111827; letter-spacing:-0.5px; text-transform:uppercase;">MBB Audit Dossier</h1>
                <p style="font-size:12px; color:#6B7280; text-transform:uppercase; letter-spacing:2px; margin-top:5px;">SENSEI MBB CERTIFICATION PLATFORM</p>
            </div>
            <div style="text-align:right;">
                <div style="font-size:32px; font-weight:900; color:#1D4ED8;">${score.total}%</div>
                <div style="font-size:10px; font-weight:700; color:#1D4ED8; text-transform:uppercase; letter-spacing:1px; margin-bottom:5px;">Verified Mastery Level</div>
                <div style="
                    display: inline-block;
                    padding: 4px 12px;
                    background: ${score.resultColor};
                    color: white;
                    border-radius: 4px;
                    font-size: 11px;
                    font-weight: 900;
                    letter-spacing: 1px;
                "><i class="fas ${score.result === 'PASS' ? 'fa-check' : 'fa-times'}"></i> ${score.result} VERDICT</div>
            </div>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px; margin-bottom:40px; background:#f9fafb; padding:25px; border-radius:12px;">
            <div>
                <label style="display:block; font-size:9px; color:#6B7280; text-transform:uppercase; font-weight:800; border-bottom:1px solid #eee; margin-bottom:10px; padding-bottom:3px;">LEARNER METADATA</label>
                <div style="font-size:14px; font-weight:700;">${profile.name}</div>
                <div style="font-size:12px; color:#64748b;">${profile.email}</div>
                <div style="font-size:12px; color:#64748b;">${profile.org}</div>
            </div>
            <div>
                <label style="display:block; font-size:9px; color:#6B7280; text-transform:uppercase; font-weight:800; border-bottom:1px solid #eee; margin-bottom:10px; padding-bottom:3px;">OPERATIONAL CONTEXT</label>
                <div style="font-size:14px; font-weight:700; color:#1D4ED8;">${toolName}</div>
                <div style="font-size:12px; color:#64748b;">TARGET BELT: ${profile.belt}</div>
                <div style="font-size:12px; color:#64748b;">DATE: ${new Date().toLocaleDateString(undefined, {dateStyle:'full'})}</div>
            </div>
        </div>

        <h3 style="color:#1D4ED8; font-size:15px; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:8px;">SECTION I: ANALYTICAL VERIFICATION RECORDS</h3>
        <table style="width:100%; border-collapse:collapse; margin-bottom:40px;">
            ${data.inputs.map(inp => `
                <tr style="border-bottom:1px solid #f1f5f9;">
                    <td style="padding:10px 0; color:#6B7280; font-size:11px; font-weight:600; width:40%; text-transform:uppercase;">${inp.label}</td>
                    <td style="padding:10px 0; color:#111827; font-size:13px; font-weight:600;">${inp.value}</td>
                </tr>
            `).join('')}
        </table>

        ${chartHtml}
        ${logicHtml}
        ${tableHtml}
        ${processHtml}

        <div style="margin-top:60px; border:2px dashed #1D4ED8; padding:30px; border-radius:16px; position:relative; overflow:hidden;">
            <div style="font-size:9px; color:#1D4ED8; font-weight:800; margin-bottom:12px; text-transform:uppercase;">SENSEI MBB FINAL ASSESSMENT</div>
            <p style="font-size:15px; line-height:1.6; color:#111827; margin:0; font-weight:500;">
                "Master ${profile.name.split(' ')[0]}, your high-fidelity analysis demonstrates <strong>${score.badge}</strong> rigor. Your visual evidence and Pentagon synthesis form a comprehensive audit trail."
            </p>
        </div>

        <div style="margin-top:50px; text-align:center; font-size:10px; color:#9CA3AF; border-top:1px solid #eee; padding-top:20px; text-transform:uppercase; letter-spacing:1px;">
            CONFIDENTIAL AUDIT RECORD • ${'AUDIT-' + Math.random().toString(36).substring(7).toUpperCase()}
        </div>
    </div>

    <script>
        async function downloadPDF() {
            const { jsPDF } = window.jspdf;
            const btn = document.getElementById('pdf-download-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> GENERATING DOSSIER...';
            btn.disabled = true;

            try {
                const element = document.querySelector('.report-container');
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    logging: false,
                    windowWidth: 850
                });
                
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
                
                let heightLeft = pdfHeight;
                let position = 0;
                const pageHeight = 297;

                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - pdfHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save(\`${toolName.replace(/\s+/g, '_')}_AUDIT_DOSSIER.pdf\`);
            } catch (err) {
                console.error('PDF Generation Error:', err);
                alert('Failed to generate PDF. Primary cause: Script or Asset block. Please use Browser Print (Ctrl+P) as a secure fallback.');
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }
        }
    </script>
    </body></html>`;
    return fullHtml;
}

function _getQuizText(arch, key) {
    const toolKey = _getToolKey();
    const qset = TOOL_QUIZ[toolKey] || ARCHETYPE_QUIZ[arch] || ARCHETYPE_QUIZ['A'];
    return qset[key] ? qset[key].text : "Knowledge Reflection";
}

// ── REPORT PREVIEW (opens in new tab) ────────────
function _openReportPreview(reportHtml, toolName) {
    const blob = new Blob([reportHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');

    // Fallback: if popup blocked, download instead
    if (!win) {
        const a = document.createElement('a');
        a.href = url;
        a.download = `${toolName.replace(/[^a-z0-9]/gi, '_')}_Report.html`;
        a.click();
    }
}

// ── ESCAPE HTML ──────────────────────────────────
function _escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

// ── GOOGLE SHEETS SYNC ──────────────────────────
function _syncToSheets(toolName, score, reportData) {
    if (!SHEETS_ENDPOINT || SHEETS_ENDPOINT.trim() === '') return;

    const profile = _getProfile() || {};
    fetch(SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            submittedAt: new Date().toLocaleString(),
            studentName: profile.name || 'Anonymous',
            organization: profile.org || '—',
            beltTarget: profile.belt || '—',
            toolName: toolName,
            completionLevel: Math.round(score.breakdown.completion / 30 * 100), // Scale back to 100
            confidenceStars: reportData.stars || 3,
            keyTakeaway: reportData.keyTakeaway || 'Master Level Assessment',
            evidenceSaved: (reportData.canvasImages.length > 0 || reportData.tables.length > 0) ? 'Yes' : 'No',
            toolInteracted: reportData.interacted || 'Yes',
            finalScore: score.total,
            badge: score.badge.replace(/🏆|✅|🟡|🔴/g, '').trim(),
            feedback: `Comp: ${score.breakdown.completion}, Exam: ${score.breakdown.exam}, Synth: ${score.breakdown.synthesis}`
        })
    }).catch(() => { /* silent fail */ });
}

// ── CSS ANIMATION (for shake) ────────────────────
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-8px)} 75%{transform:translateX(8px)} }`;
document.head.appendChild(shakeStyle);
