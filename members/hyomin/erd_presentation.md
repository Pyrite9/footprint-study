1. 테이블 카드 작성

evaluation (평가)

| 컬럼 | 입력 |
|id	                     |          1              |
|evaluator_id     	     |      101 (조원 A)       |
|target_id	             |      102 (조원 B)       |
|goal_sharing	         |          4              |
|role_fulfillment	     |          5              |
|encouragement	         |          3              |
|online_communication	 |          4              |
|offline_communication	 |          4              |
|progress_check	         |          5              |
|comment	             |   성실하게 참여했습니다.  |
|submitted_at	         |     2026-11-10 15:00    |


evaluation_draft (평가 임시 저장)


|           컬럼	    |          입력          |
|id                     |           1            |  
|evaluator_id           |   	101 (조원 A)     |
|target_id	            |       102 (조원 B)     |
|goal_sharing	        |           4            |
|role_fulfillment	    |           5            |
|encouragement	        |          NULL          |
|online_communication	|          NULL          |
|offline_communication	|          NULL          |
|progress_check	        |          NULL          |
|comment	            |   성실하게 참여했습니다. |
|saved_at	            |     2026-11-10 15:00   |


조원이 6명인 조에서 전원이 평가를 제출하면 evaluation의 행은 모두 몇 개인지, 계산과 함께 적습니다.
 - 30개. 자기자신을 제외한 나머지 5명을 평가할 때 조원은 총 6명이므로 5*6 = 30입니다.

2. 질문의 답
| 공통질문 | 화면에서 가리킬 곳 | 답 |
| PK와 FK는 각각 무엇입니까? 내가 맡은 테이블에서 예를 하나씩 듭니다. | evaluation 테이블 컬럼 | pk는 테이블에서 각 행을 구분하기 위한 고유한 값입니다. 예시로 evaluation 테이블의 id가 있습니다. FK는 다른 테이블의 데이터를 참조하기 위해 사용하는 값입니다. 예시로 evaluation 테이블의 evaluation_id가 있습니다.|
| 내가 맡은 테이블에 연결된 선을 하나 고릅니다. 그 선을 "A 하나에 B 여러 개"의 문장으로 읽습니다. |  | team_member와 evaluation 사이의 선 : 팀원 한명은 여러개의 평가를 작성할 수 있습니다.|
| 논리 모델과 물리 모델은 무엇이 다릅니까? |  | 논리적 모델은 데이터를 어떤 종류로 나누고 어떤 관계를 맺는지 설계하는 것 입니다. 물리적 모델은 실제 데이터베이스에 구현할 수 있도록 설계하는 것입니다.|


| 개인질문 | 화면에서 가리킬 곳 | 답 |
| 점수 컬럼은 왜 6개입니까? 컬럼 하나나 다른 테이블로 만들지 않은 이유는 무엇입니까? | goal_sharing ~ progress_check |하나의 테이블에 점수컬럼 6개를 만드는 것이 관리하기 편하기 때문 다른 테이블로 만들면 조회할 때 여러 행을 확인해야 하기 때문입니다. |
| evaluation_draft는 왜 evaluation과 따로 있습니까? | evaluation, evaluation_draft|최종 평가는 점수 6개 모두 필수이지만 임시저장은 일부 점수도 입력할 수 있기 때문입니다. |
| 자기 자신을 평가하는 것과 같은 사람을 두 번 평가하는 것은 각각 무엇이 막습니까? | UNIQUE, Check 컬럼 | UNIQUE(evaluator_id, target_id) 제약조건을 설정해 조원이 동일한 대상을 두번 평가할 수 없습니다. CHECK 제약조건으로 자기 자신을 평가하지 못하게 했습니다. |

3. 8단계 : 설계 원칙은 데이터를 함부로 삭제하지 않고 계속 쌓는 것입니다. 다만 evaluation_draft는 예외입니다. 이 테이블은 최종 평가가 아닌 작성중인 평가 점술를 임시로 저장하는 테이블이기 때문입니다. 사용자가 임시 저장한 평가를 제출하면 evaluation_draft는 삭제됩니다.

9단계 : 동료평가는 조에 참여한 조원이 다른 조원을 평가하는 방식이며 UNIQUE 제약조건으로 같은대상을 중복 평가하지 못하게 하고 CHECK 제약조건으로 자기자신을 평가하거나 1~5점 범위를 벗어난 점수를 입력하는 것을 방지했습니다.
평가를 작성하는 동안에는 점수를 임시 저장할 수 있고 제출하면 평가가 완료되며 제출된 점수와 의견은 교수님만 확인할 수 있습니다.

4. 비교: evaluation 테이블의 컬럼명 evaluator_membership_id -> evaluator_id, target_membership_id -> target_id로 간략하게 바꼈습니다, evaluation_draft (평가 임시 저장)이 생겨 해당 테이블은 평가 점수 항목에 NULL이 가능합니다.

4-1. 수정제안 : 임시저장을 두번이상할 시 가장 최근에 저장을 한 내용으로 바뀌면 좋을 것 같습니다.