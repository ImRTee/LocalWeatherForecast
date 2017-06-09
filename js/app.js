/**
 * Created by ImRTee on 8/06/2017.
 */
$(document).ready(function(){
    let APIkey = "e348e4664e8460c02be4aa66a09f704e";
    let lat,lng;
    let clickMe;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
           lat = position.coords.latitude;
           lng = position.coords.longitude;
            $.ajax({
                url: `https://api.darksky.net/forecast/${APIkey}/${lat},${lng}?exclude=flags,alert,daily,hourly,minutely`,
                dataType: 'jsonp',
                success: function(response){
                    displayWeather(response);
                    $('h1').addClass('flip');
                    $('#icon').addClass('shake');
                    $('.moreInfoSection').addClass('swing');
                },
                type: 'GET',
                error: function(error){
                    alert('Sorry, there is a problem with getting the weather at your location!')
                }
            });
            $.ajax({
                url: `https://search.mapzen.com/v1/reverse?point.lat=${lat}&point.lon=${lng}&api_key=mapzen-DKiexRM`,
                dataType: 'jsonp',
                success: function(response){
                    let suburn = response.features[0].properties.locality;
                    let country = response.features[0].properties.country;
                    $("#userLocation").text(`${suburn},${country}`);
                },
                type: 'GET',
                error: function(error){
                    alert('Error: ',error)
                }
        });
        });

        //Animate the button;

        clickMe = setInterval(function(){
            $('button.animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $('button.animated').removeClass("bounce")
            });
            $('button.animated').addClass("bounce");

        },3000)
    } else{
        alert("Sorry your browser doesn't allow the app to know your location");
    };

    $('button').click(function(){
        clearInterval(clickMe);
       if ($("#units").html() == `${unescape('%B0')}F`){
           $('#units').text(`${unescape('%B0')}C`);
           let tempInF = Number($('#temp').text());
           let tempInC = Math.round((tempInF - 32) *(5/9));
           $('#temp').text(tempInC);
       } else{
           $('#units').text(`${unescape('%B0')}F`);
           let tempInC = Number($('#temp').text());
           let tempInF = Math.round(tempInC *(9/5) + 32) ;
           $('#temp').text(tempInF);

       }
    });
    function displayWeather(response){
        console.log(response);
        let currentTemp = response.currently.temperature;
        let icon = response.currently.icon;
        let summary =response.currently.summary;
        let humidity = response.currently.humidity;
        let windspeed = response.currently.windSpeed;
        let chanceOfRain = response.currently.precipProbability;
        console.log(windspeed);
        $("#temp").text(`${Math.round(Number(currentTemp))}`);
        $("#summary").text(`${summary}`);
        $("#humidity").text(`${Math.round(Number(humidity)* 100,1) }% `);
        $("#windspeed").text(`${windspeed} mi/h`);
        $("#chanceOfRain").text(`${Math.round(Number(chanceOfRain)*100,1)}%`);
        $('#units').text(`${unescape('%B0')}F`);
        displayBackgroundandIcon(icon);
    }
    function displayBackgroundandIcon(icon){
        switch(icon) {


            case 'clear-day':
                http://hq-wallpapers.ru/wallpapers/12/hq-wallpapers_ru_nature_58561_1920x1200.jpg
                $('.wrap').css('background-image',"url('http://hq-wallpapers.ru/wallpapers/12/hq-wallpapers_ru_nature_58561_1920x1200.jpg')");
                $('#icon').css('background',"url('http://a5.mzstatic.com/us/r30/Purple3/v4/91/f1/c8/91f1c8e4-0219-f5eb-9b3a-4bc5ff5d02d8/icon175x175.png')");
                break;
            case 'clear-night':
                $('.wrap').css('background-image',"url('http://bgwall.net/wp-content/uploads/2014/09/clear-night-sky-in-the-desert-wallpaper.jpg ')");
                $('#icon').css('background-image',"url('http://static.appstore.vn/i/uploads/thumbnails/092012/mzl.kxatczun.175x175-75.jpg')");
                break;
            case 'rain':
                $('.wrap').css("background-image","url('https://i.ytimg.com/vi/E7vmWCgB5uQ/maxresdefault.jpg')");
                $('#icon').css("background-image","url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAbbJ_7F_XXlyT1GtR_yeVoq_91VZpt750RY_ihFjBdR78NWfu')");
                break;
            case 'snow':
                $('.wrap').css('background-image',"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjPmW1CRk5njVx2511wyOhWZgscxp-8kh2GT5UMiSeczvAPodo ')");
                $('#icon').css('background-image',"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTckGRbUsyeDRlHqvZcSnpWc8bm-yPw4WnEZTUFXPPXGWAXhMnFZw')");
                break;
            case 'sleet':
                $('.wrap').css('background-image',"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZw71XRMnmy-cr5nT-DLtyymRTfe7e2HnB93kMsiWBA_KW-Xme')");
                $('#icon').css('background-image',"url('https://s2.mzstatic.com/us/r1000/095/Purple/v4/39/9a/0e/399a0e9b-bb3f-a7b7-b716-bd8ff36f3ec7/mzl.nkwlabrs.175x175-75.png')");
                break;
            case 'wind':
                $('.wrap').css('background-image',"url('http://pre00.deviantart.net/5503/th/pre/f/2016/089/9/9/windy_day_at_the_beach_flooded_premade_background_by_annamae22-d9wy3u5.jpg')");
                $('#icon').css('background-image',"url('http://bakersintegrity.com/wp-content/uploads/2013/11/wind-icon.jpg')");
                break;
            case 'fog':
                $('.wrap').css('background-image',"url(' http://1.bp.blogspot.com/_Fk0XU8nZiPE/TSEElz5RdAI/AAAAAAAADUE/QkJfEYkN724/s1600/dog+walkers+fog.jpg')");
                $('#icon').css('background-image',"url('http://bakersintegrity.com/wp-content/uploads/2013/11/wind-icon.jpg')");
                break;
            case 'cloudy':
                $('.wrap').css('background-image',"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTbb-W57w7Ki7sAUfKlhODkZypbPMCmlH1gEIDTkq7u5sqbSXT')");
                $('#icon').css('background-image',"url('http://a4.mzstatic.com/us/r30/Purple49/v4/aa/05/3d/aa053d6e-ffca-732e-4131-31b006c28ac5/icon175x175.jpeg')");
                break;
            case 'partly-cloudy-day':
                $('.wrap').css('background-image',"url('http://img.freecodesource.com/formspring-backgrounds/images/bg/L711510979.jpg')");
                $('#icon').css('background-image',"url('http://a4.mzstatic.com/us/r30/Purple62/v4/ba/e4/36/bae43683-a483-97c7-f332-eb1548e29d32/icon175x175.png')");
                break;
            case 'partly-cloudy-night':
                $('.wrap').css('background-image',"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1qnmM_SH4MNBiq_KDnicOIt7dbClWIu4TKg-Y3NLIqo7_0VP1Pw')");
                $('#icon').css('background-image',"url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-KUXH104VSJvoy_s3Xam7YfjGMDlY386baw5uF5BjQEAehHQw')");
                break;
            default:
                alert('No background and icon for this weather yet~');
                break;
        }
    }



});