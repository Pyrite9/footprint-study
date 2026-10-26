import React, { useState, useEffect } from 'react';
import './App.css';   //



export default function App() {

  // 상태(State) 관리
  const [tasks, setTasks] = useState([]);    // 과제 목록 데이터를 저장하는 상태
  const [titleInput, setTitleInput] = useState('');    // 과제명 입력창의 값
  const [periodInput, setPeriodInput] = useState('');    // 기간 입력창의 값
  const [loading, setLoading] = useState(true);     // 데이터 로딩 중 여부 (초기값: true)
  // 컴포넌트 마운트 시 외부 JSON 파일 불러오기
  useEffect(() => {
    fetch('/tasks.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('파일을 찾을 수 없습니다.');
        }
        return res.json();
      })
      .then((data) => {
        setTasks(data);    // 불러온 데이터로 과제 목록 상태 업데이트
        setLoading(false);    // 로딩 완료 처리
      })
      .catch((err) => {
        console.error('데이터 가져오기 실패:', err);
        setLoading(false);    // 에러 발생 시에도 로딩 종료
      });
  }, []);   

  // 폼 제출 시 새 과제 추가 이벤트 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();  // 폼 제출 시 페이지가 새로고침되는 기본 동작 방지

    // 입력값 유효성 검사 (공백 제거 후 빈 값 확인)
    if (!titleInput.trim() || !periodInput.trim()) {
      alert('과제명과 기간을 입력해주세요.');
      return;
    }

    // 추가할 새 과제 객체 생성
    const newTask = {
      id: Date.now(),   // 고유한 ID 값으로 현재 시간 타임스탬프 활용
      title: titleInput,
      period: periodInput,
    };

    // 기존 목록 배열에 새 항목을 추가하여 상태 업데이트
    setTasks([...tasks, newTask]);
    setTitleInput('');   // 입력창 초기화
    setPeriodInput('');
  };

  // 화면 렌더링 
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
                onChange={(e) => setTitleInput(e.target.value)}     // 입력할 때마다 상태 업데이트
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
                onChange={(e) => setPeriodInput(e.target.value)}  // 입력할 때마다 상태 업데이트
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