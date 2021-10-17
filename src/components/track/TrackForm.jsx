import Modal from 'react-modal';
import TextareaAutosize from 'react-textarea-autosize';
import Icon from '../utils/Icon';
import TagsInput from 'components/utils/TagsInput';
import { useState } from 'react';
import { supabase } from 'lib/supabase';
import { useForm } from "react-hook-form";


const TrackForm = ({ open, close }) => {

    const [genres, setGenres] = useState(['electronic']);

    // agrega los generos y si no hay uno agrega el por defecto
    const selectedTags = tags => {
        if (tags.length === 0) tags = ['music'];
        setGenres(tags);
    };

    // // agrega un nuevo track
    const addTrack = async (formData) => {

        // obtiene el codigo de pais del usuario
        let ip = await fetch('http://ip-api.com/json').then(r => r.json()).catch((err) => console.log(err));
        ip = typeof ip === 'undefined' ? 'NONE' : ip.countryCode;

        const user = supabase.auth.user();

        formData['genres'] = genres; // array
        formData['country'] = ip;
        formData['user_id'] = user.id;
        const { error } = await supabase
            .from('tracks')
            .insert([formData]);
        if (error) {
            console.log(error);
        } else {
            close();
        }
    }
    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <Modal
            className='track-form'
            isOpen={open}
            onRequestClose={close}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className="modal-close" onClick={close}>
                <Icon icon='cancel' />
            </div>

            <form onSubmit={handleSubmit(addTrack)}>
                <div className='grid:2 gap:sm'>
                    <div>
                        <label className='label'>Titulo</label>
                        <input type="text" className={`input ${errors.artists && 'is-danger'}`} placeholder='Mi demo' {...register('title', { required: true })} />
                        {errors.title && <span className='error-text'>Este campo es obligatorio</span>}
                    </div>
                    <div>
                        <label className='label'>Artistas</label>
                        <input type="text" className={`input ${errors.artists && 'is-danger'}`} placeholder='Artista' {...register('artists', { required: true })} />
                        {errors.artists && <span className='error-text'>Este campo es obligatorio</span>}
                    </div>
                </div>
                <div className='field margin-top'>
                    <label className='label'>Url</label>
                    <input type="text" className={`input ${errors.url && 'is-danger'}`} placeholder='SoundCloud o YouTube' {...register('url', { pattern: /(soundcloud.com|soundcloud.app|youtube.com\/watch|youtu.be)/, required: true })} />
                    {errors.url && <span className='error-text'>URL no válida</span>}
                </div>
                <div className='field'>
                    <label className='label'>Generos</label>
                    <TagsInput onSelectTag={selectedTags} tags={['electronic']} />
                </div>
                <div className="field">
                    <label className='label'>Descripción</label>
                    <TextareaAutosize className='input is-text' minRows={2} maxRows={8} placeholder='Escribe algo...' {...register('description')} />
                </div>

                <div className="field">
                    <button className='button is-primary is-fullwidth'>
                        Agregar
                    </button>
                </div>
            </form>
        </Modal>
    )
}

export default TrackForm;