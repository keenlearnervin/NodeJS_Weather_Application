console.log("Client side javascript file loaded.");

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "Loading Weather...";
    messageTwo.textContent = '';
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((jsonResp) => {

            if (jsonResp.error) {
                messageOne.textContent = jsonResp.error;
            } else {
                messageOne.textContent = "LOCATION: " + jsonResp.location;
                messageTwo.textContent = "FORECAST: " + jsonResp.forecast;
            }
        });
    });

});