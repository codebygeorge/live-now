import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

class Footer extends Component {

    render() {
        return (
            <footer>
                <div className='footer'>
                    <ul className='footer-menu'>
                        <li>
                            <NavLink exact activeClassName="active" to="/how-it-works">
                                Help
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active" to="/how-it-works">
                                Privacy
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active" to="/how-it-works">
                                Terms
                            </NavLink>
                        </li>
                        <li>
                            <NavLink exact activeClassName="active" to="/how-it-works">
                                Contact LiveNow
                            </NavLink>
                        </li>
                    </ul>

                    <p className="copyright">
                        {/*<small>Design and build by <b>George Ghazaryan</b>, <b>Hayk Aleksanyan</b>, <b>Hayk Ghazaryan</b></small>*/}
                        <small>© 2020 LiveNow, Inc.</small>
                    </p>
                </div>
            </footer>
        )
    }
}

export default Footer;