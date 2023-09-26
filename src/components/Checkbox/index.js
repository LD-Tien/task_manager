import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./Checkbox.module.scss";
import { useState } from "react";

function Checkbox({
  status,
  unCheckIcon = <FontAwesomeIcon icon={faCircle} />,
  checkedIcon = <FontAwesomeIcon icon={faCircleCheck} />,
  onClick
}) {
  const [isChecked, setIsChecked] = useState(!!status);
  const handleClick = (e) => {
    e.stopPropagation();
    setIsChecked(!isChecked);
    if(!!onClick) {
      onClick();
    }
  };
  return (
    <>
      <div onClick={handleClick} className={styles["wrapper"]}>
        {isChecked ? checkedIcon : unCheckIcon}
      </div>
    </>
  );
}

export default Checkbox;
