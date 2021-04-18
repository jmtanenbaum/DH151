src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"  
let bookstores = [
{
'title':'Los Angeles',
'description': '<br> The Last Bookstore is a gigantic new and used independent bookstore. The 22,000 sq. ft. space is in a multistory building in the Spring Arts Tower at 5th & Spring. One of my favorite features is a tunnel made of books.',
'lat': 34.04798744765223,
'lon': -118.24957431591702
},
{
'title':'Philadelphia',
'description': '<br> The Wooden Shoe is an anarchist book and record shop and meeting space in South Philadelphia. I’ve spent many hours watching speakers there and have volunteered a few times. It is an incredible space for the local activist community.',
'lat': 39.942297116576626,
'lon': -75.15415484461005
},
{
'title':'Portland',
'description': '<br> Powells Books is the largest independent bookstore I’ve ever visited, and has locations all over Portland. Last time I visited Portland I returned with an entire suitcase of books.',
'lat': 45.523280700180955,
'lon': -122.68122634445496
},
{
'title':'New York City',
'description': '<br> Bluestockings is an old radical feminist bookshop on the Lower East Side of New York City. It is well known for hosting events and also includes a small café. I visited while conducting research at local archives during my undergraduate degree.',
'lat': 40.71913576868951,
'lon': -73.98599350410622
},
{
'title':'Baltimore',
'description':'<br> Red Emmas Bookstore is another anarchist infoshop, but this one is located in Baltimore. They have played a crucial role in the movement for Black lives in the city, and provide a space for activists to gather and rest.',
'lat': 39.30437080981874,
'lon': -76.61830814462655
}
]

var book = L.icon({
	iconURL: 'https://static.thenounproject.com/png/3688-200.png',
	iconSize: [30, 30],
	iconAnchor: [22, 94],
	popupAnchor: [-3, -76]
	});

var map = L.map('map').setView([13.7563,100.5018],1);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// before looping the data, create an empty FeatureGroup
let myMarkers = L.featureGroup();


// loop through data
bookstores.forEach(function(item,index){
	// create marker
	 marker = L.marker([item.lat,item.lon], {icon: book}) 

		.bindPopup(item.title + item.description)
    // add data to sidebar with onclick event
    $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})">${item.title}</div>`)

	// add marker to featuregroup
	myMarkers.addLayer(marker)

})

// after loop, add the FeatureGroup to map
myMarkers.addTo(map)

// define layers
let layers = {
	"My Markers": myMarkers
}

// add layer control box
L.control.layers(null,layers).addTo(map) 

map.fitBounds(myMarkers.getBounds())

function flyToIndex(index){

    map.flyTo([bookstores[index].lat,bookstores[index].lon],12)
    myMarkers.getLayers()[index].openPopup() 

}