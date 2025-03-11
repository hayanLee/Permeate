import HeaderNav from './components/HeaderNav';
import NavCategories from './components/NavCategories';

interface HeaderProps {
  showNavCategories?: boolean;
}

const Header = ({ showNavCategories = true }: HeaderProps) => {
  return (
    <div>
      <header className="bg-white">
        <HeaderNav />
        {showNavCategories && <NavCategories />}
      </header>
    </div>
  );
};

export default Header;
