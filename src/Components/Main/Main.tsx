import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../redux/store';

import Aside from '../Aside/Aside';
import styles from './Main.module.css';

import fetchFlights from '../../redux/thunks';
import FlightCard from '../FlightCard/FlightCard';

import { itemsSelectors } from '../../redux/flightsSlice';

const Main: React.FC = () => {
    const filters = useSelector((state: RootState) => state.filters);
    const [activeTab, setActiveTab] = useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const items = useSelector((state: RootState) => itemsSelectors.selectAll({ items: state.flights }));
    // Фильтрация билетов по фильтрам из Redux
    const filteredItems = items.filter(flight =>
        (filters.companies.length === 0 || filters.companies.includes(flight.company)) &&
        (filters.transfers.length === 0 || filters.transfers.includes(flight.connectionAmount))
    );
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
                                        onChange={() => setActiveTab(index)}
                                    />
                                    <span className={styles.tab__name}>{tab}</span>
                                </label>
                            ))}
                        </div>
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
