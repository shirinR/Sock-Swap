(function(){
	//dummy pictures

ownerId = "3";

var retrievedObject = localStorage.getItem('storedId');
var itemHtmlId = JSON.parse(retrievedObject).id;
//sock html template 

$('.container').on('click', 'a',function(){
	var sockId = $(this).attr('data-sock-id');

	$.get('/api/sock/' + sockId, function(data){
		console.log('Sock Id:',data[0].id);

		var storedId = {
			id: data[0].id
		};
		localStorage.setItem('storedId', JSON.stringify(storedId));
	});
});
//try putting in local storage

//removed a tag for testing
//
var	sockSrc =
["<div data-sock-id='{{sockId}}' data-owner='{{ownerId}}'class='photo-holder'>",
	"<img class='featured-socks' src='{{sockImg}}'>	",
	"<a href='/item' data-sock-id='{{sockId}}'><div class='information'>",
		"<div class='profile-holder'>",
			"<img class='profile' src='{{profileImg}}''>",
		"</div>",
		"<h3 class='name'>{{name}}</h3>",
		"<p class='description'>{{description}}</p>",
	"</div></a>",
	"<div class='trade' data-toggle='modal' data-target='#myModal-trade'> Trade Sock > </div>",
"</div>",
].join("");

var ownerSock = 
["<div data-sock-id='{{sockId}}' class='photo-holder'>",
	"<img class='my-socks' src='{{mySockImg}}'> ",
 "</div>"	
].join("");


//used in profile.html for socks
var profileSocks = 
["<div data-sock-id='{{sockId}}' data-owner='{{ownerId}}'class='photo-holder'>",
	"<img class='featured-socks' src='{{sockImg}}'>	",
	"<a href='/item.html'><div class='information'>",
		"<h3 class='name'>{{name}}</h3>",
		"<p class='description'>{{description}}</p>",
	"</div></a>",
"</div>",
].join("");




//handlebars templates:

function getMySockHtml(mySockImg,sockId) {
	var template = Handlebars.compile(ownerSock);
	var context = {
		mySockImg: mySockImg,
		sockId: sockId
	};
	return template(context);
}

// function getUserProfilePic(profile_img) {
// 	var template = Handlebars.compile(profilePic);
// 	var context = {
// 		profile_img: profile_img
// 	};

// 	return template(context);
// }

function getSockHtml(name, description, sockImg, profile_img,sockId,ownerId){
	var template = Handlebars.compile(sockSrc);
	var context = {
		name: name,
		description: description,
		sockImg: sockImg,
		profileImg: profile_img,
		sockId: sockId,
		ownerId: ownerId
		// Owner: user_name
	};
	return template(context);
}

function getMyProfileSockHtml(name, description, sockImg, sockId, ownerId){
	var template = Handlebars.compile(profileSocks);
	var context = {
		name: name,
		description: description,
		sockImg: sockImg,
		sockId: sockId,
		ownerId: ownerId
		// Owner: user_name
	};
	return template(context);
}

//ajax calls to api/routes:


function renderMySocks(){
	$.ajax({
		method: "GET",
		url: "/api/socks/" + ownerId
	}).done(function(sockArr){
		sockArr.forEach(function(sock){
			var sockDiv = $(getMySockHtml(sock.image_path,sock.id));
			
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
			var sockDiv = $(getSockHtml(sock.item_name,
										sock.description, sock.image_path, 
										sock.Owner.profile_img,
										sock.id,
										sock.OwnerId));

			$(".main-html .container")[0].append(sockDiv[0]);
		})
	})

}

function renderUserStats() {
	$.ajax({
		method: "GET",
		url: "api/user/" + ownerId
	}).done(function(user) {
		var image = user[0].profile_img;
		var userName = user[0].user_name;
		var profilePicDiv = "<img class='menu' src='" + image + "'>";
		var profileHtmlPic = "<img class='profile' src='" + image + "'>";
		var profileHtmlName = "<h1>Welcome Home, "+  userName +".</h1>"

		$(".profile-pic-container").append(profilePicDiv);

		//used in item.html
		$('.sock-html #sock-information .profile-holder .user-name').append(userName);
		$('.sock-html #sock-information .profile-holder .profile').attr('src',image);

		//used in profile.html
		$(".profile-html .container-fluid .profile-holder").append(profileHtmlPic);
		$(".profile-html .profile-banner .welcome-text").append(profileHtmlName);
	})
}

//render profile socks
function renderMyProfileSocks(){
	$.ajax({
		method: "GET",
		url: "/api/socks/" + ownerId
	}).done(function(sockArr){
		sockArr.forEach(function(sock){
			var sockDiv = $(getMyProfileSockHtml(sock.item_name,
										sock.description, sock.image_path, 
										sock.Owner.profile_img,
										sock.id,
										sock.OwnerId));
			
			$(".profile-html .profile-socks-container")[0].append(sockDiv[0]);
			
		})
	})
}

//render individual sock in item.html
function renderMyItemSock(){
	$.ajax({
		method: "GET",
		url: "/api/sock/" + itemHtmlId
	}).done(function(sockArr){
		sockArr.forEach(function(sock){
			console.log('>>>>>>>>>><<<<<<<<<', sock)
			console.log('>>>>>>>>>><<<<<<<<<', sock.item_name)
			console.log('>>>>>>>>>><<<<<<<<<', sock.description)
			console.log('>>>>>>>>>><<<<<<<<<', sock.item_condition)
			console.log('>>>>>>>>>><<<<<<<<<', sock.item_value)

			$('.sock-html #sock-information .featured-socks').attr('src', sock.image_path);
			$('.sock-html .this-box-goes-right .sock-name').append(sock.item_name);
			$('.sock-html .this-box-goes-right .sock-description').append(sock.description);
			$('.sock-html .this-box-goes-right .sock-value').append(sock.item_value);
			$('.sock-html .this-box-goes-right .sock-condition').append(sock.item_condition);

			
			// $(".socks-html")[0].append(sockDiv[0]);
			
		})
	})
}


//on page load render socks
$(document).ready(function(){
	renderSocks();
	renderMySocks();
	renderUserStats();
	renderMyProfileSocks();
	renderMyItemSock();

	console.log('Sock ID: ', itemHtmlId);
})

//if we need renderSocks in global scope
window.renderSocks = renderSocks;


})()

