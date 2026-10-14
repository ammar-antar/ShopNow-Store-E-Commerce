import UtilityBar from "./UtilityBar";
import MainHeader from "./MainHeader";
import CategoryPills from "./CategoryPills";
function Header() {
  return (
    <header>
      <UtilityBar />
      <MainHeader />
      <CategoryPills />
    </header>
  );
}

export default Header;