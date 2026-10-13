// 부모(App)로부터 tasks(과제 배열)와 loading(로딩 여부) 데이터를 props로 받아옴
function TaskList({ tasks, loading }) {

    // 조건부 렌더링 1: 데이터가 아직 로딩 중일 때 보여줄 화면
    if (loading) {
        return <p>로딩 중...</p>
    }

    // 조건부 렌더링 2: 로딩은 끝났는데 등록된 과제가 하나도 없을 때 보여줄 화면
    if (tasks.length === 0) {
        return <p style={{ color: '#666' }}>등록된 과제가 없습니다. 아래에서 새로 추가해 보세요!</p>
    }

    // 조건부 렌더링 3: 과제가 존재할 때, 배열을 반복(.map)하여 목록(li)으로 출력
    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {tasks.map((task) => (
                // 리액트에서 목록을 낼 때는 각 요소를 구분할 고유한 key 값이 필수
                <li key={task.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                    <span style={{ fontWeight: 'bold' }}>{task.title}</span>
                    <span style={{ color: '#666' }}>{task.period}</span>
                </li>
            ))}
        </ul>
    )
}

export default TaskList