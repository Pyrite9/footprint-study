import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>등록된 과제가 없습니다.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className="task">
          <strong>{task.title}</strong>
          <span>{task.period}</span>
        </li>
      ))}
    </ul>
  );
}

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !period.trim()) {
      return;
    }

    onAddTask({
      title: title.trim(),
      period: period.trim()
    });

    setTitle("");
    setPeriod("");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <label>
        과제명
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="과제명을 입력하세요"
        />
      </label>

      <label>
        기간
        <input
          value={period}
          onChange={(event) => setPeriod(event.target.value)}
          placeholder="예: 10월 11일 ~ 10월 13일"
        />
      </label>

      <button type="submit">추가</button>
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "HTML 과제",
      period: "10월 1일 ~ 10월 3일"
    },
    {
      id: 2,
      title: "CSS 과제",
      period: "10월 4일 ~ 10월 6일"
    },
    {
      id: 3,
      title: "JavaScript 과제",
      period: "10월 7일 ~ 10월 10일"
    }
  ]);

  function addTask(newTask) {
    setTasks((currentTasks) => [
      ...currentTasks,
      {
        ...newTask,
        id: Date.now()
      }
    ]);
  }

  return (
    <main>
      <header>
        <h1>과제 목록</h1>
        <p>React로 만든 과제 관리 페이지</p>
      </header>

      <section>
        <h2>과제 추가</h2>
        <TaskForm onAddTask={addTask} />
      </section>

      <section>
        <h2>과제 목록</h2>
        <TaskList tasks={tasks} />
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
