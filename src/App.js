import { useState, useRef, useEffect } from "react";
import "./App.css";

/* ─────────────────────────────────────
   NAVIGATION
───────────────────────────────────── */
function Nav({ page, setPage, authed }) {
  return (
    <nav className="nav">
      <button className="nav-logo" onClick={() => setPage("landing")}>
        DAFTA<span>AI</span>
      </button>

      {!authed ? (
        <div className="nav-links">
          <button className="nav-link" onClick={() => setPage("landing")}>Home</button>
          <button className="btn btn-ghost btn-sm" onClick={() => setPage("auth")}>Sign in</button>
          <button className="btn btn-primary btn-sm" onClick={() => setPage("auth")}>Get started</button>
        </div>
      ) : (
        <div className="nav-links">
          <button className="nav-link" onClick={() => setPage("dashboard")}>Dashboard</button>
          <button className="nav-link" onClick={() => setPage("profile")}>Profile</button>
          <button className="nav-avatar">JD</button>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────
   LANDING PAGE
───────────────────────────────────── */
function Landing({ setPage }) {
  const features = [
    { emoji: "🧠", bg: "rgba(79,142,247,0.12)", title: "AI Career Matching", desc: "Our model analyses your skills, interests, and goals to surface careers you are uniquely suited for." },
    { emoji: "📄", bg: "rgba(6,214,160,0.1)", title: "CV Analysis", desc: "Upload your CV and we extract your competencies, experience level, and skill gaps automatically." },
    { emoji: "🗺️", bg: "rgba(124,58,237,0.12)", title: "Learning Roadmaps", desc: "Get a personalised step-by-step path — courses, certifications, and milestones tailored to you." },
    { emoji: "💬", bg: "rgba(245,158,11,0.1)", title: "AI Chat Advisor", desc: "Ask anything about careers, salaries, industry trends, or interview prep in real time." },
    { emoji: "📊", bg: "rgba(244,63,94,0.1)", title: "Skill Gap Tracker", desc: "See exactly where you stand vs your target role and track your progress over time." },
    { emoji: "🎯", bg: "rgba(79,142,247,0.1)", title: "Goal Setting", desc: "Set short and long-term career goals and get AI nudges to keep you on track." },
  ];

  const stats = [
    ["50K+", "Students guided"],
    ["1,200+", "Career paths mapped"],
    ["94%", "Satisfaction rate"],
    ["4.9★", "Average rating"],
  ];

  return (
    <div>
      {/* Hero */}
      <div className="hero">
        <div className="hero-grid" />
        <div className="hero-glow" />

        <div className="hero-eyebrow">
          <div className="hero-eyebrow-dot" />
          AI-powered career intelligence
        </div>

        <h1 className="hero-title">
          Discover the career<br />
          <span className="grad">you were built for</span>
        </h1>

        <p className="hero-sub">
          CareerAI analyses your skills, interests, and goals to surface
          personalised career paths, skill gaps, and learning roadmaps.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary btn-lg" onClick={() => setPage("auth")}>
            Start for free →
          </button>
          <button className="btn btn-ghost btn-lg" onClick={() => setPage("dashboard")}>
            View demo
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-row">
        {stats.map(([num, label]) => (
          <div className="stat" key={label}>
            <div className="stat-num">{num}</div>
            <div className="stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div className="features-section">
        <div className="section-label">Features</div>
        <div className="section-title">Everything you need to navigate your career</div>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" style={{ background: f.bg }}>{f.emoji}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="cta-section">
        <div className="cta-title">Ready to find your path?</div>
        <div className="cta-sub">Join thousands of students navigating smarter careers.</div>
        <button className="btn btn-primary btn-lg" onClick={() => setPage("auth")}>
          Create free account →
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   AUTH PAGE
───────────────────────────────────── */
function Auth({ setPage, setAuthed }) {
  const [tab, setTab] = useState("signin");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [confirm, setConfirm] = useState("");

  function handleSubmit() {
    setAuthed(true);
    setPage("profile");
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" />

      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">Career<span>AI</span></div>
          <div className="auth-title">{tab === "signin" ? "Welcome back" : "Create account"}</div>
          <div className="auth-sub">
            {tab === "signin" ? "Sign in to your account" : "Start your career journey today"}
          </div>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button className={"auth-tab" + (tab === "signin" ? " active" : "")} onClick={() => setTab("signin")}>
            Sign in
          </button>
          <button className={"auth-tab" + (tab === "signup" ? " active" : "")} onClick={() => setTab("signup")}>
            Sign up
          </button>
        </div>

        {/* Sign-up extra fields */}
        {tab === "signup" && (
          <div className="form-row" style={{ marginBottom: 16 }}>
            <div>
              <label className="label">First name</label>
              <input className="input" placeholder="John" value={first} onChange={(e) => setFirst(e.target.value)} />
            </div>
            <div>
              <label className="label">Last name</label>
              <input className="input" placeholder="Doe" value={last} onChange={(e) => setLast(e.target.value)} />
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="label">Email address</label>
          <input className="input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form-group">
          <label className="label">Password</label>
          <input className="input" type="password" placeholder="••••••••" value={pass} onChange={(e) => setPass(e.target.value)} />
        </div>

        {tab === "signup" && (
          <div className="form-group">
            <label className="label">Confirm password</label>
            <input className="input" type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          </div>
        )}

        {tab === "signin" && (
          <div className="forgot-link">
            <button className="auth-link">Forgot password?</button>
          </div>
        )}

        <button className="btn btn-primary btn-full" onClick={handleSubmit} style={{ marginBottom: 16 }}>
          {tab === "signin" ? "Sign in →" : "Create account →"}
        </button>

        <div className="divider">or continue with</div>

        <div className="social-btns">
          <button className="social-btn">G &nbsp; Google</button>
          <button className="social-btn">in &nbsp; LinkedIn</button>
        </div>

        <div className="auth-footer">
          {tab === "signin" ? (
            <>Don&apos;t have an account?{" "}
              <button className="auth-link" onClick={() => setTab("signup")}>Sign up</button>
            </>
          ) : (
            <>Already have an account?{" "}
              <button className="auth-link" onClick={() => setTab("signin")}>Sign in</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   PROFILE BUILDER
───────────────────────────────────── */
function Profile({ setPage }) {
  const [step, setStep] = useState(0);
  const [skills, setSkills] = useState(["Python", "Data Analysis", "Communication"]);
  const [skillInput, setSkillInput] = useState("");
  const [interests, setInterests] = useState(["Technology", "Science"]);
  const [eduLevel, setEduLevel] = useState("undergraduate");
  const [goal, setGoal] = useState("");

  const steps = ["Personal info", "Skills", "Interests", "Career goals", "Upload CV"];

  const interestOptions = [
    { emoji: "💻", label: "Technology" }, { emoji: "🔬", label: "Science" },
    { emoji: "💰", label: "Finance" }, { emoji: "🎨", label: "Design" },
    { emoji: "⚕️", label: "Healthcare" }, { emoji: "📚", label: "Education" },
    { emoji: "🌱", label: "Environment" }, { emoji: "🏗️", label: "Engineering" },
    { emoji: "📣", label: "Marketing" }, { emoji: "⚖️", label: "Law" },
    { emoji: "🎮", label: "Gaming" }, { emoji: "✈️", label: "Travel" },
  ];

  function addSkill() {
    const val = skillInput.trim();
    if (val && !skills.includes(val)) {
      setSkills([...skills, val]);
      setSkillInput("");
    }
  }

  function removeSkill(s) {
    setSkills(skills.filter((x) => x !== s));
  }

  function toggleInterest(label) {
    setInterests((prev) =>
      prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]
    );
  }

  const progress = (step / (steps.length - 1)) * 100;

  const subtitles = [
    "Tell us a bit about yourself.",
    "What skills do you currently have?",
    "What areas excite you most?",
    "Paint a picture of where you are headed.",
    "Let AI read your CV to boost accuracy.",
  ];

  return (
    <div className="profile-page">
      {/* Progress bar */}
      <div className="profile-top">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "var(--muted2)" }}>Step {step + 1} of {steps.length}</span>
          <span style={{ fontSize: 13, color: "var(--accent)" }}>{Math.round(progress)}% complete</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: progress + "%", background: "linear-gradient(90deg, var(--accent), var(--accent2))" }} />
        </div>
      </div>

      <div className="profile-layout">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="sidebar-heading">Setup</div>
          <div className="profile-steps">
            {steps.map((s, i) => (
              <button
                key={s}
                className={"step-item" + (i === step ? " active" : i < step ? " done" : "")}
                onClick={() => i <= step && setStep(i)}
              >
                <div className="step-num">{i < step ? "✓" : i + 1}</div>
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div>
          <div className="profile-header">
            <div className="profile-title">{steps[step]}</div>
            <div className="profile-sub">{subtitles[step]}</div>
          </div>

          <div className="card" style={{ padding: 28 }}>
            {/* Step 0: Personal info */}
            {step === 0 && (
              <div>
                <div className="form-row" style={{ marginBottom: 16 }}>
                  <div>
                    <label className="label">First name</label>
                    <input className="input" defaultValue="John" />
                  </div>
                  <div>
                    <label className="label">Last name</label>
                    <input className="input" defaultValue="Doe" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label">Email</label>
                  <input className="input" type="email" defaultValue="john@example.com" />
                </div>
                <div className="form-group">
                  <label className="label">Education level</label>
                  <select className="input select" value={eduLevel} onChange={(e) => setEduLevel(e.target.value)}>
                    <option value="secondary">Secondary / High school</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="postgraduate">Postgraduate</option>
                    <option value="professional">Working professional</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">Field of study / current role</label>
                  <input className="input" placeholder="e.g. Computer Science, Software Engineer..." />
                </div>
              </div>
            )}

            {/* Step 1: Skills */}
            {step === 1 && (
              <div>
                <div className="skill-input-row">
                  <input
                    className="input"
                    placeholder="Type a skill and press Add..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  />
                  <button className="btn btn-outline" onClick={addSkill}>Add</button>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted2)", marginBottom: 10 }}>
                  Add your current skills — be honest, this helps us match you accurately.
                </div>
                <div className="skills-list">
                  {skills.map((s) => (
                    <div className="skill-tag" key={s}>
                      {s}
                      <button className="skill-remove" onClick={() => removeSkill(s)}>×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Interests */}
            {step === 2 && (
              <div>
                <div style={{ fontSize: 14, color: "var(--muted2)", marginBottom: 16 }}>
                  Select all that apply — we use these to personalise your career matches.
                </div>
                <div className="interest-grid">
                  {interestOptions.map(({ emoji, label }) => (
                    <div
                      key={label}
                      className={"interest-card" + (interests.includes(label) ? " selected" : "")}
                      onClick={() => toggleInterest(label)}
                    >
                      <div className="interest-emoji">{emoji}</div>
                      <div>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Goals */}
            {step === 3 && (
              <div>
                <div className="form-group">
                  <label className="label">Where do you see yourself in 5 years?</label>
                  <textarea
                    className="input textarea"
                    placeholder="e.g. I want to be a senior data scientist at a tech company..."
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="label">What is your biggest career challenge right now?</label>
                  <textarea
                    className="input textarea"
                    placeholder="e.g. I do not know which direction to take after graduation..."
                  />
                </div>
                <div className="form-group">
                  <label className="label">Preferred work style</label>
                  <select className="input select">
                    <option>Remote first</option>
                    <option>Hybrid</option>
                    <option>On-site</option>
                    <option>No preference</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4: CV upload */}
            {step === 4 && (
              <div>
                <div className="cv-dropzone">
                  <div style={{ fontSize: 36, marginBottom: 12 }}>📄</div>
                  <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Drop your CV here</div>
                  <div style={{ fontSize: 13, color: "var(--muted2)", marginBottom: 16 }}>PDF, DOC, or DOCX up to 5MB</div>
                  <button className="btn btn-outline">Browse files</button>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted2)", textAlign: "center" }}>
                  You can skip this step and upload later from your dashboard.
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="profile-nav">
            <button
              className="btn btn-ghost"
              onClick={() => (step > 0 ? setStep(step - 1) : setPage("landing"))}
            >
              ← {step === 0 ? "Back" : "Previous"}
            </button>
            <button
              className="btn btn-primary"
              onClick={() => (step < steps.length - 1 ? setStep(step + 1) : setPage("dashboard"))}
            >
              {step === steps.length - 1 ? "View my matches →" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────
   DASHBOARD
───────────────────────────────────── */
function Dashboard({ setPage }) {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi John! Based on your profile I found 12 great career matches. Want me to walk you through the top picks?" },
    { role: "user", text: "Yes, tell me about Data Science roles." },
    { role: "ai", text: "Great choice! Data Science is a strong match — your Python and analysis skills align well. You would need to strengthen ML and statistics. Want a roadmap?" },
  ]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage() {
    const text = chatInput.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text }]);
    setChatInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "That is a great question! Let me analyse your profile and get back to you with personalised insights..." },
      ]);
    }, 800);
  }

  const careers = [
    { name: "Data Scientist", field: "Technology · Analytics", match: 94, icon: "📊", tags: [{ text: "High demand", cls: "tag-green" }, { text: "Remote friendly", cls: "tag-blue" }] },
    { name: "ML Engineer", field: "Technology · AI", match: 88, icon: "🤖", tags: [{ text: "Fast growth", cls: "tag-purple" }, { text: "Top salary", cls: "tag-amber" }] },
    { name: "Product Manager", field: "Business · Tech", match: 79, icon: "🗺️", tags: [{ text: "Leadership", cls: "tag-blue" }, { text: "High impact", cls: "tag-green" }] },
    { name: "UX Researcher", field: "Design · Research", match: 74, icon: "🔬", tags: [{ text: "Creative", cls: "tag-purple" }, { text: "Flexible", cls: "tag-green" }] },
  ];

  const metrics = [
    { val: "12", label: "Career matches", change: "+3 new today", icon: "🎯", cls: "blue" },
    { val: "94%", label: "Best match score", change: "Data Scientist", icon: "⭐", cls: "purple" },
    { val: "4/8", label: "Skills on track", change: "2 need attention", icon: "📈", cls: "green" },
    { val: "3", label: "Roadmaps saved", change: "1 in progress", icon: "🗺️", cls: "amber" },
  ];

  const skillGaps = [
    { name: "Machine Learning", current: 35, color: "#4f8ef7" },
    { name: "Statistics", current: 55, color: "#7c3aed" },
    { name: "SQL", current: 70, color: "#06d6a0" },
    { name: "Data Viz", current: 60, color: "#f59e0b" },
    { name: "Communication", current: 80, color: "#06d6a0" },
  ];

  const mainLinks = [
    { icon: "🏠", label: "Overview", active: true },
    { icon: "🎯", label: "Career matches" },
    { icon: "🗺️", label: "Roadmaps" },
    { icon: "📈", label: "Skill tracker" },
    { icon: "📚", label: "Resources" },
  ];

  const accountLinks = [
    { icon: "🔔", label: "Notifications" },
    { icon: "👤", label: "Profile", action: () => setPage("profile") },
    { icon: "⚙️", label: "Settings" },
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="app-sidebar">
        <div className="sidebar-section">
          <div className="sidebar-section-label">Main</div>
          {mainLinks.map((l) => (
            <button key={l.label} className={"sidebar-link" + (l.active ? " active" : "")} onClick={l.action}>
              <span className="sidebar-icon">{l.icon}</span>
              {l.label}
            </button>
          ))}
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-label">Account</div>
          {accountLinks.map((l) => (
            <button key={l.label} className="sidebar-link" onClick={l.action}>
              <span className="sidebar-icon">{l.icon}</span>
              {l.label}
            </button>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="sidebar-promo">
            <div style={{ fontSize: 12, fontWeight: 600, color: "#7eb5ff", marginBottom: 6 }}>Profile 60% complete</div>
            <div className="progress-track" style={{ marginBottom: 8 }}>
              <div className="progress-fill" style={{ width: "60%", background: "var(--accent)" }} />
            </div>
            <div style={{ fontSize: 11, color: "var(--muted2)" }}>Upload your CV to improve matches</div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="dashboard-main">
        <div className="dash-greeting">Good morning 👋</div>
        <div className="dash-title">Welcome back, John</div>

        {/* Metrics */}
        <div className="metrics-row">
          {metrics.map((m) => (
            <div key={m.label} className={"metric-card " + m.cls}>
              <div className="metric-icon">{m.icon}</div>
              <div className="metric-val">{m.val}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-change">{m.change}</div>
            </div>
          ))}
        </div>

        {/* Career matches + Chat */}
        <div className="dash-grid">
          {/* Career matches */}
          <div>
            <div className="section-hd">
              <div className="section-hd-title">Top career matches</div>
              <button className="btn btn-ghost btn-sm">View all</button>
            </div>
            {careers.map((c) => (
              <div key={c.name} className="career-card">
                <div className="career-logo">{c.icon}</div>
                <div className="career-info">
                  <div className="career-name">{c.name}</div>
                  <div className="career-field">{c.field}</div>
                  <div className="career-tags">
                    {c.tags.map((t) => (
                      <span key={t.text} className={"tag " + t.cls}>{t.text}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="career-match">{c.match}%</div>
                  <div className="career-match-label">match</div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat panel */}
          <div className="chat-panel">
            <div className="chat-header">
              <div className="chat-avatar">🤖</div>
              <div>
                <div className="chat-name">CareerAI Advisor</div>
                <div className="chat-status">● Online</div>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={"chat-msg " + m.role}>
                  <div className="chat-bubble">{m.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-row">
              <input
                className="chat-input"
                placeholder="Ask me anything..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button className="chat-send" onClick={sendMessage}>→</button>
            </div>
          </div>
        </div>

        {/* Skill gap tracker */}
        <div className="skill-gap-card">
          <div className="section-hd">
            <div className="section-hd-title">Skill gap — Data Scientist</div>
            <span className="tag tag-blue">Target role</span>
          </div>
          {skillGaps.map((s) => (
            <div key={s.name} className="skill-row">
              <div className="skill-name">{s.name}</div>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: s.current + "%", background: s.color }} />
              </div>
              <div className="skill-pct">{s.current}%</div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
            Bars show your current skill level vs target role requirements.
          </div>
        </div>
      </main>
    </div>
  );
}

/* ─────────────────────────────────────
   APP ROOT
───────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("landing");
  const [authed, setAuthed] = useState(false);

  return (
    <div>
      <Nav page={page} setPage={setPage} authed={authed} />
      {page === "landing" && <Landing setPage={setPage} />}
      {page === "auth" && <Auth setPage={setPage} setAuthed={setAuthed} />}
      {page === "profile" && <Profile setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} />}
    </div>
  );
}