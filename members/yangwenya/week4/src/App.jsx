import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error("데이터를 불러오지 못했습니다.");
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch(() => setError("데이터를 불러오지 못했습니다. Mock API가 실행 중인지 확인하세요."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="container">
      <h1>Tasks</h1>
      <p className="description">Mock API에서 가져온 작업 목록입니다.</p>

      {loading && <p>불러오는 중...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task" key={task.id}>
              <span>{task.title}</span>
              <span className={task.completed ? "status done" : "status"}>
                {task.completed ? "완료" : "미완료"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
