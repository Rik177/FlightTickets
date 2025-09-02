import styles from './FlightCard.module.css'

import type { Flight } from '../../redux/slices';

type flightCardProps = {
    data: Flight
}

const FlightCard: React.FC<flightCardProps> = ({ data }) => { 

    const getLogoPath = () => {
        if (!data.company) return '/images/default.png';
        
        const logoName = data.company.toLowerCase().replace(/\s+/g, '-');
        return `/images/${logoName}.svg`;
    };

    const getCurrencySymbol = (currencyCode: string) => {
        const currencySymbols: Record<string, string> = {
            'RUB': '₽',
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'JPY': '¥',
            'CNY': '¥'
        };
        
        return currencySymbols[currencyCode] || currencyCode;
    };

    let ending;

    if (data.connectionAmount === 1) {
        ending = 'ка';
    } else if (data.connectionAmount >= 2 && data.connectionAmount <= 4) {
        ending = 'ки';
    } else {
        ending = 'ок';
    }

    

    return (
        <div className={styles.flightCard}>
            <section className={ styles.flightCard__header }>
                <span className={styles.flightCard__price}>{ data.price } {getCurrencySymbol(data.currency)}</span>
                <img className={styles.flightCard__logo} src={getLogoPath()} alt={ `${data.company || 'Company'} logo` } />
            </section>
            <ul className={ styles.flightCard__info }>
                <li className={ styles.flightCard__infoBlock }>
                    <h3 className={styles.flightCard__subtitle}>{ data.from } - { data.to }</h3>
                    <span className={styles.flightCard__data}>{ `${data.time.startTime} - ${data.time.endTime}` }</span>
                </li>
                <li className={ styles.flightCard__infoBlock }>
                    <h3 className={styles.flightCard__subtitle}>В пути</h3>
                    <span className={styles.flightCard__data}>{ `${Math.floor(data.duration / 60)} ч ${data.duration % 60} м` }</span>
                </li>
                <li className={ styles.flightCard__infoBlock }>
                    <h3 className={styles.flightCard__subtitle}>Пересадки</h3>
                    <span className={styles.flightCard__data}>{ data.connectionAmount !== null ? `${data.connectionAmount} пересад${ending}` : 'Без пересадок' }</span>
                </li>
            </ul>
        </div>
    )
}

export default FlightCard;