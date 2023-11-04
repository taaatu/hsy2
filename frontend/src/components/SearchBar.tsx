import { FaSearch } from 'react-icons/fa';
import styles from './Components.module.css';

type Props = {
  placeholder?: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBar = ({ placeholder, handleSearch }: Props) => (
  <div style={{ position: 'relative', width: 'fit-content' }}>
    <FaSearch className={styles.searchIcon} />
    <input
      className="search-bar line"
      placeholder={placeholder}
      onChange={handleSearch}
    />
  </div>
);
