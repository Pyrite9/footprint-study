# 구현 조사서 - 이종민

- 맡은 것: 과제 (백엔드)
- 범위: [역할 카드](../../mission/mission2/roles.md#이종민)
- 적는 방법과 예시: [2차 미션 안내](../../mission/mission2/README.md)

찾지 못한 칸에는 "모르겠음"이라고 적고, 시간이 부족하면 첫 번째 부분만 채워서 내도 됩니다.
3번의 "지금 만들 수 있는지"에는 "있음", "없음", "모르겠음" 중 하나를 적습니다.

## 과제 만들기

### 1. 흐름

1. 교수가 로그인해서 왼쪽 메뉴의 "+ 새 과제"를 누른다
2. 과제명, 시작일, 종료일을 입력한다
3. 조마다 조장 이메일을 입력하고, "조 추가"로 조를 추가한다.
4. "입력 내용 확인"을 눌러 입력한 내용을 한번 더 본다.
5. 확정하면 과제, 조, 조장이 한 번에 저장되고 "내 과제" 목록에 새 과제 카드가 보인다.

### 2. 데이터

| 테이블 | 저장하는 값 | 읽는 값 |
|---|---|---|
| member | | id, email, member_type(로그인한 사람이 교수인지, 조장 이메일이 가입한 학생인지 확인) |
| assignment | title, start_date, end_date, professor_id, phase | |
| team | assignment_id, name(조) | |
| team_member | team_id, assignment_id, member_id, leader = true(조장) | |


### 3. 주고받는 것

| API | 받는 값 | 돌려주는 값 | 지금 만들 수 있는지 |
|---|---|---|---|
| POST /assignments | 과제명, 시작일, 종료일, 조장 이메일 목록 | 만든 과제(번호, 과제명, 기간, 단계) | 없음 |

### 4. 막아야 하는 경우

| 어떤 경우 | 어떻게 되어야 하는지 |
|---|---|
| 로그인하지 않은 사람이 요청할 때 | 거절 |
| 과제명이 비었거나 날짜가 없을 때 | 입력값이 올바르지 않다고 알려줌 |
| 종료일이 시작일보다 앞일 때 | 종료일이 시작일보다 앞이라고 알려줌 |
| 같은 조장 이메일이 두 번 들어왔을 때 | 한 학생은 두 조의 조장이 될 수 없다고 알려줌 |
| 가입하지 않은 이메일이나 학생이 아닌 이메일을 조장으러 넣을 때 | 입력한 이메일을 알려주며 거절 |
| 이미 등록한 과제를 고치거나 지우려 할 때 | 과제는 등록한 뒤 바꿀 수 없으므로 없는 주소라고 알려 준다 |
| 저장하다가 중간에 실패할 때 | 전부 취소 (서버에 임시저장 테이블 있으면 좋을 것 같아요) |


## 과제 목록과 상세 보기

### 1. 흐름

1. 로그인 후 내 과제 화면에 내가 볼 수 있는 과제칸이 보인다. 교수는 만든 과제, 학생은 참여한 과제.
2. 과제 칸마다 과제 이름, 기간, 단계(기록 or 평가)를 보고 과제를 누른다.
3. 교수는 "조 현황"으로 가서 조마다 조장 이름과 "기록 보기"를 본다.
4. 학생은 자기 조 홈으로 간다.

### 2. 데이터

| 테이블 | 저장하는 값 | 읽는 값 |
|---|---|---|
| member |  | name, member_type |
| assignment |  | id, tittle, start_date, end_date, professor_id, phase |
| team |  | id, assignment_id, name |
| team_member |  | team_id, assignment_id, member_id, leader |

### 3. 주고받는 것

| API | 받는 값 | 돌려주는 값 | 지금 만들 수 있는지 |
|---|---|---|---|
| GET /assignments | | 내가 볼수있는 과제 목록(과제 번호, 과제명, 기간, 단계) | 없음 |
| GET /assignments/{과제 번호} | | 과제 정보, 교수 이름, 조 목록(조 번호, 조 이름, 조장 이름) | 없음 |

### 4. 막아야 하는 경우

| 어떤 경우 | 어떻게 되어야 하는지 |
|---|---|
| 로그인하지 않은 사람이 요청할 때 | 거절 |
| 없는 과제 번호를 보낼 때 | 과제가 없다고 알려줌 |
| 과제 번호에 숫자가 아닌 값을 보낼 때 | 주소의 값이 올바르지 않다고 알려줌 |

## 5. 배워야 하는 것

3번에서 "없음"이나 "모르겠음"이라고 적은 것을 골라서 적습니다.

| 3번에서 고른 것 | 배워야 하는 것 | 찾아본 자료 |
|---|---|---|
| POST /assignments, GET /assignments | 요청을 보낸 사람이 누구인지 서버가 아는 방법 | https://jypark1111.tistory.com/234 |
| POST /assignments | 과제, 조, 조장을 한 번에 저장하고 중간에 실패하면 모두 취소하는 방법 | https://wikidocs.net/416945 |
| POST /assignments | 과제명이 비었는지, 날짜가 있는지 요청 값을 검사하는 방 | https://velog.io/@joeun-01/Spring-Boot-DTO에서-Validation-처리하기 |
| POST /assignments, GET /assignments/{과제 번호} | (code, message)로 돌려주는 방법 | https://devoong2.tistory.com/entry/Spring-Valid-Annotation%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%9C%A0%ED%9A%A8%EC%84%B1-%EA%B2%80%EC%A6%9D%EA%B3%BC-%EC%98%88%EC%99%B8%EC%B2%98%EB%A6%AC |
| GET /assignments/{과제 번호} | 과제, 조, 조원 테이블을 Entity로 이어서 조장 이름까지 꺼내는 방법 | https://velog.io/@duckbill/JPA-연관관계 |
| GET /assignments, GET /assignments/{과제 번호} | 교수와 학생에 따라 다른 목록을 찾는 Repository 메서드 만드는 방법 | https://priming.tistory.com/113 |
