import { useState, useEffect } from "react";
import { PassageUser } from '@passageidentity/passage-elements/passage-user';

export function useAuthStatus() {
//   const [result, setResult] = useState({
//     isAuthorized: false,
//   });

  useEffect(() => {
    new PassageUser().authGuard().then(res => {
        console.log(`authguard response: ${res}`)
    });
    // return () => {
    //     cancelRequest = true;
    // };
  }, []);
}

// return result;
// }
// if( cancelRequest ) {
//     return;
// }
// if(res === false){
//     setResult({
//         isLoading: false,
//         isAuthorized: false,
//       });
//       return;
// }
// setResult({
//     isLoading: false,
//     isAuthorized: true,
//   });