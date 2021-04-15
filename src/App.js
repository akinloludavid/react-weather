
import React, {useState} from 'react';


const api ={
  key: 'd312a6d93fc812e9ac62f80524c2590b',
  url: 'https://api.openweathermap.org/data/2.5/'

}
const dateBuilder = d =>{
  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep","Oct", "Nov", "Dec"]

  let month = months[d.getMonth()]
  let day = days[d.getDay()]
  let date = d.getDate()

  return `${day} ${date} ${month} ${d.getFullYear()}`

}
function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})

  const search = (evt) =>{
    if (evt.key === "Enter"){
      fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
      })
    }
  }
  
  return (
    <div className = { (typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'
    } >
      <main>
        <div className = "search-box">
          <input type = "text" className = "search-city" 
          placeholder="Search..."
          onChange ={e => setQuery(e.target.value)}
          value = {query}
          onKeyPress = {search}
          />
        </div> 
      {typeof weather.main != "undefined"?(
      <div>
        <div className ="location-box">
          <div className = "location">{weather.name}, {weather.sys.country}</div>
          <div className = "current-date">{dateBuilder(new Date())}</div>
        </div>  
        <div className = "weather-box">
          <div className = "temp">{weather.main.temp}<sup>o</sup>C</div>
          <div className = "weather">{weather.wind.speed}m/s</div>
          <div className = "weather">{weather.weather[0].main}</div>
        </div> 
      </div>  
      ): ('')
      }
      </main>
    </div>
  );
}

export default App;
