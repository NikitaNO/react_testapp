import React, { Component } from 'react'
import request  from 'superagent'
import classNames from 'classnames'

const kelvins = 273.15

export default class Weather extends Component {
  constructor (props) {
    super(props)
    this.state = {
      city: 'Taipei',
      country: 'TW',
      temp_max: 0,
      temp_min: 0,
      humidity: 0,
      showError: false,
      showSpinner: false,
      weatherLabel: 'N/A',
      weatherIconClass: 'na',
      weatherDescription: 'N/A'
    }
  }

  componentWillMount() {
    this.doSearch()
  }

  handleCityChange = event => {
    this.setState({city: event.target.value})
  }

  handleCountryChange = event => {
    this.setState({country: event.target.value})
  }

  doSearch = () => {
    const { city, country } = this.state
    this.setState({showError: false, showSpinner: true})
    request
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=24b04f1e013fb5907d9896923ee99227`)
      .accept('application/json')
      .then(({ body }) => {
        const weatherObj = {}
        if (body.weather.length) {
          const weatherType = body.weather[0].main.toLowerCase()
          weatherObj.weatherDescription = body.weather[0].description
          weatherObj.weatherLabel = body.weather[0].main
          if (weatherType.includes('cloud')) weatherObj.weatherIconClass = 'cloud'
          else if (weatherType.includes('rain')) weatherObj.weatherIconClass = 'rain'
          else if (weatherType.includes('clear')) weatherObj.weatherIconClass = 'clear'
          else weatherObj.weatherIconClass = 'na'
        }
        this.setState({...body.main, ...weatherObj, showSpinner: false})
      })
      .catch(err => {
        this.setState({showError: true, showSpinner: false})
      })
  }

  render () {
    const { city, country, temp_min, temp_max, humidity,
      weatherLabel, weatherIconClass, weatherDescription, showSpinner, showError } = this.state

    return (
      !showSpinner
        ? <div className="wrap__content">
            <span className="wrap__content-title">Today's Weather</span>
            <div className="wrap__content-weather">
              {
                showError &&
                <div className="wrap__error">
                  <p><span>&#9746;</span> Not found city</p>
                </div>
              }
              <div className="wrap__content-weather-selects">
                <form action="#">
                  <label htmlFor="city">
                    City:
                    <input type="text" id="city" value={city} onChange={this.handleCityChange}/>
                  </label>
                  <label htmlFor="country">
                    Country:
                    <input type="text" id="country" value={country}  onChange={this.handleCountryChange}/>
                  </label>
                  <button onClick={this.doSearch}>
                    Search
                  </button>
                </form>
              </div>
              <div className="wrap__content-weather-info weather">
                <span className={classNames('weather__img', weatherIconClass)} />
                <div className="weather__info">
                  <h3>{weatherLabel}</h3>
                  <span>{weatherDescription}</span>
                </div>
                <div className="weather__temp">
                  <span>Temperature:</span> {temp_min - kelvins}&#8451; ~ {temp_max - kelvins}&#8451;
                </div>
                <div className="weather__him">
                  <span>Humidity:</span> {humidity}%
                </div>
              </div>
            </div>
          </div>
        : <div className="wrap__content wrap__content-spinner">
            <img src={require('../img/loading_spinner.gif')} />
          </div>
    )
  }
}