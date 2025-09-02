import styles from './Aside.module.css';
import PointsTemplate from '../PointsTemplate/CheckboxTemplate';

const Aside: React.FC = () => { 
    const transfers = {
        name: 'Количество пересадок',
        checkName: 'transfers-checkbox',
        points: [
            'Без пересадок',
            '1 пересадка',
            '2 пересадки',
            '3 пересадки'
        ]
    }
    const companies = {
        name: 'Компании',
        checkName: 'companies-checkbox',
        points: [
            'Победа',
            'Red Wings',
            'S7 Airlines'
        ]
    }


    return (
        <aside className={ styles.aside }>
            <PointsTemplate data={ transfers } />
            <PointsTemplate data={ companies } />
        </aside>
    )
}

export default Aside;