import React, { Component } from 'react';
import './MapGL.scss';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
const Map = ReactMapboxGl({
    accessToken: "pk.eyJ1Ijoiam9lbC1vZS1sYWNleSIsImEiOiJja2Jnb3h5enoxN2tlMndtcmV0Zjl4YmJxIn0.xwAtV-aaryVr5CNqRs9LxQ"
});

export default class MapGL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -73.935242,
            lat: 40.730610,
            zoom: [10],
        };
    }

    render() {
        const MAPBOX_STYLE = 'mapbox://styles/joel-oe-lacey/ckbgpw4dh0bvv1ipdym0olpg4';
        const createPollingFeatures = this.props.pollingData.reduce((acc, poll, index) => {
                if (poll.location) {
                    acc.push(
                        <Feature
                            key={index}
                            coordinates={[poll.location.longitude, poll.location.latitude]}
                            properties={poll}
                        />)
                }
                return acc;
            }, [])

        return (
            <Map 
                className='map'
                style={MAPBOX_STYLE}
                center={[this.state.lng, this.state.lat]}
                zoom={this.state.zoom}
            >
                <Layer type="circle" id="marker" paint={{
                    'circle-color': '#ff6602',
                    'circle-stroke-width': 1,
                    'circle-stroke-color': '#003585',
                    'circle-stroke-opacity': .7
                }}
                >
                    {createPollingFeatures}
                </Layer>
            </Map>
        )
    }
};