# 발자국 학습 계획 — 백엔드 (09.18 ~ 10.16)

먼저 `00_common.md`를 읽습니다. 1주차에는 공통 할 일과 아래 1주차를 함께 합니다.

백엔드는 발자국의 서버를 만듭니다. 화면의 요청을 받아서 과제, 조, 산출물, 평가를 데이터베이스에 저장하고 돌려줍니다.

---

## 1주차 (09.18 ~ 09.27) — Java 기초

**왜 배우는가**
Spring Boot는 Java로 씁니다. Spring Boot의 코드는 전부 클래스로 되어 있습니다. 발자국의 과제, 조, 산출물, 평가는 각각 클래스 하나가 됩니다. 클래스를 만들고 객체를 만드는 것이 이후 모든 작업의 기초입니다.

### 환경 확인

- [ ] JDK 버전을 확인합니다. 터미널에서 `java -version`을 실행합니다. `21`로 시작해야 합니다. 다른 버전이거나 없으면 JDK 21을 설치합니다. 팀 전체가 21로 통일합니다.
  - 찾아볼 것: `install jdk 21 windows`
- [ ] IntelliJ IDEA가 설치되어 있는지 확인합니다.
- [ ] start.spring.io에서 Spring Boot 프로젝트(Java 21, Spring Web 포함)를 만들고 실행합니다. 저장소 밖의 아무 폴더에 만듭니다. 오류 없이 시작되면 됩니다. 실행만 확인하고 제출하지 않습니다.
  - 찾아볼 것: `spring initializr`, `run spring boot intellij`
- [ ] Docker Desktop을 설치하고 실행합니다. 터미널에서 `docker run hello-world`가 성공하면 됩니다. 2주차에 데이터베이스를 실행할 때 씁니다.
  - 찾아볼 것: `docker desktop install windows`
- [ ] DBeaver와 Postman을 설치합니다. 2주차와 3주차에 씁니다.

### 할 일

- [ ] IntelliJ에서 Java 프로젝트를 만들고 Hello World를 출력합니다.
  - 찾아볼 것: `intellij create java project`
- [ ] 변수, 자료형, 조건문, 반복문을 익힙니다.
  - 찾아볼 것: 위키독스 "점프 투 자바"의 자료형, 제어문 장. 영어와 중국어는 `dev.java learn`
- [ ] 메서드를 만들고 호출합니다.
  - 찾아볼 것: `java method`
- [ ] 클래스, 객체, 필드, 생성자를 익힙니다.
  - 찾아볼 것: "점프 투 자바"의 객체 지향 프로그래밍 장, `java class constructor`
- [ ] 날짜는 `LocalDate`로 저장합니다.
  - 찾아볼 것: `java LocalDate of`

**제출물:** `Assignment` 클래스(과제명, 시작일, 종료일)를 만듭니다. 객체 1개를 만들어 콘솔에 출력합니다.

※ 용어 — 클래스: 데이터와 기능을 묶은 설계도 · 객체: 클래스로 만든 실제 데이터 하나 · 필드: 클래스 안의 데이터(과제명, 시작일 등) · 생성자: 객체를 만들 때 실행되는 부분 · 메서드: 클래스 안의 기능 · Docker: 데이터베이스 같은 프로그램을 설치 없이 실행해 주는 도구 · DBeaver: 데이터베이스를 눈으로 보는 도구 · Postman: 화면 없이 서버에 요청을 보내 보는 도구

---

## 2주차 (09.28 ~ 10.04) — 데이터 다루기: List와 SQL

**왜 배우는가**
서버가 하는 일의 대부분은 데이터를 추가, 조회, 수정, 삭제하는 것입니다. 이것을 CRUD라고 부릅니다. 이번 주에는 같은 일을 두 번 합니다. 한 번은 Java의 List로 하고, 한 번은 데이터베이스의 SQL로 합니다. 3주차부터 쓰는 JPA는 이 둘을 연결해 주는 도구입니다. 양쪽을 직접 해 봐야 JPA가 무엇을 대신해 주는지 알 수 있습니다.

### Java

- [ ] List와 Map을 씁니다.
  - 찾아볼 것: `java ArrayList`, `java HashMap`
- [ ] 인터페이스가 무엇인지 읽습니다. 직접 만들지는 않습니다.
  - 찾아볼 것: `java interface`
- [ ] try-catch를 1번 써 봅니다. 없는 번호를 조회하면 오류 문구를 출력합니다.
  - 찾아볼 것: `java exception try catch`
- [ ] List 하나에 `Assignment`를 추가, 조회, 삭제하는 콘솔 프로그램을 만듭니다.

### SQL

- [ ] 저장소 `infra/` 폴더의 안내대로 PostgreSQL을 실행합니다.
  - 찾아볼 것: `docker compose up`
- [ ] DBeaver로 PostgreSQL에 접속합니다.
  - 찾아볼 것: `dbeaver postgresql connect`
- [ ] 테이블 1개로 CREATE TABLE, INSERT, SELECT, WHERE, UPDATE, DELETE를 실행합니다.
  - 찾아볼 것: `postgresql tutorial create table`, `postgresql select where`

**제출물:** 과제를 추가, 조회, 삭제하는 콘솔 프로그램. assignment 테이블을 만들고 조회하는 `.sql` 파일.

**10.04 확인:** 이 제출물을 보고 계속 백엔드를 맡을지 정합니다.

※ 용어 — CRUD: 생성(Create), 조회(Read), 수정(Update), 삭제(Delete) · List: 여러 객체를 순서대로 담는 Java 자료형 · 인터페이스: "이런 기능이 있어야 한다"는 약속만 적은 것 · 예외: 실행 중에 생기는 오류 · SQL: 데이터베이스에 명령을 내리는 언어 · 테이블: 데이터베이스에서 같은 종류의 데이터를 모아 둔 표

---

## 3주차 (10.05 ~ 10.11) — 테이블 연결, Spring Boot 읽기

**왜 배우는가**
발자국의 데이터는 서로 연결되어 있습니다. 과제 아래에 조가 있고, 조 아래에 조원이 있습니다. SQL에서는 이 연결을 FOREIGN KEY와 JOIN으로 다룹니다. 그리고 이번 주부터 Spring Boot를 시작합니다. 새로 만들기 전에, 동작하는 예시를 먼저 읽습니다. 요청 하나가 Controller, Service, Repository를 지나 데이터베이스까지 가는 길을 따라가 봅니다. 11월에 만드는 모든 API가 같은 길을 지납니다.

### SQL

- [ ] PRIMARY KEY와 FOREIGN KEY를 넣어 테이블을 만듭니다.
  - 찾아볼 것: `postgresql foreign key`
- [ ] member, team, team_member 테이블을 만듭니다. JOIN으로 "어느 조에 누가 어떤 역할로 있는지" 조회합니다.
  - 찾아볼 것: `sql inner join`

### Spring Boot

- [ ] 팀 조장이 만든 백엔드 예시 프로젝트를 본인 폴더에 복사하고 README대로 실행합니다.
- [ ] Postman으로 예시 API에 GET, POST 요청을 보냅니다.
  - 찾아볼 것: `postman send first request`
- [ ] 요청 1개가 Controller, Service, Repository, 데이터베이스 순서로 지나가는 길을 코드에서 따라 읽습니다. 각 클래스의 역할을 주석으로 한 줄씩 적습니다.
  - 찾아볼 것: `spring boot controller service repository`
- [ ] DI(의존성 주입)와 Bean이 무엇인지 읽습니다.
  - 찾아볼 것: `spring constructor injection`
- [ ] DTO가 왜 필요한지 읽습니다.
  - 찾아볼 것: `spring boot dto`

**예시가 아직 없으면:** spring.io 가이드 "Building a RESTful Web Service"와 "Accessing Data with JPA"를 먼저 따라 합니다. 이 경우 제출물의 "필드 1개 추가"는 가이드의 엔티티에 합니다.

**제출물:** 3개 테이블과 JOIN 조회 `.sql` 파일. 예시 엔티티에 필드 1개를 추가합니다(entity, DTO, API 응답까지 모두 수정).

※ 용어 — PRIMARY KEY: 각 행을 구분하는 고유 번호 · FOREIGN KEY: 다른 테이블의 행을 가리키는 값 · JOIN: 연결된 테이블을 함께 조회하는 것 · Controller: 요청을 받는 클래스 · Service: 처리 규칙을 담는 클래스 · Repository: 데이터베이스와 주고받는 클래스 · DI: 필요한 객체를 Spring이 만들어서 넣어 주는 방식 · DTO: 화면과 주고받을 데이터만 담는 클래스 · entity: 데이터베이스 테이블과 연결된 클래스

---

## 4주차 (10.12 ~ 10.16) — JPA로 CRUD 만들기

**왜 배우는가**
2주차에는 SQL을 직접 썼습니다. JPA를 쓰면 Java 클래스에 `@Entity` 표시만 붙여도 테이블이 만들어지고 저장과 조회가 됩니다. 이번 주 제출물은 11월에 본인이 맡을 엔티티의 첫 버전입니다.

- [ ] 3주차에 복사한 예시 프로젝트를 `week4/`로 복사하고 그 안에서 작업합니다. 새 프로젝트를 만들지 않습니다. 데이터베이스 연결 설정이 이미 들어 있기 때문입니다.
- [ ] `@Entity`, `@Id`, `@GeneratedValue`로 엔티티를 만듭니다.
  - 찾아볼 것: spring.io 가이드 "Accessing Data with JPA"
- [ ] JpaRepository를 상속해서 저장과 조회를 합니다.
  - 찾아볼 것: `spring data jpa repository`
- [ ] 담당 엔티티의 CRUD API를 만듭니다. 다른 엔티티와 연결하지 않습니다. 단독 필드만 씁니다.
  - 백엔드 A: 조(조 이름)
  - 백엔드 B: 산출물 정보(파일명, 버전, 업로드 시각). 파일 자체는 아직 다루지 않습니다.
- [ ] Postman으로 API 4개(생성, 목록, 수정, 삭제)를 호출하고 화면을 캡처합니다.

**제출물:** 담당 엔티티 CRUD API와 Postman 캡처. 마감은 10.16(금) 밤입니다.

※ 용어 — JPA: Java 객체를 데이터베이스 테이블에 저장해 주는 도구 · JpaRepository: 저장, 조회, 삭제 기능을 미리 만들어 둔 인터페이스

---

## 11월 첫 주 예정

- [ ] `@ManyToOne`으로 다른 엔티티를 연결합니다. 양방향 연결은 하지 않습니다.
  - 찾아볼 것: `jpa manytoone example`
- [ ] 입력값을 검사합니다.
  - 찾아볼 것: `spring boot validation @Valid`
