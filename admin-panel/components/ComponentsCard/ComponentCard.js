
import styles from './ComponentsCard.module.css';
export default function ComponentCard({ children }) {
    return (
        <div className={styles.card}>
            <div className={styles.cardBody}>
                {children}
            </div>
        </div>
    )
}