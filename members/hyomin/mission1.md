TeamMembersPage.jsx를 열고 Ctrl + F로 setMembers를 찾습니다. 여러 곳이 나옵니다. 그중에서 역할을 저장한 뒤에 실행되는 줄을 붙입니다. [코드]

    .then((updated) => {  // 역할 저장되면 실행
        setMembers(members.map((member) => (member.id === updated.id ? updated : member))) 
        setRoleNameInput('')
        return getRoleHistories(teamId, updated.id).then((data) => setRoleHistories(data))
    })


새로고침 없이 목록이 바뀐 이유를 setMembers라는 단어를 넣어서 적습니다. [내 말로]

 - setMembers가 실행되면 리액트가 members 상태가 변경된 것을 감지하고 해당 state를 사용하는 컴포넌트를 재렌더링 하기 때문


조장과 조원의 화면은 어떻게 다른가요.
 - 조장은 조원 화면에는 뜨지 않는 바가 나옵니다.바안에는 "조장이 역할을 정하면 파일을 올릴 수 있습니다. 그전에도 조의 기록은 볼 수 있습니다." 라는 문구가 나옵니다. 조원의 화면에는 나오지 않습니다. 조장은 "내가 할수 있는 일" 목록에 역할지정 : 조장의 이름 이라고 뜹니다. 클릭하면 조원의 역할을 지정할 수 있는 페이지가 나옵니다.


TeamPage.jsx를 열고 Ctrl + F로 leader를 찾습니다. 조장일 때만 그것이 보이게 하는 줄을 붙입니다. [코드]

 - const needsInvite = myTeamMember && myTeamMember.leader && teamData.phase === 'RECORDING'


조원에게 이것을 보여주지 않는 이유
 - 조장이 역할을 지정하기 전까지 조원들이 불필요한 파일을 업로드하지 않게하기 위해서입니다.
 - 조원들이 역할을 임의로 변경하지 않게 하기 위해서입니다.



탭 2에서 왼쪽 메뉴의 조원과 역할을 누릅니다. 이서연이 보이는 화면을 캡처합니다. [캡처]
![alt text](<발자국 데모 - 이서연 캡처.PNG>)

새로고침을 하지 않았는데도 목록에 역할이 바로 보입니다. 이 화면을 캡처합니다. [캡처]
![alt text](<발자국 데모 - 이서연 역할부여.PNG>)