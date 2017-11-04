(function(){
	//dummy pictures
var dummyObamaProfImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Official_portrait_of_Barack_Obama.jpg/220px-Official_portrait_of_Barack_Obama.jpg";
var dummySockImg = "https://i.pinimg.com/736x/5b/b9/48/5bb948735f0e0e587f3305d583eeef83--space-astronauts-crazy-socks.jpg"
//dummy data
var dummySockData = [
{
	item_name: "Socky Sockerson",
	description: "this is a sock",
	image_path: dummySockImg,
	profileImg: dummyObamaProfImg
},{
	item_name: "Socky Sockerson",
	description: "this is a sock",
	image_path: dummySockImg,
	profileImg: dummyObamaProfImg
},{
	item_name: "Socky Sockerson",
	description: "this is a sock",
	image_path: dummySockImg,
	profileImg: dummyObamaProfImg
},{
	item_name: "Socky Sockerson",
	description: "this is a sock",
	image_path: dummySockImg,
	profileImg: dummyObamaProfImg
},
]


//sock html template 
var	sockSrc =
["<div class='photo-holder'>",
	"<img class='featured-socks' src='{{sockImg}}'>	",
	"<div class='information'>",
		"<div class='profile-holder'>",
			"<img class='profile' src='{{profileImg}}''>",
		"</div>",
		"<h3 class='name'>{{name}}</h3>",
		"<p class='description'>{{description}}</p>",
	"</div>",
"</div>",
].join("");


function getSockHtml(name, description, sockImg, profileImg){
	var template = Handlebars.compile(sockSrc);
	var context = {
		name: name,
		description: description,
		sockImg: sockImg,
		profileImg: profileImg
	}
	return template(context);
}

function renderSocks(){
	$.ajax({
		method: "GET",
		url: "/api/all-socks"
	}).done(function(sockArr){

		//for testing, if database response is empty set sockArr to dummy sock data
		//so we can check formatting
		if (sockArr.length===0)sockArr = dummySockData;

		sockArr.forEach(function(sock){
			var sockDiv = $(getSockHtml(sock.item_name, sock.description, sock.image_path,sock.profileImg));

			$(".container")[0].append(sockDiv[0]);
		})
	})

}

//on page load render socks
$(document).ready(function(){
	renderSocks()
})

//if we need renderSocks in global scope
window.renderSocks = renderSocks;



})()
