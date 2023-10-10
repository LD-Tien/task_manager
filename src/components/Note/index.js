import { useRef } from "react";
import styles from "./Note.module.scss";

function Note({
  value,
  timeUpdated = "",
  waitTimeToSave = 500,
  setValue = () => {},
  saveValue = () => {},
}) {
  let timer = useRef();

  return (
    <div className={styles["wrapper"]}>
      <textarea
        className={styles["input"]}
        placeholder="Add note"
        value={value}
        rows={4}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if(!timer.current) return; // if the user has not entered a new value
          clearTimeout(timer.current); // remove old timeout
          saveValue(e.target.value);
        }}
        onKeyUp={(e) => {
          clearTimeout(timer.current); // remove old timeout
          timer.current = setTimeout(() => {
            saveValue(e.target.value);
          }, waitTimeToSave); // when user stop typing, save value
        }}
      ></textarea>
      <p className={styles["time-update"]}>{timeUpdated}</p>
    </div>
  );
}

export default Note;
