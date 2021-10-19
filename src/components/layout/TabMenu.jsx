import Icon from 'components/utils/Icon';
import { Link, NavLink } from 'react-router-dom';

const TabMenu = () => {
    return (
        <div className="tab">
            <ul className='tab-buttons'>
                <NavLink to='/' activeClassName='is-active' exact>
                    <Icon icon='library_music' className='tab-icon' />
                    <span className='tab-title'>
                        Explorar
                    </span>
                </NavLink>
                <NavLink to='/user/tracks' activeClassName='is-active' exact>
                    <Icon icon='queue_music' className='tab-icon' />
                    <span className='tab-title'>
                        Mi tracks
                    </span>
                </NavLink>
                <NavLink to='/user' activeClassName='is-active' exact>
                    <Icon icon='face' className='tab-icon' />
                    <span className='tab-title'>
                        Mi cuenta
                    </span>
                </NavLink>
            </ul>
        </div>
    )
}

export default TabMenu;