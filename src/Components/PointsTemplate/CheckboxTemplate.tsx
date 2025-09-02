import styles from './PointsTemplate.module.css';

type checkboxProps = {
    data: {
        name: string;
        checkName: string;
        points: string[];
    }
}

const CheckboxTemplate: React.FC<checkboxProps> = ({ data }) => { 
    return (
        <div className={styles.checkBlock}>
            <h2 className={styles.checkBlock__title}>{ data.name }</h2>
            <div className={styles.checkboxes}>
                {data.points.map((point, index) => (
                    <label className={ `${styles.checkboxes__checkbox} ${styles.checkbox}`} key={`checkbox-${index}`}>
                        <input className={styles.checkbox__input} type='checkbox' name={ data.checkName } />

                        <div className={ styles.checkbox__custom }></div>
                        <span className={styles.checkbox__name}>{ point }</span>
                    </label>
                )
                )}
            </div>
        </div>
        
    )
}

export default CheckboxTemplate;