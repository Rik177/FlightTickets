import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../redux/store';

import Aside from '../Aside/Aside';
import Dropdown from '../Dropdown/Dropdown';

import styles from './Main.module.css';

import fetchFlights from '../../redux/thunks';
import FlightCard from '../FlightCard/FlightCard';

import { itemsSelectors } from '../../redux/flightsSlice';

import { setTab } from '../../redux/filtersSlice';

const Main: React.FC = () => {
    const filters = useSelector((state: RootState) => state.filters);
    const [activeTab, setActiveTab] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => itemsSelectors.selectAll({ items: state.flights }));
    const filteredItems = items.filter(flight =>
        (filters.companies.length === 0 || filters.companies.includes(flight.company)) &&
        (filters.transfers.length === 0 || filters.transfers.includes(flight.connectionAmount))
    ).sort((a, b) => {
        switch (filters.tab) {
            case 'Самый дешёвый':
                return a.price - b.price;
            case 'Самый быстрый':
                return a.duration - b.duration;
            case 'Самый оптимальный': { 
                const maxPrice = Math.max(a.price, b.price);
                const maxDuration = Math.max(a.duration, b.duration);

                const A = (a.price / maxPrice) + (a.duration / maxDuration);
                const B = (b.price / maxPrice) + (b.duration / maxDuration);

                return A - B;
            }   
            default:
                return 0;
        }
    });
    const handleLoadMore = () => {
        if (hasMore && !loading) {
            dispatch(fetchFlights());
        }
    };
    const { loading, hasMore } = useSelector(
        (state: RootState) => state.flights
    );

    const tabs = ['Самый дешёвый', 'Самый быстрый', 'Самый оптимальный'];

    useEffect(() => {
        dispatch(fetchFlights());
    }, [dispatch]);


    return (
        <div className="content">
            <div className={`container ${styles.content__container}`}>
                <Aside />
                <main className={styles.main}>
                    <section className={styles.main__tabs}>
                        <div className={styles.main__radio}>
                            {tabs.map((tab, index) => (
                                <label className={`${styles.main__tab} ${styles.tab}`} key={index}>
                                    <input
                                        className={styles.tab__input}
                                        type="radio"
                                        name="tab"
                                        checked={activeTab === index}
                                        onChange={() => {
                                            setActiveTab(index);
                                            dispatch(setTab(tabs[index]));
                                        }}
                                    />
                                    <span className={styles.tab__name}>{tab}</span>
                                </label>
                            ))}
                        </div>
                        <Dropdown />
                    </section>

                    <section className={styles.main__flights}>
                        {filteredItems.length === 0 && !loading && (
                            <p>Нет доступных билетов</p>
                        )}
                        {filteredItems.map((card) => (
                            <FlightCard data={card} key={`card-${card.id}`} />
                        ))}
                    </section>

                    {loading ? (
                        <div className={styles.main__loader}></div>
                    ) : (
                        hasMore && (
                            <button
                                className={styles.main__button}
                                onClick={handleLoadMore}
                            >
                                Загрузить ещё билеты
                            </button>
                        )
                    )}
                </main>
            </div>
        </div>
    );
};

export default Main;
