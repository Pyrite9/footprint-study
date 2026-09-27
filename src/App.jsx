import React from 'react';

export default function App() {
  
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f9f9f9',
      color: '#333',
      padding: '20px',
      minHeight: '100vh',
    },
    header: {
      textAlign: 'center',
      padding: '15px',
      marginBottom: '20px',
      backgroundColor: '#ffffff',
      border: '1px solid #ddd',
    },
    main: {
      maxWidth: '600px',
      margin: '0 auto',
    },
    section: {
      backgroundColor: '#ffffff',
      padding: '20px',
      marginBottom: '20px',
      border: '1px solid #ddd',
    },
    h2: {
      fontSize: '1.2rem',
      marginBottom: '15px',
    },
    ul: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    li: {
      display: 'flex',
      justifyContent: 'space-between', // 과제명과 기간을 양 끝으로 배치 (Flexbox)
      alignItems: 'center',
      padding: '10px 15px',
      marginBottom: '10px',
      border: '1px solid #eee',
      backgroundColor: '#fafafa',
    },
    title: {
      fontWeight: 'bold',
    },
    period: {
      fontSize: '0.9rem',
      color: '#666',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    label: {
      fontSize: '0.9rem',
      fontWeight: 'bold',
    },
    input: {
      padding: '8px',
      border: '1px solid #ccc',
      borderRadius: '2px',
    },
    button: {
      padding: '10px',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      marginTop: '5px',
    },
  };

  return (
    <div style={styles.container}>
        {/* 헤더 영역 */}
        <header style={styles.header}>
            <h1>과제 관리 페이지</h1>
        </header>

        {/* 메인 콘텐츠 영역 */}
        <main style={styles.main}>
            {/* 과제 목록 영역 */}
            <section style={styles.section}>
                <h2 style={styles.h2}>현재 과제 목록</h2>
                <ul style={styles.ul}>
                    <li style={styles.li}>
                        <span style = {styles.title}>프론트 과제</span>
                        <span style = {styles.period}>2026.10.01 ~ 2026.10.08</span>
                    </li>
                    <li style={styles.li}>
                        <span style = {styles.title}>백엔드 과제</span>
                        <span style = {styles.period}>2026.10.09 ~ 2026.10.16</span>
                    </li>
                    <li style={styles.li}>
                        <span style = {styles.title}>데이터베이스 과제</span>
                        <span style = {styles.period}>2026.10.17 ~ 2026.10.24</span>
                    </li>
                </ul>
            </section>

            {/* 과제 추가 양식 영역 */}
            <section style={styles.section}>
                <h2 style={styles.h2}>새 과제 추가</h2>
                <form style={styles.form} onSubmit={(e)=> e.preventDefault()}>
                    <div>
                         <label htmlFor="task-title" style={styles.label}>
                            과제명
                        </label>
                         <input
                          type="text" 
                          id="task-title"
                          name="task-title"
                          placeholder="과제명을 입력하세요"
                          style={styles.input}
                        />
                     </div>
                     <div style={styles.formGroup}>
                        <label htmlFor="task-period" style={styles.label}>
                            기간
                        </label>
                          <input 
                             type="text" 
                             id="task-period"
                             placeholder="예: 2026.10.01 ~ 2026.10.08"
                             style={styles.input}
                          />
                         </div>

                         <button type="button" style={styles.button}>
                         과제 추가하기
                         </button>
                </form>
            </section>
        </main>
    </div>
  );
}