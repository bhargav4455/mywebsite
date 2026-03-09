/* ═══════════════════════════════════════════════════════════
   KAI — Local Knowledge Base Chat Engine
   No external API calls. All data stays on your website.
   ═══════════════════════════════════════════════════════════ */

;(function () {
  'use strict';

  /* ─── Knowledge Base ───────────────────────────────────── */
  const KB = {
    identity: {
      name: 'Bhargava Katta',
      title: 'Senior System Specialist',
      role: 'AI & Automation Engineer',
      company: 'LTM',
      client: 'Microsoft',
      location: 'Bellevue, Washington, USA',
      email: 'bhargav.katta9@gmail.com',
      linkedin: 'https://www.linkedin.com/in/bhargava-katta-00170a43/',
      github: 'https://github.com/bhargav4455',
      website: 'https://bhargavakatta.com',
      yearsExperience: '12+',
      tagline: 'Engineer. Innovator. Explorer. Enthusiast.',
    },

    about: `Bhargava Katta has 12+ years of enterprise technology experience spanning ZEN3 (now Tech Mahindra), HCL Technologies, and LTM. He evolved from a data-center analyst to a Senior System Specialist and AI & Automation Engineer at Microsoft. He architects and deploys intelligent agents using Azure AI Agent Service, Microsoft Copilot Studio, GitHub Copilot Agents, and custom-built AI agents — turning complex manual workflows into seamless, automated experiences. Beyond engineering, he's an enthusiastic global explorer who has traveled across India, USA, Canada & Dubai, covered every metro city in India, and is on a mission to visit all 50 US states.`,

    experience: [
      { role: 'Senior System Specialist', company: 'LTM', period: 'Feb 2026 – Present', location: 'Bellevue, Washington', details: 'Leading next-generation AI-driven system management operations. Driving automation and intelligent monitoring for enterprise clients. Collaborating on AI and cloud-first transformation initiatives.' },
      { role: 'Senior System Specialist', company: 'LTM', period: 'Nov 2022 – Feb 2026 (3 yrs 4 mos)', location: 'Bellevue, Washington', details: 'Led enterprise system management supporting Microsoft\'s global infrastructure. Designed AI-powered automation frameworks reducing manual intervention by 70%. Built executive monitoring dashboards with Power BI. Championed Power Platform adoption for low-code workflow automation. Mentored team members and drove knowledge-sharing initiatives.' },
      { role: 'Senior System Specialist', company: 'LTM', period: 'Jun 2021 – Nov 2022 (1 yr 6 mos)', location: 'Hyderabad, India', details: 'Managed large-scale Azure SQL environments and DevOps pipelines. Drove cloud adoption and process modernization. Implemented proactive monitoring with SCOM and Azure Monitor.' },
      { role: 'Team Lead', company: 'LTM', period: 'Jan 2019 – Jun 2021 (2 yrs 6 mos)', location: 'Hyderabad, India', details: 'Led a team of engineers managing enterprise server environments. Developed PowerShell automation scripts for system administration at scale. Ensured SLA compliance and drove continuous improvement.' },
      { role: 'Senior Engineer', company: 'LTM', period: 'Jan 2017 – Jan 2019 (2 yrs 1 mo)', location: 'Hyderabad, India', details: 'Managed Azure SQL databases and cloud infrastructure. Implemented monitoring and performance optimization solutions.' },
      { role: 'Analyst', company: 'HCL Technologies', period: 'Apr 2014 – Jan 2017 (2 yrs 10 mos)', location: 'Hyderabad, India', details: 'Managed data center operations and Active Directory infrastructure. Handled incident management and infrastructure troubleshooting.' },
      { role: 'Analyst', company: 'ZEN3 (now Tech Mahindra)', period: 'May 2013 – Apr 2014 (1 yr)', location: 'Hyderabad, India', details: 'Started professional career in enterprise system analysis. Provided system support and technical troubleshooting.' },
    ],

    certifications: [
      'Generative AI for Everyone – DeepLearning.AI (Mar 2024)',
      'Microsoft Certified: Azure Fundamentals AZ-900 (Aug 2022)',
      'Microsoft Certified: Azure Data Fundamentals DP-900 (Jul 2022)',
      'Microsoft Professional Program in DevOps (Aug 2020)',
      'Windows Server 2016 Advanced – Techademy (Jul 2020)',
      'ITIL Service Operation – Simplilearn (Feb 2019)',
      'Administering SQL Server 2012/2014 Databases – Microsoft (Feb 2019)',
      'Exam 533: Implementing Azure Infrastructure Solutions (Feb 2018)',
      'Analyzing & Visualizing Data with Power BI – edX (Aug 2018)',
      'Microsoft Certified Systems Administrator MCSA (Feb 2016)',
      'Cisco Certified Network Associate CCNA (Apr 2015)',
      'Ethical Hacking – Techfest, IIT Bombay (Oct 2011)',
    ],

    skills: {
      'AI Agents & Gen AI': ['Azure AI Agent Service', 'Copilot Studio Agents', 'GitHub Copilot Agents', 'Custom Agent Deployment', 'Generative AI & LLMs'],
      'Cloud & Infrastructure': ['Azure Cloud Platform', 'Azure Data Factory', 'Virtual Machines & Networking', 'Identity & Access Management', 'Hybrid Cloud Architecture'],
      'Automation & DevOps': ['PowerShell & Scripting', 'Azure DevOps & CI/CD', 'Infrastructure as Code', 'Configuration Management', 'Process Orchestration'],
      'Monitoring & ITSM': ['SCOM & Azure Monitor', 'Incident Management', 'ITIL Best Practices', 'Capacity Planning', 'SLA/SLO Management'],
      'Power Platform & Data': ['Power Automate & Power Apps', 'Power BI Dashboards', 'Azure SQL & Dataverse', 'Data Center Management', 'Active Directory'],
      'Networking & Security': ['CCNA Routing & Switching', 'Network Architecture', 'Cloud Security & Compliance', 'Ethical Hacking Fundamentals', 'Zero Trust Architecture'],
    },

    impact: [
      { title: 'AI-Powered Automation', metric: '70% Reduction in Manual Tasks', desc: 'Designed AI-driven automation frameworks using Generative AI & Azure Data Factory that replaced repetitive processes.' },
      { title: 'Scalable Monitoring Systems', metric: '99.9% System Uptime Achieved', desc: 'Built enterprise-grade monitoring with SCOM & Azure Monitor that proactively detect, alert, and self-heal.' },
      { title: 'Data-Driven Intelligence', metric: '15+ Executive Dashboards Built', desc: 'Created Power BI dashboards that transform raw telemetry into actionable operational intelligence.' },
      { title: 'DevOps & Reliability', metric: '40% Faster Incident Resolution', desc: 'Transformed manual workflows into robust CI/CD pipelines with Azure DevOps.' },
    ],

    clients: ['Microsoft', 'Angel Broking', 'HPCL', 'Indian Railway', 'HDFC', 'Gati'],

    projects: [
      { name: 'Intelligent Agent Ecosystem', desc: 'Architected and deployed intelligent AI agents using Azure AI Agent Service, Microsoft Copilot Studio, and GitHub Copilot Agents — automating complex enterprise workflows.' },
      { name: 'Cloud Resource Intelligence Engine', desc: 'Built an AI-driven resource monitoring solution using Azure Data Factory and ML models to analyze consumption patterns and auto-recommend cost optimizations.' },
      { name: 'Executive Operations Dashboard', desc: 'Created comprehensive Power BI dashboards providing real-time visibility into system health, SLA compliance, incident trends.' },
      { name: 'ITSM Workflow Modernization', desc: 'Led transformation of legacy IT service management into streamlined, automated workflows using Power Platform.' },
    ],

    agents: [
      { name: 'Copilot Studio Agent', desc: 'Conversational AI copilots and smart assistants using Microsoft Copilot Studio — enterprise-grade chatbots, knowledge agents, and workflow assistants.' },
      { name: 'GitHub Copilot Agent', desc: 'AI-powered coding agents for intelligent code generation, automated code reviews, pull request automation.' },
      { name: 'SRE Agent', desc: 'Site Reliability agents that proactively monitor, detect anomalies, auto-remediate incidents, and maintain 99.9%+ uptime.' },
      { name: 'Custom Agent', desc: 'End-to-end design and deployment of custom AI agents tailored to enterprise needs using Azure AI Agent Service.' },
    ],

    volunteering: [
      { role: 'Chatter Newsletter & Web Editing', org: 'Cherry Crest Elementary School', period: 'Sep 2025 – Present', cause: 'Science & Technology' },
      { role: 'Volunteer', org: 'ORCA Running', period: 'Mar 2025 – Present', cause: 'Social Services' },
      { role: 'Volunteer', org: 'Evergreen Trail Runs', period: 'Nov 2025 – Present', cause: 'Social Services' },
      { role: 'Associate', org: 'iFocus Mission', period: 'Jul 2015 – Mar 2023 (7 yrs 9 mos)', cause: 'Social Services' },
      { role: 'MPO', org: 'HCL Technologies', period: 'May 2014 – Jul 2014', cause: 'Arts & Culture' },
    ],

    running: {
      summary: 'From 5Ks to half marathons — pushing limits one race at a time.',
      races: [
        { name: 'Kirkland Half Marathon', org: 'Orca Running', distance: '13.1 mi', status: 'completed' },
        { name: 'Big Backyard 10K', org: 'King County Parks', distance: '6.2 mi', status: 'completed' },
        { name: 'Pumpkin Spice Run 5K', org: 'Orca Running', distance: '3.1 mi', status: 'completed' },
        { name: 'Tacky Turkey Sweater 5K', org: 'Run 2 Be Fit · Green Lake', distance: '3.1 mi', status: 'completed' },
        { name: 'Sammamish Lake Half Marathon', org: 'Orca Running', distance: '13.1 mi', status: 'upcoming' },
      ],
      achievements: ['R-Pod Medal 2025 — Earned by completing 3+ Orca Running races in a calendar year', 'ATA-Seattle · 100 Mile May 2025 — Community challenge with ATA-Seattle Friends & Members'],
    },

    travel: {
      countries: ['India', 'USA', 'Canada', 'Dubai (UAE)'],
      goal: 'On a mission to visit all 50 US states.',
      highlights: 'Covered every metro city in India. Loves discovering new cuisines and tracing the source of unique drinks worldwide.',
    },

    contact: {
      email: 'bhargav.katta9@gmail.com',
      linkedin: 'https://www.linkedin.com/in/bhargava-katta-00170a43/',
      github: 'https://github.com/bhargav4455',
      location: 'Bellevue, Washington, USA',
    },

    philosophy: 'Scalable systems are built the same way strong lives are — with AI-driven intelligence, relentless automation, and continuous improvement.',
  };

  /* ─── Intent Matching ──────────────────────────────────── */
  const intents = [
    {
      patterns: [/who (is|are)|(about|tell me about|introduce)\s*(bhargava|yourself|him)/i, /^(hi|hello|hey|howdy|greetings|yo|sup)/i, /what (do you|does he|does bhargava) do/i],
      respond: () => `${KB.identity.name} is a ${KB.identity.title} and ${KB.identity.role} at ${KB.identity.company}, working with ${KB.identity.client}. Based in ${KB.identity.location} with ${KB.identity.yearsExperience} years of enterprise technology experience.\n\n${KB.identity.tagline}`
    },
    {
      patterns: [/experience|career|work history|job|employ|timeline|companies|where.*(work|worked)/i],
      respond: () => {
        const exp = KB.experience.map(e => `• ${e.role} at ${e.company} (${e.period}) — ${e.location}`).join('\n');
        return `Bhargava's career spans ${KB.identity.yearsExperience} years across 3 companies:\n\n${exp}`;
      }
    },
    {
      patterns: [/current (role|job|position)|where.*work(s|ing)?\s*now|present|latest role/i],
      respond: () => {
        const curr = KB.experience[0];
        return `Currently: ${curr.role} at ${curr.company} (${curr.period}), ${curr.location}.\n\n${curr.details}`;
      }
    },
    {
      patterns: [/cert|license|credential|qualified|az-?900|dp-?900|ccna|itil|mcsa|ethical hack|power bi cert/i],
      respond: () => `Bhargava holds 12 industry certifications:\n\n${KB.certifications.map((c, i) => `${i + 1}. ${c}`).join('\n')}`
    },
    {
      patterns: [/skill|expertise|competenc|what.*know|technical|tech stack|tools|proficien/i],
      respond: () => {
        const skills = Object.entries(KB.skills).map(([cat, items]) => `${cat}:\n  ${items.join(', ')}`).join('\n\n');
        return `Bhargava's core technical skills:\n\n${skills}`;
      }
    },
    {
      patterns: [/azure|cloud|infrastructure|adf|data factory|az-|dp-/i],
      respond: () => `Bhargava is deeply experienced with Azure:\n\n• Azure Cloud Platform — certified in AZ-900, DP-900, and AZ-533\n• Azure Data Factory (ADF) — AI-driven automation pipelines\n• Azure DevOps — CI/CD, Infrastructure as Code\n• Azure Monitor & SCOM — enterprise monitoring\n• Azure SQL — database management & optimization\n• Azure AI Agent Service — deploying intelligent agents\n\nHe's been working with Microsoft/Azure infrastructure for 3+ years at enterprise scale.`
    },
    {
      patterns: [/impact|deliver|result|achiev|metric|number|accomplish/i],
      respond: () => {
        const items = KB.impact.map(i => `• ${i.title}: ${i.metric}\n  ${i.desc}`).join('\n\n');
        return `Key Impact & Results:\n\n${items}`;
      }
    },
    {
      patterns: [/client|customer|who.*(served|worked for|worked with)/i],
      respond: () => `Bhargava has worked with enterprise clients across Finance, Energy, Government & Technology:\n\n${KB.clients.map(c => `• ${c}`).join('\n')}`
    },
    {
      patterns: [/project|initiative|built|created|developed|portfolio/i],
      respond: () => {
        const proj = KB.projects.map(p => `• ${p.name}: ${p.desc}`).join('\n\n');
        return `Key Projects:\n\n${proj}`;
      }
    },
    {
      patterns: [/agent|copilot|bot|ai.*build|deploy.*agent/i],
      respond: () => {
        const agents = KB.agents.map(a => `• ${a.name}: ${a.desc}`).join('\n\n');
        return `AI Agents Bhargava Builds & Deploys:\n\n${agents}`;
      }
    },
    {
      patterns: [/volunt|community|give back|social|non.?profit/i],
      respond: () => {
        const vols = KB.volunteering.map(v => `• ${v.role} at ${v.org} (${v.period}) — ${v.cause}`).join('\n');
        return `Bhargava actively gives back to the community:\n\n${vols}`;
      }
    },
    {
      patterns: [/run|race|marathon|5k|10k|half|orca|r-?pod|trail|fitness/i],
      respond: () => {
        const races = KB.running.races.map(r => `${r.status === 'completed' ? '✅' : '🔜'} ${r.name} (${r.distance}) — ${r.org}`).join('\n');
        const achievements = KB.running.achievements.map(a => `🏅 ${a}`).join('\n');
        return `${KB.running.summary}\n\nRaces:\n${races}\n\nAchievements:\n${achievements}`;
      }
    },
    {
      patterns: [/travel|countr|explore|visit|trip|journey|adventure|globe|world|india|usa|canada|dubai/i],
      respond: () => `Bhargava is an enthusiastic global explorer!\n\n🌍 Countries visited: ${KB.travel.countries.join(', ')}\n🎯 ${KB.travel.goal}\n\n${KB.travel.highlights}`
    },
    {
      patterns: [/contact|reach|email|mail|connect|linkedin|github|phone|call/i],
      respond: () => `You can reach Bhargava at:\n\n📧 Email: ${KB.contact.email}\n🔗 LinkedIn: ${KB.contact.linkedin}\n💻 GitHub: ${KB.contact.github}\n📍 Location: ${KB.contact.location}`
    },
    {
      patterns: [/resume|cv|download|pdf|hire/i],
      respond: () => `To get Bhargava's detailed resume, please send an email to ${KB.contact.email} with the subject "Resume Request". He'll share it with you directly!`
    },
    {
      patterns: [/philosophy|quote|motto|belief|value/i],
      respond: () => `Bhargava's philosophy:\n\n"${KB.philosophy}"`
    },
    {
      patterns: [/location|where.*live|where.*based|city|state|address/i],
      respond: () => `Bhargava is based in ${KB.identity.location}.`
    },
    {
      patterns: [/education|degree|college|university|school|study/i],
      respond: () => `Bhargava holds 12 industry certifications spanning AI, Azure, DevOps, Networking, Security, and Data. For detailed education info, please reach out at ${KB.contact.email}.`
    },
    {
      patterns: [/power\s*(platform|automate|apps|bi)|dashboard|reporting|low.?code/i],
      respond: () => `Bhargava is an expert in the Power Platform ecosystem:\n\n• Power Automate — workflow automation\n• Power Apps — low-code applications\n• Power BI — executive dashboards (15+ built)\n• Dataverse & SharePoint integration\n\nHe championed Power Platform adoption at Microsoft for low-code workflow automation.`
    },
    {
      patterns: [/devops|ci.?cd|pipeline|infrastructure as code|iac/i],
      respond: () => `Bhargava's DevOps expertise:\n\n• Azure DevOps — CI/CD pipelines, repos, boards\n• Infrastructure as Code\n• Configuration Management\n• Process Orchestration\n• Microsoft Professional Program in DevOps (certified)\n\nHe achieved 40% faster incident resolution by transforming manual workflows into robust CI/CD pipelines.`
    },
    {
      patterns: [/monitoring|scom|uptime|incident|sla|alert|observ/i],
      respond: () => `Bhargava specializes in enterprise monitoring & ITSM:\n\n• SCOM & Azure Monitor — proactive monitoring\n• 99.9% system uptime achieved\n• ITIL-certified (Service Operation)\n• SLA/SLO management\n• Capacity planning\n• Self-healing & auto-remediation\n\nHis monitoring systems proactively detect, alert, and self-heal before issues impact end users.`
    },
    {
      patterns: [/powershell|script|automat/i],
      respond: () => `Bhargava has deep expertise in PowerShell & automation:\n\n• PowerShell scripting for system administration at scale\n• AI-driven automation reducing manual tasks by 70%\n• Azure Data Factory pipelines\n• Process orchestration\n• Configuration management\n\nHe transformed repetitive enterprise processes into seamless automated experiences.`
    },
    {
      patterns: [/microsoft|msft/i],
      respond: () => `Bhargava works at LTM supporting Microsoft as a Senior System Specialist & AI & Automation Engineer. He manages Microsoft's global infrastructure, builds AI-powered automation frameworks, and creates executive monitoring dashboards. He holds multiple Microsoft certifications (AZ-900, DP-900, AZ-533, DevOps, MCSA, Power BI, SQL).`
    },
    {
      patterns: [/data\s*engineer|data\s*pipeline|etl|data\s*factory|adf/i],
      respond: () => `Bhargava has strong data engineering experience:\n\n• Azure Data Factory (ADF) — building data pipelines\n• Azure SQL database management & optimization\n• Power BI dashboards for data visualization\n• ETL and data transformation\n• DP-900 certified (Azure Data Fundamentals)\n• SQL Server administration (certified)\n\nHe built an AI-driven Cloud Resource Intelligence Engine using ADF and ML models.`
    },
    {
      patterns: [/thank|thanks|thx|appreciate/i],
      respond: () => `You're welcome! 😊 Feel free to ask anything else about Bhargava's experience, skills, or interests!`
    },
    {
      patterns: [/bye|goodbye|see you|later|quit|exit/i],
      respond: () => `Thanks for chatting! 👋 Feel free to come back anytime. You can also reach Bhargava directly at ${KB.contact.email}.`
    },
    {
      patterns: [/how many (years|yrs)|experience.*years/i],
      respond: () => `Bhargava has 12+ years of enterprise technology experience, spanning 3 companies (ZEN3, HCL Technologies, LTM) across India and the USA.`
    },
    {
      patterns: [/team|leader|manage|mentor|lead/i],
      respond: () => `Bhargava has strong leadership experience:\n\n• Team Lead at LTM (2019–2021) — led a team of engineers managing enterprise server environments\n• Senior System Specialist — mentored team members and drove knowledge-sharing\n• Cross-functional team leadership & mentorship\n• Championed Power Platform adoption across teams`
    },
    {
      patterns: [/what can (you|kai) (do|help|answer)|capabilities|help me/i],
      respond: () => `I'm KAI — Bhargava's personal AI assistant! I can answer questions about:\n\n• 👤 Who is Bhargava Katta\n• 💼 Experience & career history\n• 🏅 12 certifications\n• 🛠️ Technical skills & expertise\n• ☁️ Azure & cloud experience\n• 🤖 AI agents he builds\n• 📊 Projects & impact\n• 🏃 Running & races\n• 🌍 Travel adventures\n• 📧 Contact information\n\nJust ask away!`
    },
  ];

  /* ─── Find Best Response ───────────────────────────────── */
  function findResponse(input) {
    const text = input.toLowerCase().trim();

    if (!text) return null;

    for (const intent of intents) {
      for (const pattern of intent.patterns) {
        if (pattern.test(text)) {
          return intent.respond();
        }
      }
    }

    // Fallback
    return `I can only answer questions about Bhargava Katta — his experience, skills, certifications, projects, running, travel, and contact info.\n\nTry asking:\n• "What is Bhargava's experience?"\n• "What certifications does he have?"\n• "Tell me about his Azure skills"\n• "What races has he run?"\n• "How can I contact him?"`;
  }

  /* ─── DOM Elements ─────────────────────────────────────── */
  const bubble   = document.getElementById('chatBubble');
  const chatWin  = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatClose');
  const form     = document.getElementById('chatForm');
  const input    = document.getElementById('chatInput');
  const msgArea  = document.getElementById('chatMessages');
  const chipsEl  = document.getElementById('chatChips');

  if (!bubble || !chatWin || !form) return;

  let isOpen = false;

  /* ─── Toggle Chat ──────────────────────────────────────── */
  function openChat() {
    isOpen = true;
    chatWin.classList.add('chatbot__window--open');
    bubble.classList.add('chatbot__bubble--active');
    input.focus();
  }

  function closeChat() {
    isOpen = false;
    chatWin.classList.remove('chatbot__window--open');
    bubble.classList.remove('chatbot__bubble--active');
    // Reset chat to initial state
    msgArea.innerHTML = welcomeHTML;
  }

  bubble.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen) closeChat(); });

  /* ─── HTML welcome + chips template (for reset) ──────── */
  const welcomeHTML = msgArea ? msgArea.innerHTML : '';

  /* ─── Format plain text → styled HTML ──────────────────── */
  function formatBotText(text) {
    // Escape HTML
    let html = text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
    // Bold lines ending with ':' that start a category (before bullets)
    html = html.replace(/^(.+?):$/gm, '<strong>$1:</strong>');
    // Numbered items  "1. …"
    html = html.replace(/^(\d+)\. (.+)$/gm, '<span class="kai-num">$1.</span> $2');
    // Bullet items  "• …"
    html = html.replace(/^• (.+)$/gm, '<span class="kai-bullet">•</span> $1');
    // Emoji-led items like ✅, 🔜, 🏅, 📧, 🔗, 💻, 📍, 🌍, 🎯
    html = html.replace(/^([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}]+)\s(.+)$/gmu, '<span class="kai-bullet">$1</span> $2');
    // Auto-link URLs (https://…)
    html = html.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" class="kai-link">$1</a>');
    // Auto-link email addresses
    html = html.replace(/([a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" class="kai-link">$1</a>');
    // Double newlines → paragraph break, single newlines → line break
    html = html.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
    return '<p>' + html + '</p>';
  }

  /* ─── Message Rendering ────────────────────────────────── */
  function appendMessage(content, sender = 'bot') {
    const div = document.createElement('div');
    div.className = `chatbot__msg chatbot__msg--${sender}`;

    const msgContent = document.createElement('div');
    msgContent.className = 'chatbot__msg-content';

    if (sender === 'bot') {
      msgContent.innerHTML = formatBotText(content);
    } else {
      msgContent.textContent = content;
    }

    div.appendChild(msgContent);
    msgArea.appendChild(div);
    requestAnimationFrame(() => { msgArea.scrollTop = msgArea.scrollHeight; });
  }

  /* ─── Build fresh chips node ───────────────────────────── */
  function createChips() {
    const wrap = document.createElement('div');
    wrap.className = 'chatbot__chips';
    const chips = [
      { q: 'Who is Bhargava?', label: '👤 About' },
      { q: 'What is his experience?', label: '💼 Experience' },
      { q: 'What are his skills?', label: '🛠️ Skills' },
      { q: 'What certifications does he have?', label: '🏅 Certs' },
      { q: 'What races has he run?', label: '🏃 Running' },
      { q: 'How can I contact him?', label: '📧 Contact' },
    ];
    chips.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'chatbot__chip';
      btn.setAttribute('data-query', c.q);
      btn.textContent = c.label;
      wrap.appendChild(btn);
    });
    return wrap;
  }

  function showTypingThenReply(text) {
    // Show typing indicator
    const typing = document.createElement('div');
    typing.className = 'chatbot__msg chatbot__msg--bot chatbot__msg--typing';
    typing.id = 'typingIndicator';

    const dots = document.createElement('div');
    dots.className = 'chatbot__msg-content chatbot__typing';
    dots.innerHTML = '<span></span><span></span><span></span>';
    typing.appendChild(dots);
    msgArea.appendChild(typing);
    requestAnimationFrame(() => { msgArea.scrollTop = msgArea.scrollHeight; });

    // Simulate short delay for natural feel
    const delay = Math.min(300 + text.length * 3, 1200);
    setTimeout(() => {
      typing.remove();
      appendMessage(text, 'bot');
      // Append fresh chips after every bot answer
      const newChips = createChips();
      msgArea.appendChild(newChips);
      // Scroll to show the START of the bot's answer (not the very bottom)
      const botMsgs = msgArea.querySelectorAll('.chatbot__msg--bot');
      const lastBotMsg = botMsgs[botMsgs.length - 1];
      if (lastBotMsg) {
        requestAnimationFrame(() => {
          lastBotMsg.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    }, delay);
  }

  /* ─── Remove all existing chip rows ────────────────────── */
  function removeAllChips() {
    msgArea.querySelectorAll('.chatbot__chips').forEach(el => el.remove());
  }

  /* ─── Form Submit ──────────────────────────────────────── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    removeAllChips();
    appendMessage(text, 'user');
    input.value = '';

    const reply = findResponse(text);
    showTypingThenReply(reply);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event('submit'));
    }
  });

  /* ─── Quick-Reply Chips ────────────────────────────────── */
  /* ─── Chip clicks (delegated on msgArea so new chips work) */
  msgArea.addEventListener('click', (e) => {
    const chip = e.target.closest('.chatbot__chip');
    if (!chip) return;
    const query = chip.getAttribute('data-query');
    if (!query) return;

    removeAllChips();
    appendMessage(query, 'user');
    const reply = findResponse(query);
    showTypingThenReply(reply);
  });
})();
