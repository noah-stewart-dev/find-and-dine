import './FindButton.css';

import React from 'react';
import axios from 'axios';

function FindButton(props) {
    const findFood = () => {
        if (optionsAreValid()) {
            props.setPlateSpinning(true);
            getLocation();
            addCount();
        }
        else {
            alert('Please select a price and distance option.');
        }
    };

    const optionsAreValid = () => {
        return props.selectedPrice != undefined && props.selectedDistance != undefined;
    };

    const getRestaurant = (location) => {
        axios
            .get('/.netlify/functions/findFood', {
                params: {
                    distance: props.selectedDistance,
                    price: props.selectedPrice,
                    location: location
                }
            })
            .then((response) => {
                let locationDetails = {
                    name: response.data.place.name,
                    rating: response.data.place.rating,
                    address: response.data.place.formatted_address,
                    place_id: response.data.place.place_id
                };
                props.locationDetails(locationDetails);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(function (position) {
            let location = `${position.coords.latitude}, ${position.coords.longitude}`;
            getRestaurant(location);
        });
    };


    const addCount = () => {
        axios.post('/.netlify/functions/addCount')
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className='FindButton'>
            <div className='button-container'>
                <div className='findBtn' onClick={findFood}>
                    <p>Find Food</p>
                </div>
            </div>
        </div>
    );
}

export default FindButton;