import { useEffect, useState } from "react";

function AssignmentList() {
    const [assignments, setAssignments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('http://localhost:8080/assignments')
            .then((res) => {
                if (!res.ok) throw new Error('목록을 불러오지 못했습니다')
                return res.json()
            })
            .then((data) => setAssignments(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false))
    }, [])
    
    if (loading) return <p>불러오는 중...</p>
    if (error) return <p>{error}</p>

    return (
        <ul>
            {assignments.map((assignment) => (
                <li key={assignment.id}>{assignment.title} {assignment.description} {assignment.startDate} {assignment.endDate}</li>
            ))}
        </ul>
    )
}

export default AssignmentList;
