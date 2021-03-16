// helpful links: https://openweathermap.org/current#zip - https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging - https://www.atlassian.com/git/tutorials/syncing/git-pull#:~:text=The%20git%20pull%20command%20is,Git%2Dbased%20collaboration%20work%20flows - http://api.openweathermap.org/data/2.5/weather?zip=30312&appid=843a80c4e38620111baea6b0af603f95

const WEATHER_KEY = config.WEATHER_API_KEY;
const UNSPLASH_KEY = config.IMAGE_KEY;

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

submit.click(function(e) {
    e.preventDefault();

    const $card = $('<div>');
    $card.addClass('card');
    const $container = $('<div>');
    $container.addClass('container')
    const $zip = $('<h3>')
    $zip.attr('id', 'zip')
    const $city = $('<h3>')
    $city.attr('id', 'city')
    const $tempH3 = $('<h3>')
    $tempH3.attr('id', 'temp-h3')
    const $span = $('<span>')
    $span.attr('id', 'temp')
    const $img = $('<img>')
    $img.attr('id', 'weather-img')
    $img.attr('src', '#')
    $zip.appendTo($container)
    $city.appendTo($container)
    $tempH3.appendTo($container)
    $span.appendTo($container)
    $img.appendTo($container)
    $container.appendTo($card)
    $card.appendTo(document.body)

    let cityName = '';


    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${input.val()}&appid=${WEATHER_KEY}&units=imperial`)
        .then(res => res.json())
        .then(data => errorHandler(data))
        .then(data => {
            $zip.html(input.val());
            $span.html(data.main.temp);
            $city.html(data.name);
            cityName = data.name;
            if (data.main.temp > 70) {
                $img.attr('src', 'appPhotos/weather_sun.jpg')
            } else if (data.main.temp > 50 && data.main.temp <= 69) {
                $img.attr('src', 'appPhotos/weather_cloudy_sun.jpg')
            } else if (data.main.temp <= 50) {
                $img.attr('src', 'appPhotos/weather_clouds.jpg')
            }

            fetch(`https://api.unsplash.com/search/photos?page=1&query=${cityName}`, {
                headers: {
                'Accept-Version': 'v1',
                'Authorization': `Client-ID ${UNSPLASH_KEY}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    let backImage = data.results[0].urls.full;
                    $(document.body).css("background-image", `url(${backImage})`);
                })

            return data;
        })
        .catch(err => {
            $zip.html(input.val());
            $span.html('0');
            $city.html(err)
    })
})