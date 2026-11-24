import { Link } from 'react-router' // 리액트-라우터로부터 페이지 이동용 link 컴포넌트를 가져온다.
import { ASSIGNMENT_PHASE_LABELS } from '../../constants/assignmentPhases' 
import { PHASE_PILLS } from '../../format'


// 과제목록 데이터와 교수 계정인지 아닌지를 props로 받는 AssignmentList 컴포넌트를 선언한다.
function AssignmentList({ assignments, isProfessor }) {
    if (assignments.length === 0) {  // 과제 목록 데이터의 개수가 0일때 반환할 화면을 지정한다. 
        return(                     // 과제 목록 데이터의 개수가 0일때 b태그와 p태그의 텍스트를 묶어서 박스형태로 보여준다.
            <section className='card empty'> 
                <b>아직 볼 수 있는 과제가 없습니다</b>
                <p className="sub">{isProfessor ? '새 과제를 만들면 여기에 나옵니다.' : '조장이 보낸 초대 링크를 열면 그 조에 합류합니다.'}</p>
            </section>
        )
    }

    return ( // 이 return은 과제가 1개 이상 있을 때 보여줄 과제 카드 목록 화면을 반환한다.
        <div className='grid3'>
            {assignments.map((assignment) => ( // assignments의 데이터를 하나씩 꺼내서 아래 카드 모양으로 반복 생성한다.
                <Link key = {assignment.id} to={`/assignments/${assignment.id}`} className="acard">     
                    <span className="row between">
                        <b>{assignment.title}</b>   
                        <span className={`pill ${PHASE_PILLS[assignment.phase]}`}>{ASSIGNMENT_PHASE_LABELS[assignment.phase]}</span>
                    </span>
                    <span className='sub'>{assignment.startDate} ~ {assignment.endDate}</span>
                </Link>
            ))}
        </div>
    )
}

export default AssignmentList