import typeInfo from "./conditionImg.json" assert { type: 'json' };

async function getWeather(apiKey, city){
    let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);

    
    if(!response.ok){
        return [0, 0, 0, 0, 0];
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

function select(condition, isDay){
    let src = '';
    let type = typeInfo[condition];

    if(isDay){
        src = `./icons/day/${type[0]}`
    }else {
        src = `./icons/nigth/${type[0]}`
    }

    return [src, type[1]];
}

async function createWeatherCard (city){
    let apiKey = '9a42fb754a67409e80962042231110';

    let [temp, wind, humidity, condition, isDay] = await getWeather(apiKey, city);

    let weatherCard = document.createElement('div');
    weatherCard.classList.add('weatherCard');

    let selectType =[];

    if(!temp){
        selectType = ['./icons/ERROR.svg']
        weatherCard.classList.add(`rainy`)
    }else{
        selectType = select(condition, isDay);
        weatherCard.classList.add(`${selectType[1]}`);
    }

    let xImg = document.createElement('img');
    xImg.src = './icons/X.svg';
    xImg.alt = 'x';
    xImg.classList.add('x');

    weatherCard.append(xImg);

    let backgroundImg = document.createElement('img');
    backgroundImg.src = selectType[0];
    backgroundImg.alt = 'backgroundImg';
    backgroundImg.classList.add('background');

    weatherCard.append(backgroundImg);

    xImg.addEventListener('click', closeWeatherCard);

    let cityH3 = document.createElement('h3');
    cityH3.id = 'city';
    cityH3.classList.add('city');
    cityH3.textContent = !temp ? 'ERROR' : city;

    weatherCard.append(cityH3);

    let degree = document.createElement('h3');
    degree.classList.add('degree');
    degree.textContent = temp;

    let img = document.createElement('img');

    img.src = selectType[0];

    img.alt = 'degreeIcon';
    img.classList.add('degreeIcon');

    let info = document.createElement('div');
    info.classList.add('info');

    let about = document.createElement('div');
    about.classList.add('about');

    let divWind = document.createElement('div');
    divWind.classList.add('wind');
    divWind.textContent = 'Ветер: ';

    let spanWind = document.createElement('span');
    spanWind.id = 'wind';
    spanWind.textContent = `${wind} м/с`;

    divWind.append(spanWind);

    let divDamp = document.createElement('div');
    divDamp.classList.add('damp');
    divDamp.textContent = 'Влажность: ';

    let spanDamp = document.createElement('span');
    spanDamp.id = 'damp';
    spanDamp.textContent = `${humidity} %`;

    divDamp.append(spanDamp);

    let divPressure = document.createElement('div');
    divPressure.classList.add('pressure');
    divPressure.textContent = 'Давление: ';

    let spanPressure = document.createElement('span');
    spanPressure.id = 'pressure';
    spanPressure.textContent = `${humidity} %`;

    divPressure.append(spanPressure);

    about.append(divWind);
    about.append(divDamp);
    about.append(divPressure);

    info.append(degree);
    info.append(about);
    info.append(img);

    weatherCard.append(info);

    document.body.querySelector('#main').append(weatherCard);
}

function searchHandler (event){
    event.preventDefault();

    let city = event.target.querySelector('input').value;
    form.querySelector('input').value = '';

    createWeatherCard(city);
}

let form = document.querySelector('.search');
form.addEventListener('submit', searchHandler);




