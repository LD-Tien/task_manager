import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Accordion.module.scss";
import { faChevronDown, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function Accordion({title, children, totalTasksCompleted=0}) {
    const [isShow, setIsShow] = useState(true);

    function handleClick() {
        setIsShow(!isShow);
    }

  return <div className={`${styles["wrapper"]} ${!!isShow ? styles["show"] : null}`}>
    <div onClick={handleClick} className={styles["header"]}>
        {!!isShow ? <FontAwesomeIcon icon={faChevronDown} className={styles["icon"]}/> : <FontAwesomeIcon icon={faChevronRight} className={styles["icon"]}/>}
        <p className={styles["title"]}>{title}</p>
        <p className={styles["total"]}>{totalTasksCompleted}</p>
    </div>
    <div className={styles["body"]}>{children}</div>
  </div>;
}

export default Accordion;
