import Image from 'next/image';
import TddLogo from '../../../public/icons/TDD-logo-form.svg';
import settingIcon from '../../../public/icons/settings_suggest.svg';

const NavBar = () => {
  return (
    <div>
      {/* fake navbar  */}
      <nav className=" bg-secondaryBG">
        <div className="max-w-7xl mx-auto px-4 flex justify-between py-4">
          <Image src={TddLogo} alt="TDD logo" priority />
          <Image src={settingIcon} alt="setting icon" width={32} height={32} />
        </div>
      </nav>
      {/*end fake navbar  */}
    </div>
  );
};

export default NavBar;
