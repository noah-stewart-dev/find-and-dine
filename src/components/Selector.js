import './Selector.css';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

function Selector(props) {
    const [selectedValue, setSelectedValue] = useState();
    const [inactiveButtons, setInactiveButtons] = useState();

    useEffect(() => {
        props.selectedValue(selectedValue);

        if (selectedValue == props.value1) {
            setInactiveButtons([`radio${props.groupIdIndex + 2}`, `radio${props.groupIdIndex + 3}`]);
            setActive(`radio${props.groupIdIndex + 1}`);
        } else if (selectedValue == props.value2) {
            setInactiveButtons([`radio${props.groupIdIndex + 1}`, `radio${props.groupIdIndex + 3}`]);
            setActive(`radio${props.groupIdIndex + 2}`);
        } else if (selectedValue == props.value3) {
            setInactiveButtons([`radio${props.groupIdIndex + 1}`, `radio${props.groupIdIndex + 2}`]);
            setActive(`radio${props.groupIdIndex + 3}`);
        }

    }, [selectedValue]);

    useEffect(() => {
        if (inactiveButtons != undefined) {
            let inactiveButton1 = document.getElementById(inactiveButtons[0]);
            let inactiveButton2 = document.getElementById(inactiveButtons[1]);

            if (inactiveButton1.classList.contains('active')) {
                inactiveButton1.classList.remove('active');
                inactiveButton1.classList.add('inactive');
            }

            if (inactiveButton2.classList.contains('active')) {
                inactiveButton2.classList.remove('active');
                inactiveButton2.classList.add('inactive');
            }
        }

    }, [inactiveButtons]);

    const setActive = (elementId) => {
        document.getElementById(elementId).classList.remove('inactive');
        document.getElementById(elementId).classList.add('active');
    };

    return (
        <div className='Selector'>
            <div className='selector-container'>
                <img className='selector-image' draggable='false' src={props.img}></img>
                <div className='radio-group'>
                    <FontAwesomeIcon id={`radio${props.groupIdIndex + 1}`} className='inactive' icon={faCircle} onClick={() => setSelectedValue(props.value1)} />
                    <FontAwesomeIcon id={`radio${props.groupIdIndex + 2}`} className='inactive' icon={faCircle} onClick={() => setSelectedValue(props.value2)} />
                    <FontAwesomeIcon id={`radio${props.groupIdIndex + 3}`} className='inactive' icon={faCircle} onClick={() => setSelectedValue(props.value3)} />
                </div>
            </div>
        </div>
    );
}

export default Selector;