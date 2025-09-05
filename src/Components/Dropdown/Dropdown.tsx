import styles from './Dropdown.module.css';
import PointsTemplate from '../PointsTemplate/CheckboxTemplate';
import { transfers, companies } from '../Aside/aside-blocks';
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useState } from 'react';

const Dropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const filters = useSelector((state: RootState) => state.filters);

    const transfersMap = filters.transfers.map(num => {
        if (num === null) {
            return 'без пересадок';
        } else { 
            return num;
        }
})

    

    return (
        <div className={styles.dropdown}>
            <button className={ styles.dropdown__header } onClick={() => setIsOpen(a => !a)}>
                <p className={styles.dropdown__info}>{`${filters.companies.length === 0 ? 'Любая авиакомпания' : filters.companies.join(', ')}, 
                ${transfersMap.length === 0 ? 'любое кол-во пересадок' : `Пересадок: ${transfersMap.join(`, `)}` }`}</p>
                <span className={styles.dropdown__open}>Открыть настройки</span>
            </button>
            <section className={ `${styles.dropdown__menu} ${isOpen && styles.dropdown__menu_open}` }>
                <PointsTemplate data={ transfers } />
                <PointsTemplate data={ companies } />
            </section>
        </div>
    )
}

export default Dropdown;