import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import styles from "./Checkbox.module.scss";
import { useState } from "react";

function Checkbox({
  status,
  unCheckIcon = <FontAwesomeIcon icon={faCircle} />,
  checkedIcon = <FontAwesomeIcon icon={faCircleCheck} />,
}) {
  const [isChecked, setIsChecked] = useState(!!status);
  const handleClick = () => {
    setIsChecked(!isChecked);
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
