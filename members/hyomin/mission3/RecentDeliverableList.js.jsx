import { Link } from 'react-router'
import { formatShortDateTime, roleColorClass, sequenceOf } from '../../format'

// 조 홈에 표시될 산출물의 최대 개수를 5개로 지정
const RECENT_COUNT = 5

function RecentDeliverableList({ teamId, deliverables }) {
    const recent = [...deliverables].sort((a, b) => b.id - a.id).slice(0, RECENT_COUNT)

    return (
        <section className='card group'>
            <header className='group-h'>
                <h2>최근 산출물</h2>
                <Link to={`/teams/${teamId}/deliverables`} className='btn'>산출물</Link>
            </header>
            {/* 최근 산출물의 개수가 0개라면 안내 문구를 보여준다. */}
            {recent.length === 0 && (
                <div className='empty'>
                    <b>아직 올린 파일이 없습니다.</b>
                    <p className='sub'>역할이 정해진 조원이 올리면 여기에 나옵니다.</p>
                </div>
            )}
            {/* 최근 산출물이 1개 이상 존재하면 산출물 목록을 보여준다. */}
            {recent.length > 0 && (
                <div className="scroll-x">
                    {recent.map((deliverable) => (
                        <div key={deliverable.id} className="tr body cols cols-recent">
                            <span className={`role ${roleColorClass(deliverable.roleName)}`}>
                                <span className='dot' />{deliverable.roleName} {sequenceOf(deliverables, deliverable)}번째
                            </span>
                            <Link to={`/team/${teamId}/deliverables`} state={{ selectedId: deliverable.id }} className='cell-btn'>
                                <span className={deliverable.deletedAt === null ? undefined : 'struck'}>{deliverable.fileName}</span>
                            </Link>
                            <span>{deliverable.uploaderName}</span>
                            <span className='sub'>{formatShortDateTime(deliverable.uploadedAt)}</span>
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
export default RecentDeliverableList