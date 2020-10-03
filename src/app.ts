//added googlemaps types for ts
import axios from "axios";

const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;
const apiKey = process.env.API_KEY;

type GeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number }}} [];
    status: "OK" | "ZERO_RESULTS" 
}

function searchAddress(event: Event){
    event.preventDefault();
    const enteredAddress = addressInput.value;

    axios.get<GeocodingResponse>(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${apiKey}`)
    .then( response =>{
        if ( response.data.status !== "OK"){
            throw new Error("Could not fetch location.")
        }
        const coordinates = response.data.results[0].geometry.location;
        const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
            center: coordinates,
            zoom: 10,
          });

        new google.maps.Marker({position: coordinates, map: map});
    })
    .catch( error => {
        alert(error)
        console.log(error);
    })
        
    
}

form.addEventListener("submit", searchAddress);