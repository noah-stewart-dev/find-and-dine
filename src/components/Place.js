import React from 'react';

class Place extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Place">
                <p>{this.props.name}</p>
                <p>{this.props.address}</p>
                <p>{this.props.rating}</p>
                <p>{this.props.totalRatings}</p>
            </div>
        );
    }
}

export default Place;