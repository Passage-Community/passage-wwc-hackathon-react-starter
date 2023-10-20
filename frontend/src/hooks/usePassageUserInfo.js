import { usePassage } from "@passageidentity/passage-react";
import { useState, useEffect } from "react";

export const usePassageUserInfo = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const { getCurrentUser } = usePassage();

  useEffect(() => {
    const loadUserInfo = async () => {
      setLoading(true);

      try {
        const userInfo = await getCurrentUser().userInfo();
        setUserInfo(userInfo);
        console.log('user info set')
      } catch (err) {
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };
    loadUserInfo();
  }, [getCurrentUser]);

  return {
    loading,
    userInfo,
  };

};

export default usePassageUserInfo;

// getCurrentUser - in dependency array