/* ============================================================
   nav-guide.js — Guided Journey System v2
   The AI-Ready Audit
   ============================================================ */

/* ============================================================
   SECTION A — CONSTANTS
   ============================================================ */

var ROLES = {
  executive: {
    label: 'Executive',
    fullLabel: 'Executive / Board Member',
    selectorText: "I'm an executive, board member, or audit committee member"
  },
  leader: {
    label: 'Audit Leader',
    fullLabel: 'Audit Leader / CAE',
    selectorText: "I'm an audit leader or CAE"
  },
  practitioner: {
    label: 'Audit Practitioner',
    fullLabel: 'Audit Practitioner / Manager',
    selectorText: "I'm an audit practitioner or manager"
  }
};

var STORAGE_KEY = 'audit-role';        // sessionStorage — URL param override
var JOURNEY_KEY = 'aiready_journey_v1'; // localStorage — persists role across sessions

/* ============================================================
   SECTION B — JOURNEY SEQUENCES
   Ordered page slugs per role.
   ============================================================ */

var JOURNEY = {
  executive:   ['thesis', 'executive-oversight', 'executive-assessment', 'maturity-assessment', 'organizational-intelligence', 'resources'],
  leader:      ['thesis', 'maturity-assessment', 'erp-transition', 'data-access', 'audit-leadership', 'continuous-monitoring', 'team-structure', 'technology-stack', 'auditing-ai', 'organizational-intelligence'],
  practitioner:['thesis', 'skills-evolution', 'data-access', 'continuous-monitoring', 'technology-stack', 'auditing-ai', 'team-structure', 'maturity-assessment']
};

/* ============================================================
   SECTION C — PER-PAGE ROLE CALLOUTS
   ============================================================ */

var ROLE_PAGE_CONFIG = {

  'index': {
    executive: {
      callout: 'The transformation arc and "What modernization enables" sections are written for your perspective. Focus on the stabilization window concept and what a modernized audit function delivers to executive oversight.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'The "Why electrical distribution is different" section maps the operational environment that defines your risk universe. The six framework pillars identify the capability gaps your function needs to close to deliver at modern standards.',
      suggestedNext: { label: 'Methodology Playbook', href: 'audit-leadership.html' }
    },
    practitioner: {
      callout: 'The six framework pillars define the capabilities that modernized practitioners need. Use this as an orientation map before moving into the methodology, monitoring, and technology sections.',
      suggestedNext: { label: 'Continuous Monitoring', href: 'continuous-monitoring.html' }
    }
  },

  'thesis': {
    executive: {
      callout: 'The strategic case for why audit modernization is not optional. The data environment and modernization arc sections frame what leaders should expect -- and what they need to provide -- for the transformation to succeed.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'The full argument that defines the transformation your function needs to make. The methodology redesign framing and distribution-specific context establish the "why" before you build the "how."',
      suggestedNext: { label: 'Maturity Assessment', href: 'maturity-assessment.html' }
    },
    practitioner: {
      callout: 'The case establishes why the skills and methods you were trained for are no longer sufficient on their own in complex enterprise environments. The methodology redesign section is the most directly relevant for understanding what your work needs to become.',
      suggestedNext: { label: 'Skills and Development', href: 'skills-evolution.html' }
    }
  },

  'maturity-assessment': {
    executive: {
      callout: 'This assessment measures where the audit function stands across six modernization dimensions. Complete it yourself or share it with your audit leader to start a structured conversation about capability gaps and what investment is required to close them.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'This six-dimension self-assessment surfaces your function\'s specific gaps across data access, analytics capability, technology, methodology, monitoring, and governance readiness. Complete it before building your modernization roadmap -- the results give you a defensible baseline.',
      suggestedNext: { label: 'Methodology Playbook', href: 'audit-leadership.html' }
    },
    practitioner: {
      callout: 'This assessment covers the capability dimensions most relevant to your professional development -- analytics, methodology, and technology literacy. Your results will point to the areas where targeted skill investment will have the most immediate impact.',
      suggestedNext: { label: 'Technology Stack', href: 'technology-stack.html' }
    }
  },

  'audit-leadership': {
    executive: {
      callout: 'The playbook describes what the audit function needs to do -- and what leadership needs to provide -- for modernization to succeed. The stabilization framing is particularly relevant if your organization has recently completed an enterprise system transition.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'This is the core operational playbook for your transformation. The four pillars -- Stabilize, Standards, Monitoring, Execution -- define the sequence and the decisions you need to make at each stage. Start here before designing any monitoring program.',
      suggestedNext: { label: 'Continuous Monitoring', href: 'continuous-monitoring.html' }
    },
    practitioner: {
      callout: 'Focus on the Continuous Monitoring and Execution Discipline pillar sections. They define the analytics routines and evidence standards that are becoming baseline expectations for practitioner-level work in modernizing functions.',
      suggestedNext: { label: 'Continuous Monitoring', href: 'continuous-monitoring.html' }
    }
  },

  'erp-transition': {
    executive: {
      callout: 'The "burning platform" section explains why the window for rebuilding audit access closes quickly after go-live and what executive decisions keep it open. The access request template is a practical governance output your organization can act on immediately.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'The rebuild timeline maps the recovery arc from disrupted methodology to restored credibility. The intermediary problem section addresses the data access design decision that will determine your analytics capability for years after the implementation.',
      suggestedNext: { label: 'Data Access', href: 'data-access.html' }
    },
    practitioner: {
      callout: 'The intermediary problem section directly affects your daily work -- specifically how the pipeline design between ERP and audit tools determines whether population-level analysis is achievable with your current access model.',
      suggestedNext: { label: 'Data Access', href: 'data-access.html' }
    }
  },

  'data-access': {
    executive: {
      callout: 'The charter requirements and disclosure sections define what the 2024 IIA Standards require organizations to provide to audit -- and what formal disclosure looks like when access is constrained. This is a governance conversation that belongs at the audit committee level.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'The professional standard and read-only access sections define what "sufficient access" means under current IIA Standards and where most organizations fall short. The disclosure requirements give you the formal language to escalate access gaps when informal requests are not producing results.',
      suggestedNext: { label: 'Continuous Monitoring', href: 'continuous-monitoring.html' }
    },
    practitioner: {
      callout: 'The evidence quality and effective access sections define what working data access looks like day to day -- structured exports, documented data dictionaries, repeatable extraction methods. These are the practical standards against which your fieldwork evidence should be measured.',
      suggestedNext: { label: 'Continuous Monitoring', href: 'continuous-monitoring.html' }
    }
  },

  'continuous-monitoring': {
    executive: {
      callout: 'Continuous monitoring is what makes audit coverage scale without proportional headcount growth. The value proposition section explains the oversight improvement; the engagement model explains what leadership needs to sustain and fund for the program to hold.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'The pre-engagement design and sustainability sections address the two most common reasons monitoring programs fail: poor upfront scoping and capacity collapse under engagement pressure. The technology pathway maps a three-year build that matches investment to actual maturity.',
      suggestedNext: { label: 'Technology Stack', href: 'technology-stack.html' }
    },
    practitioner: {
      callout: 'Focus on the priority process areas and pre-engagement design sections. They define which monitoring routines produce the most reliable signals and what the key design decisions look like before you commit resources to building anything.',
      suggestedNext: { label: 'Technology Stack', href: 'technology-stack.html' }
    }
  },

  'executive-oversight': {
    executive: {
      callout: 'This page is written specifically for your perspective. The timeline defines what to expect at each modernization stage; the measures section defines how to evaluate progress; the "what to ask" section provides the right questions for your next audit committee conversation.',
      suggestedNext: { label: 'Executive Assessment', href: 'executive-assessment.html' }
    },
    leader: {
      callout: 'The "build" and "interim" sections define what modernizing audit leadership needs to communicate to executives -- and what interim deliverables to produce during the transition period before full monitoring is operational.',
      suggestedNext: { label: 'Organizational Intelligence', href: 'organizational-intelligence.html' }
    },
    practitioner: {
      callout: 'The measures and build sections outline the evidence standards and deliverable expectations used to evaluate audit quality during modernization -- useful context for understanding where your work fits in the larger transformation.',
      suggestedNext: { label: 'Continuous Monitoring', href: 'continuous-monitoring.html' }
    }
  },

  'team-structure': {
    executive: {
      callout: 'Team structure determines whether modernization can be sustained. The target structure section defines the role architecture that separates strategic leadership from operational delivery -- a distinction most small audit teams blur in ways that cost both sides.',
      suggestedNext: { label: 'Talent Retention', href: 'talent-retention.html' }
    },
    leader: {
      callout: 'The target structure, small-team paradox, and advancement sections address the decisions that determine whether your modernization has the organizational foundation to hold. Inherited structure is one of the most common hidden constraints on transformation pace.',
      suggestedNext: { label: 'Talent Retention', href: 'talent-retention.html' }
    },
    practitioner: {
      callout: 'The upskilling priorities section maps the development paths most relevant to practitioner-level roles -- from foundational data literacy through domain-specific analytics depth. The advancement section explains how career progression works in a flat team structure.',
      suggestedNext: { label: 'Talent Retention', href: 'talent-retention.html' }
    }
  },

  'organizational-intelligence': {
    executive: {
      callout: 'How audit builds organizational intelligence between formal engagements is a leadership partnership question. The intelligence model and rebuilding-visibility sections describe what executive access and relationships make possible -- and what their absence forecloses.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'Late visibility -- arriving at risk conversations after decisions are made -- is one of the most avoidable failure modes for audit leaders. This page maps the intelligence model that keeps audit relevant between engagements and in the room before it formally needs to be.',
      suggestedNext: { label: 'Team Structure', href: 'team-structure.html' }
    },
    practitioner: {
      callout: 'Building organizational presence between engagements is one of the skills that distinguishes practitioners who advance into leadership roles. The rebuilding-visibility section is the most directly actionable for your development at this stage.',
      suggestedNext: { label: 'Team Structure', href: 'team-structure.html' }
    }
  },

  'talent-retention': {
    executive: {
      callout: 'Audit talent risk is organizational risk. The cost-of-turnover section quantifies what losing a senior practitioner actually costs; the compensation and culture sections define what retaining them requires. This is a resource allocation conversation worth having explicitly.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'Retention is a function design problem as much as a management one. The compensation, advancement, and culture sections address the three areas where audit leaders have the most direct influence on whether skilled practitioners stay long enough to compound their value.',
      suggestedNext: { label: 'Team Structure', href: 'team-structure.html' }
    },
    practitioner: {
      callout: 'The advancement and culture sections are relevant for understanding what audit careers look like in modernizing functions -- and what to look for when evaluating whether a function will invest in your development over time.',
      suggestedNext: { label: 'Team Structure', href: 'team-structure.html' }
    }
  },

  'technology-stack': {
    executive: {
      callout: 'Technology investment for audit is a capability investment, not a software purchase. The budget-case section frames the business case language; the tool-selection-problem section explains why buying ahead of maturity rarely produces the expected return.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'The four-stage technology pathway matches tool sophistication to actual team maturity -- preventing both under-investment that stalls development and over-investment in tools the team cannot yet use. The data-access prerequisite section defines the foundational condition that must exist before any analytics tooling will work.',
      suggestedNext: { label: 'Organizational Intelligence', href: 'organizational-intelligence.html' }
    },
    practitioner: {
      callout: 'The technology pathway and budget-case sections give you the framework to make the case for specific tool investments. The data-access prerequisite section defines the foundational condition that determines whether any analytics platform will actually deliver population-level results.',
      suggestedNext: { label: 'Team Structure', href: 'team-structure.html' }
    }
  },

  'executive-assessment': {
    executive: {
      callout: 'This ten-question diagnostic assesses your organization\'s partnership with internal audit across five dimensions: alignment, advocacy, access, time, and budget. Respond based on how things actually work in your organization -- the most useful result is an honest one.',
      suggestedNext: { label: 'Maturity Assessment', href: 'maturity-assessment.html' }
    },
    leader: {
      callout: 'This tool assesses the executive partnership conditions that determine whether your modernization will get the support it needs. Sharing it with your executive sponsor can open a direct conversation about the specific areas where support is thinnest.',
      suggestedNext: { label: 'Organizational Intelligence', href: 'organizational-intelligence.html' }
    },
    practitioner: {
      callout: 'This assessment is designed for executive audiences. It evaluates whether your organization\'s leadership is providing the access, advocacy, and investment the audit function requires. Understanding this perspective is useful context for making the case for the resources your work depends on.',
      suggestedNext: { label: 'Maturity Assessment', href: 'maturity-assessment.html' }
    }
  },

  'skills-evolution': {
    executive: {
      callout: 'Team capability is an investment question, not a staffing one. The skills matrix defines what "modern" means in practice; the archetypes section maps what roles need to exist -- and which gaps co-sourcing or cross-training can fill versus which require dedicated headcount.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'The skills matrix and team archetypes define the capability range your function needs to build or access through co-sourcing. The "For audit leaders" tab in the actions section maps the near-term decisions -- skills inventory, credential aperture, and protected development paths.',
      suggestedNext: { label: 'Team Structure', href: 'team-structure.html' }
    },
    practitioner: {
      callout: 'The skills matrix defines where the gaps are between traditional and modern audit profiles. The "For practitioners" tab in the actions section maps the most direct development path -- SQL, system architecture, and repeatability discipline -- from where most practitioners start.',
      suggestedNext: { label: 'Data Access', href: 'data-access.html' }
    }
  },

  'capacity-model': {
    executive: {
      callout: 'Dedicated capacity for methodology redesign is an investment with a measurable return: earlier detection, broader coverage, and defensible evidence. The executive framing section translates the case into language for your next resource allocation conversation.',
      suggestedNext: { label: 'Maturity Assessment', href: 'maturity-assessment.html' }
    },
    leader: {
      callout: 'The "why shared capacity doesn\'t work" section explains the architecture problem that keeps most audit modernizations from completing on schedule. The 12-month plan maps the realistic sequence once protected capacity is in place.',
      suggestedNext: { label: 'Organizational Intelligence', href: 'organizational-intelligence.html' }
    },
    practitioner: {
      callout: 'The 12-month transformation plan defines the work sequence for the dedicated methodology role. If you are in or aspiring to that role, this page maps the scope, the decision sequence, and what sustained focused effort actually looks like over a full year.',
      suggestedNext: { label: 'Skills and Development', href: 'skills-evolution.html' }
    }
  },

  'resources': {
    executive: {
      callout: 'The standards, frameworks, and regulatory context on this page anchor the governance and oversight framing across the platform. The regulatory context section is particularly relevant for board and audit committee conversations about AI governance expectations.',
      suggestedNext: { label: 'About', href: 'about.html' }
    },
    leader: {
      callout: 'The standards, research signals, and people-management research cited here underpin the methodology and team frameworks on this platform. A useful reference when building the internal case for transformation investment.',
      suggestedNext: { label: 'About', href: 'about.html' }
    },
    practitioner: {
      callout: 'The tools, standards, and people-side research sections anchor the technical frameworks referenced in the practitioner-focused pages. Particularly useful when building internal documentation for monitoring programs or development plans.',
      suggestedNext: { label: 'About', href: 'about.html' }
    }
  },

  'auditing-ai': {
    executive: {
      callout: 'This page maps the AI governance landscape and what internal audit\'s role in it looks like. The executive section covers the three questions every executive should be able to answer about their organization\'s AI governance posture and what to expect from audit.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'This is the reference layer for the AI audit program. The governance framework, evidence standards, and audit program build sections are the most directly actionable for audit leaders developing or expanding AI governance coverage.',
      suggestedNext: { label: 'AI Readiness Learning Module', href: 'ai-learning.html' }
    },
    practitioner: {
      callout: 'The glossary, evidence standards, and AI-as-audit-tool sections are the highest-priority read for practitioners. The learning module linked on this page includes a skills assessment and a personalized development path.',
      suggestedNext: { label: 'AI Readiness Learning Module', href: 'ai-learning.html' }
    }
  },

  'ai-learning': {
    executive: {
      callout: 'The AI Readiness Learning Module is designed for audit practitioners, but the executive path covers the governance expectations, regulatory direction, and the three questions every executive should be able to answer about their organization\'s AI posture.',
      suggestedNext: { label: 'Auditing AI Reference', href: 'auditing-ai.html' }
    },
    leader: {
      callout: 'The learning module includes a full treatment of the AI governance program build, control environment changes, and evidence standards -- with knowledge checks and a completion summary you can share with your team as a development baseline.',
      suggestedNext: { label: 'Auditing AI Reference', href: 'auditing-ai.html' }
    },
    practitioner: {
      callout: 'The practitioner path begins with a skills assessment that produces a radar chart of your AI readiness across five dimensions, then sequences the learning modules around your actual gaps. The completion summary is designed to share with your manager.',
      suggestedNext: { label: 'Start the Module', href: 'ai-learning.html' }
    }
  }

};

/* ============================================================
   SECTION D — ROLE DETECTION
   ============================================================ */

function detectRole() {
  var valid = ['executive', 'leader', 'practitioner'];

  // 1. URL param ?role= (sets sessionStorage, strips param)
  var params = new URLSearchParams(window.location.search);
  var urlRole = params.get('role');
  if (urlRole && valid.indexOf(urlRole) !== -1) {
    sessionStorage.setItem(STORAGE_KEY, urlRole);
    params.delete('role');
    var newSearch = params.toString();
    history.replaceState(null, '', window.location.pathname + (newSearch ? '?' + newSearch : '') + window.location.hash);
    return urlRole;
  }

  // 2. sessionStorage override (URL param already stored this session)
  var session = sessionStorage.getItem(STORAGE_KEY);
  if (session && valid.indexOf(session) !== -1) return session;

  // 3. Persistent localStorage role
  var stored = localStorage.getItem(JOURNEY_KEY);
  if (stored && valid.indexOf(stored) !== -1) return stored;

  return null;
}

function getPageSlug() {
  var filename = window.location.pathname.split('/').pop();
  if (!filename) return 'index';
  var slug = filename.replace(/\.html$/i, '');
  return slug === '' ? 'index' : slug;
}

/* ============================================================
   SECTION E — FULL-SCREEN ROLE OVERLAY
   Shown only on first visit (localStorage flag not set).
   ============================================================ */

function injectRoleOverlay() {
  var overlay = document.createElement('div');
  overlay.setAttribute('data-journey-overlay', 'true');
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'z-index:9000',
    'background:rgba(14,14,16,0.97)',
    'display:flex', 'flex-direction:column',
    'align-items:center', 'justify-content:center',
    'padding:2rem', 'backdrop-filter:blur(8px)',
    'overflow-y:auto'
  ].join(';');

  var inner = document.createElement('div');
  inner.style.cssText = 'max-width:560px;width:100%;text-align:center;';

  var kicker = el('p', 'The AI-Ready Audit', [
    'font-family:"Cormorant Garamond",serif',
    'font-size:0.88rem', 'letter-spacing:0.12em',
    'text-transform:uppercase', 'color:rgba(140,111,63,0.8)',
    'margin:0 0 1rem'
  ]);

  var heading = el('h2', 'Who are you reading this as?', [
    'font-family:"Cormorant Garamond",serif',
    'font-size:clamp(1.8rem,4vw,2.5rem)', 'font-weight:300',
    'color:#f5f2ec', 'line-height:1.2', 'margin:0 0 0.75rem',
    'letter-spacing:-0.01em'
  ]);

  var sub = el('p', 'Select your role to get a guided reading sequence and relevant highlights on every page.', [
    'font-family:ui-sans-serif,system-ui,sans-serif',
    'font-size:0.9rem', 'color:rgba(255,255,255,0.4)',
    'margin:0 0 2rem', 'line-height:1.6'
  ]);

  var btnCol = document.createElement('div');
  btnCol.style.cssText = 'display:flex;flex-direction:column;gap:0.65rem;margin-bottom:1.5rem;';

  ['executive', 'leader', 'practitioner'].forEach(function(roleKey) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = ROLES[roleKey].selectorText;
    applyStyle(btn, [
      'font-family:ui-sans-serif,system-ui,sans-serif',
      'font-size:0.93rem', 'font-weight:400',
      'padding:13px 20px',
      'border:1px solid rgba(140,111,63,0.3)',
      'border-radius:8px',
      'background:rgba(140,111,63,0.05)',
      'color:rgba(255,255,255,0.65)',
      'cursor:pointer',
      'transition:border-color 180ms,background 180ms,color 180ms',
      'text-align:left', 'width:100%'
    ]);
    btn.addEventListener('mouseover', function() {
      this.style.borderColor = '#8c6f3f';
      this.style.background = 'rgba(140,111,63,0.12)';
      this.style.color = '#f5f2ec';
    });
    btn.addEventListener('mouseout', function() {
      this.style.borderColor = 'rgba(140,111,63,0.3)';
      this.style.background = 'rgba(140,111,63,0.05)';
      this.style.color = 'rgba(255,255,255,0.65)';
    });
    btn.addEventListener('click', function() {
      localStorage.setItem(JOURNEY_KEY, roleKey);
      sessionStorage.setItem(STORAGE_KEY, roleKey);
      document.body.removeChild(overlay);
      document.body.style.overflow = '';
      injectJourneyBar(roleKey);
      adaptPageForRole(roleKey);
    });
    btnCol.appendChild(btn);
  });

  var skipLink = document.createElement('a');
  skipLink.href = '#';
  skipLink.textContent = 'Skip for now -- explore on your own';
  applyStyle(skipLink, [
    'font-family:ui-sans-serif,system-ui,sans-serif',
    'font-size:0.78rem', 'color:rgba(255,255,255,0.2)',
    'text-decoration:none', 'transition:color 180ms'
  ]);
  skipLink.addEventListener('mouseover', function() { this.style.color = 'rgba(255,255,255,0.45)'; });
  skipLink.addEventListener('mouseout', function() { this.style.color = 'rgba(255,255,255,0.2)'; });
  skipLink.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem(JOURNEY_KEY, 'skip');
    document.body.removeChild(overlay);
    document.body.style.overflow = '';
  });

  inner.appendChild(kicker);
  inner.appendChild(heading);
  inner.appendChild(sub);
  inner.appendChild(btnCol);
  inner.appendChild(skipLink);
  overlay.appendChild(inner);
  document.body.appendChild(overlay);
  document.body.style.overflow = 'hidden';
}

/* ============================================================
   SECTION F — PERSISTENT JOURNEY BOTTOM BAR
   Shows Previous / Page X of Y / Next based on role sequence.
   ============================================================ */

function injectJourneyBarCSS() {
  if (document.getElementById('journey-bar-css')) return;
  var s = document.createElement('style');
  s.id = 'journey-bar-css';
  s.textContent = [
    '@media (max-width: 500px) {',
    '  [data-journey-bar] { flex-wrap: wrap; padding: 6px 12px; min-height: auto; }',
    '  [data-journey-bar] > div { min-width: 0 !important; }',
    '  [data-journey-bar] [data-journey-left] { flex: 1; text-align: left; }',
    '  [data-journey-bar] [data-journey-right] { flex: 1; text-align: right; }',
    '  [data-journey-bar] [data-journey-center] { width: 100%; text-align: center; order: 1; }',
    '}',
    '@media (max-width: 400px) {',
    '  [data-journey-bar] [data-journey-center] { display: none; }',
    '}'
  ].join('\n');
  document.head.appendChild(s);
}

function injectJourneyBar(role) {
  var existing = document.querySelector('[data-journey-bar]');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
  injectJourneyBarCSS();

  var roleDef = ROLES[role];
  if (!roleDef) return;

  var slug = getPageSlug();
  var seq = JOURNEY[role] || [];
  var pos = seq.indexOf(slug);
  var inJourney = pos !== -1;

  var bar = document.createElement('div');
  bar.setAttribute('data-journey-bar', 'true');
  applyStyle(bar, [
    'position:fixed', 'bottom:0', 'left:0', 'right:0', 'z-index:8000',
    'background:rgba(16,16,18,0.97)',
    'border-top:1px solid rgba(140,111,63,0.2)',
    'backdrop-filter:blur(12px)',
    'display:flex', 'align-items:center', 'justify-content:space-between',
    'padding:8px 24px', 'gap:12px', 'min-height:50px',
    'box-sizing:border-box'
  ]);

  var navLinkBase = [
    'font-family:ui-sans-serif,system-ui,sans-serif',
    'font-size:0.78rem', 'color:#8c6f3f',
    'text-decoration:none', 'white-space:nowrap',
    'transition:opacity 200ms'
  ].join(';');

  /* LEFT: Previous */
  var leftEl = document.createElement('div');
  leftEl.setAttribute('data-journey-left', 'true');
  leftEl.style.cssText = 'min-width:110px;';
  if (inJourney && pos > 0) {
    var prevLink = document.createElement('a');
    prevLink.href = seq[pos - 1] + '.html';
    prevLink.innerHTML = '&#8592; Previous';
    prevLink.style.cssText = navLinkBase;
    prevLink.addEventListener('mouseover', function() { this.style.opacity = '0.65'; });
    prevLink.addEventListener('mouseout', function() { this.style.opacity = '1'; });
    leftEl.appendChild(prevLink);
  }

  /* CENTER: page indicator, role label, change-role link */
  var centerEl = document.createElement('div');
  centerEl.setAttribute('data-journey-center', 'true');
  centerEl.style.cssText = 'flex:1;text-align:center;line-height:1.3;';

  if (inJourney) {
    var posLabel = el('span', 'Page ' + (pos + 1) + ' of ' + seq.length, [
      'font-family:ui-sans-serif,system-ui,sans-serif',
      'font-size:0.78rem', 'color:rgba(255,255,255,0.45)', 'display:block'
    ]);
    var roleLabel = el('span', roleDef.label + ' Journey', [
      'font-family:ui-sans-serif,system-ui,sans-serif',
      'font-size:0.68rem', 'color:rgba(140,111,63,0.55)',
      'letter-spacing:0.06em', 'display:block'
    ]);
    centerEl.appendChild(posLabel);
    centerEl.appendChild(roleLabel);
  } else {
    var viewLabel = el('span', 'Viewing as ' + roleDef.fullLabel, [
      'font-family:ui-sans-serif,system-ui,sans-serif',
      'font-size:0.78rem', 'color:rgba(255,255,255,0.3)', 'display:block'
    ]);
    centerEl.appendChild(viewLabel);
  }

  var changeLink = document.createElement('a');
  changeLink.href = '#';
  changeLink.textContent = 'Change role';
  changeLink.style.cssText = [
    'font-family:ui-sans-serif,system-ui,sans-serif',
    'font-size:0.68rem', 'color:rgba(140,111,63,0.4)',
    'text-decoration:none', 'display:inline-block',
    'margin-top:2px', 'transition:color 200ms'
  ].join(';');
  changeLink.addEventListener('mouseover', function() { this.style.color = '#8c6f3f'; });
  changeLink.addEventListener('mouseout', function() { this.style.color = 'rgba(140,111,63,0.4)'; });
  changeLink.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem(JOURNEY_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
    bar.parentNode.removeChild(bar);
    document.body.style.paddingBottom = '';
    injectRoleOverlay();
  });
  centerEl.appendChild(changeLink);

  /* RIGHT: Next */
  var rightEl = document.createElement('div');
  rightEl.setAttribute('data-journey-right', 'true');
  rightEl.style.cssText = 'min-width:110px;text-align:right;';
  if (inJourney && pos < seq.length - 1) {
    var nextLink = document.createElement('a');
    nextLink.href = seq[pos + 1] + '.html';
    nextLink.innerHTML = 'Next &#8594;';
    nextLink.style.cssText = navLinkBase;
    nextLink.addEventListener('mouseover', function() { this.style.opacity = '0.65'; });
    nextLink.addEventListener('mouseout', function() { this.style.opacity = '1'; });
    rightEl.appendChild(nextLink);
  } else if (inJourney && pos === seq.length - 1) {
    var doneEl = el('span', 'Journey complete', [
      'font-family:ui-sans-serif,system-ui,sans-serif',
      'font-size:0.78rem', 'color:rgba(255,255,255,0.2)'
    ]);
    rightEl.appendChild(doneEl);
  }

  bar.appendChild(leftEl);
  bar.appendChild(centerEl);
  bar.appendChild(rightEl);
  document.body.appendChild(bar);
  document.body.style.paddingBottom = '54px';
}

/* ============================================================
   SECTION G — PAGE ADAPTATION
   Injects per-page callout and highlights role sections.
   ============================================================ */

function injectCallout(config, roleLabel) {
  if (document.querySelector('[data-role-callout]')) return;

  var main = document.querySelector('main');
  if (!main) return;

  var callout = document.createElement('div');
  callout.setAttribute('data-role-callout', 'true');
  applyStyle(callout, [
    'background:rgba(140,111,63,0.06)',
    'border-left:3px solid #8c6f3f',
    'padding:1.1rem 1.5rem',
    'margin-bottom:1.5rem',
    'box-sizing:border-box'
  ]);

  var labelEl = el('div', 'FOR ' + roleLabel.toUpperCase(), [
    'font-family:ui-sans-serif,system-ui,sans-serif',
    'font-size:0.68rem', 'letter-spacing:0.12em',
    'text-transform:uppercase', 'color:#8c6f3f', 'font-weight:700'
  ]);

  var textEl = el('p', config.callout, [
    'font-family:ui-sans-serif,system-ui,sans-serif',
    'font-size:0.9rem', 'line-height:1.7',
    'color:rgba(255,255,255,0.75)', 'margin-top:0.4rem'
  ]);

  callout.appendChild(labelEl);
  callout.appendChild(textEl);

  if (config.suggestedNext) {
    var nextEl = document.createElement('p');
    applyStyle(nextEl, [
      'font-family:ui-sans-serif,system-ui,sans-serif',
      'font-size:0.8rem', 'margin-top:0.6rem',
      'color:rgba(255,255,255,0.45)'
    ]);
    nextEl.appendChild(document.createTextNode('Suggested next: '));
    var nextLink = document.createElement('a');
    nextLink.textContent = config.suggestedNext.label;
    nextLink.href = config.suggestedNext.href;
    nextLink.style.cssText = 'color:#8c6f3f;text-decoration:none;font-weight:600;';
    nextEl.appendChild(nextLink);
    callout.appendChild(nextEl);
  }

  var anchor = main.querySelector('.page-hero') || main.querySelector('section');
  if (anchor) {
    anchor.parentNode.insertBefore(callout, anchor.nextSibling);
  } else {
    main.insertBefore(callout, main.firstChild);
  }
}

function highlightAudienceSections(role) {
  var matched = document.querySelectorAll('[data-audience="' + role + '"]');
  matched.forEach(function(el) {
    el.style.borderLeft = '2px solid rgba(140,111,63,0.35)';
  });
}

function adaptPageForRole(role) {
  var slug = getPageSlug();
  var pageConfig = ROLE_PAGE_CONFIG[slug];
  var roleDef = ROLES[role];
  if (!roleDef) return;

  if (pageConfig && pageConfig[role]) {
    injectCallout(pageConfig[role], roleDef.label);
  }

  highlightAudienceSections(role);
}

/* ============================================================
   SECTION H — UTILITIES
   ============================================================ */

function el(tag, text, styles) {
  var node = document.createElement(tag);
  node.textContent = text;
  if (styles && styles.length) {
    node.style.cssText = (Array.isArray(styles) ? styles : [styles]).join(';');
  }
  return node;
}

function applyStyle(node, styles) {
  node.style.cssText = (Array.isArray(styles) ? styles : [styles]).join(';');
}

/* ============================================================
   SECTION I — HOMEPAGE PERSISTENT ROLE SELECTOR
   On index.html only: renders a persistent 3-button role selector
   in the page body (no overlay). Active role is highlighted.
   ============================================================ */

function injectHomepageRoleSelector(currentRole) {
  // Find the insertion point — after .pillars-grid or after .page-hero
  var target = document.querySelector('.role-selector-anchor');
  if (!target) return;

  // Remove any existing selector
  var existing = document.querySelector('[data-home-role-selector]');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

  var wrap = document.createElement('div');
  wrap.setAttribute('data-home-role-selector', 'true');
  applyStyle(wrap, [
    'margin:2rem 0', 'padding:1.5rem', 'box-sizing:border-box',
    'background:rgba(140,111,63,0.04)',
    'border:1px solid rgba(140,111,63,0.15)',
    'border-radius:12px'
  ]);

  if (currentRole) {
    var label = el('p', 'Your current view:', [
      'font-family:ui-sans-serif,system-ui,sans-serif',
      'font-size:0.75rem', 'letter-spacing:0.08em', 'text-transform:uppercase',
      'color:rgba(255,255,255,0.35)', 'margin:0 0 0.75rem'
    ]);
    wrap.appendChild(label);
  }

  var btnRow = document.createElement('div');
  applyStyle(btnRow, [
    'display:flex', 'flex-wrap:wrap', 'gap:0.65rem'
  ]);

  ['executive', 'leader', 'practitioner'].forEach(function(roleKey) {
    var isActive = roleKey === currentRole;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = ROLES[roleKey].selectorText;
    applyStyle(btn, [
      'font-family:ui-sans-serif,system-ui,sans-serif',
      'font-size:0.88rem', 'font-weight:400',
      'padding:10px 18px',
      'border:1px solid ' + (isActive ? '#8c6f3f' : 'rgba(140,111,63,0.25)'),
      'border-radius:8px',
      'background:' + (isActive ? 'rgba(140,111,63,0.10)' : 'transparent'),
      'color:' + (isActive ? '#8c6f3f' : 'rgba(255,255,255,0.5)'),
      'cursor:pointer',
      'transition:border-color 180ms,background 180ms,color 180ms',
      'text-align:left'
    ]);
    btn.addEventListener('mouseover', function() {
      if (roleKey !== currentRole) {
        this.style.borderColor = 'rgba(140,111,63,0.5)';
        this.style.color = 'rgba(255,255,255,0.75)';
      }
    });
    btn.addEventListener('mouseout', function() {
      if (roleKey !== currentRole) {
        this.style.borderColor = 'rgba(140,111,63,0.25)';
        this.style.color = 'rgba(255,255,255,0.5)';
      }
    });
    btn.addEventListener('click', function() {
      localStorage.setItem(JOURNEY_KEY, roleKey);
      sessionStorage.setItem(STORAGE_KEY, roleKey);
      currentRole = roleKey;
      injectHomepageRoleSelector(roleKey);
      injectJourneyBar(roleKey);
      adaptPageForRole(roleKey);
    });
    btnRow.appendChild(btn);
  });

  wrap.appendChild(btnRow);
  target.parentNode.insertBefore(wrap, target.nextSibling);
}

/* ============================================================
   SECTION J — INIT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  var slug = getPageSlug();
  var role = detectRole();
  var isHome = (slug === 'index' || slug === '');

  if (isHome) {
    // Homepage: show persistent selector, no overlay
    injectHomepageRoleSelector(role);
    if (role) {
      injectJourneyBar(role);
      adaptPageForRole(role);
    }
  } else if (role !== null) {
    injectJourneyBar(role);
    adaptPageForRole(role);
  } else {
    var storedChoice = localStorage.getItem(JOURNEY_KEY);
    if (!storedChoice) {
      // First-ever visit on a non-home page — show the role overlay
      injectRoleOverlay();
    }
    // If storedChoice === 'skip', user dismissed the overlay; do nothing
  }
});
