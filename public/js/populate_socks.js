(function(){
	//dummy pictures



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

function renderSocks(){
	$.ajax({
		method: "GET",
		url: "/api/all-socks"
	}).done(function(sockArr){


		sockArr.forEach(function(sock){
			var sockDiv = $(getSockHtml(sock.item_name, sock.description, sock.image_path, sock.Owner.profile_img));



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
