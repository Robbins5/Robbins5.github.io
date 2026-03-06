/* ============================================================
   nav-guide.js — Role-based guided navigation
   Phase 2 of the AI-Ready Audit platform
   ============================================================ */

/* ============================================================
   SECTION A — CONSTANTS
   ============================================================ */

var ROLES = {
  executive: {
    label: 'Executive',
    fullLabel: 'Executive / Board Member',
    selectorText: "I'm an executive, board member, or audit committee member",
    color: '#8c6f3f'
  },
  leader: {
    label: 'Audit Leader',
    fullLabel: 'Audit Leader / CAE',
    selectorText: "I'm an audit leader or CAE",
    color: '#8c6f3f'
  },
  practitioner: {
    label: 'Audit Practitioner',
    fullLabel: 'Audit Practitioner / Manager',
    selectorText: "I'm an audit practitioner or manager",
    color: '#8c6f3f'
  }
};

var STORAGE_KEY = 'audit-role';

/* ============================================================
   SECTION B — PAGE CONFIG
   12 pages x 3 roles = 36 callout entries.
   Callouts are informed by the data-audience tags and actual
   section content read during Phase 1 audit.
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
      suggestedNext: { label: 'Talent and Retention', href: 'talent-retention.html' }
    },
    leader: {
      callout: 'The target structure, small-team paradox, and advancement sections address the decisions that determine whether your modernization has the organizational foundation to hold. Inherited structure is one of the most common hidden constraints on transformation pace.',
      suggestedNext: { label: 'Talent and Retention', href: 'talent-retention.html' }
    },
    practitioner: {
      callout: 'The upskilling priorities section maps the development paths most relevant to practitioner-level roles -- from foundational data literacy through domain-specific analytics depth. The advancement section explains how career progression works in a flat team structure.',
      suggestedNext: { label: 'Talent and Retention', href: 'talent-retention.html' }
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
      suggestedNext: { label: 'Continuous Monitoring', href: 'continuous-monitoring.html' }
    },
    practitioner: {
      callout: 'The technology pathway and budget-case sections give you the framework to make the case for specific tool investments. The data-access prerequisite section defines the foundational condition that determines whether any analytics platform will actually deliver population-level results.',
      suggestedNext: { label: 'Continuous Monitoring', href: 'continuous-monitoring.html' }
    }
  },

  'executive-assessment': {
    executive: {
      callout: 'This ten-question diagnostic assesses your organization\'s partnership with internal audit across five dimensions: alignment, advocacy, access, time, and budget. Respond based on how things actually work in your organization -- the most useful result is an honest one.',
      suggestedNext: { label: 'Executive Oversight', href: 'executive-oversight.html' }
    },
    leader: {
      callout: 'This tool assesses the executive partnership conditions that determine whether your modernization will get the support it needs. Sharing it with your executive sponsor can open a direct conversation about the specific areas where support is thinnest.',
      suggestedNext: { label: 'Organizational Intelligence', href: 'organizational-intelligence.html' }
    },
    practitioner: {
      callout: 'This assessment is designed for executive audiences. It evaluates whether your organization\'s leadership is providing the access, advocacy, and investment the audit function requires. Understanding this perspective is useful context for making the case for the resources your work depends on.',
      suggestedNext: { label: 'Maturity Assessment', href: 'maturity-assessment.html' }
    }
  }

};

/* ============================================================
   SECTION C — ROLE DETECTION
   ============================================================ */

function detectRole() {
  var validRoles = ['executive', 'leader', 'practitioner'];

  // Check URL param ?role= first — allows external links to pre-set role
  var params = new URLSearchParams(window.location.search);
  var urlRole = params.get('role');
  if (urlRole && validRoles.indexOf(urlRole) !== -1) {
    sessionStorage.setItem(STORAGE_KEY, urlRole);
    // Strip param from URL without triggering a reload
    params.delete('role');
    var newSearch = params.toString();
    var newUrl = window.location.pathname + (newSearch ? '?' + newSearch : '') + window.location.hash;
    history.replaceState(null, '', newUrl);
    return urlRole;
  }

  // Fall back to sessionStorage
  var stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored && validRoles.indexOf(stored) !== -1) {
    return stored;
  }

  return null;
}

/* ============================================================
   SECTION D — ROLE SELECTOR BANNER
   Called only when no role is detected.
   Injects immediately after <header>.
   ============================================================ */

function injectRoleSelector() {
  var header = document.querySelector('header');
  if (!header) return;

  var banner = document.createElement('div');
  banner.setAttribute('data-role-banner', 'selector');
  banner.style.cssText = [
    'background:#1a1a1a',
    'border-top:2px solid #8c6f3f',
    'padding:1.5rem 2rem',
    'text-align:center',
    'position:relative',
    'z-index:40'
  ].join(';');

  var heading = document.createElement('p');
  heading.textContent = 'Tailor your experience';
  heading.style.cssText = [
    'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
    'font-size:0.95rem',
    'font-weight:700',
    'color:rgba(255,255,255,0.9)',
    'margin:0 0 0.3rem'
  ].join(';');

  var subtext = document.createElement('p');
  subtext.textContent = 'Select your role to surface the most relevant content on every page.';
  subtext.style.cssText = [
    'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
    'font-size:0.8rem',
    'color:rgba(255,255,255,0.5)',
    'margin:0 0 1rem'
  ].join(';');

  var btnRow = document.createElement('div');
  btnRow.style.cssText = [
    'display:flex',
    'gap:0.75rem',
    'justify-content:center',
    'flex-wrap:wrap'
  ].join(';');

  ['executive', 'leader', 'practitioner'].forEach(function(roleKey) {
    var roleDef = ROLES[roleKey];
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = roleDef.selectorText;
    btn.style.cssText = [
      'display:inline-block',
      'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
      'font-size:0.88rem',
      'font-weight:700',
      'border-radius:999px',
      'padding:10px 14px',
      'border:1px solid rgba(0,0,0,0.12)',
      'background:rgba(255,255,255,0.92)',
      'color:#0f0f10',
      'box-shadow:0 2px 10px rgba(0,0,0,0.06)',
      'cursor:pointer',
      'transition:border-color 140ms ease,color 140ms ease'
    ].join(';');

    btn.addEventListener('mouseover', function() {
      this.style.borderColor = '#8c6f3f';
      this.style.color = '#8c6f3f';
    });
    btn.addEventListener('mouseout', function() {
      this.style.borderColor = 'rgba(0,0,0,0.12)';
      this.style.color = '#0f0f10';
    });

    btn.addEventListener('click', function() {
      sessionStorage.setItem(STORAGE_KEY, roleKey);
      if (banner.parentNode) banner.parentNode.removeChild(banner);
      injectRoleIndicator(roleKey);
      adaptPageForRole(roleKey);
    });

    btnRow.appendChild(btn);
  });

  banner.appendChild(heading);
  banner.appendChild(subtext);
  banner.appendChild(btnRow);

  header.parentNode.insertBefore(banner, header.nextSibling);
}

/* ============================================================
   SECTION E — ROLE INDICATOR
   Called when a role IS detected.
   Shows "Viewing as [Role]" with a "Change role" link.
   ============================================================ */

function injectRoleIndicator(role) {
  // Remove any existing indicator before injecting a new one
  var existing = document.querySelector('[data-role-banner="indicator"]');
  if (existing && existing.parentNode) existing.parentNode.removeChild(existing);

  var header = document.querySelector('header');
  if (!header) return;

  var roleDef = ROLES[role];
  if (!roleDef) return;

  var bar = document.createElement('div');
  bar.setAttribute('data-role-banner', 'indicator');
  bar.style.cssText = [
    'background:rgba(140,111,63,0.08)',
    'border-bottom:1px solid rgba(140,111,63,0.2)',
    'padding:0.4rem 2rem',
    'display:flex',
    'align-items:center',
    'justify-content:space-between',
    'position:relative',
    'z-index:40'
  ].join(';');

  var label = document.createElement('span');
  label.textContent = 'Viewing as ' + roleDef.fullLabel;
  label.style.cssText = [
    'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
    'font-size:0.75rem',
    'color:rgba(255,255,255,0.5)'
  ].join(';');

  var changeLink = document.createElement('a');
  changeLink.textContent = 'Change role';
  changeLink.href = '#';
  changeLink.style.cssText = [
    'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
    'font-size:0.75rem',
    'color:#8c6f3f',
    'text-decoration:none',
    'cursor:pointer'
  ].join(';');

  changeLink.addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.removeItem(STORAGE_KEY);
    if (bar.parentNode) bar.parentNode.removeChild(bar);
    injectRoleSelector();
  });

  bar.appendChild(label);
  bar.appendChild(changeLink);

  header.parentNode.insertBefore(bar, header.nextSibling);
}

/* ============================================================
   SECTION F — PAGE ADAPTATION
   ============================================================ */

/* Derives page slug from the URL path.
   e.g. /team-structure.html -> 'team-structure'
        / or /index.html     -> 'index'            */
function getPageSlug() {
  var filename = window.location.pathname.split('/').pop();
  if (!filename) return 'index';
  var slug = filename.replace(/\.html$/i, '');
  return slug === '' ? 'index' : slug;
}

/* Injects the role-specific callout box after the page hero section.
   Inject point priority:
   1. After first element with class .page-hero inside <main>
   2. After first <section> inside <main>
   3. As first child of <main> (fallback)           */
function injectCallout(config, roleLabel) {
  if (document.querySelector('[data-role-callout]')) return; // prevent double injection

  var main = document.querySelector('main');
  if (!main) return;

  var callout = document.createElement('div');
  callout.setAttribute('data-role-callout', 'true');
  callout.style.cssText = [
    'background:rgba(140,111,63,0.06)',
    'border-left:3px solid #8c6f3f',
    'padding:1.1rem 1.5rem',
    'margin-bottom:1.5rem',
    'box-sizing:border-box'
  ].join(';');

  // Label: "FOR EXECUTIVE" etc.
  var labelEl = document.createElement('div');
  labelEl.textContent = 'FOR ' + roleLabel.toUpperCase();
  labelEl.style.cssText = [
    'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
    'font-size:0.68rem',
    'letter-spacing:0.12em',
    'text-transform:uppercase',
    'color:#8c6f3f',
    'font-weight:700'
  ].join(';');

  // Callout body text
  var textEl = document.createElement('p');
  textEl.textContent = config.callout;
  textEl.style.cssText = [
    'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
    'font-size:0.9rem',
    'line-height:1.7',
    'color:rgba(255,255,255,0.75)',
    'margin-top:0.4rem'
  ].join(';');

  callout.appendChild(labelEl);
  callout.appendChild(textEl);

  // Suggested next link
  if (config.suggestedNext) {
    var nextEl = document.createElement('p');
    nextEl.style.cssText = [
      'font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif',
      'font-size:0.8rem',
      'margin-top:0.6rem',
      'color:rgba(255,255,255,0.5)'
    ].join(';');

    nextEl.appendChild(document.createTextNode('Suggested next: '));

    var nextLink = document.createElement('a');
    nextLink.textContent = config.suggestedNext.label;
    nextLink.href = config.suggestedNext.href;
    nextLink.style.cssText = 'color:#8c6f3f;text-decoration:none;font-weight:700;';
    nextEl.appendChild(nextLink);
    callout.appendChild(nextEl);
  }

  // Find the best inject point
  var anchor = main.querySelector('.page-hero') || main.querySelector('section');
  if (anchor) {
    anchor.parentNode.insertBefore(callout, anchor.nextSibling);
  } else {
    main.insertBefore(callout, main.firstChild);
  }
}

/* Adds a subtle left-border highlight to all sections tagged for the
   current role, and scrolls to the first one if the user just arrived. */
function highlightAudienceSections(role) {
  var matched = document.querySelectorAll('[data-audience="' + role + '"]');
  var firstMatch = null;

  matched.forEach(function(el) {
    el.style.borderLeft = '2px solid rgba(140,111,63,0.35)';
    if (!firstMatch) firstMatch = el;
  });

  // Smooth-scroll to first role-relevant section only if user hasn't scrolled yet
  if (firstMatch) {
    var scrollTop = window.scrollY !== undefined ? window.scrollY : window.pageYOffset;
    if (scrollTop < 100) {
      setTimeout(function() {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }
}

/* Coordinates callout injection and section highlighting for the current page. */
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
   SECTION G — INIT
   Runs on DOMContentLoaded. Detects role and either shows
   the selector banner or the role indicator + page adaptation.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
  var role = detectRole();

  if (role === null) {
    injectRoleSelector();
  } else {
    injectRoleIndicator(role);
    adaptPageForRole(role);
  }
});
