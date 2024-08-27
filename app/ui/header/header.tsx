import Link from "next/link";
import styles from "./Header.module.css"
const jwt = require("jsonwebtoken");

export default async function Header() {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <span>Your Logo</span>
        </Link>
      </div>
    </header>
  );
}
