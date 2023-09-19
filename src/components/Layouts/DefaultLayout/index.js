import styles from './DefaultLayout.module.scss'
import Header from '../components/Header'
import Sidebar from './Sidebar'
import Details from '../components/Details'

function DefaultLayout({children}) {
    return <div className={styles["wrapper"]}>
        <Header/>
        <div className={styles["content"]}>
            <Sidebar/>
            <div className={styles["main-content"]}>{children}</div>
            
        </div>
    </div>
}

export default DefaultLayout