import React, { Component } from 'react';
import convertTemp from './utils/convertTemp';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      const { name, country } = action.payload.city;
      const { list } = action.payload;
      return {
        ...state,
        city: name,
        country,
        list,
        currentWeather: {
          condition: list[0].weather[0].description,
          temperature: convertTemp(list[0].main.temp),
          humidity: list[0].main.humidity,
          wind: list[0].wind.speed,
          icon: list[0].weather[0].icon
        },
        loading: false,
        error: ''
      };
    case 'RESET_FORM':
      return {
        ...state,
        city: '',
        country: '',
        list: '',
        currentWeather: '',
        longitude: '',
        latitude: '',
        error: '',
        loading: false
      };
    case 'ERROR':
      return {
        ...state,
        city: '',
        country: '',
        list: '',
        currentWeather: '',
        longitude: '',
        latitude: '',
        error: action.payload,
        loading: false
      };
    case 'LOADING':
      return {
        ...state,
        city: '',
        country: '',
        list: '',
        currentWeather: '',
        error: '',
        loading: true
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    city: '',
    country: '',
    list: '',
    currentWeather: '',
    longitude: '',
    latitude: '',
    error: '',
    loading: false,
    dispatch: action => this.setState(state => reducer(state, action))
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
