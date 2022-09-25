import Link from "next/link";
import styles from "../../styles/navbar.module.scss";
export const NavBar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.pageRoutes}>
        <Link href='/'>
          <a className={styles.link}>Home</a>
        </Link>
        <Link href='/user/contacts'>
          <a className={styles.link}>Contacts</a>
        </Link>
      </div>

      <Link href='/user/settings'>
        <a className={`${styles.settings} ${styles.link}`}>Settings</a>
      </Link>
    </div>
  );
};
