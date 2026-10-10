import { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'daily-focus-reminder-v2';
const SUMMARY_KEY = 'daily-focus-summary-v2';

const defaultTasks = [
  {
    id: 'task-1',
    title: '整理今日会议纪要',
    category: '重要',
    priority: 'P1',
    reminderTime: '09:30',
    note: '根据会议讨论确认下周交付事项并发送给团队。',
    completed: false,
    createdAt: Date.now(),
  },
  {
    id: 'task-2',
    title: '同步项目进度',
    category: '日常',
    priority: 'P2',
    reminderTime: '15:00',
    note: '更新进度和风险点，准备汇报材料。',
    completed: true,
    createdAt: Date.now() + 1000,
  },
  {
    id: 'task-3',
    title: '跟进客户反馈',
    category: '支持',
    priority: 'P2',
    reminderTime: '17:30',
    note: '确认需求和处理时限，更新反馈状态。',
    completed: false,
    createdAt: Date.now() + 2000,
  },
];

function formatToday() {
  const now = new Date();
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
  }).format(now);
}

function openNotification(task) {
  if (!('Notification' in window)) return;
  if (Notification.permission !== 'granted') return;
  new Notification('工作提醒', {
    body: `${task.title} · ${task.category} · ${task.reminderTime}`,
    tag: task.id,
  });
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return Array.isArray(stored) && stored.length ? stored : defaultTasks;
    } catch {
      return defaultTasks;
    }
  });

  const [summary, setSummary] = useState(() => localStorage.getItem(SUMMARY_KEY) || '');
  const [filter, setFilter] = useState('all');
  const [notifyEnabled, setNotifyEnabled] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: '重要',
    priority: 'P1',
    reminderTime: '09:30',
    note: '',
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(SUMMARY_KEY, summary);
  }, [summary]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!notifyEnabled || !('Notification' in window)) return;
      const now = new Date();
      const current = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      tasks.forEach((task) => {
        if (!task.reminderTime || task.completed) return;
        if (current === task.reminderTime) {
          openNotification(task);
        }
      });
    }, 30000);

    return () => clearInterval(timer);
  }, [notifyEnabled, tasks]);

  const visibleTasks = useMemo(() => {
    if (filter === 'todo') return tasks.filter((task) => !task.completed);
    if (filter === 'done') return tasks.filter((task) => task.completed);
    return tasks;
  }, [filter, tasks]);

  const total = tasks.length;
  const done = tasks.filter((task) => task.completed).length;
  const progress = total ? Math.round((done / total) * 100) : 0;
  const urgentCount = tasks.filter((task) => task.category === '紧急' && !task.completed).length;
  const nextReminder = [...tasks]
    .filter((task) => !task.completed && task.reminderTime)
    .sort((a, b) => a.reminderTime.localeCompare(b.reminderTime))[0];

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim()) return;

    const newTask = {
      id: `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: form.title.trim(),
      category: form.category,
      priority: form.priority,
      reminderTime: form.reminderTime,
      note: form.note.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setForm({ title: '', category: '重要', priority: 'P1', reminderTime: '09:30', note: '' });
  }

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  async function enableNotifications() {
    if (!('Notification' in window)) {
      alert('当前浏览器不支持通知功能。');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setNotifyEnabled(true);
      alert('提醒通知已开启。到了设定时间会自动提醒你。');
      return;
    }

    alert('提醒权限未开启，仍可正常记录和查看任务。');
  }

  return (
    <div className="app-shell">
      <aside className="panel sidebar">
        <div className="brand-row">
          <div className="brand-badge">✓</div>
          <div>
            <p className="eyebrow">工作管理</p>
            <h1>每日重点</h1>
          </div>
        </div>

        <div className="date-card">
          <span className="label">今天</span>
          <div className="date-text">{formatToday()}</div>
        </div>

        <form className="task-form" onSubmit={handleSubmit}>
          <div className="field-group">
            <label htmlFor="title">工作重点</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="例如：完成周报汇总"
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="category">类型</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              <option value="重要">重要</option>
              <option value="紧急">紧急</option>
              <option value="日常">日常</option>
              <option value="支持">支持</option>
              <option value="复盘">复盘</option>
            </select>
          </div>

          <div className="two-col">
            <div className="field-group">
              <label htmlFor="priority">优先级</label>
              <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </select>
            </div>

            <div className="field-group">
              <label htmlFor="reminderTime">提醒时间</label>
              <input
                id="reminderTime"
                name="reminderTime"
                type="time"
                value={form.reminderTime}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="field-group">
            <label htmlFor="note">备注</label>
            <textarea
              id="note"
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="说明需要完成的细节或沟通内容。"
            />
          </div>

          <button type="submit" className="primary-btn">新增今日重点</button>
          <button type="button" className="secondary-btn" onClick={enableNotifications}>
            {notifyEnabled ? '提醒已开启' : '启用提醒通知'}
          </button>
        </form>
      </aside>

      <main className="panel content">
        <header className="topbar">
          <div>
            <p className="eyebrow muted">今日概览</p>
            <h2>工作安排</h2>
          </div>
          <span className="pill">{tasks.length} 项重点</span>
        </header>

        <section className="stats-grid">
          <div className="stat-card accent">
            <span className="label">总任务</span>
            <strong>{total}</strong>
          </div>
          <div className="stat-card">
            <span className="label">已完成</span>
            <strong>{done}</strong>
          </div>
          <div className="stat-card">
            <span className="label">完成率</span>
            <strong>{progress}%</strong>
          </div>
        </section>

        <section className="info-grid">
          <div className="info-card warning">
            <span className="label">紧急事项</span>
            <strong>{urgentCount}</strong>
          </div>
          <div className="info-card primary">
            <span className="label">下一个提醒</span>
            <strong>{nextReminder ? nextReminder.reminderTime : '暂无'}</strong>
          </div>
        </section>

        <section className="summary-box">
          <div className="summary-header">
            <h3>今日一句话总结</h3>
          </div>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            placeholder="例如：今天重点是推进线上演示准备，并确认最后一轮需求。"
          />
        </section>

        <section className="list-block">
          <div className="list-header">
            <h3>任务列表</h3>
            <div className="filter-group">
              <button className={filter === 'all' ? 'filter active' : 'filter'} onClick={() => setFilter('all')}>全部</button>
              <button className={filter === 'todo' ? 'filter active' : 'filter'} onClick={() => setFilter('todo')}>待办</button>
              <button className={filter === 'done' ? 'filter active' : 'filter'} onClick={() => setFilter('done')}>已完成</button>
            </div>
          </div>

          <div className="task-list">
            {visibleTasks.length === 0 ? (
              <div className="empty-state">暂无任务记录，先添加今天的工作重点吧。</div>
            ) : (
              visibleTasks.map((task) => (
                <article key={task.id} className={task.completed ? 'task-item done' : 'task-item'}>
                  <button
                    type="button"
                    className={task.completed ? 'check-btn checked' : 'check-btn'}
                    onClick={() => toggleTask(task.id)}
                    aria-label="切换任务状态"
                  >
                    {task.completed ? '✓' : ''}
                  </button>

                  <div className="task-content">
                    <div className="task-meta-row">
                      <h4>{task.title}</h4>
                      <span className="mini-tag">{task.category}</span>
                      <span className="mini-tag subtle">{task.priority}</span>
                    </div>

                    <div className="task-extra">
                      <span>提醒：{task.reminderTime || '无'}</span>
                      <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                    </div>

                    {task.note && <p className="task-note">{task.note}</p>}
                  </div>

                  <button type="button" className="delete-btn" onClick={() => removeTask(task.id)}>
                    删除
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
