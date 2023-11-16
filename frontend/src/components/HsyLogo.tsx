const logo = new URL('../assets/hsy_icon.webp', import.meta.url).href;
import styles from './Components.module.css';

export const HsyLogo = () => {
  return <img className={styles.hsyLogo} src={logo} alt="HSY" />;
};
