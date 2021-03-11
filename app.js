// helpful links: https://openweathermap.org/current#zip - https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging - https://www.atlassian.com/git/tutorials/syncing/git-pull#:~:text=The%20git%20pull%20command%20is,Git%2Dbased%20collaboration%20work%20flows - http://api.openweathermap.org/data/2.5/weather?zip=30312&appid=843a80c4e38620111baea6b0af603f95

const API_KEY = config.API_KEY;

var input = $('#zipcode-input');
const submit = $('#submit-btn');
const zip = $('#zip');
const temp = $('#temp');
const city = $('#city');
const weatherImg = $('#weather-img')

const errorHandler = (data) => {
    if(data.message === 'city not found') {
        throw new Error(data.message)
    } else {
        return data
    }
}

const getInfo = (data) => {
    console.log(data);
    zip.html(input.val());
    temp.html(data.main.temp);
    city.html(data.name);
    return data;
}

submit.click(function(e) {
    e.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${input.val()}&appid=${API_KEY}&units=imperial`)
        .then(res => res.json())
        .then(data => errorHandler(data))
        .then(data => getInfo(data))
        .catch(err => {
            console.log(err);
            zip.html(input.val());
            temp.html('0');
            city.html(err)
        })
})
