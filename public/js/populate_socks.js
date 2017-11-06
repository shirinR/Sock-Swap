(function(){
	//dummy pictures
var ownerId = "1";


//sock html template 
var	sockSrc =
["<a href='/item.html'><div class='photo-holder'>",
	"<img class='featured-socks' src='{{sockImg}}'>	",
	"<div class='information'>",
		"<div class='profile-holder'>",
			"<img class='profile' src='{{profileImg}}''>",
		"</div>",
		"<h3 class='name'>{{name}}</h3>",
		"<p class='description'>{{description}}</p>",
		"<div class='trade' data-toggle='modal' data-target='#myModal-trade'> Trade Sock > </div>",
	"</div>",
"</div></a>",
].join("");

var ownerSock = 
["<div class='photo-holder'>",
	"<img class='my-socks' src='{{mySockImg}}'> ",
 "</div>"	
].join("");

function getMySockHtml(mySockImg) {
	var template = Handlebars.compile(ownerSock);
	var context = {
		mySockImg: mySockImg,
	};
	return template(context);
}

function getSockHtml(name, description, sockImg, profile_img){
	var template = Handlebars.compile(sockSrc);
	var context = {
		name: name,
		description: description,
		sockImg: sockImg,
		profileImg: profile_img,
		// Owner: user_name
	};
	return template(context);
}


function renderMySocks(){
	$.ajax({
		method: "GET",
		url: "/api/socks/" + ownerId
	}).done(function(sockArr){

		sockArr.forEach(function(sock){
			var sockDiv = $(getMySockHtml(sock.image_path));
			$(".modal-sock-pix")[0].append(sockDiv[0]);
		})
	})
}

function renderSocks(){
	$.ajax({
		method: "GET",
		url: "/api/socks/"
	}).done(function(sockArr){


		sockArr.forEach(function(sock){
			var sockDiv = $(getSockHtml(sock.item_name, sock.description, sock.image_path, sock.Owner.profile_img));



			$(".container")[0].append(sockDiv[0]);
		})
	})

}

//on page load render socks
$(document).ready(function(){
	renderSocks();
	renderMySocks();
})

//if we need renderSocks in global scope
window.renderSocks = renderSocks;



})()
