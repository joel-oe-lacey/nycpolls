import React, { Component } from 'react';
import './App.scss';
import Map from '../MapGL/MapGL';


export default class App extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      pollLocations: []
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
      this.setState({ pollLocations: pollData })
    }
    catch (e) {
      console.log(e.message);
    }
  }

  componentDidMount() {
    this.fetchPollingPoints()
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          <h1>Democracy NYC</h1>
          <h2>Find your nearest polling location</h2>
        </div>
        <Map pollingData={this.state.pollLocations} />
        <h3 className='footer'>Polling locations sourced live from NYC's SODA API</h3>
      </div>
    );
  } 
}