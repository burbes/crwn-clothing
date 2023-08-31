import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';

const Navigation = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className="logo-container" to='/'>
                    <CrwnLogo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className='nav-link' to='/shop'>SHOP</Link>
                </div>
            </div>
            <Outlet /> {/* <--- This is where the child routes will render */}
        </Fragment>

    );
};

export default Navigation;