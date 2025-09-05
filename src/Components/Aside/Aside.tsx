import styles from './Aside.module.css';
import PointsTemplate from '../PointsTemplate/CheckboxTemplate';
import { transfers, companies } from './aside-blocks';

const Aside: React.FC = () => { 
    


    return (
        <aside className={ styles.aside }>
            <PointsTemplate data={ transfers } />
            <PointsTemplate data={ companies } />
        </aside>
    )
}


export default Aside;
