const userStreet  = document.getElementById('street');
const userCity  = document.getElementById('city');
const userState = document.getElementById('state');
const userZip = document.getElementById('zip');

// var latitude = 1;
// var longitude = 1;

document.getElementById('getAddress').addEventListener('click', runGeocode);

//'http://www.mapquestapi.com/geocoding/v1/address?key=yH5iS2qacftnKf9BfA1LlAPS8JwsAn8S&location=1600+Pennsylvania+Ave+NW,Washington,DC,20500';
const geocodeURL = 'http://www.mapquestapi.com/geocoding/v1/address?key=yH5iS2qacftnKf9BfA1LlAPS8JwsAn8S&location=';

// const issURL = 'api.open-notify.org/iss-pass.json?lat=LAT&lon=LON';
const issURL = 'http://api.open-notify.org/iss-pass.json?lat=';
const proxyURL = 'https://cors-anywhere.herokuapp.com/'

function passTimes() {
    fetch(proxyURL + issURL + latitude + "&lon=" + longitude)
        .then(function (response) {
            return (response.json());
        })
        .then(function(data){
            console.log(data)
        })
};

function runGeocode() {
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
    // passTimes()     
};