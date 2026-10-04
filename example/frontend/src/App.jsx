import { useState, useEffect } from 'react';
import AssignmentList from './AssignmentList'
import AssignmentForm from './AssignmentForm';

function App() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function loadAssignments() {
        fetch('http://localhost:8080/assignments')
            .then((res) => {
                if (!res.ok) throw new Error('목록을 불러오지 못했습니다')
                return res.json()
            })
            .then((data) => setAssignments(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))

    }
    useEffect(() => {
        loadAssignments()
    }, [])
    return (
        <main>
        <h1>과제 목록</h1>
        <AssignmentForm onCreated={loadAssignments} />
        <AssignmentList assignments={assignments} loading={loading} error={error}/>
        </main>
    )
}

export default App
