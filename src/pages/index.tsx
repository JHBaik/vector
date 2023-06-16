import { M1 } from "@/components/m1";
import styles from "@/css/layout.module.css";

export default function Index() {
  return (
    <div className={[styles.splitHorizontal, styles.root].join(" ")}>
      <M1 />
      <div className={styles.splitVertical}>
        <div className={styles.red}></div>
        <div className={styles.green}></div>
      </div>
    </div>
  );
}
