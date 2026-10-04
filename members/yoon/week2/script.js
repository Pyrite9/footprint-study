// 과제 데이터를 담을 tasks 라는 빈 배열을 생성한다. tasks.json을 읽어와서 배열이 채워진다.
let tasks = [];

// 클래스명이 task-list인 요소를 찾아서 taskList라는 변수에 저장한다.
const taskList = document.querySelector(".task-list");

// tasks 배열의 데이터를 화면에 표시해주는 함수를 정의한다.
function renderTasks() {

    // 중복으로 데이터가 쌓여서 화면에 표시되는 것을 방지하기위해 기존 내용을 비운다.
    taskList.innerHTML="";

    // tasks 배열 안의 항목들을 하나씩 꺼내고, 각 항목마다 코드를 반복 실행한다.
    tasks.forEach((task) => {

        // 클래스이름이 task-item인 li 태그를 새로 만든다.
        const li = document.createElement("li");
        li.className = "task-item";

        // 과제명 데이터를 담을 span 태그를 생성하고, title에 들어가있는 데이터를 담는다.
        const nameSpan = document.createElement("span");
        nameSpan.className = "task-name";
        nameSpan.textContent = task.title;

        // 기간 데이터를 담을 span 태그를 생성하고, period에 들어가있는 데이터를 담는다.
        const periodSpan = document.createElement("span");
        periodSpan.className = "task-period";
        periodSpan.textContent = task.period;

        // 만든 두개의 span을 li 안에 집어넣는다.
        li.appendChild(nameSpan);
        li.appendChild(periodSpan);

        // 완성된 li를 화면의 taskList 안에 집어넣는다.
        taskList.appendChild(li);

    });
}
    function loadTasks() {

        // fetch는 다른 파일이나 서버에서 데이터를 가져오도록 요청한다.
        fetch("tasks.json")
        .then((response) => response.json()) // 요청이 끝나면, 받아온 응답을 JS가 쓸수있는 형태로 변환한다.
        .then((data) =>{  // 변환이 끝나면, 그 데이터를 tasks 배열에 저장하고 renderTasks 함수를 이용해 화면에 표시한다.
            tasks = data;
            renderTasks();
        })

        // 가져오는 도중 에러가 발생하면, 콘솔에 내러 내용을 출력한다.
        .catch((error) => {
            console.log("tasks.json을 불러오지 못했습니다:", error);
        
        });
    }

    // 화면의 form 요소를 찾아서 formEl이라는 변수에 저장한다.
const formEl = document.querySelector("form");

// formEl이 제출(submit)될 때, 아래 코드를 실행하도록 연결한다.
formEl.addEventListener("submit", (event) => {

    // 폼 제출 시 원래 일어나는 동작(페이지 새로고침)을 막는다.
    event.preventDefault();

    // id가 각각 task-name, task-start, task-end인 입력창을 찾아서 저장한다.
    const nameInput = document.querySelector("#task-name");
    const startInput = document.querySelector("#task-start");
    const endInput = document.querySelector("#task-end");

    // 입력창에 쓴 값들을 꺼내서, 새로운 과제 객체를 만든다.
    const newTask = {
        title: nameInput.value,
        period: `${startInput.value} ~ ${endInput.value}`,
    };

    // 새 과제 객체를 tasks 배열 맨 끝에 추가한다.
    tasks.push(newTask);

    // 배열이 바뀌었으니 renderTasks 함수를 호출해 화면을 다시 표시한다.
    renderTasks();

    // 입력창들을 다시 빈 칸으로 되돌린다.
    formEl.reset();
});

// 페이지가 열리자마자 loadTasks 함수를 호출해 tasks.json을 불러오는 작업을 시작한다.
loadTasks();