import Icon from 'components/utils/Icon';
import { Link } from 'react-router-dom';

const TabMenu = () => {
    return (
        <div className="tab">
            <ul className='tab-buttons'>
                <Link to='/'>
                    <Icon icon='library_music' className='tab-icon' />
                    <span className='tab-title'>
                        Demos
                    </span>
                </Link>
                <Link to='/account'>
                    <Icon icon='face' className='tab-icon' />
                    <span className='tab-title'>
                        Mi cuenta
                    </span>
                </Link>
            </ul>
        </div>
    )
}

export default TabMenu;