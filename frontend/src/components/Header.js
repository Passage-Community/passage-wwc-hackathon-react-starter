import { Link } from "react-router-dom";
import styles from '../styles/Header.module.css';

function Header() {
    return ( 
        <div className={styles.mainHeader}>
            <Link to={'/'} className={styles.headerText}>Harvest Exchange</Link>
            <Link to={'/profile'}>Profile</Link>
        </div>
    );
}
export default Header;
