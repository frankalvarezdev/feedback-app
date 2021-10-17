import { useState } from 'react';
import Icon from 'components/utils/Icon';

const TagsInput = props => {
    const [tags, setTags] = useState(props.tags);
    const removeTags = indexToRemove => {
        const result = [...tags.filter((_, index) => index !== indexToRemove)]
        setTags(result);
        props.onSelectTag(result);
    };
    const checkExistTag = (name) => {
        return tags.find(t => t === name) === name;
    }
    const normalizeText = (s) => {
        return s.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, "") //remove diacritics
            .toLowerCase()
            .replace(/\s+/g, '-') //spaces to dashes
            .replace(/[^\w-]+/g, '') //remove non-words
            .replace(/--+/g, '-') //collapse multiple dashes
            .replace(/^-+/, '') //trim starting dash
            .replace(/-+$/, ''); //trim ending dash
    }
    const addTags = event => {
        let value = normalizeText(event.target.value);
        const check = checkExistTag(value);
        if (!check && value !== "") {
            setTags([...tags, value]);
            props.onSelectTag([...tags, value]);
            event.target.value = "";
        } else {
            event.target.value = "";
        }
    };

    const prevent = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
    }

    return (
        <div className="tags-input">
            <ul className='chips'>
                {tags.map((tag, index) => (
                    <li key={index} className="chip">
                        <span className='chip´-title'>{tag}</span>
                        <span className='chip-close'
                            onClick={() => removeTags(index)}
                        >
                            <Icon icon='cancel' />
                        </span>
                    </li>
                ))}
            </ul>
            <input
                onKeyDown={(event) => prevent(event)}
                type="text"
                className='input'
                onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                placeholder="Presione enter para agregar"
            />
        </div>
    );
};

export default TagsInput;