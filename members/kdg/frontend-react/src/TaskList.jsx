
function TaskList({tasks}) {
    return (
        <ul>
            {tasks.map((task) => (
                <li key={task.id}>{task.title} {task.period}</li>
            ))}
        </ul>
    )
}

export default TaskList;
