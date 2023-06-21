import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "./assets/mainBg.jpg";
import { DateTime, Duration } from "luxon";


function App() {
 

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false)
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=31d6b4ac48ad3726ce3b19bebfb193c5`;

  const searchLocation = (e) => {
    setLoading(true)
    if (e.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setLoading(false)
      })
      setLocation('')
    }
  };

  

  // const formatToLocalTime = (secs,zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>{
 
  // return DateTime.fromSeconds(secs).setZone(zone).toFormat(format)
  // }

  const formatToLocalTime = (dt,timezone) => {
    const currentDateTime = DateTime.fromMillis(dt * 1000).plus(
      Duration.fromObject({ seconds: timezone })
    );
    const formattedDate = currentDateTime.toFormat("EEEE, dd LLL yyyy");
    const formattedTime = currentDateTime.toFormat("hh:mm a");

    const currentTimeString = `Local time: ${formattedTime}`;
    const finalString = `${formattedDate} | ${currentTimeString}`;

    console.log(finalString);
    return finalString

  };

  

  return (
    <div
      className="app w-full h-screen bg-black bg-opacity-40 text-white bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="search text-center p-4 bg-gray-400 w-3/4 md:w-3/5 mx-auto mt-8 text-black rounded-lg">
        <p className="font-extrabold text-xl">WEATHER APP</p>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Enter location"
          type="text"
          className="p-3 my-6 text-white text-lg rounded-lg bg-black placeholder:text-white w-3/4"
        />
      </div>

      {loading ? (
        <p> Loading..... </p>
      ) : (
        <div className="container  h-4/6 w-3/4 md:w-3/5 mx-auto bg-gray-400 mt-4 mb-2 rounded-lg flex flex-col items-center justify-center">
          <div className="time-date">
            {data.name != undefined && (
              <p className="text-center my-7 font-bold text-xl text-black">
                {formatToLocalTime(data.dt, data.timezone)}
              </p>
            )}
          </div>
          <div className=" mx-auto text-center my-8">
            <div className="font-extrabold text-3xl">
              <p>{data.name}</p>
            </div>
            <div className="font-bold text-3xl">
              {data.main ? <h1>{data.main.temp.toFixed()}</h1> : null}
            </div>
            <div className="font-semibold text-3xl">
              {data.weather ? <h1>{data.weather[0].main}</h1> : null}
            </div>
          </div>

          {data.name != undefined && (
            <div className="flex justify-evenly text-center w-3/4 p-7 rounded-md bg-black">
              <div className="font-semibold text-lg m-2">
                {data.main ? <p>{data.main.feels_like.toFixed()}</p> : null}
                <p>Feels like</p>
              </div>
              <div className="font-semibold text-lg m-2">
                {data.main ? <p>{data.main.humidity}</p> : null}
                <p>Humidity</p>
              </div>
              <div className="font-semibold text-lg m-2">
                {data.wind ? <p>{data.wind.speed.toFixed()}</p> : null}
                <p>Wind speed</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
