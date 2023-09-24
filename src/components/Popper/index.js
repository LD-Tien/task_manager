import styles from "./Popper.module.scss";

function Popper({children}){
    return <div className={styles["wrapper"]}>{children}</div>
}

export default Popper;