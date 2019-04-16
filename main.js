document.getElementById('getAddress').addEventListener('click', runGeocode);
document.getElementById('confirmAddress').addEventListener('click', passTimes);


function passTimes() {
    const issURL = 'http://api.open-notify.org/iss-pass.json?lat=';
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    
    fetch(proxyURL + issURL + latitude + "&lon=" + longitude)
        .then(function (response) {
            return (response.json());
        })
        .then(function(data){
            let times =  ` `
            console.log(data);
            // times = data.response[n].duration
            data.response.map(function(n){
                times +=  `<li>${[n].duration}  ${[n].risetime}</li>
                `
            })
            document.getElementById('passTimes').innerHTML = times
        })
    };

function runGeocode() {
    const geocodeURL = 'http://www.mapquestapi.com/geocoding/v1/address?key=yH5iS2qacftnKf9BfA1LlAPS8JwsAn8S&location=';
    const userStreet  = document.getElementById('street');
    const userCity  = document.getElementById('city');
    const userState = document.getElementById('state');
    const userZip = document.getElementById('zip');
    
    event.preventDefault();
    console.log('You submitted an address... here is the latitude and longitude');
    console.log(encodeURIComponent(userStreet.value));

    fetch(geocodeURL + encodeURIComponent(userStreet.value) + "," + userCity.value + "," + userState.value + "," + userZip.value)
        .then(function (response) {
            return (response.json());
        })
        .then(function(data){
            console.log(data);
            latitude = data["results"][0]["locations"][0]["latLng"]["lat"];
            document.getElementById('latitude').innerHTML = "Your latitude:" + " " + latitude;
            longitude = data["results"][0]["locations"][0]["latLng"]["lng"];
            document.getElementById('longitude').innerHTML = "Your longitude:" + " " + longitude;
            userAddress = data["results"][0]["locations"][0]["street"] + ", " + data["results"][0]["locations"][0]["adminArea5"] + ", " + data["results"][0]["locations"][0]["adminArea3"];
            document.getElementById('userAddress').innerHTML = "Your Address:" + " " + userAddress; 
        })
    document.getElementById("confirmAddress").style.display = "inline";    
};