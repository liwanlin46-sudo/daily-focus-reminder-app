@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

:root {
  --bg: #f4f7ff;
  --panel: rgba(255, 255, 255, 0.8);
  --panel-solid: #ffffff;
  --primary: #4f7cff;
  --primary-deep: #355fe6;
  --primary-soft: #edf3ff;
  --success: #2ec68a;
  --warning: #ffb454;
  --danger: #ff6b6b;
  --text: #1f2c3d;
  --muted: #667085;
  --line: rgba(31, 44, 61, 0.08);
  --shadow: 0 18px 38px rgba(59, 77, 122, 0.12);
}

* {
  box-sizing: border-box;
}

html, body, #root {
  margin: 0;
  min-height: 100%;
  min-height: 100vh;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: linear-gradient(180deg, #eef4ff 0%, var(--bg) 100%);
  color: var(--text);
}

body {
  min-height: 100vh;
}

button, input, textarea, select {
  font: inherit;
}

button {
  cursor: pointer;
}

.app-shell {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 18px;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 24px;
}

.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 24px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(12px);
}

.sidebar {
  padding: 24px 20px;
  height: fit-content;
  position: sticky;
  top: 18px;
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.brand-badge {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: white;
  font-size: 24px;
  font-weight: 800;
  background: linear-gradient(135deg, var(--primary) 0%, #8da7ff 100%);
  box-shadow: 0 12px 18px rgba(79, 124, 255, 0.24);
}

.eyebrow {
  margin: 0 0 4px;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  font-weight: 700;
}

.eyebrow.muted {
  color: var(--muted);
}

.brand-row h1,
.topbar h2,
.summary-header h3,
.list-header h3 {
  margin: 0;
}

.date-card {
  background: linear-gradient(135deg, rgba(79, 124, 255, 0.1) 0%, rgba(141, 167, 255, 0.12) 100%);
  border: 1px solid rgba(79, 124, 255, 0.08);
  border-radius: 18px;
  padding: 18px 16px;
  margin-bottom: 20px;
}

.label {
  display: inline-block;
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
}

.date-text {
  margin-top: 10px;
  color: var(--text);
  font-weight: 700;
  font-size: 1.04rem;
  line-height: 1.6;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field-group label {
  color: var(--muted);
  font-size: 12px;
  font-weight: 700;
}

.field-group input,
.field-group textarea,
.field-group select {
  width: 100%;
  border: 1px solid var(--line);
  background: rgba(248, 250, 255, 0.9);
  border-radius: 12px;
  padding: 12px 14px;
  font-size: 14px;
  color: var(--text);
  transition: all 0.2s ease;
}

.field-group textarea {
  min-height: 92px;
  resize: vertical;
}

.field-group input:focus,
.field-group textarea:focus,
.field-group select:focus {
  outline: none;
  border-color: rgba(79, 124, 255, 0.45);
  box-shadow: 0 0 0 3px rgba(79, 124, 255, 0.12);
  background: #fff;
}

.two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.primary-btn,
.secondary-btn,
.filter,
.delete-btn,
.check-btn {
  border: none;
  border-radius: 12px;
  transition: transform 0.2s ease;
}

.primary-btn:hover,
.secondary-btn:hover,
.filter:hover,
.delete-btn:hover,
.check-btn:hover {
  transform: translateY(-1px);
}

.primary-btn {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-deep) 100%);
  color: #fff;
  font-weight: 700;
  padding: 13px 16px;
  box-shadow: 0 14px 22px rgba(79, 124, 255, 0.25);
}

.secondary-btn {
  background: #fff;
  color: var(--text);
  border: 1px solid var(--line);
  padding: 11px 14px;
  font-weight: 700;
}

.content {
  padding: 22px 20px 28px;
}

.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 20px;
}

.topbar h2 {
  font-size: 1.8rem;
}

.pill {
  background: var(--primary-soft);
  border: 1px solid rgba(79, 124, 255, 0.1);
  color: var(--primary);
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.stats-grid,
.info-grid {
  display: grid;
  gap: 16px;
  margin-bottom: 18px;
}

.stats-grid {
  grid-template-columns: repeat(3, minmax(140px, 1fr));
}

.info-grid {
  grid-template-columns: repeat(2, minmax(140px, 1fr));
}

.stat-card,
.info-card {
  background: linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 18px 16px;
}

.stat-card strong,
.info-card strong {
  display: block;
  margin-top: 10px;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.stat-card.accent {
  background: linear-gradient(135deg, rgba(79, 124, 255, 0.08), rgba(141, 167, 255, 0.12));
}

.info-card.warning {
  background: linear-gradient(135deg, rgba(255, 180, 84, 0.12), rgba(255, 180, 84, 0.05));
}

.info-card.primary {
  background: linear-gradient(135deg, rgba(79, 124, 255, 0.12), rgba(79, 124, 255, 0.05));
}

.summary-box {
  background: linear-gradient(135deg, #fffaf1 0%, #fff4df 100%);
  border: 1px solid rgba(255, 180, 84, 0.18);
  border-radius: 18px;
  padding: 18px 16px 14px;
  margin-bottom: 20px;
}

.summary-header {
  margin-bottom: 10px;
}

.summary-box textarea {
  width: 100%;
  min-height: 92px;
  border: 1px solid rgba(31, 44, 61, 0.08);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.5);
  resize: vertical;
  padding: 12px 14px;
  font-size: 14px;
  color: var(--text);
}

.summary-box textarea:focus {
  outline: none;
  border-color: rgba(255, 180, 84, 0.45);
  box-shadow: 0 0 0 3px rgba(255, 180, 84, 0.12);
}

.list-block {
  margin-top: 4px;
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 14px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.filter {
  border: 1px solid var(--line);
  background: #f3f6ff;
  color: var(--muted);
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 700;
}

.filter.active {
  background: var(--primary-soft);
  color: var(--primary);
  border-color: rgba(79, 124, 255, 0.1);
}

.task-list {
  display: grid;
  gap: 14px;
}

.task-item {
  display: grid;
  grid-template-columns: 26px 1fr auto;
  gap: 14px;
  align-items: start;
  background: linear-gradient(180deg, #ffffff 0%, #f8faff 100%);
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px 12px;
}

.task-item.done {
  opacity: 0.72;
}

.task-item.done h4 {
  text-decoration: line-through;
}

.check-btn {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid rgba(79, 124, 255, 0.6);
  color: white;
  font-weight: 800;
  display: grid;
  place-items: center;
  margin-top: 3px;
}

.check-btn.checked {
  background: var(--success);
  border-color: var(--success);
}

.task-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.task-meta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.task-meta-row h4 {
  margin: 0;
  font-size: 1.05rem;
}

.mini-tag {
  display: inline-flex;
  align-items: center;
  padding: 5px 8px;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 11px;
  font-weight: 700;
}

.mini-tag.subtle {
  background: rgba(79, 124, 255, 0.07);
  color: var(--muted);
}

.task-extra {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: var(--muted);
  font-size: 12px;
  font-weight: 600;
}

.task-note {
  margin: 0;
  color: #465163;
  line-height: 1.7;
  font-size: 13px;
}

.delete-btn {
  background: #fff;
  border: 1px solid rgba(255, 107, 107, 0.15);
  color: var(--danger);
  padding: 8px 10px;
  font-weight: 700;
}

.empty-state {
  border: 1px dashed rgba(79, 124, 255, 0.18);
  border-radius: 16px;
  background: rgba(248, 250, 255, 0.9);
  color: var(--muted);
  padding: 32px 18px;
  text-align: center;
}

@media (max-width: 900px) {
  .app-shell {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: static;
  }

  .stats-grid,
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .app-shell {
    padding: 18px 12px;
  }

  .topbar,
  .list-header {
    align-items: flex-start;
    flex-direction: column;
  }
}
