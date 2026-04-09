import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #080c12;
    --bg2: #0e1420;
    --bg3: #141b28;
    --card: #111827;
    --border: rgba(255,255,255,0.07);
    --border2: rgba(255,255,255,0.12);
    --accent: #4f8ef7;
    --accent2: #7c3aed;
    --accent3: #06d6a0;
    --text: #f0f4ff;
    --muted: #6b7a99;
    --muted2: #8892aa;
    --danger: #f43f5e;
    --warn: #f59e0b;
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
    --radius: 14px;
    --radius-sm: 8px;
    --glow: 0 0 40px rgba(79,142,247,0.15);
    --glow2: 0 0 60px rgba(124,58,237,0.12);
  }

  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }

  .app { min-height: 100vh; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

  /* ── NOISE OVERLAY ── */
  .noise::after {
    content: '';
    position: fixed; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: 0.4;
  }

  /* ── BUTTONS ── */
  .btn {
    font-family: var(--font-body); font-size: 14px; font-weight: 500;
    padding: 10px 22px; border-radius: var(--radius-sm); border: none;
    cursor: pointer; transition: all 0.2s; display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary {
    background: var(--accent); color: #fff;
    box-shadow: 0 0 20px rgba(79,142,247,0.3);
  }
  .btn-primary:hover { background: #6a9ef8; transform: translateY(-1px); box-shadow: 0 0 28px rgba(79,142,247,0.45); }
  .btn-ghost {
    background: transparent; color: var(--muted2); border: 1px solid var(--border);
  }
  .btn-ghost:hover { border-color: var(--border2); color: var(--text); }
  .btn-outline {
    background: transparent; color: var(--accent); border: 1px solid rgba(79,142,247,0.4);
  }
  .btn-outline:hover { background: rgba(79,142,247,0.08); }
  .btn-lg { padding: 14px 32px; font-size: 15px; border-radius: var(--radius); }
  .btn-sm { padding: 7px 14px; font-size: 13px; }
  .btn-full { width: 100%; justify-content: center; }
  .btn-purple {
    background: var(--accent2); color: #fff;
    box-shadow: 0 0 20px rgba(124,58,237,0.3);
  }
  .btn-purple:hover { background: #8b5cf6; transform: translateY(-1px); }

  /* ── INPUTS ── */
  .input {
    width: 100%; padding: 11px 14px; background: var(--bg3);
    border: 1px solid var(--border); border-radius: var(--radius-sm);
    color: var(--text); font-family: var(--font-body); font-size: 14px;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .input:focus { border-color: rgba(79,142,247,0.5); box-shadow: 0 0 0 3px rgba(79,142,247,0.1); }
  .input::placeholder { color: var(--muted); }
  .label { display: block; font-size: 12px; font-weight: 500; color: var(--muted2); margin-bottom: 6px; letter-spacing: 0.04em; text-transform: uppercase; }

  /* ── CARDS ── */
  .card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 24px;
  }
  .card-hover { transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s; cursor: pointer; }
  .card-hover:hover { border-color: var(--border2); transform: translateY(-2px); box-shadow: var(--glow); }

  /* ── TAG / BADGE ── */
  .tag {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 4px 10px; border-radius: 100px; font-size: 12px; font-weight: 500;
  }
  .tag-blue { background: rgba(79,142,247,0.12); color: #7eb5ff; border: 1px solid rgba(79,142,247,0.2); }
  .tag-green { background: rgba(6,214,160,0.1); color: #06d6a0; border: 1px solid rgba(6,214,160,0.2); }
  .tag-purple { background: rgba(124,58,237,0.12); color: #a78bfa; border: 1px solid rgba(124,58,237,0.2); }
  .tag-amber { background: rgba(245,158,11,0.1); color: #fbbf24; border: 1px solid rgba(245,158,11,0.2); }
  .tag-red { background: rgba(244,63,94,0.1); color: #fb7185; border: 1px solid rgba(244,63,94,0.2); }

  /* ── PROGRESS ── */
  .progress-track { height: 4px; background: var(--bg3); border-radius: 2px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 2px; transition: width 0.6s cubic-bezier(.16,1,.3,1); }

  /* ── NAV ── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(8,12,18,0.85); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 40px; height: 64px;
  }
  .nav-logo { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .nav-logo span { color: var(--accent); }
  .nav-links { display: flex; align-items: center; gap: 4px; }
  .nav-link { padding: 6px 14px; border-radius: 6px; font-size: 14px; color: var(--muted2); cursor: pointer; transition: all 0.15s; background: transparent; border: none; font-family: var(--font-body); }
  .nav-link:hover, .nav-link.active { color: var(--text); background: rgba(255,255,255,0.05); }

  /* ══════════════════════════
     LANDING PAGE
  ══════════════════════════ */
  .landing { min-height: 100vh; overflow: hidden; }

  .hero {
    min-height: 100vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
    padding: 120px 40px 80px; position: relative;
  }
  .hero-glow {
    position: absolute; top: 10%; left: 50%; transform: translateX(-50%);
    width: 700px; height: 400px;
    background: radial-gradient(ellipse at center, rgba(79,142,247,0.18) 0%, rgba(124,58,237,0.1) 40%, transparent 70%);
    pointer-events: none; filter: blur(40px);
  }
  .hero-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px; pointer-events: none;
    mask-image: radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 100%);
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 6px 14px 6px 8px; border-radius: 100px;
    background: rgba(79,142,247,0.08); border: 1px solid rgba(79,142,247,0.2);
    font-size: 12px; color: #7eb5ff; font-weight: 500; margin-bottom: 28px;
    position: relative; z-index: 1;
  }
  .hero-eyebrow-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(0.8)} }

  .hero-title {
    font-family: var(--font-display); font-size: clamp(42px, 6vw, 72px);
    font-weight: 800; line-height: 1.08; letter-spacing: -0.02em;
    color: var(--text); max-width: 800px; position: relative; z-index: 1;
    margin-bottom: 24px;
  }
  .hero-title .grad {
    background: linear-gradient(135deg, var(--accent) 0%, #a78bfa 50%, var(--accent3) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .hero-sub {
    font-size: 17px; color: var(--muted2); max-width: 520px; line-height: 1.7;
    position: relative; z-index: 1; margin-bottom: 44px; font-weight: 300;
  }
  .hero-actions { display: flex; gap: 12px; align-items: center; position: relative; z-index: 1; flex-wrap: wrap; justify-content: center; }

  .stats-row {
    display: flex; gap: 48px; justify-content: center; flex-wrap: wrap;
    padding: 48px 40px; border-top: 1px solid var(--border);
  }
  .stat { text-align: center; }
  .stat-num { font-family: var(--font-display); font-size: 32px; font-weight: 700; color: var(--text); }
  .stat-label { font-size: 13px; color: var(--muted); margin-top: 4px; }

  .features-section { padding: 80px 40px; max-width: 1100px; margin: 0 auto; }
  .section-label { font-size: 12px; font-weight: 600; color: var(--accent); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; }
  .section-title { font-family: var(--font-display); font-size: clamp(28px, 3vw, 40px); font-weight: 700; color: var(--text); margin-bottom: 48px; }

  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .feature-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 28px; transition: all 0.2s;
  }
  .feature-card:hover { border-color: var(--border2); box-shadow: var(--glow); transform: translateY(-3px); }
  .feature-icon {
    width: 44px; height: 44px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; margin-bottom: 16px;
  }
  .feature-title { font-family: var(--font-display); font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 8px; }
  .feature-desc { font-size: 14px; color: var(--muted2); line-height: 1.6; }

  .cta-section {
    margin: 40px; border-radius: 20px;
    background: linear-gradient(135deg, rgba(79,142,247,0.12) 0%, rgba(124,58,237,0.12) 100%);
    border: 1px solid rgba(79,142,247,0.2);
    padding: 64px 40px; text-align: center;
  }
  .cta-title { font-family: var(--font-display); font-size: 36px; font-weight: 700; margin-bottom: 16px; }
  .cta-sub { color: var(--muted2); font-size: 16px; margin-bottom: 32px; }

  /* ══════════════════════════
     AUTH PAGE
  ══════════════════════════ */
  .auth-page {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    padding: 80px 20px; position: relative;
  }
  .auth-bg {
    position: fixed; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 60% 50% at 30% 50%, rgba(79,142,247,0.08) 0%, transparent 60%),
                radial-gradient(ellipse 50% 60% at 70% 50%, rgba(124,58,237,0.08) 0%, transparent 60%);
  }
  .auth-card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 20px; padding: 40px; width: 100%; max-width: 420px;
    position: relative; z-index: 1;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04);
  }
  .auth-header { text-align: center; margin-bottom: 32px; }
  .auth-logo { font-family: var(--font-display); font-size: 20px; font-weight: 700; margin-bottom: 20px; }
  .auth-logo span { color: var(--accent); }
  .auth-title { font-family: var(--font-display); font-size: 24px; font-weight: 700; margin-bottom: 6px; }
  .auth-sub { font-size: 14px; color: var(--muted2); }
  .auth-tabs { display: flex; background: var(--bg3); border-radius: var(--radius-sm); padding: 3px; margin-bottom: 28px; }
  .auth-tab { flex: 1; padding: 8px; border-radius: 6px; text-align: center; font-size: 14px; font-weight: 500; cursor: pointer; color: var(--muted); transition: all 0.15s; border: none; background: transparent; font-family: var(--font-body); }
  .auth-tab.active { background: var(--card); color: var(--text); box-shadow: 0 1px 4px rgba(0,0,0,0.3); }
  .form-group { margin-bottom: 16px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; color: var(--muted); font-size: 12px; }
  .divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }
  .social-btn {
    width: 100%; padding: 10px; background: var(--bg3); border: 1px solid var(--border);
    border-radius: var(--radius-sm); color: var(--text); font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all 0.15s; font-family: var(--font-body);
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
  .social-btn:hover { border-color: var(--border2); background: var(--bg2); }
  .auth-footer { text-align: center; margin-top: 20px; font-size: 13px; color: var(--muted2); }
  .auth-link { color: var(--accent); cursor: pointer; text-decoration: none; }

  /* ══════════════════════════
     PROFILE BUILDER
  ══════════════════════════ */
  .profile-page { min-height: 100vh; padding: 80px 0 60px; }
  .profile-layout { display: grid; grid-template-columns: 280px 1fr; gap: 0; max-width: 1100px; margin: 0 auto; padding: 40px 24px; }
  .profile-sidebar { padding-right: 40px; }
  .profile-steps { display: flex; flex-direction: column; gap: 4px; }
  .step-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 14px; border-radius: var(--radius-sm); cursor: pointer;
    transition: all 0.15s; color: var(--muted2); font-size: 14px;
  }
  .step-item:hover { background: rgba(255,255,255,0.03); color: var(--text); }
  .step-item.active { background: rgba(79,142,247,0.08); color: var(--accent); }
  .step-item.done { color: var(--accent3); }
  .step-num {
    width: 24px; height: 24px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 600;
    border: 1.5px solid currentColor; flex-shrink: 0;
  }
  .step-item.done .step-num { background: var(--accent3); border-color: var(--accent3); color: var(--bg); }
  .profile-main { }
  .profile-header { margin-bottom: 32px; }
  .profile-title { font-family: var(--font-display); font-size: 26px; font-weight: 700; margin-bottom: 6px; }
  .profile-sub { font-size: 14px; color: var(--muted2); }
  .skill-input-row { display: flex; gap: 8px; margin-bottom: 12px; }
  .skills-list { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
  .skill-tag {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 5px 12px; background: rgba(79,142,247,0.1); border: 1px solid rgba(79,142,247,0.2);
    border-radius: 100px; font-size: 13px; color: #7eb5ff;
  }
  .skill-remove { cursor: pointer; color: var(--muted); font-size: 16px; line-height: 1; transition: color 0.15s; }
  .skill-remove:hover { color: var(--danger); }
  .interest-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 10px; }
  .interest-card {
    padding: 14px; border-radius: var(--radius-sm); border: 1.5px solid var(--border);
    cursor: pointer; text-align: center; transition: all 0.15s; font-size: 13px; color: var(--muted2);
    background: var(--bg3);
  }
  .interest-card:hover { border-color: var(--border2); color: var(--text); }
  .interest-card.selected { border-color: rgba(79,142,247,0.5); background: rgba(79,142,247,0.08); color: var(--accent); }
  .interest-emoji { font-size: 22px; margin-bottom: 6px; }
  .profile-nav { display: flex; justify-content: space-between; margin-top: 40px; padding-top: 24px; border-top: 1px solid var(--border); }
  .textarea { resize: vertical; min-height: 90px; }
  .select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7a99' d='M6 8L1 3h10z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; }

  /* ══════════════════════════
     DASHBOARD
  ══════════════════════════ */
  .dashboard { min-height: 100vh; display: flex; }
  .sidebar {
    width: 240px; min-height: 100vh; background: var(--bg2);
    border-right: 1px solid var(--border); padding: 80px 0 24px;
    position: fixed; top: 0; bottom: 0; overflow-y: auto; flex-shrink: 0;
  }
  .sidebar-section { padding: 0 12px; margin-bottom: 8px; }
  .sidebar-label { font-size: 10px; font-weight: 600; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; padding: 8px 12px; }
  .sidebar-link {
    display: flex; align-items: center; gap: 10px; padding: 9px 12px;
    border-radius: var(--radius-sm); font-size: 14px; color: var(--muted2); cursor: pointer;
    transition: all 0.15s; border: none; background: transparent; width: 100%; font-family: var(--font-body);
  }
  .sidebar-link:hover { background: rgba(255,255,255,0.04); color: var(--text); }
  .sidebar-link.active { background: rgba(79,142,247,0.1); color: var(--accent); }
  .sidebar-icon { width: 18px; text-align: center; font-size: 16px; }

  .dashboard-main { margin-left: 240px; flex: 1; padding: 88px 40px 60px; max-width: calc(100% - 240px); }
  .dash-welcome { margin-bottom: 36px; }
  .dash-greeting { font-size: 13px; color: var(--muted2); margin-bottom: 4px; }
  .dash-title { font-family: var(--font-display); font-size: 28px; font-weight: 700; }

  .metrics-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
  .metric-card {
    background: var(--card); border: 1px solid var(--border); border-radius: var(--radius);
    padding: 20px; position: relative; overflow: hidden;
  }
  .metric-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; }
  .metric-card.blue::before { background: linear-gradient(90deg, var(--accent), transparent); }
  .metric-card.purple::before { background: linear-gradient(90deg, var(--accent2), transparent); }
  .metric-card.green::before { background: linear-gradient(90deg, var(--accent3), transparent); }
  .metric-card.amber::before { background: linear-gradient(90deg, var(--warn), transparent); }
  .metric-icon { font-size: 20px; margin-bottom: 12px; }
  .metric-val { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--text); }
  .metric-label { font-size: 12px; color: var(--muted); margin-top: 4px; }
  .metric-change { font-size: 12px; color: var(--accent3); margin-top: 6px; }

  .dash-grid { display: grid; grid-template-columns: 1fr 360px; gap: 24px; margin-bottom: 24px; }
  .section-hd { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
  .section-hd-title { font-family: var(--font-display); font-size: 16px; font-weight: 600; }

  .career-card {
    background: var(--bg3); border: 1px solid var(--border);
    border-radius: var(--radius); padding: 18px; margin-bottom: 12px;
    display: flex; gap: 16px; align-items: flex-start; cursor: pointer;
    transition: all 0.2s;
  }
  .career-card:hover { border-color: var(--border2); background: var(--card); transform: translateX(4px); }
  .career-logo {
    width: 44px; height: 44px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }
  .career-info { flex: 1; }
  .career-name { font-size: 15px; font-weight: 500; color: var(--text); margin-bottom: 3px; }
  .career-field { font-size: 13px; color: var(--muted2); margin-bottom: 8px; }
  .career-tags { display: flex; gap: 6px; flex-wrap: wrap; }
  .career-match { font-size: 13px; font-weight: 600; color: var(--accent3); white-space: nowrap; }

  .ai-chat-panel { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); display: flex; flex-direction: column; height: 400px; }
  .chat-header { padding: 16px 18px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .chat-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; font-size: 14px; }
  .chat-name { font-size: 14px; font-weight: 500; }
  .chat-status { font-size: 11px; color: var(--accent3); }
  .chat-messages { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; }
  .chat-msg { max-width: 85%; }
  .chat-msg.ai { align-self: flex-start; }
  .chat-msg.user { align-self: flex-end; }
  .chat-bubble {
    padding: 10px 14px; border-radius: 12px; font-size: 13px; line-height: 1.5;
  }
  .chat-msg.ai .chat-bubble { background: var(--bg3); color: var(--text); border-bottom-left-radius: 4px; }
  .chat-msg.user .chat-bubble { background: rgba(79,142,247,0.2); color: var(--text); border-bottom-right-radius: 4px; }
  .chat-input-row { padding: 12px; border-top: 1px solid var(--border); display: flex; gap: 8px; }
  .chat-input { flex: 1; padding: 9px 12px; background: var(--bg3); border: 1px solid var(--border); border-radius: var(--radius-sm); color: var(--text); font-size: 13px; outline: none; font-family: var(--font-body); }
  .chat-input:focus { border-color: rgba(79,142,247,0.4); }
  .chat-send { width: 34px; height: 34px; border-radius: var(--radius-sm); background: var(--accent); border: none; color: #fff; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: background 0.15s; }
  .chat-send:hover { background: #6a9ef8; }

  .skill-gap-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px; }
  .skill-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
  .skill-name { font-size: 13px; color: var(--muted2); width: 130px; flex-shrink: 0; }
  .skill-bar { flex: 1; height: 6px; background: var(--bg3); border-radius: 3px; overflow: hidden; }
  .skill-fill { height: 100%; border-radius: 3px; }

  @media (max-width: 900px) {
    .metrics-row { grid-template-columns: repeat(2,1fr); }
    .dash-grid { grid-template-columns: 1fr; }
    .profile-layout { grid-template-columns: 1fr; }
    .profile-sidebar { padding-right: 0; margin-bottom: 24px; }
    .profile-steps { flex-direction: row; flex-wrap: wrap; }
    .sidebar { display: none; }
    .dashboard-main { margin-left: 0; max-width: 100%; }
    .nav { padding: 0 20px; }
    .hero { padding: 100px 20px 60px; }
  }
`;

// ── ICONS (inline SVG as text) ──
const Icon = ({ name, size = 16, color = "currentColor" }) => {
  const icons = {
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    chart: "M18 20V10M12 20V4M6 20v-6",
    brain: "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z",
    map: "M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z M9 3v15 M15 6v15",
    send: "M22 2L11 13 M22 2L15 22l-4-9-9-4 18-7z",
    check: "M20 6L9 17l-5-5",
    arrow: "M5 12h14 M12 5l7 7-7 7",
    compass: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm4.93-3.56L13.5 10.5l-6.43 3.07 2.43-6.43 6.43-3.07z",
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z",
    target: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    search: "M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M21 21l-4.35-4.35",
    bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
    settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]?.split(" M").map((d, i) => <path key={i} d={i === 0 ? d : "M" + d} />)}
    </svg>
  );
};

// ── NAV ──
const Nav = ({ page, setPage, authed }) => (
  <nav className="nav">
    <div className="nav-logo" onClick={() => setPage("landing")}>
      Career<span>AI</span>
    </div>
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
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#4f8ef7,#7c3aed)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>JD</div>
      </div>
    )}
  </nav>
);

// ══════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════
const Landing = ({ setPage }) => {
  const features = [
    { icon: "🧠", bg: "rgba(79,142,247,0.12)", title: "AI Career Matching", desc: "Our model analyses your skills, interests, and goals to surface careers you're uniquely suited for." },
    { icon: "📄", bg: "rgba(6,214,160,0.1)", title: "CV Analysis", desc: "Upload your CV and we extract your competencies, experience level, and skill gaps automatically." },
    { icon: "🗺️", bg: "rgba(124,58,237,0.12)", title: "Learning Roadmaps", desc: "Get a personalised step-by-step path — courses, certifications, and milestones tailored to you." },
    { icon: "💬", bg: "rgba(245,158,11,0.1)", title: "AI Chat Advisor", desc: "Ask anything about careers, salaries, industry trends, or interview prep in real time." },
    { icon: "📊", bg: "rgba(244,63,94,0.1)", title: "Skill Gap Tracker", desc: "See exactly where you stand vs. your target role and track progress over time." },
    { icon: "🎯", bg: "rgba(79,142,247,0.1)", title: "Goal Setting", desc: "Set short and long-term career goals and get AI nudges to keep you on track." },
  ];

  return (
    <div className="landing">
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
          CareerAI analyses your skills, interests, and goals to surface personalised career paths, skill gaps, and learning roadmaps — powered by AI.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-lg" onClick={() => setPage("auth")}>
            Start for free <Icon name="arrow" size={16} />
          </button>
          <button className="btn btn-ghost btn-lg" onClick={() => setPage("dashboard")}>
            View demo
          </button>
        </div>
      </div>

      <div className="stats-row">
        {[["50K+", "Students guided"], ["1,200+", "Career paths mapped"], ["94%", "Satisfaction rate"], ["4.9★", "Average rating"]].map(([n, l]) => (
          <div className="stat" key={l}>
            <div className="stat-num">{n}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>

      <div className="features-section">
        <div className="section-label">Features</div>
        <div className="section-title">Everything you need to navigate your career</div>
        <div className="features-grid">
          {features.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" style={{ background: f.bg }}>{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="cta-section">
        <div className="cta-title">Ready to find your path?</div>
        <div className="cta-sub">Join thousands of students and professionals navigating smarter careers.</div>
        <button className="btn btn-primary btn-lg" onClick={() => setPage("auth")}>
          Create free account <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>
  );
};

// ══════════════════════════════════════
// AUTH PAGE
// ══════════════════════════════════════
const Auth = ({ setPage, setAuthed }) => {
  const [tab, setTab] = useState("signin");
  const [form, setForm] = useState({ email: "", password: "", name: "", confirm: "" });

  const handle = () => { setAuthed(true); setPage("profile"); };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">Career<span>AI</span></div>
          <div className="auth-title">{tab === "signin" ? "Welcome back" : "Create account"}</div>
          <div className="auth-sub">{tab === "signin" ? "Sign in to your account" : "Start your career journey today"}</div>
        </div>

        <div className="auth-tabs">
          <button className={`auth-tab ${tab === "signin" ? "active" : ""}`} onClick={() => setTab("signin")}>Sign in</button>
          <button className={`auth-tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")}>Sign up</button>
        </div>

        {tab === "signup" && (
          <div className="form-row" style={{ marginBottom: 16 }}>
            <div>
              <label className="label">First name</label>
              <input className="input" placeholder="John" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="label">Last name</label>
              <input className="input" placeholder="Doe" />
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="label">Email address</label>
          <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </div>
        <div className="form-group">
          <label className="label">Password</label>
          <input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        </div>
        {tab === "signup" && (
          <div className="form-group">
            <label className="label">Confirm password</label>
            <input className="input" type="password" placeholder="••••••••" />
          </div>
        )}

        {tab === "signin" && (
          <div style={{ textAlign: "right", marginBottom: 16 }}>
            <span className="auth-link" style={{ fontSize: 13 }}>Forgot password?</span>
          </div>
        )}

        <button className="btn btn-primary btn-full" onClick={handle} style={{ marginBottom: 16 }}>
          {tab === "signin" ? "Sign in" : "Create account"} <Icon name="arrow" size={15} />
        </button>

        <div className="divider">or continue with</div>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="social-btn">
            <span style={{ fontSize: 16 }}>G</span> Google
          </button>
          <button className="social-btn">
            <span style={{ fontSize: 16 }}>in</span> LinkedIn
          </button>
        </div>

        <div className="auth-footer">
          {tab === "signin" ? (
            <>Don't have an account? <span className="auth-link" onClick={() => setTab("signup")}>Sign up</span></>
          ) : (
            <>Already have an account? <span className="auth-link" onClick={() => setTab("signin")}>Sign in</span></>
          )}
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════
// PROFILE BUILDER
// ══════════════════════════════════════
const Profile = ({ setPage }) => {
  const [step, setStep] = useState(0);
  const [skills, setSkills] = useState(["Python", "Data Analysis", "Communication"]);
  const [skillInput, setSkillInput] = useState("");
  const [interests, setInterests] = useState(["Technology", "Science"]);
  const [bio, setBio] = useState({ name: "John Doe", email: "john@example.com", level: "undergraduate", goal: "" });

  const steps = ["Personal info", "Skills", "Interests", "Career goals", "Upload CV"];
  const interestOptions = [
    { emoji: "💻", label: "Technology" }, { emoji: "🔬", label: "Science" },
    { emoji: "💰", label: "Finance" }, { emoji: "🎨", label: "Design" },
    { emoji: "⚕️", label: "Healthcare" }, { emoji: "📚", label: "Education" },
    { emoji: "🌱", label: "Environment" }, { emoji: "🏗️", label: "Engineering" },
    { emoji: "📣", label: "Marketing" }, { emoji: "⚖️", label: "Law" },
    { emoji: "🎮", label: "Gaming" }, { emoji: "✈️", label: "Travel" },
  ];

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]); setSkillInput("");
    }
  };
  const toggleInterest = (i) => setInterests(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]);

  const stepContent = [
    // Step 0: Personal info
    <div key={0}>
      <div className="form-group">
        <label className="label">Full name</label>
        <input className="input" value={bio.name} onChange={e => setBio({ ...bio, name: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="label">Email</label>
        <input className="input" type="email" value={bio.email} onChange={e => setBio({ ...bio, email: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="label">Education level</label>
        <select className="input select" value={bio.level} onChange={e => setBio({ ...bio, level: e.target.value })}>
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
    </div>,

    // Step 1: Skills
    <div key={1}>
      <div className="skill-input-row">
        <input className="input" placeholder="Type a skill and press Add..." value={skillInput}
          onChange={e => setSkillInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addSkill()} />
        <button className="btn btn-outline" onClick={addSkill}>Add</button>
      </div>
      <div style={{ fontSize: 13, color: "var(--muted2)", marginBottom: 12 }}>
        Your current skills — be honest, this helps us match you accurately.
      </div>
      <div className="skills-list">
        {skills.map(s => (
          <div className="skill-tag" key={s}>
            {s}
            <span className="skill-remove" onClick={() => setSkills(skills.filter(x => x !== s))}>×</span>
          </div>
        ))}
      </div>
    </div>,

    // Step 2: Interests
    <div key={2}>
      <div style={{ fontSize: 14, color: "var(--muted2)", marginBottom: 16 }}>Select all that apply — we use these to personalise your career matches.</div>
      <div className="interest-grid">
        {interestOptions.map(({ emoji, label }) => (
          <div key={label} className={`interest-card ${interests.includes(label) ? "selected" : ""}`} onClick={() => toggleInterest(label)}>
            <div className="interest-emoji">{emoji}</div>
            <div>{label}</div>
          </div>
        ))}
      </div>
    </div>,

    // Step 3: Career goals
    <div key={3}>
      <div className="form-group">
        <label className="label">Where do you see yourself in 5 years?</label>
        <textarea className="input textarea" placeholder="e.g. I want to be a senior data scientist at a tech company, leading a team..." value={bio.goal} onChange={e => setBio({ ...bio, goal: e.target.value })} />
      </div>
      <div className="form-group">
        <label className="label">What's your biggest career challenge right now?</label>
        <textarea className="input textarea" placeholder="e.g. I don't know which direction to take after graduation..." />
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
    </div>,

    // Step 4: Upload CV
    <div key={4}>
      <div style={{
        border: "2px dashed var(--border2)", borderRadius: "var(--radius)",
        padding: "48px 24px", textAlign: "center", cursor: "pointer",
        background: "rgba(79,142,247,0.02)", transition: "all 0.2s",
        marginBottom: 20,
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(79,142,247,0.4)"}
        onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border2)"}
      >
        <div style={{ fontSize: 36, marginBottom: 12 }}>📄</div>
        <div style={{ fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Drop your CV here</div>
        <div style={{ fontSize: 13, color: "var(--muted2)", marginBottom: 16 }}>PDF, DOC, or DOCX up to 5MB</div>
        <button className="btn btn-outline">Browse files</button>
      </div>
      <div style={{ fontSize: 13, color: "var(--muted2)", textAlign: "center" }}>or skip this step — you can upload later from your dashboard</div>
    </div>,
  ];

  const progress = ((step) / (steps.length - 1)) * 100;

  return (
    <div className="profile-page">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 13, color: "var(--muted2)" }}>Step {step + 1} of {steps.length}</span>
          <span style={{ fontSize: 13, color: "var(--accent)" }}>{Math.round(progress)}% complete</span>
        </div>
        <div className="progress-track" style={{ marginBottom: 40 }}>
          <div className="progress-fill" style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--accent), var(--accent2))" }} />
        </div>
      </div>
      <div className="profile-layout">
        <div className="profile-sidebar">
          <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}>Setup</div>
          <div className="profile-steps">
            {steps.map((s, i) => (
              <div key={s} className={`step-item ${i === step ? "active" : i < step ? "done" : ""}`} onClick={() => i <= step && setStep(i)}>
                <div className="step-num">{i < step ? "✓" : i + 1}</div>
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-header">
            <div className="profile-title">{steps[step]}</div>
            <div className="profile-sub">
              {["Tell us a bit about yourself.", "What skills do you currently have?", "What areas excite you most?", "Paint a picture of where you're headed.", "Let AI read your CV to boost accuracy."][step]}
            </div>
          </div>

          <div className="card" style={{ padding: 28 }}>
            {stepContent[step]}
          </div>

          <div className="profile-nav">
            <button className="btn btn-ghost" onClick={() => step > 0 ? setStep(step - 1) : setPage("landing")} disabled={step === 0 && false}>
              {step === 0 ? "← Back" : "← Previous"}
            </button>
            <button className="btn btn-primary" onClick={() => step < steps.length - 1 ? setStep(step + 1) : setPage("dashboard")}>
              {step === steps.length - 1 ? "View my matches →" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════
// DASHBOARD
// ══════════════════════════════════════
const Dashboard = ({ setPage }) => {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hi John! Based on your profile, I've found 12 great career matches. Want me to walk you through the top picks?" },
    { role: "user", text: "Yes, tell me about Data Science roles." },
    { role: "ai", text: "Great choice! Data Science is a strong match for you — your Python and analysis skills align well. You'd need to strengthen your ML and statistics knowledge. Want a roadmap?" },
  ]);

  const send = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => setMessages(prev => [...prev, { role: "ai", text: "That's a great question! Let me analyse your profile and get back to you with personalised insights..." }]), 800);
  };

  const careers = [
    { name: "Data Scientist", field: "Technology · Analytics", match: 94, icon: "📊", tags: [{ text: "High demand", cls: "tag-green" }, { text: "Remote friendly", cls: "tag-blue" }] },
    { name: "ML Engineer", field: "Technology · AI", match: 88, icon: "🤖", tags: [{ text: "Fast growth", cls: "tag-purple" }, { text: "₦8M+ salary", cls: "tag-amber" }] },
    { name: "Product Manager", field: "Business · Tech", match: 79, icon: "🗺️", tags: [{ text: "Leadership", cls: "tag-blue" }, { text: "High impact", cls: "tag-green" }] },
    { name: "UX Researcher", field: "Design · Research", match: 74, icon: "🔬", tags: [{ text: "Creative", cls: "tag-purple" }, { text: "Flexible", cls: "tag-green" }] },
  ];

  const skillGaps = [
    { name: "Machine Learning", current: 35, target: 80, color: "#4f8ef7" },
    { name: "Statistics", current: 55, target: 85, color: "#7c3aed" },
    { name: "SQL", current: 70, target: 90, color: "#06d6a0" },
    { name: "Data Viz", current: 60, target: 75, color: "#f59e0b" },
    { name: "Communication", current: 80, target: 85, color: "#06d6a0" },
  ];

  const sidebarLinks = [
    { icon: "home", label: "Overview", active: true },
    { icon: "target", label: "Career matches" },
    { icon: "map", label: "Roadmaps" },
    { icon: "chart", label: "Skill tracker" },
    { icon: "book", label: "Resources" },
    { icon: "bell", label: "Notifications" },
    { icon: "user", label: "Profile", action: () => setPage("profile") },
    { icon: "settings", label: "Settings" },
  ];

  return (
    <div className="dashboard">
      <div className="sidebar">
        <div className="sidebar-section">
          <div className="sidebar-label">Main</div>
          {sidebarLinks.slice(0, 5).map(l => (
            <button key={l.label} className={`sidebar-link ${l.active ? "active" : ""}`} onClick={l.action}>
              <span className="sidebar-icon"><Icon name={l.icon} size={16} /></span>
              {l.label}
            </button>
          ))}
        </div>
        <div className="sidebar-section">
          <div className="sidebar-label">Account</div>
          {sidebarLinks.slice(5).map(l => (
            <button key={l.label} className="sidebar-link" onClick={l.action}>
              <span className="sidebar-icon"><Icon name={l.icon} size={16} /></span>
              {l.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "12px 20px", marginTop: "auto" }}>
          <div style={{ background: "rgba(79,142,247,0.08)", border: "1px solid rgba(79,142,247,0.15)", borderRadius: "var(--radius)", padding: "14px" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#7eb5ff", marginBottom: 4 }}>Profile 60% complete</div>
            <div className="progress-track" style={{ marginBottom: 8 }}>
              <div className="progress-fill" style={{ width: "60%", background: "var(--accent)" }} />
            </div>
            <div style={{ fontSize: 11, color: "var(--muted2)" }}>Upload your CV to improve matches</div>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dash-welcome">
          <div className="dash-greeting">Good morning 👋</div>
          <div className="dash-title">Welcome back, John</div>
        </div>

        <div className="metrics-row">
          {[
            { val: "12", label: "Career matches", change: "+3 new today", icon: "🎯", cls: "blue" },
            { val: "94%", label: "Best match score", change: "Data Scientist", icon: "⭐", cls: "purple" },
            { val: "4/8", label: "Skills on track", change: "2 need attention", icon: "📈", cls: "green" },
            { val: "3", label: "Roadmaps saved", change: "1 in progress", icon: "🗺️", cls: "amber" },
          ].map(m => (
            <div key={m.label} className={`metric-card ${m.cls}`}>
              <div className="metric-icon">{m.icon}</div>
              <div className="metric-val">{m.val}</div>
              <div className="metric-label">{m.label}</div>
              <div className="metric-change">{m.change}</div>
            </div>
          ))}
        </div>

        <div className="dash-grid">
          <div>
            <div className="section-hd">
              <div className="section-hd-title">Top career matches</div>
              <button className="btn btn-ghost btn-sm">View all</button>
            </div>
            {careers.map(c => (
              <div key={c.name} className="career-card">
                <div className="career-logo" style={{ background: "var(--bg2)" }}>{c.icon}</div>
                <div className="career-info">
                  <div className="career-name">{c.name}</div>
                  <div className="career-field">{c.field}</div>
                  <div className="career-tags">
                    {c.tags.map(t => <span key={t.text} className={`tag ${t.cls}`}>{t.text}</span>)}
                  </div>
                </div>
                <div>
                  <div className="career-match">{c.match}%</div>
                  <div style={{ fontSize: 11, color: "var(--muted)", textAlign: "right" }}>match</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ai-chat-panel">
            <div className="chat-header">
              <div className="chat-avatar">🤖</div>
              <div>
                <div className="chat-name">CareerAI Advisor</div>
                <div className="chat-status">● Online</div>
              </div>
            </div>
            <div className="chat-messages">
              {messages.map((m, i) => (
                <div key={i} className={`chat-msg ${m.role}`}>
                  <div className="chat-bubble">{m.text}</div>
                </div>
              ))}
            </div>
            <div className="chat-input-row">
              <input className="chat-input" placeholder="Ask me anything..." value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()} />
              <button className="chat-send" onClick={send}>→</button>
            </div>
          </div>
        </div>

        <div className="skill-gap-card">
          <div className="section-hd">
            <div className="section-hd-title">Skill gap — Data Scientist</div>
            <span className="tag tag-blue">Target role</span>
          </div>
          {skillGaps.map(s => (
            <div key={s.name} className="skill-row">
              <div className="skill-name">{s.name}</div>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width: `${s.current}%`, background: s.color, opacity: 0.5 }} />
              </div>
              <div className="skill-bar" style={{ width: 80 }}>
                <div className="skill-fill" style={{ width: `${s.target}%`, background: s.color }} />
              </div>
              <span style={{ fontSize: 12, color: "var(--muted2)", width: 40, textAlign: "right" }}>{s.current}%</span>
            </div>
          ))}
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 8, display: "flex", gap: 16 }}>
            <span><span style={{ opacity: 0.5 }}>░</span> Current level</span>
            <span>█ Target level</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════
export default function App() {
  const [page, setPage] = useState("landing");
  const [authed, setAuthed] = useState(false);

  return (
    <>
      <style>{styles}</style>
      <div className="app noise">
        <Nav page={page} setPage={setPage} authed={authed} />
        {page === "landing" && <Landing setPage={setPage} />}
        {page === "auth" && <Auth setPage={setPage} setAuthed={setAuthed} />}
        {page === "profile" && <Profile setPage={setPage} />}
        {page === "dashboard" && <Dashboard setPage={setPage} />}
      </div>
    </>
  );
}
