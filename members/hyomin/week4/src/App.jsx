import { useState, useEffect } from 'react' // 리액트의 상태 관리(useState)와 부수 효과 처리(useEffect) 기능을 가져옴
import TaskList from './TaskList' // 과제 목록을 보여줄 자식 컴포넌트 가져오기
import TaskForm from './TaskForm' // 과제를 입력받을 자식 컴포넌트 가져오기
import './App.css' // CSS 스타일 파일 연결

export default function App() {
    // 관리할 과제 목록 데이터와 초기 데이터 로딩 상태 정의
    const [tasks, setTasks] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // 환경 변수(.env.local)에 설정된 API 주소를 사용하고, 없으면 기본값으로 4000번 포트 지정
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

    // 컴포넌트가 처음 화면에 나타날 때(Mount) 실행되어 서버에서 과제 목록을 불러옴
    useEffect(() => {
        fetch(`${API_URL}/assignments`)
            .then((res) => {
                // HTTP 응답이 정상적이지 않으면(200 OK가 아니면) 에러 발생 처리
                if (!res.ok) {
                    throw new Error('데이터를 불러오지 못했습니다.')
                }
                return res.json()
            })
            .then((data) => {
                setTasks(data)     // 가져온 과제 데이터를 상태에 저장
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message) // 에러 발생 시 에러 메시지 저장
                setLoading(false)     // 에러가 발생해도 로딩 상태는 종료
            })
    }, [API_URL]) // API_URL이 변경될 때마다 useEffect 재실행

    // 새로운 과제 데이터를 받아 서버에 등록(POST)하고 화면의 목록을 갱신하는 핸들러 함수
    const handleAddTask = (newTaskData) => {
        fetch(`${API_URL}/assignments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTaskData), // 전달받은 새 과제 객체를 JSON 문자열로 변환하여 전송
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('과제 추가 실패')
                }
                return res.json()
            })
            .then((savedTask) => {
                // 서버에 성공적으로 저장된 데이터를 기존 목록 배열 뒤에 이어붙여 상태 업데이트
                setTasks((prevTasks) => [...prevTasks, savedTask])
            })
            .catch((err) => {
                alert(err.message) // 추가 실패 시 경고창 표시
            })
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>과제 관리 페이지</h1>
            </header>

            <main>
                {/* 과제 목록 영역 */}
                <section className="section">
                    <h2>현재 과제 목록</h2>
                    {/* 에러가 발생한 경우 에러 문구를 띄우고, 정상인 경우 TaskList 컴포넌트에 데이터와 로딩 상태 전달 */}
                    {error ? (
                        <p className="error-message">오류 발생: {error}</p>
                    ) : (
                        <TaskList tasks={tasks} loading={loading} />
                    )}
                </section>

                {/* 새 과제 추가 폼 영역 */}
                <section className="section">
                    <h2>새 과제 추가</h2>
                    {/* 과제 등록 시 실행할 handleAddTask 함수를 onAdd라는 이름의 props로 전달 */}
                    <TaskForm onAdd={handleAddTask} />
                </section>
            </main>
        </div>
    )
}