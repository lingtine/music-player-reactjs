
import styles from './Control.module.scss'

function Control(audio) {
    return (<div className={styles.control}>
    <div className={[styles.btn,"btn-repeat"]}>
      <i className="fas fa-repeat"></i>
    </div>
    <div className={[styles.btn,"btn-prev"]}>
      <i className="fas fa-step-backward"></i>
    </div>
    <div className={[styles.btn,"btn-toggle-play"]}>
      <i className="fas fa-pause icon-pause"></i>
      <i className="fas fa-play icon-play"></i>
    </div>
    <div className={[styles.btn,"btn-next"]}>
      <i className="fas fa-step-forward"></i>
    </div>
    <div className={[styles.btn,"btn-random"]}>
      <i className="fas fa-random"></i>
      
    </div>
  </div>)
}

export default Control