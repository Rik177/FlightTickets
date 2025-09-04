import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch, RootState } from '../../redux/store';

import Aside from '../Aside/Aside';
import styles from './Main.module.css';

import fetchFlights from '../../redux/thunks';
import FlightCard from '../FlightCard/FlightCard';

const Main: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);

    const dispatch = useDispatch<AppDispatch>();

    const addedItems = useSelector((state: RootState) => state.flights.addedItems);
    const loading = useSelector((state: RootState) => state.flights.loading);
    const pagination = useSelector((state: RootState) => state.flights.pagination);

    const tabs = ['Самый дешёвый', 'Самый быстрый', 'Самый оптимальный'];

    useEffect(() => {
        dispatch(fetchFlights({ page: 1, limit: 3 }));
    }, [dispatch]);

    const handleLoadMore = () => {
        if (pagination) {
            dispatch(
                fetchFlights({
                    page: pagination.currentPage + 1,
                    limit: pagination.itemsPerPage,
                })
            );
        }
    };

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
                        {addedItems.length === 0 && !loading && (
                            <p>Нет доступных билетов</p>
                        )}
                        {addedItems.map((card) => (
                            <FlightCard data={card} key={`card-${card.id}`} />
                        ))}
                    </section>

                    {loading ? (
                    <div className={styles.main__loader}></div>
                    ) : (
                    pagination && addedItems.length > 0 && (
                        <button
                            className={styles.main__button}
                            onClick={handleLoadMore}
                            disabled={addedItems.length >= pagination.totalItems}
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
