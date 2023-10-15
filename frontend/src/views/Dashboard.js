import styles from '../styles/Dashboard.module.css';
import { PassageAuthGuard } from '@passageidentity/passage-react';
import { usePassageUserInfo } from '../hooks/';
import LogoutButton from '../components/LogoutButton';

function Dashboard() {
  const { userInfo, loading } = usePassageUserInfo();

  if (loading) {
    return (
      <div className={styles.dashboard}>
        <div className={styles.title}>Loading</div>
      </div>
    );
  }

  return (
    <PassageAuthGuard
      unAuthComp={
        <div className={styles.dashboard}>
          <div className={styles.title}>you must be logged in</div>
          <div className={styles.message}>
            <a href="/">Login</a>
          </div>
        </div>
      }
    >
      <div className={styles.dashboard}>
        <div className={styles.title}>Welcome</div>
        <div className={styles.message}>
          You successfully signed in with Passage. This is your homepage. <br />
          <br />
          Your username is: {userInfo?.email}
        </div>
        <LogoutButton />
      </div>
    </PassageAuthGuard>
  );
}

export default Dashboard;
