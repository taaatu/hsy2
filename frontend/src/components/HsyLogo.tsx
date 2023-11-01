import logo from '../assets/hsy_icon.webp';
import styles from './Components.module.css';

export const HsyLogo = () => {
  return (
    <div className={styles.hsyLogo}>
      <img style={{ maxWidth: '80%' }} src={logo} alt="HSY" />
    </div>
  );
};
