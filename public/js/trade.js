var currentUserTradeRequests = [];

(function(){
	var requestedSock;
	var currentSockOwner;
	var requester;
	var userOwnedSock;
	var tradeDetails;

	populateRequests();

	var requestHtml = 
	["<div class='notification-bar' data-toggle='modal' data-target='#myModal'>",
		"<div class='profile-holder'>",
				"<img class='profile' src='{{profilePicCurrentOwner}}'>",
		"</div>",
		"<span>{{usernameCurrentOwner}} wants to exchange with you.</span>",
	"</div>"
	].join("");

	//handlebars templates:

	function requestsHtml(profile_img, user_name) {
		var template = Handlebars.compile(requestHtml);
		var context = {
			profilePicCurrentOwner: profile_img,
			usernameCurrentOwner: user_name
		};
		return template(context);
	}

//on click event for trade button. Stores info for the sock requested and the current owner:

	$('.container').on("click", ".trade", function(){	

		requestedSock = $(this).attr("data-sock-id");
		currentSockOwner = $(this).attr("data-owner");
	});

// trade onclick event for choosing sock from current users inventory to trade:

	$('.modal-sock-pix').on("click", '.photo-holder', function(){		
		
		requester = ownerId;
		userOwnedSock = $(this).attr("data-sock-id");
		tradeDetails = "requested sock id:"+ requestedSock+
					"current sock owner id:"+ currentSockOwner+
					"requester id:"+ ownerId+
					"user id of the current sock owner:"+ userOwnedSock;
		insertTradeRequest(event);

	});

	$('.main-sock-request').on("click", function() {
		alert(tradeDetails);
	});

	function populateRequests() {
	    $.get("/api/trade-request/all/" + ownerId, function(data) {
	     console.log(data);

		    for(var i = 0; i < data.length; i++) {
		     	var requesterOwnerId = data[i].requesteeId;
		     	renderUserStats(requesterOwnerId);

		    }
	      
		});
    }

// Add trade request to trade request table:


  	function insertTradeRequest(event) {
	    event.preventDefault();
	    var tradeRequest = {
	    	ownerId: currentSockOwner,
	    	requesteeId: ownerId,
	    	ownerSockId: requestedSock,
	    	requesteeSockId: userOwnedSock
    	};

    	$.post("/api/trade-request/create", tradeRequest);

  	}

  	//rendering user info by owner Id

  	function renderUserStats(ownerId) {
		$.ajax({
			method: "GET",
			url: "api/user/" + ownerId
		}).done(function(userArr){
			userArr.forEach(function(user){
				var requestDiv = $(requestsHtml(user.profile_img, user.user_name));
				
				$(".notification-overflow")[0].append(requestDiv[0]);
				
			})
		})
}





})()

