import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
// import mealsImage from '../../assets/meals.jpg';
import perfumeImage from '../../assets/banner.jpeg';
import logo from '../../assets/LogoTrans.png';
import classes from './Header.module.css';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <img className={classes.logo} src={logo} alt="" />
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={perfumeImage} alt='A slide of very beautiful perfumes!' />
      </div>
    </Fragment>
  );
};

export default Header;
