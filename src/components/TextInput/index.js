import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./TextInput.module.scss";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function TextInput({
  type = "Text",
  name,
  value,
  placeholder = "Add a task",
  icon = <FontAwesomeIcon icon={faPlus} />,
  errorMessage = "",
  onChange = () => {},
  onFocus = () => {},
}) {
  return (
    <div className={styles["wrapper"]}>
      <div className={styles["input"]}>
        {icon}
        <input
          onChange={(e) => onChange(e.target.value)}
          onFocus={(e) => onFocus(e.target.value)}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          spellCheck="false"
        />
      </div>
      {errorMessage && <p className={styles["error-text"]}>{errorMessage}</p>}
    </div>
  );
}

export default TextInput;
