import { useState } from "react";

function TaskForm({onAdd}) {
    const [title, setTitle] = useState("");
    const [period, setPeriod] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        if (title.trim() === "" || period.trim() === "") {
            return;
        }
        onAdd(title.trim(), period.trim());
        setTitle("");
        setPeriod("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={title} placeholder="title" onChange={(event) => setTitle(event.target.value)}/>
            <input value={period} placeholder="period" onChange={(event) => setPeriod(event.target.value)}/>
            <button type="submit">추가</button>
        </form>
    )
}

export default TaskForm;
