const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const dataHide = document.querySelector('.middle_layer');
const curDate = document.getElementById('curDate');  
const dayElement = document.getElementById('day');   

// Function to get the current day
const getCurrentDay = () => {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let currentTime = new Date();
    return weekday[currentTime.getDay()];  
};

// Function to get the current time and date
const getCurrentTime = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    
    const now = new Date();
    const month = months[now.getMonth()];
    const date = now.getDate();
    let hours = now.getHours();
    let mins = now.getMinutes();
    let periods = "AM";

    if (hours > 11) {
        periods = "PM";
        if (hours > 12) hours -= 12;
    }
    if (mins < 10) {
        mins = "0" + mins;  // Add leading zero to minutes if < 10
    }

    return `${month.toUpperCase()} ${date} | ${hours}:${mins}${periods}`;
};

// Function to update day, date, and time
const updateDateTime = () => {
    dayElement.innerHTML = getCurrentDay();           
    curDate.innerHTML = getCurrentTime();             
};

// Call the function to update day, date, and time on page load
updateDateTime();

// Weather fetching logic
const getInfo = async (event) => {
    event.preventDefault();
    let cityVal = cityName.value;

    // Update date and time every time the user searches
    updateDateTime();

    if (cityVal === "") {
        city_name.innerText = 'Plz write the name before search';
        dataHide.classList.add('data_hide');
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&appid=d53607bdc2a4ae0062c412988c3d918d`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;

            // Condition to check sunny or cloudy
            if (tempMood == 'Clear') {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == 'Clouds') {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == 'Rain') {
                temp_status.innerHTML = "<i class='fas fa-rain' style='color: #a4bobe;'></i>";
            } else {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }

            dataHide.classList.remove('data_hide');
        } catch (error) {
            city_name.innerText = 'Plz enter correct cityname';
            dataHide.classList.add('data_hide');
        }
    }
};

submitBtn.addEventListener('click', getInfo);
