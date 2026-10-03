import React, { useState, useEffect } from 'react';
import './App.css';

const styles = {
  container: { padding: '20px', maxWidth: '600px', margin: '0 auto' },
  header: { marginBottom: '20px' },
  main: { display: 'flex', flexDirection: 'column', gap: '20px' },
  section: { border: '1px solid #ddd', padding: '15px', borderRadius: '8px' },
  h2: { marginTop: 0 },
  ul: { listStyle: 'none', padding: 0 },
  li: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' },
  title: { fontWeight: 'bold' },
  period: { color: '#666' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '14px', fontWeight: 'bold' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
  button: { padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  emptyText: { color: '#888', fontStyle: 'italic' }
};


export default function App() {

  
  const [tasks, setTasks] = useState([]);
  const [titleInput, setTitleInput] = useState('');
  const [periodInput, setPeriodInput] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/tasks.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('파일을 찾을 수 없습니다.');
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('데이터 가져오기 실패:', err);
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titleInput.trim() || !periodInput.trim()) {
      alert('과제명과 기간을 입력해주세요.');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: titleInput,
      period: periodInput,
    };

    setTasks([...tasks, newTask]);
    setTitleInput('');
    setPeriodInput('');
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>과제 관리 페이지</h1>
      </header>

      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.h2}>현재 과제 목록</h2>
          {loading ? (
            <p>로딩 중...</p>
          ) : tasks.length === 0 ? (
            <p style={styles.emptyText}>등록된 과제가 없습니다. 아래에서 새로 추가해 보세요!</p>
          ) : (
            <ul style={styles.ul}>
              {tasks.map((task) => (
                <li key={task.id || task.title} style={styles.li}>
                  <span style={styles.title}>{task.title}</span>
                  <span style={styles.period}>{task.period}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section style={styles.section}>
          <h2 style={styles.h2}>새 과제 추가</h2>
          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="task-title" style={styles.label}>과제명</label>
              <input
                type="text"
                id="task-title"
                placeholder="과제명을 입력하세요"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="task-period" style={styles.label}>기간</label>
              <input
                type="text"
                id="task-period"
                placeholder="예: 2026.10.01 ~ 2026.10.08"
                value={periodInput}
                onChange={(e) => setPeriodInput(e.target.value)}
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.button}>
              과제 추가하기
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}