// TaskList.jsx 는 부모(App)에게 받은 과제 배열을 목록으로 화면에 보여주는 컴포넌트 파일임

function TaskList({ tasks }) {    // 부모(App)에게서 tasks를 받아와서 li 목록으로 만들어 화면에 돌려주는 함수
    return (
        <section className="task-list-section">   {/* 과제 영역 전체를 묶기 위해 section을 만들고 css 적용을 편하게 하기 위함 */}
            <h2> 과제 목록 </h2>

            {/* 과제 리스트를 세로로 길게 나열하기 위해 ul 태그 사용 */}
            <ul className="task-list">

                {/* .map() 메소드를 사용하여 과제 데이터를 하나씩 꺼내서 <li> 태그로 반복해서 출력해줌 */}
                {tasks.map((task) => (
                    // key = {task.id} : 리액트가 리스트 항목들을 헷갈리지않고 구분할 수 있도록 고유 번호표를 붙여줌
                    <li key={task.id} className="task-item">
                        <span className="task-name">{task.title}</span>   {/* 과제 이름 출력 */}
                        <span className="task-period">{task.period}</span> {/* 과제 기간 출력 */}
                    </li>
                ))}
            </ul>
        </section>
    )
}

// TaskList 파일을 다른 파일에서도 끌어다 쓸 수 있게 해줌
export default TaskList