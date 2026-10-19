# 결정 기록

팀 조장이 1~2주차 학습을 하면서 정한 내용입니다. 예시 프로젝트는 이 결정을 따릅니다.

- 상태: **잠정** (2026.10.04 기준). 확정하면 이 줄을 고칩니다.
- 적는 방법: 결정 한 줄, 이유 한 줄. 치르는 비용이 있으면 함께 적습니다.

---

## 백엔드

| 결정 | 이유 | 치르는 비용 |
|---|---|---|
| Java 21 | 팀 전체가 21로 통일합니다. `build.gradle`의 toolchain에 명시했습니다. | 없음 |
| Spring Boot 3.5.16 | 한국어 자료와 강의 대부분이 3.x 기준입니다. 4.x는 의존성 이름과 Security 설정이 달라서 자료를 따라 하다 막히기 쉽습니다. | start.spring.io가 4.x만 제공합니다. 새로 생성하지 않고 예시 프로젝트를 복사해서 시작해야 합니다. |
| Gradle (Groovy), wrapper 8.14.3 | 팀 조장이 Gradle을 써 왔습니다. Spring Boot 3.5.16은 Gradle 7.6.4 이상 또는 8.4 이상을 지원합니다. | 수업에서 Maven만 쓴 조원에게는 낯섭니다. |
| Lombok 사용 | Entity의 getter와 기본 생성자를 줄입니다. | IntelliJ 설정 항목이 하나 늘어납니다. |
| 패키지 구조: 계층형 (`controller`, `service`, `repository`, `entity`, `dto`, `exception`, `config`) | 3계층 개념과 폴더가 그대로 대응합니다. 자료 대부분이 이 구조입니다. | 기능 하나의 파일이 여러 폴더에 흩어집니다. |
| 개발용 `ddl-auto: create` | Entity를 자주 고치는 단계입니다. 테이블이 항상 Entity와 일치합니다. | 실행할 때마다 데이터가 지워집니다. |
| 의존성 주입은 생성자 주입만 사용 | `final`과 함께 쓰면 주입을 빠뜨렸을 때 컴파일에서 드러납니다. | 생성자를 직접 써야 합니다. |
| 값을 바꾸는 Service 메서드에 `@Transactional` | 없으면 변경이 DB에 반영되지 않습니다. 에러 없이 응답만 바뀐 값으로 나와서 찾기 어렵습니다. | 없음 |
| API 경로는 복수형 (`/assignments`) | 목록을 돌려주는 주소의 일반적인 관례입니다. 조원마다 다르게 쓰지 않도록 고정합니다. | 없음 |
| 설정과 시작 준비 코드는 `config` 패키지 (`WebConfig`, `DataInitializer`) | 요청을 처리하는 계층에 속하지 않는 코드를 한 곳에 모읍니다. | 패키지가 하나 늘어납니다. |
| 예시 `Assignment`의 필드: `title`, `description`, `startDate`, `endDate` | 조원 과제의 시작일·종료일과 맞습니다. 날짜가 JSON으로 오가는 모양을 예시에서 보여 줍니다. | ERD의 과제에는 `description`이 없고 `status`가 있습니다. 실제 엔티티를 만들 때 다시 맞춥니다. |
| 날짜는 `LocalDate`, JSON에서는 `yyyy-MM-dd` 문자열 | Spring Boot의 기본 동작입니다. 화면의 `<input type="date">` 값과 모양이 같습니다. | 없음 |
| CORS는 `WebConfig` 한 곳에서, 모든 경로(`/**`)에 `http://localhost:5173`만 허용 | Controller를 추가해도 설정을 고치지 않습니다. | 화면이 5173이 아닌 포트로 뜨면 막힙니다. |
| 시작할 때 넣는 예시 데이터는 `CommandLineRunner` (`DataInitializer`) | 추가 설정이 없습니다. 필드를 바꾸면 컴파일 오류로 드러납니다. | `ddl-auto: create`일 때만 안전합니다. `update`로 바꾸면 실행할 때마다 중복으로 쌓입니다. |
| `example/backend`의 `rootProject.name`은 `example-backend` | 저장소 전체를 IntelliJ로 열면 `members/kdg/backend`와 모듈 이름이 겹쳐 한쪽이 인식되지 않습니다. | 없음 |

## DTO와 오류 응답

| 결정 | 이유 | 치르는 비용 |
|---|---|---|
| 요청 하나에 DTO 하나 (`AssignmentCreateRequest`, `AssignmentUpdateRequest`) | 생성과 수정의 요구가 달라져도 서로 영향을 주지 않습니다. | 모양이 같은 클래스가 2개 생깁니다. |
| DTO는 `record`로 작성 | 값을 담기만 하는 클래스입니다. 생성자와 getter를 쓰지 않아도 됩니다. | 없음 |
| 응답은 Entity가 아니라 응답 DTO (`AssignmentResponse`) | Entity를 그대로 내보내면 필드를 추가할 때 자동으로 노출됩니다. | 변환 코드가 필요합니다. |
| Entity → DTO 변환은 Controller에서 (`AssignmentResponse.from`) | 변환 위치를 한 곳으로 고정합니다. Service는 Entity를 돌려줍니다. | Controller가 한 줄 길어집니다. |
| 오류 응답 형식: `{ "code": "...", "message": "..." }` | 프론트엔드가 `code`로 화면 처리를 나눌 수 있습니다. | `code` 목록을 관리해야 합니다. |
| 오류 응답 클래스 이름: `ApiErrorResponse` | `ErrorResponse`는 Spring에 같은 이름의 interface가 있어서 잘못 import 됩니다. | 이름이 길어집니다. |
| 대상이 없을 때는 전용 예외 `NotFoundException` | `IllegalArgumentException`은 범용이라, 그것을 404로 바꾸면 서버 버그까지 404로 보입니다. | 예외 클래스가 하나 늘어납니다. |
| 오류 처리는 `GlobalExceptionHandler` 한 곳에서 | 모든 Controller의 오류 응답이 같은 형식으로 나갑니다. | 없음 |
| JSON을 읽지 못한 요청(`HttpMessageNotReadableException`)도 `INVALID_INPUT`으로 응답 | 400이면 항상 같은 모양이라 화면의 오류 처리가 한 가지로 끝납니다. | 형식 오류와 검증 오류를 `code`로 구분할 수 없습니다. |
| handler 메서드 이름은 `handle` + 예외 이름에서 `Exception`을 뺀 것 (`handleNotFound`, `handleNotValid`, `handleNotReadable`) | 같은 status를 내는 예외가 여럿이어도 이름이 겹치지 않습니다. | 없음 |

### `code` 목록

| code | HTTP 상태 | 뜻 |
|---|---|---|
| `NOT_FOUND` | 404 | 요청한 대상이 없습니다. |
| `INVALID_INPUT` | 400 | 입력값이 규칙에 맞지 않거나 요청 body의 형식이 틀렸습니다. |

## 실행 환경

| 결정 | 이유 | 치르는 비용 |
|---|---|---|
| PostgreSQL 17 (`postgres:17`) | 고정 스택입니다. | 없음 |
| MinIO 이미지: `pgsty/minio:RELEASE.2026-08-04T00-00-00Z` | 공식 이미지 `minio/minio`가 Docker Hub에서 내려갔습니다. 명령과 환경 변수가 원본과 같습니다. | 공식이 아닌 커뮤니티 이미지입니다. 코드는 S3 API로만 접근하므로 다른 S3 호환 서버로 바꿀 수 있습니다. |
| 포트와 계정은 `infra/.env`로 분리, 저장소에는 `.env.example`만 올림 | 비밀번호를 저장소에 올리지 않습니다. (조장에게 연락주세요) | 처음에 파일을 복사하는 단계가 하나 있습니다. |
| 학습 중에는 `.env.example`의 값을 바꾸지 않고 사용 | 비밀번호를 바꾸면 백엔드 실행 구성에 환경 변수를 따로 넣어야 합니다. | 로컬 전용 설정입니다. 배포에는 쓰지 않습니다. |

## 프론트엔드

| 결정 | 이유 | 치르는 비용 |
|---|---|---|
| Node.js 24, Vite 8, React (JavaScript) | 팀 전체가 Node.js 24로 통일합니다. | 없음 |
| 컴포넌트 하나에 파일 하나 | 조원이 복사할 단위가 분명해집니다. | 파일 수가 늘어납니다. |
| 여러 컴포넌트가 함께 쓰는 state는 공통 부모에 둠 | props는 부모에서 자식으로만 내려갑니다. 형제끼리는 직접 주고받을 수 없습니다. | 부모가 함수를 props로 내려 줘야 합니다. |
| 다른 값으로 계산할 수 있는 값은 state로 두지 않음 | 같은 사실이 두 군데에 있으면 어긋납니다. | 없음 |
| 배열 state는 `push`가 아니라 새 배열로 교체 (`[...tasks, 새항목]`) | 기존 배열을 고치면 React가 변화를 알지 못합니다. | 없음 |
| 폴더 구조: `src/pages/`(화면), `src/components/`(부품), `src/api/`(백엔드 호출) | 4주차에 화면이 늘고 React Router가 들어와도 구조를 바꾸지 않습니다. 조원이 파일을 옮길 일이 없습니다. | 화면이 하나일 때는 `pages/`에 파일이 하나뿐입니다. |
| state를 갖고 데이터를 불러오는 것은 page, component는 props로 받아 그림 | 어디에서 데이터를 가져오는지 찾을 곳이 하나입니다. | page가 함수를 props로 내려 줘야 합니다. |
| `fetch`는 `src/api/`에만 작성 | 주소, method, `res.ok` 검사를 한 곳에 둡니다. 화면 코드가 짧아집니다. | 파일이 하나 늘어납니다. |
| 응답이 실패(`res.ok`가 아님)면 `api` 함수에서 `throw` | `fetch`는 404와 500을 실패로 취급하지 않습니다. 던져야 화면의 `.catch`가 받습니다. | 없음 |
| 데이터를 불러오는 화면은 `loading`, `error` state를 둠 | 빈 화면이 "불러오는 중"인지 "고장"인지 구분됩니다. | state가 2개 늘어납니다. |
| API 주소는 환경 변수 `VITE_API_URL` 하나. `.env`는 저장소에 올리고, 개인 설정은 `.env.local` | 코드를 고치지 않고 실제 백엔드와 가짜 API를 오갑니다. | 값을 바꾼 뒤 `npm run dev`를 다시 켜야 합니다. |
| 가짜 API: json-server `0.17.4`, `npm run mock`, 포트 3001 | 최신(1.0)은 베타입니다. 0.17.4는 `id`가 백엔드처럼 숫자로 나옵니다. | 입력을 검사하지 않습니다. 오류 화면은 실제 백엔드에서만 확인됩니다. |

## 저장소

| 결정 | 이유 | 치르는 비용 |
|---|---|---|
| 팀 조장의 연습 코드는 성격별 폴더 (`members/kdg/backend`, `frontend-js`, `frontend-react`) | 주마다 내는 제출물이 아니라 예시를 만들기 위한 연습입니다. | 조원의 `week1/` 규칙과 모양이 다릅니다. |
| 조원이 복사할 예시는 `example/backend`, `example/frontend` | 연습 코드와 예시를 구분합니다. | 연습 코드를 예시로 한 번 정리해야 합니다. |

---

## 아직 정하지 않은 것

- 없는 주소와 예상하지 못한 오류(500)의 응답 형식. 지금은 Spring 기본 형식으로 나갑니다.
- 입력 오류(400) 응답에 어느 필드가 왜 틀렸는지 담을지.
- 예시 프로젝트 공개일과 공개 범위.
- `frontend/.env`의 기본값. 지금은 실제 백엔드(8080)입니다. 가짜 API(3001)를 기본으로 하면 프론트엔드 조원의 실행 단계가 하나 줄어듭니다.
- 예시 `Assignment`와 ERD의 과제 엔티티의 필드 차이(`description`, `status`, `professor_id`)를 어느 쪽에 맞출지.
