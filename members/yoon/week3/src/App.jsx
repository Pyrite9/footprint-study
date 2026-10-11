import { useState } from 'react' // 리액트에서 변하는 데이터를 관리할수있는 'useState' 기능을 가져옴
import TaskList from './components/TaskList' // 과제 목록을 보여주는 파일을 불러옴
import TaskForm from './components/TaskForm' // 과제 입력받는 창을 제공하는 파일을 불러옴
import './App.css' // App 화면을 꾸며주는 CSS 디자인 파일을 불러옴


// App 함수를 생성하여 
function App() {
  const [tasks, setTasks] = useState([
    {id : 1, title : 'React 컴포넌트 설계', period: '09.28 ~ 10.05'},
    {id : 2, title : 'Api 연동 작업', period: '10.06 ~ 10.12'},            // 웹페이지를 열었을때 기본적으로 보여줄 과제 3개
    {id : 3, title : '배포 및 테스트', period: '10.13 ~ 10.19'}
  ]) 

  // 새로운 과제 데이터를 받아와서 기존 목록에 추가해주는 함수
  function addTask(newTask) {

    // set은 새로운 값으로 데이터를 세팅하고, 화면을 다시 그려주는 역할을 함
    // ...을 활용하면 기존 데이터가 들어있는 리스트 안에 새로운 데이터를 자연스럽게추가해줌
    setTasks([...tasks, { id : Date.now(), ...newTask}]);
  }


  return (
    <div className="app-container">
      <h1> 발자국 - 과제 목록 </h1>
      
      {/* ? : 과제를 입력받는 폼 컴포넌트  */}
      <TaskForm onAdd={addTask} />

      {/* ? :현재 과제 목록을 화면에 보여주는 컴포넌트 */}
      <TaskList tasks={tasks} />

    </div>
  )
}

// App 컴포넌트를 다른파일에서 사용할 수 있도록 내보냄
export default App;