"use client"
import React, { useEffect, useRef, useState } from 'react'
import searchIcon from '../components/search.svg'
import WeatherData from '../components/WeatherData'
import linkIcon from '../components/external-link.svg'
import axios from 'axios';
import Image from 'next/image';


const getLocationCoordinates = async (address, setCityName) => {
    try {
        const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: address,
                key: 'c4f9b095c6068fe955a80e6bbc4735e4',
            },
        });

        if (response.data.results.length > 0) {
            const { lat, lng } = response.data.results[0].geometry.location;
            setCityName(`${lat},${lng}`); // Set the latitude and longitude as the city name
        } else {
            console.log('No results found.');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

const Main = () => {
    const inputValue = useRef();
    const [cityName, setCityName] = useState("noida");
    const [error, setError] = useState(true)
    const [lang, setLang] = useState(true)
    const [myData, setMyData] = useState([])
    const [cityDetails, setCityDetails] = useState([])
    const [dataWeather, setDataWeather] = useState([])
    const [windData, setWindData] = useState([]);
    const APP_KEY = "c4f9b095c6068fe955a80e6bbc4735e4";
    useEffect(() => {
        (async _ => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${APP_KEY}&units=metric&lang=${lang ? ('en') : ('hi')}`);
            const data = await response.json();
            if (response.ok) {
                setCityDetails(data.city)
                setMyData(data.list[0].main)
                setDataWeather(data.list[0].weather[0])
                setWindData(data.list[0].wind)
                setError(true)
            } else {
                setError(false)
            }
        })();

    }, [cityName, lang])

    const onkeydownHandler = ((e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            setCityName(inputValue.current.value)
        }
    })
    const onSubmitHandler = ((e) => {
        e.preventDefault();
        const address = inputValue.current.value;
        getLocationCoordinates(address);
        setCityName(inputValue.current.value)

    })

    return (
        <div className="App">
            <div className='box'>
                <div className='cityName'>
                    {error ? (<p>{cityDetails.name}, {cityDetails.country}<a href={`https://en.wikipedia.org/wiki/${cityDetails.name}`} target="_ "><Image src={linkIcon} alt='link' /></a></p>) : (<p className='invalid'>{lang ? 'Invalid City Name' : 'अमान्य शहर का नाम'}</p>)}
                    <div className='search'>
                        <input type='text' ref={inputValue} onKeyDown={onkeydownHandler} placeholder='City Name' /><Image style={{ cursor: 'pointer' }} onClick={onSubmitHandler} src={searchIcon} alt='searchIcon' />
                    </div>
                </div>
                <WeatherData weatherData={myData} weather={dataWeather} city={cityDetails} lang={lang} windData={windData} />
                <p onClick={() => setLang(!lang)} className='translater'>{lang ? ('Hindi ?') : ('Eng ?')}</p>
            </div>
        </div>
    )
}

export default Main
