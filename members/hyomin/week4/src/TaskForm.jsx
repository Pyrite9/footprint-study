import { useState } from 'react' // 입력값의 변화를 실시간으로 기억하고 관리하는 훅 가져오기

export default function TaskForm({ onAdd }) {
    // 사용자가 입력창에 적는 내용들을 각각 관리하기 위한 상태(State) 정의
    const [title, setTitle] = useState('') // 과제 이름 상태
    const [start, setStart] = useState('') // 과제 시작일 상태
    const [end, setEnd] = useState('')     // 과제 종료일 상태

    // '추가' 버튼을 눌렀거나 엔터를 쳤을 때 실행되는 제출 핸들러 함수
    const handleSubmit = (event) => {
        event.preventDefault() // 폼 제출 시 페이지가 새로고침되는 기본 브라우저 동작을 방지

        // 간단한 유효성 검사: 과제명이나 날짜가 비어있는지 확인 후 비어있으면 중단
        if (!title.trim() || !start || !end) {
            alert('과제명과 기간을 모두 입력해주세요.')
            return
        }

        // 부모(App) 컴포넌트가 내려준 onAdd 함수에 가공된 새 과제 데이터 객체를 전달함
        onAdd({
            title,
            period: `${start} ~ ${end}` // 시작일과 종료일을 보기 좋은 기간 문자열 형태로 묶어서 전달
        })

        // 데이터 전송(등록)이 끝난 후, 다음 입력을 위해 입력창들의 상태를 빈 문자열로 초기화
        setTitle('')
        setStart('')
        setEnd('')
    }

    return (
        <form onSubmit={handleSubmit} className="task-form">
            {/* 과제명 입력 칸 */}
            <div className="form-row">
                <label htmlFor="task-name">과제명</label>
                <input
                    type="text"
                    id="task-name"
                    placeholder="과제명을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // 글자가 입력될 때마다 title 상태를 실시간으로 업데이트
                />
            </div>

            {/* 시작일 선택 칸 */}
            <div className="form-row">
                <label htmlFor="task-start">시작일</label>
                <input
                    type="date"
                    id="task-start"
                    value={start}
                    onChange={(e) => setStart(e.target.value)} // 날짜가 선택될 때마다 start 상태를 실시간으로 업데이트
                />
            </div>

            {/* 종료일 선택 칸 */}
            <div className="form-row">
                <label htmlFor="task-end">종료일</label>
                <input
                    type="date"
                    id="task-end"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)} // 날짜가 선택될 때마다 end 상태를 실시간으로 업데이트
                />
            </div>

            <button type="submit" className="submit-btn">추가</button>
        </form>
    )
}