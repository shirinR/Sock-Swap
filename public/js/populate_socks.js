var ownerId = "1";


var localStorageOwnerId = localStorage.getItem('storedOwnerId');

//debug
// localStorage.removeItem('storedSockId');

var localStorageSockId = localStorage.getItem('storedSockId');
var itemHtmlId = "";
var itemSockOwnerId = "";
var ownerId;

//if skip login
if (localStorageOwnerId === null){
	ownerId = "1"; //defaults to hillary
}else if(localStorageOwnerId){
	ownerId = JSON.parse(localStorageOwnerId).ownerid;
}


//Fixed where JSON.parse(localStorageSockId).id prevented page from loading if null
if (localStorageSockId === null){
	itemHtmlId = "";
	itemSockOwnerId = "";
}else if(localStorageSockId){
	itemHtmlId = JSON.parse(localStorageSockId).id;
	itemSockOwnerId = JSON.parse(localStorageSockId).sockOwnerId;
}


$('.container').on('click', 'a', function(){
	var sockId = $(this).attr('data-sock-id');

	$.get('/api/sock/' + sockId, function(data){
		console.log('Sock Id:',data[0].id);
		var storedSockId = {
			id: data[0].id,
			sockOwnerId: data[0].OwnerId
		};
		localStorage.setItem('storedSockId', JSON.stringify(storedSockId));
	});
});



//sock html template 

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

			$('.sock-html #sock-information .featured-socks').attr('src', sock.image_path);
			$('.sock-html .this-box-goes-right .sock-name').append(sock.item_name);
			$('.sock-html .this-box-goes-right .sock-description').append(sock.description);
			$('.sock-html .this-box-goes-right .sock-value').append(sock.item_value);
			$('.sock-html .this-box-goes-right .sock-condition').append(sock.item_condition);

			//used in item.html to render name + pic of owner
			$('.sock-html #sock-information .profile-holder .user-name').append(sock.Owner.user_name);
			$('.sock-html #sock-information .profile-holder .profile').attr('src',sock.Owner.profile_img);
		});
	});
	//generates same owners socks
	$.ajax({
		method: "GET",
		url: "/api/socks/" + itemSockOwnerId
	}).done(function(sockArr){
		for(var i=0; i < 5; i++){
			$('.sock-html .suggestions div:nth-child('+(2+i)+') .featured-socks').attr('src', sockArr[i].image_path);
		}
	});
};


//on page load render socks
$(document).ready(function(){
	renderSocks();
	renderMySocks();
	renderUserStats();

	//render Profile
	renderMyProfileSocks();

	//render Item
	renderMyItemSock();

	console.log('Sock Owner Id:', itemSockOwnerId)
})


	//if we need renderSocks in global scope
	window.renderSocks = renderSocks;


})()

