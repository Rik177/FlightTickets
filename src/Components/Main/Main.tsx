import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../redux/store';

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


    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => { 
        dispatch(fetchFlights())

        
    }, [dispatch])

    console.log('Initial Redux state:', state);

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
                        {state.flights.map((card) => (
                            <FlightCard data={card} key={ `card-${card.id}` } />
                        )) }
                    </section>
                    <button className={ styles.main__button }></button>
                </main>
            </div>
        </div>
        
    )
}

export default Main;