import styles from './DefaultLayout.module.scss'
import Header from '../components/Header'
import Sidebar from './Sidebar'

function DefaultLayout({children}) {
    return <div className={styles["wrapper"]}>
        <Header/>
        <div className={styles["container"]}>
            <Sidebar/>
            <div className={styles["main"]}>{children}</div>
            <div className={styles["right-column"]}></div>
        </div>
    </div>
}

export default DefaultLayout