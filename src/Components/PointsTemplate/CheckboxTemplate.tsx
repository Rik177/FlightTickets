import styles from './CheckboxTemplate.module.css';
import { useDispatch } from 'react-redux';
import { setCompany, setTransfer } from '../../redux/filtersSlice';

type checkboxProps = {
    data: {
        name: string;
        checkName: string;
        points: string[];
    }
}

const CheckboxTemplate: React.FC<checkboxProps> = ({ data }) => { 
    const dispatch = useDispatch();
    const handleChange = (point: string) => {
        if (data.checkName === 'companies-checkbox') {
            dispatch(setCompany(point));
        } else if (data.checkName === 'transfers-checkbox') {
            
            let value: number | null = null;
            if (point === 'Без пересадок') value = null;
            else if (point.match(/\d+/)) value = parseInt(point);
            dispatch(setTransfer(value));
        }
    };
    return (
        <div className={styles.checkBlock}>
            <h2 className={styles.checkBlock__title}>{ data.name }</h2>
            <div className={styles.checkboxes}>
                {data.points.map((point, index) => (
                    <label className={ `${styles.checkboxes__checkbox} ${styles.checkbox}`} key={`checkbox-${index}`}>
                        <input
                            className={styles.checkbox__input}
                            type='checkbox'
                            name={ data.checkName }
                            onChange={() => handleChange(point)}
                        />
                        <div className={ styles.checkbox__custom }></div>
                        <span className={styles.checkbox__name}>{ point }</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export default CheckboxTemplate;