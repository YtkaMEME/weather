import conditionImg from "./conditionImg.json" assert { type: 'json' };

async function getWeather(apiKey, city){
    let response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,{
        referrerPolicy: "no-referrer-when-downgrade"
    });

    if(!response.ok){
        return;
    }

    let weatherObj = await response.json();

    let temp = Math.round(Number(weatherObj.current.temp_c));
    temp = temp < 0? temp: '+' + temp;

    let wind = Math.round(Number(weatherObj.current.wind_kph)/3.6);

    let humidity = Math.round(Number(weatherObj.current.humidity))

    let condition = weatherObj.current.condition.text;

    let isDay = weatherObj.current.is_day;

    return  [temp, wind, humidity, condition, isDay];
}

function closeWeatherCard(event){

    if(event.ctrlKey){
        let weatherCards = document.querySelectorAll('.weatherCard');

        weatherCards.forEach((item)=>item.remove());

        return;
    }

    let weatherCard = event.target.parentNode;

    weatherCard.remove();
}

function selectImg(condition, isDay){
    let src = '';
    let img = conditionImg[condition];

    if(isDay){
        src = `./icons/day/${img}`
    }else {
        src = `./icons/nigth/${img}`
    }

    return src;
}

async function createWeatherCard (city){
    let apiKey = '9a42fb754a67409e80962042231110';

    let [temp, wind, humidity, condition, isDay] = await getWeather(apiKey, city);

    if(!temp){
        return;
    }

    let weatherCard = document.createElement('div');
    weatherCard.classList.add('weatherCard');

    let xImg = document.createElement('img');
    xImg.src = './icons/X.svg';
    xImg.alt = 'x';
    xImg.classList.add('x');

    weatherCard.append(xImg);

    xImg.addEventListener('click', closeWeatherCard);

    let iconsCard = document.createElement('div');
    iconsCard.classList.add('iconsCard');

    let degree = document.createElement('h3');
    degree.classList.add('degree');
    degree.textContent = temp;

    let img = document.createElement('img');
    img.src = selectImg(condition, isDay);
    img.alt = 'degreeIcon';
    img.classList.add('degreeIcon');

    iconsCard.append(degree);
    iconsCard.append(img);
    weatherCard.append(iconsCard);

    let info = document.createElement('div');
    info.classList.add('info');

    let cityH3 = document.createElement('h3');
    cityH3.id = 'city';
    cityH3.textContent = city;

    let spanWind = document.createElement('span');
    spanWind.id = 'wind';
    spanWind.textContent = `Скорость ветра: ${wind} м/с`;

    let spanHumidity = document.createElement('span');
    spanHumidity.id = 'damp';
    spanHumidity.textContent = `Влажность: ${humidity} %`;

    info.append(cityH3);
    info.append(spanWind);
    info.append(spanHumidity);
    weatherCard.append(info);

    document.body.append(weatherCard);
}

function searchHandler (event){
    event.preventDefault();

    let city = event.target.querySelector('input').value;
    form.querySelector('input').value = '';

    createWeatherCard(city);
}

let form = document.querySelector('.search');
form.addEventListener('submit', searchHandler);




