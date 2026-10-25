import { useState } from 'react' // 입력하는 값의 변화를 실시간으로 기억하고 관리하는 'useState' 기능 가져옴

function TaskForm({ onAdd }) {
  // 사용자가 입력창에 적는 내용들을 기억해 둘 각각의 상태(State) 바구니들
  const [title, setTitle] = useState('') // 과제 이름
  const [start, setStart] = useState('') // 시작일
  const [end, setEnd] = useState('')     // 종료일

  // '추가' 버튼을 눌렀을 때 실행되는 제출(Submit) 함수
  function handleSubmit(event) {
    event.preventDefault() // form 태그가 submit 될 때 페이지가 새로고침되며 튕기는 기본 현상을 막아줌
    
    // 부모(App)에게 현재 입력된 제목과, 시작일~종료일을 합친 period 형태의 객체를 전달함
    onAdd({ title, period: `${start} ~ ${end}` })
    
    // 저장이 끝난 뒤 입력창들을 깨끗하게 초기화(비워주기)
    setTitle('')
    setStart('')
    setEnd('')
  }

  return (
    <section className="task-form-section">
      <h2>과제 추가</h2>
      
      {/* 사용자가 입력을 마치고 엔터를 치거나 버튼을 누르면 handleSubmit 함수가 실행됨 */}
      <form onSubmit={handleSubmit}>
        
        {/* 과제명 입력 칸 */}
        <div className="form-row">
          <label htmlFor="task-name">과제명</label>
          <input
            type="text"
            id="task-name"
            placeholder="과제명을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)} // 글자가 입력될 때마다 title 값을 실시간으로 바꿔서 세팅함
          />
        </div>

        {/* 시작일 선택 칸 */}
        <div className="form-row">
          <label htmlFor="task-start">시작일</label>
          <input
            type="date"
            id="task-start"
            value={start}
            onChange={(e) => setStart(e.target.value)} // 날짜가 선택될 때마다 start 값을 세팅함
          />
        </div>

        {/* 종료일 선택 칸 */}
        <div className="form-row">
          <label htmlFor="task-end">종료일</label>
          <input
            type="date"
            id="task-end"
            value={end}
            onChange={(e) => setEnd(e.target.value)} // 날짜가 선택될 때마다 end 값을 세팅함
          />
        </div>

        <button type="submit">추가</button>
      </form>
    </section>
  )
}

// TaskForm 컴포넌트를 다른 파일(App.jsx)에서 쓸 수 있도록 내보냄
export default TaskForm