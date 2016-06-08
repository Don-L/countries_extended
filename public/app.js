window.onload = function () {
    console.log('Got the data!')
    var url = 'https://restcountries.eu/rest/v1'
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function () {
        if (request.status === 200) {
            var jsonString = request.responseText;
            var countries = JSON.parse(jsonString);
            main(countries);
        }
    }
    request.send();

};

var main = function (countries) {
    populateSelect(countries);
    var cached = localStorage.getItem("selectedCountry");
    var selected = countries[0];
    if(cached){
        selected = JSON.parse(cached);
        document.querySelector('#countries').selectedIndex = selected.index;
        displayMap(selected);
    }
    updateDisplay(selected);
    document.querySelector('#info').style.display = 'block';
}

var displayMap = function(country) {
    var center = {lat: country.latlng[0], lng: country.latlng[1]};
    var map = new Map(center, getZoom(country));
    var marker = map.addMarker(center, country.name);
    marker.label = country.name[0];
    var infoWindow = map.addInfoWindow(center, country.name, infoWindowContent(country));
}

var getZoom = function(country) {
    if (country.area >= 1564110) {
        return 4;
    }
    else {return 6};
}

var infoWindowContent = function(country) {
    contentString = '<h3>' + country.name + '</h3>' + '<h4>' + 'Population:' + '</h4>' + '<p>' + country.population + '</p>' + '<h4>' + 'Capital:' + '</h4>' + '<p>' + country.capital + '</p>';
    return contentString;
}


var populateSelect = function (countries) {
    var parent = document.querySelector('#countries');
    countries.forEach(function (item, index) {
        item.index = index;
        var option = document.createElement("option");
        option.value = index.toString();
        option.text = item.name;
        parent.appendChild(option);
    });
    parent.style.display = 'block';
    parent.addEventListener('change', function (e) {
        var index = this.value;
        var country = countries[index];
        updateDisplay(country);
        localStorage.setItem("selectedCountry",JSON.stringify(country));
    });
}

var updateDisplay = function (lala) {
    var tags = document.querySelectorAll('#info p');
    tags[0].innerText = lala.name;
    tags[1].innerText = lala.population;
    tags[2].innerText = lala.capital;
    displayMap(lala);
}