import { useState } from 'react';
import TrackForm from 'components/track/TrackForm';
import Tracks from 'components/track/Tracks';
import Icon from 'components/utils/Icon';

const Explore = () => {
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div className="container padding-top">
            <div className='new-track' onClick={openModal}>
                <Icon icon='add_circle' />&nbsp;
                Añadir nuevo
            </div>
            <Tracks/>

            <TrackForm open={modalIsOpen} close={closeModal} />
        </div>
    )
}

export default Explore;