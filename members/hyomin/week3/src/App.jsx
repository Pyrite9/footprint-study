import { useState, useEffect } from 'react' // 리액트의 상태 관리(useState)와 부수 효과 처리(useEffect) 기능을 가져옴
import TaskList from './TaskList' // 과제 목록을 보여줄 자식 컴포넌트 가져오기
import TaskForm from './TaskForm' // 과제를 입력받을 자식 컴포넌트 가져오기
import './App.css' // CSS 스타일 파일 연결

export default function App() {
  // 관리할 과제 목록 데이터와 초기 데이터 로딩 상태 정의
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  // 앱이 처음 실행될 때 외부 JSON 파일에서 기존 과제 데이터를 비동기로 불러옴
  useEffect(() => {
    fetch('/tasks.json')
      .then((res) => res.json())
      .then((data) => {
        setTasks(data)     // 불러온 데이터를 과제 상태에 반영
        setLoading(false)  // 데이터 로딩 완료 처리
      })
  }, [])

  // 새로운 과제 객체를 받아 기존 목록의 맨 뒤에 추가하는 과제 등록 핸들러
  const handleAddTask = (newTaskData) => {
    setTasks([...tasks, { id: Date.now(), ...newTaskData }])
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>과제 관리 페이지</h1>
      </header>

      <main>
        {/* 과제 목록 영역: 현재 등록된 과제 리스트와 로딩 상태를 전달 */}
        <section className="section">
          <h2>현재 과제 목록</h2>
          <TaskList tasks={tasks} loading={loading} />
        </section>

        {/* 과제 등록 영역: 새 과제 데이터를 생성하는 handleSubmit 함수 전달 */}
        <section className="section">
          <h2>새 과제 추가</h2>
          <TaskForm onAdd={handleAddTask} />
        </section>
      </main>
    </div>
  )
}