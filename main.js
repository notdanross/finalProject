//Event listeners to run functions when user clicks corresponding button
document.getElementById('getAddress').addEventListener('click', runGeocode);
document.getElementById('confirmAddress').addEventListener('click', passTimes);

//Tkes user input (address), sends to mapquest API and returns latitude & longitude
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
    setTimeout(revealButton, 250);
    function revealButton() {
        document.getElementById('confirmAddress').style.display = "inline";
        document.getElementById('userData').classList = "shadow p-3 mb-5 bg-white rounded"
    };    
};

//When user confirms address, the lat & long is sent to open-notify api to return ISS pass times
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
            // var times = new Date((data.response[0].risetime)*1000);
            // times = data.response[0].risetime
            data.response.map(function(n){
                let pass = new Date((n.risetime)*1000);
                times +=  `<li>${[pass]}</li>
                `
            })
            document.getElementById('passTimes').innerHTML = times;
            document.getElementById('timesData').classList = "shadow p-3 mb-5 bg-white rounded";
        })
    };