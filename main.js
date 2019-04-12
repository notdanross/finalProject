document.getElementById('getAddress').addEventListener('click', runGeocode)

const geocodeURL = 'http://www.mapquestapi.com/geocoding/v1/address?key=yH5iS2qacftnKf9BfA1LlAPS8JwsAn8S&location=1600+Pennsylvania+Ave+NW,Washington,DC,20500'

const issURL = 'http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON'

function runGeocode() {
    console.log('You submitted an address... here is the latitude and longitude')

    fetch(geocodeURL)
        .then(function (response) {
            // console.log(response.json());
            return (response.json());
        })
        .then(function(data){
            console.log(data);
            let latitude = data["results"][0]["locations"][0]["latLng"]["lat"]
            document.getElementById('latitude').innerHTML = "Your latitude:" + " " + latitude
            let longitude = data["results"][0]["locations"][0]["latLng"]["lng"]
            document.getElementById('longitude').innerHTML = "Your longitude:" + " " + longitude
            let userAddress = data["results"][0]["locations"][0]["street"] + ", " + data["results"][0]["locations"][0]["adminArea5"] + ", " + data["results"][0]["locations"][0]["adminArea3"]
            document.getElementById('userAddress').innerHTML = "Your Address:" + " " + userAddress
        })
}