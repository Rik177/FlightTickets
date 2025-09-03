import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from '../../redux/store';
import { useAppSelector } from '../../redux/store';
import { loadMore } from '../../redux/slices';

import Aside from '../Aside/Aside';
import styles from './Main.module.css'

import store from '../../redux/store';
import fetchFlights from '../../redux/thunks';
import FlightCard from '../FlightCard/FlightCard';


const Main: React.FC = () => { 
    type RootState = ReturnType<typeof store.getState>;

    const [activeTab, setActiveTab] = useState(0);
    const state = useSelector((state: RootState) => state);

    const tabs = [
        'Самый дешёвый',
        'Самый быстрый',
        'Самый оптимальный'
    ]

    const { visibleItems } = useAppSelector((state) => state.flights);
    

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => { 
        dispatch(fetchFlights());
    }, [dispatch])

    const handleLoadMore = () => {
        dispatch(loadMore());
    };

    console.log('Initial Redux state:', state);

    const flightData = state.flights.items;

    return (
        <div className="content">
            <div className={ `container ${styles.content__container}` }>
                <Aside />
                <main className={ styles.main }>
                    <section className={styles.main__tabs}>
                        <div className={styles.main__radio}>
                            {tabs.map((tab, index) => (
                                <label className={`${styles.main__tab} ${styles.tab}`} key={index}>
                                    
                                    <input
                                        className={styles.tab__input}
                                        type="radio"
                                        name='tab'
                                        checked={activeTab === index}
                                        onChange={() => setActiveTab(index)}
                                    />

                                    <span className={styles.tab__name}>{ tab }</span>
                                </label>
                            )) }
                        </div>
                    </section>
                    <section className={styles.main__flights}>
                        {flightData.slice(0, visibleItems).map((card) => (
                            <FlightCard data={card} key={ `card-${card.id}` } />
                        )) }
                    </section>
                    
                    {state.loading ? (
                        <div className={ styles.main__loader }></div>
                    ) : (
                        <button
                            className={styles.main__button}
                            onClick={handleLoadMore}
                        >
                            Загрузить ещё билеты
                        </button>
                    )}
                </main>
            </div>
        </div>
        
    )
}

export default Main;