var ownerId = "1";

(function(){

//sock html template 

	var	sockSrc =
	["<div data-sock-id='{{sockId}}' data-owner='{{ownerId}}' class='photo-holder'>",
		"<img class='featured-socks' src='{{sockImg}}'>	",
		"<a href='/item.html'><div class='information'>",
			"<div class='profile-holder'>",
				"<img class='profile' src='{{profileImg}}''>",
			"</div>",
			"<h3 class='name'>{{name}}</h3>",
			"<p class='description'>{{description}}</p>",
		"</div></a>",
		"<div class='trade' data-sock-id='{{sockId}}' data-owner='{{ownerId}}' data-toggle='modal' data-target='#myModal-trade'> Trade Sock > </div>",
	"</div>",
	].join("");

	var ownerSock = 
	["<div data-sock-id='{{sockId}}' class='photo-holder'>",
		"<img class='my-socks' src='{{mySockImg}}'> ",
	 "</div>"	
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

				$(".container")[0].append(sockDiv[0]);
			})
		})

	}

	function renderUserStats() {
		$.ajax({
			method: "GET",
			url: "api/user/" + ownerId
		}).done(function(user) {
			var image = user[0].profile_img;
			var profilePicDiv = "<img class='menu' src='" + image + "'>";

			$(".profile-pic-container").append(profilePicDiv);
		})
	}

	//on page load render socks
	$(document).ready(function(){
		renderSocks();
		renderMySocks();
		renderUserStats();
	})

	//if we need renderSocks in global scope
	window.renderSocks = renderSocks;



})()

