import { useState } from "react";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const initialTasks = [
    { "id": 0, "title": "요구사항 정리", "period": "09.18 ~ 09.27" },
    { "id": 1, "title": "화면 설계", "period": "09.28 ~ 10.04" },
    { "id": 2, "title": "API 명세", "period": "10.05 ~ 10.11" }
];



function App() {
    const [tasks, setTasks] = useState(initialTasks);

    function addTask(title, period) {
        setTasks([...tasks, {id:Date.now(), title, period}])
    }

        return (
        <>
            <TaskList tasks={tasks} />
            <TaskForm onAdd={addTask} />
        </>
    );
}


export default App;
