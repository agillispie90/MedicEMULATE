import styles from "../styles/Components/CenterMenu.module.css";

export default function CenterMenu({ children, style }) {
  return (
    <div style={style} className={styles.centerMenu}>
      {children}
    </div>
  );
}
