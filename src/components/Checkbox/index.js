import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./Checkbox.module.scss";

function Checkbox({
  status,
  unCheckIcon = <FontAwesomeIcon icon={faCircle} />,
  checkedIcon = <FontAwesomeIcon icon={faCircleCheck} />,
  onClick,
}) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (!!onClick) {
      onClick();
    }
  };
  return (
    <div onClick={handleClick} className={styles["wrapper"]}>
      {status ? checkedIcon : unCheckIcon}
    </div>
  );
}

export default Checkbox;
