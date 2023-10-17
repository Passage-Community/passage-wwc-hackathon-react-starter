import { Link } from "react-router-dom";
import styles from '../styles/Footer.module.css';

function Footer() {
    return ( 
        <div className={styles.footer}>
            <span>built with love by teamName</span>
            <a href=''>Privacy Policy</a>
            <a href=''>Terms of Service</a>
        </div>
    );
}
export default Footer;