import styles from "./Note.module.scss";

function Note() {
    return <div className={styles["wrapper"]}>
        <textarea className={styles["input"]} placeholder="Add note" rows="2"></textarea>
        <p className={styles["time-update"]}>Update on 5 hours ago</p>
    </div>
}

export default Note;