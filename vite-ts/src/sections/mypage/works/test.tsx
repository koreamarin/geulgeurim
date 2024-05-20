import { useEffect } from 'react';

// type TestProps = {
//   isDirty: boolean
//   message: string
// };

export default function usePreventPageChangeWhenDirty(isDirty: boolean, message: string ) {
  useEffect(() => {
    console.log('asdfasfd')
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();  // 기본 동작을 방지하여 브라우저가 사용자에게 확인 메시지를 보여주게 함
        event.returnValue = message;  // 구형 브라우저 지원
      }
    };

    // 페이지를 떠나려 할 때 이벤트 리스너 추가
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty, message]); // 의존성 배열에 isDirty 추가
}
