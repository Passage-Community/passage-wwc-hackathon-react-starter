import '@passageidentity/passage-elements/passage-profile';
import {useAuthStatus} from '../hooks/useAuthStatus';
import styles from '../styles/Dashboard.module.css';

function Profile() {
    const {isLoading, isAuthorized, username} = useAuthStatus();
    console.log(useAuthStatus())

    return (
        <div>
            <passage-profile app-id={process.env.REACT_APP_PASSAGE_APP_ID}></passage-profile>
        </div>
    );

}

export default Profile;
