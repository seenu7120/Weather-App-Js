/*............... API LINK .................. */ 
const API_KEY="a6ddaf2ac6edd1ab160dd3e34f423f39";

const BASE_URL= "https://api.openweathermap.org/data/2.5/";


/*................. Get HTML Elements .................. */ 
let cityName=document.getElementById("city");
let currTime=document.getElementById("currTime");

let img = document.getElementById("current-weather-img")
let temp=document.getElementById("temp");
let currWeather=document.getElementById("currWeather");
let tempFeelLike=document.getElementById("temp-like");
let description=document.getElementById("description");
let maxTemp=document.getElementById("max-temp");

let wind=document.getElementById("wind");
let humidity=document.getElementById("humidity");
let visibility=document.getElementById("visibility");
let pressure=document.getElementById("pressure");

/*............... data Add on to the html Elements .............*/
async function dataAddOn(response){
    if(response.status==200){
        const data=await response.json();
        console.log(data);

        cityName.innerText=`Current Weather in ${data.name},${data.sys.country}`;
        // let date = new Date((data.sys.sunrise +data.timezone) * 1000).toString();
        // currTime.innerText=date.slice(16);
        // currTime.innerText=new Date().toLocaleString().replace(',',' |');

        img.src=` http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        temp.innerText=`${(parseFloat(data.main.temp)-273.15).toFixed(2)}°C`;
        currWeather.innerText=data.weather[0].main;           
        tempFeelLike.innerText=`Feels like ${(parseFloat(data.main.feels_like)-273.15).toFixed(2)}°C`;
        
        description.innerText=`The skies will be ${data.weather[0].description}.`;   
        maxTemp.innerText=`The high temperature will be ${(parseFloat(data.main.temp_max)-273.15).toFixed(2)}°C.`;

        wind.innerText=`${data.wind.speed}km/h`;
        humidity.innerText=`${data.main.humidity}%`;
        visibility.innerText=`${data.visibility}km`;
        pressure.innerText=`${data.main.pressure}mb`;
    }   
}




/*...............Get Current Location Weather Details .................. */ 
let lat,lon;
function getCurrentLocationWeather(){
    navigator.geolocation.getCurrentPosition(async (result)=>{
        const currLocation=result.coords;
        lat=currLocation.latitude;
        lon=currLocation.longitude;

        console.log({"lat>>>>":lat,"lan":lon});

        const response= await fetch(`${BASE_URL}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
        console.log(response);
        
        dataAddOn(response);      
    });
}

/*.................. Search Weather By City Name .............  */
async function searchByCityName(Element){
    let cityName=document.getElementById("search-input").value.trim();
    console.log("input>>>>>>" + cityName);
    if(cityName===""){
        return alert("Enter city name");
    }

    await fetch(`${BASE_URL}weather?q=${cityName}&appid=${API_KEY}`)
    .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return dataAddOn(response);
        } else {
          throw Error(response.statusText);
        }
      })
    .catch((error) => {
        console.log(error);
        alert('Error: city name not found');
      });
}


/*******....................... Serach by ZIP code(Coming Soon)  .................*********/


