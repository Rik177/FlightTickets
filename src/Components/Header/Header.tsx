import styles from './Header.module.css';

const Header: React.FC = () => { 
    return (
        <header className={ styles.header }>
            <div className={`${styles.header__container} container`}>
                <img src="/images/logo-image.svg" alt="" className={ `${styles.header__logo} ${styles.logo}` } />
                <h1 className={ styles.header__title }>Поиск авиабилетов</h1>
            </div>
        </header>
    )
}

export default Header;