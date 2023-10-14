import { usePassage } from '@passageidentity/passage-react';
import { useState, useEffect } from 'react';

export const usePassageUserInfo = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState();

  const { getCurrentUser } = usePassage();

  useEffect(() => {
    const loadUserInfo = async () => {
      setLoading(true);

      try {
        const userInfo = await getCurrentUser().userInfo();
        setUserInfo(userInfo);
      } catch (err) {
        setUserInfo(undefined);
      } finally {
        setLoading(false);
      }
    };
    loadUserInfo();
  }, []);

  return {
    loading,
    userInfo
  };
};

export default usePassageUserInfo;
