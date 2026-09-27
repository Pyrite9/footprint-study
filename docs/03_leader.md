# 발자국 학습 계획 — 팀 조장 (09.18 ~ 10.16)

이 문서는 팀 조장의 할 일입니다. 조원도 볼 수 있습니다. 조원의 3주차와 4주차가 팀 조장의 일정에 달려 있기 때문입니다. 일정이 밀리면 이 문서에서 먼저 보입니다.

팀 조장은 세 가지를 합니다.

- 저장소와 실행 환경을 준비합니다.
- 백엔드와 프론트엔드를 모두 공부합니다. 조원보다 2주 앞서 갑니다.
- 조원이 따라 만들 수 있는 예시 프로젝트와 로그인 골격을 만듭니다.

전제: 프로그래밍 기초, Git, Docker, SQL은 압니다. Spring Boot와 React는 처음입니다.

## 미룰 수 없는 것 2개

1. **10.05 예시 프로젝트 공개.** 조원 5명의 3주차와 4주차가 여기에 달려 있습니다.
2. **10.16 로그인(JWT) 골격.** 11.02 구현 시작의 전제입니다.

각 주 끝에 "밀리면 뒤로 보내는 순서"가 있습니다. 시간이 모자라면 위에서부터 뒤로 보냅니다. 위의 2개는 뒤로 보내지 않습니다.

---

## 1주차 (09.18 ~ 09.27) — 저장소 준비, 양쪽 첫 CRUD

**왜 하는가**
조원의 첫 PR 마감이 09.23입니다. 그 전에 저장소가 열려 있어야 합니다. 그리고 팀 조장이 정한 구조는 예시 프로젝트를 통해 조원 5명에게 그대로 복제됩니다. 그래서 구조를 정하기 전에 양쪽 스택으로 CRUD를 한 번씩 직접 만들어 봅니다. 조원에게 줄 과제도 먼저 풀어 봅니다. 풀어 봐야 분량이 맞는지 알 수 있습니다.

### 저장소와 운영

- [ ] 학습용 저장소 `footprint-study`를 만들고 조원 5명을 초대합니다. **09.21까지** 끝냅니다.
- [ ] 첫 commit에 다음을 넣습니다. `.gitignore`(node_modules, .idea, build, target, .env), `members.md`, `members/.gitkeep`, `docs/`의 문서 4개, `README.md`(문서 링크).
- [ ] PR 양식 `.github/pull_request_template.md`를 만듭니다. 항목은 주차와 역할, 체크리스트, 실행 방법, 스크린샷, 막힌 점입니다.
- [ ] main branch를 보호합니다. PR 필수, 승인 1개로 설정합니다. 팀 조장은 우회(bypass)할 수 있게 둡니다.
  - 찾아볼 것: `github branch protection rules`, `github rulesets bypass`
- [ ] Discord `#제출` 채널을 만들고 GitHub 알림을 연결합니다.
  - 찾아볼 것: `discord webhook github`
- [ ] 역할 가배정 회의를 합니다. 희망을 먼저 받습니다. 10.04에 확정한다고 미리 말합니다.
- [ ] 기능 목록과 화면 목록을 확정합니다(명세 일정 09.30).

### 실행 환경

- [ ] `infra/docker-compose.yml`과 실행 안내 README를 만듭니다. PostgreSQL과 MinIO를 넣습니다. 포트와 계정은 `.env.example`로 분리합니다. **09.27까지** 끝냅니다.
  - 찾아볼 것: `postgres docker compose healthcheck`, `minio docker compose`
- [ ] Windows와 Docker Desktop 환경에서 `docker compose up` 한 줄로 실행되는지 확인합니다.

### 백엔드 학습 — 목표: 인증 없는 CRUD 1개

- [ ] start.spring.io에서 프로젝트를 만듭니다. 의존성은 Web, Data JPA, PostgreSQL Driver, Validation입니다. Java 21로 만듭니다.
  - 찾아볼 것: spring.io 가이드 "Building a RESTful Web Service", "Accessing Data with JPA"
- [ ] `application.yml`에 데이터베이스 연결을 넣습니다. `ddl-auto` 값 4가지의 차이를 읽고 개발용 값을 정합니다.
  - 찾아볼 것: `spring jpa hibernate ddl-auto`
- [ ] Controller, Service, Repository 3계층으로 `Assignment` CRUD를 만듭니다.
- [ ] 생성자 주입만 씁니다. 필드 주입이 권장되지 않는 이유를 읽습니다.
  - 찾아볼 것: `spring constructor injection vs field injection`
- [ ] 요청 DTO와 응답 DTO를 entity와 분리합니다.
  - 찾아볼 것: `java record dto spring`
- [ ] 없는 id를 조회하면 404를 돌려줍니다. 오류 응답 형식을 하나로 정합니다.
  - 찾아볼 것: `@RestControllerAdvice exception handler`

**완료 기준:** Postman으로 생성, 목록, 단건, 수정, 삭제 5개가 통과합니다. 없는 id는 404입니다.

### 프론트엔드 학습 — 목표: React로 목록과 추가

- [ ] 조원 프론트엔드 2주차 과제를 직접 풉니다. 걸린 시간을 기록합니다. 팀 조장이 걸린 시간의 3배가 8시간을 넘으면 조원 과제를 줄입니다.
- [ ] 조원 백엔드 2주차 과제도 같은 방식으로 풀고 시간을 기록합니다.
- [ ] react.dev의 "빠르게 시작하기"와 "React로 사고하기(Thinking in React)"를 읽습니다.
- [ ] 프론트엔드 2주차 과제를 React로 다시 만듭니다(useState, 목록의 key, input과 state 연결).

### 결정하고 기록할 것

- [ ] Java 21 고정(빌드 파일에 명시). Gradle과 Maven 중 하나로 통일합니다.
- [ ] Lombok을 쓸지 정합니다. 쓰면 조원의 IDE 설정 항목이 하나 늘어납니다.
- [ ] 패키지 구조를 정합니다. 계층형(controller/service/repository) 또는 도메인형(assignment/team/...)입니다.
  - 찾아볼 것: `spring boot package by feature vs layer`
- [ ] 오류 응답 JSON 형식을 정합니다.
- [ ] 결정과 이유를 `docs/decisions.md`에 한 줄씩 적습니다.

**밀리면 뒤로 보내는 순서:** Discord 알림 연결 → MinIO(PostgreSQL만 먼저) → 조원 백엔드 2주차 과제 직접 풀기

※ 용어 — CRUD: 생성, 조회, 수정, 삭제 · MinIO: 파일을 저장하는 서버. 발자국에서 산출물 파일을 여기에 저장합니다 · bypass: 보호 규칙을 건너뛰는 권한 · ddl-auto: 실행할 때 테이블을 자동으로 만들지 정하는 설정

---

## 2주차 (09.28 ~ 10.04) — 예시 프로젝트 완성

**왜 하는가**
조원은 3주차부터 예시를 읽고 복사해서 배웁니다. 예시가 곧 교재입니다. 예시가 실행되지 않으면 5명이 첫 항목에서 멈춥니다. 그래서 이번 주의 기준은 "기능이 많은가"가 아니라 "다른 사람의 컴퓨터에서 README만 보고 실행되는가"입니다.

### 백엔드 예시 (`example/backend`)

- [ ] 1주차 CRUD를 예시용으로 정리합니다. 클래스마다 "이 클래스가 하는 일" 주석을 한 줄 씁니다.
- [ ] CORS를 설정합니다. 프론트엔드 개발 서버에서 호출되는지 확인합니다.
  - 찾아볼 것: `spring boot cors configuration WebMvcConfigurer`
- [ ] 시작할 때 예시 데이터 3건이 들어가게 합니다.
  - 찾아볼 것: `spring boot data.sql`, `CommandLineRunner`

### 프론트엔드 예시 (`example/frontend`)

- [ ] Vite로 React 프로젝트를 만듭니다. `.nvmrc`(24)와 `package.json`의 `engines`를 넣습니다.
- [ ] useEffect로 목록을 가져옵니다. 불러오는 중과 오류를 표시합니다.
  - 찾아볼 것: `react.dev synchronizing with effects`, `react.dev you might not need an effect`
- [ ] POST로 항목을 추가합니다. 성공하면 목록을 다시 가져옵니다.
- [ ] API 호출 코드를 `src/api/`로 분리합니다. API 주소는 환경 변수 하나로 둡니다. 가짜 API와 실제 백엔드를 주소만 바꿔서 오갈 수 있어야 합니다.
  - 찾아볼 것: `vite env variables`
- [ ] 가짜 API를 넣습니다. `db.json`과 `npm run mock` 스크립트입니다. 응답 모양은 백엔드 예시와 똑같이 맞춥니다. 프론트엔드 조원은 10.16까지 Docker 없이 이것만 씁니다.
  - 찾아볼 것: `json-server`
- [ ] 폴더 구조를 정하고 `decisions.md`에 적습니다.

### 공개 준비

- [ ] README를 씁니다. 실행은 3단계 이내로 합니다. 자주 나는 오류 3개와 해결법을 적습니다.
- [ ] 다른 폴더에 새로 clone 해서 README만 보고 실행합니다. 가능하면 조원 1명의 컴퓨터에서 먼저 실행해 봅니다.
- [ ] ERD 초안을 그립니다. 엔티티 8개 중 12.11 흐름에 필요한 6개를 먼저 그립니다.

### 확인

- [ ] 10.04 PR 5개를 확인합니다. 통과 기준은 "설명대로 동작한다, 본인이 쓴 주석이 있다"입니다. `?` 주석을 모아 다음 확인 자리의 안건으로 씁니다.
- [ ] 역할을 확정합니다(동료평가 화면 담당 포함).

**밀리면 뒤로 보내는 순서:** ERD의 나머지 엔티티 2개 → 예시 데이터 자동 입력 → React의 POST(목록 조회만 공개)

※ 용어 — CORS: 다른 주소의 화면이 서버를 호출하도록 허용하는 설정 · 환경 변수: 코드 밖에 두는 설정값 · ERD: 테이블과 테이블 사이의 연결을 그린 그림

---

## 3주차 (10.05 ~ 10.11) — 예시 공개, 로그인(JWT)

**왜 하는가**
발자국은 교수, 조장, 조원이 볼 수 있는 것이 다릅니다. 그 출발점이 "누가 요청했는지 아는 것"입니다. 로그인하면 서버가 token을 주고, 화면은 요청마다 token을 함께 보냅니다. 이 구조가 골격에 들어 있어야 11월에 조원이 기능만 만들 수 있습니다.

- [ ] **10.05에 예시 프로젝트를 공개합니다.** 단체방에 공지하고, 수요일까지 전원의 실행 확인을 받습니다.
- [ ] 10.05(월)은 공휴일입니다. 주간 확인은 10.06(화)에 합니다. 10.09(금)도 공휴일입니다.

### 인증 학습 — 목표: 로그인, token, 보호된 API

- [ ] Spring Security의 filter chain이 요청을 어떻게 가로채는지 읽습니다. 코드를 쓰기 전에 그림으로 한 번 그립니다.
  - 찾아볼 것: `spring security architecture filter chain`
- [ ] `SecurityFilterChain`으로 설정합니다. session을 쓰지 않습니다. csrf를 끄는 이유를 적습니다.
  - 찾아볼 것: `spring security 6 SecurityFilterChain stateless`
- [ ] 비밀번호는 BCrypt로 저장합니다.
  - 찾아볼 것: `PasswordEncoder BCrypt`
- [ ] JWT를 발급하고 검증합니다. 서명 키는 `.env`에 둡니다.
  - 찾아볼 것: `jjwt`, `OncePerRequestFilter jwt`
- [ ] 401(로그인 안 됨)과 403(권한 없음)을 구분해서 돌려줍니다.
  - 찾아볼 것: `AuthenticationEntryPoint AccessDeniedHandler`
- [ ] 학교 이메일 인증은 만들지 않습니다. 시연용 계정을 시작 데이터로 넣습니다.

**완료 기준:** `/auth/login`이 token을 줍니다. token 없이 보호된 API를 부르면 401입니다. token이 있으면 200입니다.

### 설계

- [ ] API 명세 초안을 씁니다. 12.11 흐름만 다룹니다. 과제 생성, 조와 조장 지정, 초대 링크, 역할 배정, 산출물 업로드와 목록, 평가 입력입니다.
- [ ] 각 API에 담당자(백엔드 A, B)와 호출하는 화면(프론트엔드 A, B, C)을 적습니다.

### 확인

- [ ] PR을 확인합니다. 이번 주부터 같은 역할끼리 먼저 서로 확인합니다.

**밀리면 뒤로 보내는 순서:** 403 구분 → API 명세의 평가 부분 → 같은 역할끼리 확인

※ 용어 — JWT: 로그인한 사용자를 증명하는 token · filter chain: 요청이 Controller에 닿기 전에 지나가는 검사 단계들 · BCrypt: 비밀번호를 되돌릴 수 없는 형태로 바꾸는 방법 · 401과 403: 401은 로그인이 필요함, 403은 로그인했지만 권한이 없음

---

## 4주차 (10.12 ~ 10.16) — 화면 쪽 로그인, 11월 준비

**왜 하는가**
11.02에 구현을 시작하려면 두 가지가 있어야 합니다. 로그인이 화면까지 연결된 골격과, 누가 무엇을 만들지 적힌 분담표입니다.

- [ ] React 로그인 화면을 만듭니다. token 저장 위치를 정하고 이유를 적습니다.
  - 찾아볼 것: `jwt localStorage vs memory vs httpOnly cookie`
- [ ] 모든 API 호출에 Authorization 헤더를 붙이는 공통 함수를 만듭니다.
- [ ] 로그인하지 않은 사용자는 로그인 화면으로 보냅니다.
  - 찾아볼 것: `react router protected route`
- [ ] 자주 막히는 곳을 문서로 모읍니다. 1 ~ 3주차 PR의 "막힌 점"과 `?` 주석에서 가져옵니다. 새로 쓰지 않습니다.
- [ ] 10.16(금) 밤 마감 PR을 확인합니다. 모이지 않고 PR 댓글로 합니다.
- [ ] **11월 분담표**를 만듭니다. 엔티티, API, 화면마다 담당자와 주차를 적습니다.

**밀리면 중간고사 뒤로 보내는 순서:** 명세 v2.1 → 화면 설계 확정 → 교수와 학생의 첫 화면 분리

---

## 11월 첫 주 예정

- [ ] `StorageService`를 만듭니다. MinIO와 연결합니다. 조원은 이 클래스의 메서드만 부릅니다.
  - 찾아볼 것: `spring boot minio s3 client`, `MultipartFile`
  - 결정할 것: 서버를 거쳐 업로드할지, presigned URL을 쓸지 정합니다. 조원의 난이도를 기준으로 고릅니다.
- [ ] 산출물 버전 번호 규칙을 정합니다(같은 역할 안에서 1씩 증가).
- [ ] 프론트엔드가 실제 API에 연결하는 방법을 정합니다. 백엔드 `Dockerfile`과 compose(프론트엔드 컴퓨터에 Docker 설치) 또는 공용 개발 서버입니다. 11.23 통합 주간에 처음 연결하면 늦습니다.
  - 찾아볼 것: `spring boot dockerfile multi-stage`
- [ ] 조원 문서의 "11월 첫 주 예정" 항목을 확인합니다.

## 12.12 이후

- [ ] 조 단위 권한을 만듭니다. `@PreAuthorize`와 조 소속 검사입니다.
  - 찾아볼 것: `spring method security @PreAuthorize custom bean`
- [ ] 완료확인, 기여 항목, 진척 보드를 만듭니다.

---

## 매주 반복

- [ ] 일요일 밤: PR 5개를 확인합니다. 통과 기준만 봅니다. PR 하나에 10분입니다. `?` 주석을 모읍니다.
- [ ] 월요일: 30분 확인을 진행합니다.
- [ ] 수요일: 그 주 branch에 commit이 없는 조원에게 먼저 연락합니다.
- [ ] 이번 주에 실제로 쓴 시간을 적습니다. 주 20시간을 2주 연속으로 넘으면 범위를 줄입니다.
