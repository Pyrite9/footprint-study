# example — 예시 프로젝트

과제(Assignment)를 조회하고 추가하는 작은 프로젝트입니다. 화면에서 버튼을 누르면 데이터베이스에 저장되기까지의 흐름 하나가 처음부터 끝까지 들어 있습니다. 3주차부터 이 코드를 읽고 복사해서 배웁니다.

| 폴더 | 내용 | 버전 |
|---|---|---|
| `backend/` | Spring Boot API 서버 | Java 21, Spring Boot 3.5 |
| `frontend/` | React 화면 | Node.js 24, React 19, Vite 8 |

## 어느 쪽을 실행하나요

- **프론트엔드 담당**: [A. 프론트엔드만 실행](#a-프론트엔드만-실행-docker-없이)을 따라 합니다. Docker와 Java가 필요 없습니다.
- **백엔드 담당**: [B. 백엔드 실행](#b-백엔드-실행)을 따라 합니다.
- 화면과 서버를 함께 보고 싶으면 B를 한 뒤 [C. 화면과 서버를 함께 실행](#c-화면과-서버를-함께-실행)을 합니다.

## A. 프론트엔드만 실행 (Docker 없이)

백엔드 대신 가짜 API를 씁니다. 가짜 API는 `db.json` 파일을 데이터베이스처럼 쓰는 작은 서버입니다. 응답 모양은 실제 백엔드와 같습니다.

터미널을 2개 엽니다. 둘 다 `example/frontend` 폴더에서 실행합니다.

1. 필요한 패키지를 설치합니다. 처음 한 번만 합니다.

   ```powershell
   cd example/frontend
   npm install
   ```

2. 첫 번째 터미널에서 가짜 API를 켭니다. 켜 둔 채로 둡니다.

   ```powershell
   npm run mock
   ```

   http://localhost:3001/assignments 를 열어 과제 3건이 보이면 성공입니다.

3. 두 번째 터미널에서 화면이 가짜 API를 보게 설정하고 실행합니다.

   ```powershell
   Set-Content -Path .env.local -Value "VITE_API_URL=http://localhost:3001" -Encoding ascii
   npm run dev
   ```

   macOS는 첫 줄이 `echo "VITE_API_URL=http://localhost:3001" > .env.local`입니다. `.env.local`은 처음 한 번만 만들면 됩니다.

   http://localhost:5173 을 열어 과제 3건이 보이면 성공입니다.

가짜 API를 쓸 때 알아 둘 것이 2개 있습니다.

- 가짜 API는 입력을 검사하지 않습니다. 제목을 비워도 저장됩니다. 오류 화면은 실제 백엔드에서만 볼 수 있습니다.
- 과제를 추가하면 `db.json` 파일이 바뀝니다. 처음 상태로 되돌리려면 `git restore db.json`을 실행합니다. `db.json`의 변경은 commit 하지 않습니다.

## B. 백엔드 실행

1. 데이터베이스를 켭니다. 방법은 [infra/README.md](../infra/README.md)에 있습니다. `docker compose ps`에서 `footprint-postgres`가 `healthy`여야 합니다.

2. IntelliJ에서 `example/backend` 폴더를 엽니다. 오른쪽 아래의 Gradle 불러오기가 끝날 때까지 기다립니다. 처음에는 몇 분이 걸립니다.

3. `src/main/java/com/footprint/backend/BackendApplication`을 열고 `main` 옆의 초록 화살표를 눌러 실행합니다.

   아래쪽 로그에 `Started BackendApplication`이 보이고, http://localhost:8080/assignments 를 열어 과제 3건이 보이면 성공입니다.

저장소 전체(`footprint-study`)를 IntelliJ로 열었다면 `example/backend/build.gradle`을 우클릭해 "Gradle 프로젝트 링크"를 한 번 눌러야 합니다. 파일 아이콘이 주황색이면 아직 링크되지 않은 것입니다.

## C. 화면과 서버를 함께 실행

B로 백엔드를 켠 뒤 `example/frontend`에서 실행합니다.

```powershell
npm install
npm run dev
```

http://localhost:5173 을 엽니다. A에서 `.env.local`을 만들었다면 그 파일을 지워야 화면이 실제 백엔드를 봅니다.

## 주소가 정해지는 방법

화면이 어느 서버를 부를지는 `VITE_API_URL` 값 하나로 정해집니다.

| 파일 | 값 | 설명 |
|---|---|---|
| `frontend/.env` | `http://localhost:8080` | 기본값입니다. 실제 백엔드를 봅니다. 고치지 않습니다. |
| `frontend/.env.local` | `http://localhost:3001` | 있으면 `.env`보다 먼저 적용됩니다. 내 컴퓨터에만 있고 commit 되지 않습니다. |

이 파일을 만들거나 고치거나 지운 뒤에는 `npm run dev`를 껐다가 다시 켜야 적용됩니다.

## 데이터베이스

- 접속 정보는 [infra/README.md](../infra/README.md)의 "접속 정보"에 있습니다. DBeaver로 접속하면 `assignment` 테이블을 볼 수 있습니다.
- 테이블은 직접 만들지 않습니다. 백엔드가 시작할 때 `entity/Assignment.java`를 보고 만듭니다. `application.yml`의 `ddl-auto: create` 설정입니다.
- **백엔드를 다시 시작하면 테이블을 지우고 새로 만듭니다.** 추가했던 과제는 사라지고, `config/DataInitializer.java`가 예시 과제 3건을 다시 넣습니다. 학습용 설정입니다.

| 컬럼 | Java 필드 | 형식 |
|---|---|---|
| `id` | `id` | 숫자, 자동 증가 |
| `title` | `title` | 문자, 필수 |
| `description` | `description` | 문자 |
| `start_date` | `startDate` | 날짜 |
| `end_date` | `endDate` | 날짜 |

## API

주소는 `http://localhost:8080`으로 시작합니다.

| 하는 일 | method와 경로 | 성공 응답 |
|---|---|---|
| 목록 조회 | `GET /assignments` | 200, 과제 배열 |
| 한 건 조회 | `GET /assignments/{id}` | 200, 과제 |
| 추가 | `POST /assignments` | 200, 추가된 과제 |
| 수정 | `PUT /assignments/{id}` | 200, 수정된 과제 |
| 삭제 | `DELETE /assignments/{id}` | 204, 내용 없음 |

과제 한 건의 모양입니다. 날짜는 `yyyy-MM-dd` 형식의 문자열입니다.

```json
{
  "id": 1,
  "title": "캡스톤 주제 발표",
  "description": "주제와 범위를 5분 안에 발표",
  "startDate": "2026-10-05",
  "endDate": "2026-10-12"
}
```

추가와 수정 요청에는 `id`를 빼고 보냅니다.

실패하면 항상 같은 모양으로 응답합니다.

```json
{ "code": "INVALID_INPUT", "message": "요청 body의 형식이 올바르지 않습니다" }
```

| 상황 | status | code |
|---|---|---|
| 없는 id를 조회, 수정, 삭제 | 404 | `NOT_FOUND` |
| 제목이 비어 있음 | 400 | `INVALID_INPUT` |
| JSON이 깨졌거나 날짜 형식이 틀림 | 400 | `INVALID_INPUT` |

## 이 예시로 학습하는 방법

### 1. 실행부터 합니다

코드를 읽기 전에 화면에서 과제를 하나 추가해 봅니다. 무엇이 일어나는지 본 다음에 읽어야 코드가 읽힙니다.

### 2. 요청 하나를 끝까지 따라갑니다

"추가" 버튼을 눌렀을 때 지나가는 파일을 순서대로 엽니다. 클래스마다 맨 위에 하는 일이 한 줄로 적혀 있습니다.

| 순서 | 파일 | 하는 일 |
|---|---|---|
| 1 | `frontend/src/AssignmentForm.jsx` | 입력값을 모아 추가를 요청합니다 |
| 2 | `frontend/src/api/assignments.js` | 백엔드에 HTTP 요청을 보냅니다 |
| 3 | `backend/.../dto/AssignmentCreateRequest.java` | 요청 body를 받는 모양입니다 |
| 4 | `backend/.../controller/AssignmentController.java` | 요청을 받아 Service를 부릅니다 |
| 5 | `backend/.../service/AssignmentService.java` | Repository를 불러 저장합니다 |
| 6 | `backend/.../repository/AssignmentRepository.java` | 테이블에 행을 넣습니다 |
| 7 | `backend/.../entity/Assignment.java` | 테이블 한 행의 모양입니다 |
| 8 | `backend/.../dto/AssignmentResponse.java` | 화면에 돌려주는 모양입니다 |
| 9 | `frontend/src/App.jsx` | 목록을 다시 불러와 화면을 고칩니다 |

목록 조회는 `App.jsx` → `api/assignments.js` → Controller → Service → Repository 순서입니다.

프론트엔드 담당은 1, 2, 9번을, 백엔드 담당은 3~8번을 먼저 봅니다.

### 3. 일부러 틀려 봅니다

오류가 어떻게 보이는지 미리 봐 두면 나중에 같은 오류를 만났을 때 빨리 찾습니다. 실제 백엔드를 켜고 해 봅니다.

- 화면에서 제목을 비우고 추가합니다. 화면에 어떤 문구가 나오는지, 브라우저 개발자 도구(F12)의 Network 탭에서 응답이 어떻게 생겼는지 봅니다.
- Postman으로 `GET /assignments/999`를 보냅니다. status와 body를 봅니다.
- Postman으로 날짜를 `"2026/10/05"`처럼 틀리게 넣어 `POST /assignments`를 보냅니다.
- 백엔드를 끄고 화면을 새로고침합니다.

### 4. 복사해서 시작합니다

본인 과제는 빈 프로젝트에서 시작하지 않고 이 예시를 본인 폴더(`members/영문이름/`)로 복사해서 시작합니다. 패키지 구조와 파일 이름 규칙을 그대로 따릅니다. 구조를 정한 이유는 [docs/decisions.md](../docs/decisions.md)에 있습니다.

## 자주 나는 오류

### 1. 백엔드 로그에 `Connection to localhost:5432 refused`

데이터베이스가 꺼져 있습니다. Docker Desktop을 켜고 `infra` 폴더에서 `docker compose up -d`를 실행한 뒤 백엔드를 다시 실행합니다.

### 2. 백엔드 로그에 `password authentication failed for user "footprint"`

`infra/.env`의 비밀번호를 `.env.example`과 다르게 바꾼 경우입니다. 백엔드는 비밀번호를 `change-me`로 알고 있습니다. 둘 중 하나를 합니다.

- `infra/.env`의 `POSTGRES_PASSWORD`를 `change-me`로 되돌리고 `docker compose down -v` 뒤 `docker compose up -d`를 실행합니다.
- 또는 IntelliJ 실행 구성의 "환경 변수"에 `POSTGRES_PASSWORD=바꾼비밀번호`를 넣습니다.

### 3. 화면에 "목록을 불러오지 못했습니다"가 나옵니다

화면이 부르는 서버가 꺼져 있거나 주소가 다릅니다. 순서대로 확인합니다.

- A를 하는 중이면 `npm run mock`이 켜져 있는지, `.env.local`이 있는지 확인합니다.
- B와 C를 하는 중이면 백엔드가 켜져 있는지, `.env.local`이 남아 있지 않은지 확인합니다.
- `.env.local`을 만들거나 지운 뒤 `npm run dev`를 다시 켰는지 확인합니다.

### 4. 브라우저 Console에 `blocked by CORS policy`

화면 주소가 `http://localhost:5173`이 아닙니다. 5173 포트를 다른 프로그램이 쓰고 있으면 Vite가 5174로 실행됩니다. 백엔드는 5173에서 온 요청만 허용합니다(`config/WebConfig.java`). 다른 터미널에 켜 둔 `npm run dev`를 끄고 다시 실행합니다.

### 5. 직접 쓴 코드에서 같은 요청이 끝없이 나갑니다

`useEffect`의 두 번째 인자 `[]`가 빠졌습니다. `App.jsx`의 `useEffect`와 비교합니다.

※ 용어 — API: 프로그램끼리 주고받는 요청과 응답의 약속 · 가짜 API(mock): 실제 서버 대신 정해 둔 데이터를 돌려주는 연습용 서버 · CORS: 다른 주소의 화면이 서버 응답을 읽어도 되는지 서버가 허용하는 규칙 · DTO: 요청이나 응답으로 주고받는 데이터의 모양 · 환경 변수: 코드 밖에서 넣어 주는 설정값
