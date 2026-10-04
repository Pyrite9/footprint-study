function AssignmentList({ assignments, loading, error }) {

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
