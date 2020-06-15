import React, { Component } from 'react';
import './Map.scss';
import mapboxgl from 'mapbox-gl';

const ACCESS_TOKEN = 'pk.eyJ1Ijoiam9lbC1vZS1sYWNleSIsImEiOiJja2Jnb3h5enoxN2tlMndtcmV0Zjl4YmJxIn0.xwAtV-aaryVr5CNqRs9LxQ';
const MAPBOX_STYLE = 'mapbox://styles/joel-oe-lacey/ckbgpw4dh0bvv1ipdym0olpg4';
mapboxgl.accessToken = ACCESS_TOKEN;

export default class Map extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            lng: -73.935242,
            lat: 40.730610,
            zoom: 10
        };
    }

    fetchPollingPoints = async () => {
        try {
            const settings = {
                method: "GET", headers: { "Content-Type": "application/json", 'X-App-Token': "I4HU56w9UWCUEicW4AxsHDNck" }
            };
            const response = await fetch('https://data.cityofnewyork.us/resource/utqd-4534.json', settings);
            if (!response.ok) {
                throw new Error('API error');
            }
            const pollData = await response.json();
            const pollFeatures = await this.createPollingFeatures(pollData);
            this.setState({ pollLocations: pollFeatures })
        }
        catch (e) {
            console.log(e.message);
        }
    }

    componentDidMount() {
        const map = new mapboxgl.Map({
            container: 'map',
            style: MAPBOX_STYLE,
            center: [this.state.lng, this.state.lat],
            zoom: this.state.zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }

    render() {
        return (
            <section id="map">
            </section>
        )
    }
};