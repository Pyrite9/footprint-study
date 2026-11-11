const API_URL = import.meta.env.VITE_API_URL

export function getAssignments() {
  return fetch(`${API_URL}/assignments`).then((res) => {
    if (!res.ok) throw new Error('목록을 불러오지 못했습니다')
    return res.json()
  })
}

export function createAssignment(assignment) {
  return fetch(`${API_URL}/assignments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assignment),
  }).then((res) => {
    if (!res.ok) throw new Error('등록하지 못했습니다')
    return res.json()
  })
}
