import './Platter.css';

import { React, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-regular-svg-icons';

import plateImg from '../images/plate.png';
import forkImg from '../images/fork.png';
import knifeImg from '../images/knife.png';

function Platter(props) {
    useEffect(() => {
        if (props.locationDetails.name != null && props.locationDetails.rating != null) {
            spinPlate();

            if (document.getElementById('name').className.includes('show'))
                clearCurrent();

            setTimeout(() => {
                displayResults();
                spinPlate();
            }, 2000);
        }
    }, [props.locationDetails]);

    const spinPlate = () => {
        if (!document.getElementById('plate').className.includes('spin')) {
            document.getElementById('plate').classList.add('spin');
        } else {
            document.getElementById('plate').classList.remove('spin');
        }
    };

    const clearCurrent = () => {
        hideElement('name');

        disableStars();
        hideElement('stars');

        hideElement('click-details');
    }

    const displayResults = () => {
        document.getElementById('name').innerHTML = props.locationDetails.name;
        showElement('name');

        enableStars();
        showElement('stars');

        showElement('click-details');

        document.getElementById('maps-link').href = getLinkToPlace();
    };

    const hideElement = (elementId) => {
        document.getElementById(elementId).classList.remove('show');
        document.getElementById(elementId).classList.add('hide');
    };

    const disableStars = () => {
        disableElement('star1');
        disableElement('star2');
        disableElement('star3');
        disableElement('star4');
        disableElement('star5');
        disableElement('halfStar');
    };

    const disableElement = (elementId) => {
        document.getElementById(elementId).classList.remove('enable');
        document.getElementById(elementId).classList.add('disable');
    }

    const showElement = (elementId) => {
        document.getElementById(elementId).classList.remove('hide');
        document.getElementById(elementId).classList.add('show');
    };

    const enableStars = () => {
        let originalRating = props.locationDetails.rating;
        let roundedRating = Math.ceil(props.locationDetails.rating);

        for (let i = 0; i < roundedRating; i++) {
            if (i == roundedRating - 1) {
                if ((roundedRating - originalRating) <= .5) {
                    enableElement('halfStar');
                }
            }
            else {
                enableElement(`star${i + 1}`);
            }
        }
    };

    const enableElement = (elementId) => {
        document.getElementById(elementId).classList.remove('disable');
        document.getElementById(elementId).classList.add('enable');
    }

    const getLinkToPlace = () => {
        return `https://www.google.com/maps/search/?api=1&query=${props.locationDetails.address}&query_place_id=${props.locationDetails.place_id}`;
    };

    return (
        <div className='Platter'>
            <div className='platter-container'>
                <img className='fork' src={forkImg} draggable='false'></img>
                <img id='plate' src={plateImg} draggable='false'></img>
                <img className='knife' src={knifeImg} draggable='false'></img>
                <a id='maps-link' target='_blank'>
                    <div className='details'>
                        <p id='name' className='hide'></p>
                        <div id='stars' className='hide'>
                            <FontAwesomeIcon id='star1' className='disable' icon={faStar} />
                            <FontAwesomeIcon id='star2' className='disable' icon={faStar} />
                            <FontAwesomeIcon id='star3' className='disable' icon={faStar} />
                            <FontAwesomeIcon id='star4' className='disable' icon={faStar} />
                            <FontAwesomeIcon id='star5' className='disable' icon={faStar} />
                            <FontAwesomeIcon id='halfStar' className='disable' icon={faStarHalf} />
                        </div>
                        <p id='click-details' className='hide'>Click for details</p>
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Platter;