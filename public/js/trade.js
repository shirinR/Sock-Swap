

(function(){
	var requestedSock;
	var currentSockOwner;
	var requester;
	var userOwnedSock;
	var tradeDetails;
	var requesterOwnerId;

	// populateRequests();

	var requestHtml = 
	["<div class='notification-bar' data-trade-id='{{tradeId}}' data-toggle='modal' data-target='#myModal'>",
		"<div class='profile-holder'>",
				"<img class='profile' src='{{profilePicCurrentOwner}}'>",
		"</div>",
		"<span>{{usernameCurrentOwner}} wants to exchange with you.</span>",
	"</div>"
	].join("");



	//handlebars templates:

	function requestsHtml(profile_img, user_name, tradeId) {
		var template = Handlebars.compile(requestHtml);
		var context = {
			profilePicCurrentOwner: profile_img,
			usernameCurrentOwner: user_name,
			tradeId: tradeId
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
					"requester id:"+ requester+
					"user id of the current sock owner:"+ userOwnedSock;
		

	});

	$('.main-sock-request').on("click", function() {
		alert(tradeDetails);
		insertTradeRequest(event);
	});

	// function populateRequests() {
	//     $.get("/api/trade-request/all/" + ownerId, function(data) {
	//      console.log(data);

	// 	    for(var i = 0; i < data.length; i++) {
	// 	     	requesterOwnerId = data[i].requesteeId;
	// 	     	renderTradeStats(requesterOwnerId);

	// 	    }
	      
	// 	});
 //    }

// Add trade request to trade request table:


  	function insertTradeRequest(event) {
	    event.preventDefault();
	    var tradeRequest = {
	    	OwnerId: currentSockOwner,
	    	requesteeId: requester,
	    	ownerSockId: requestedSock,
	    	requesteeSockId: userOwnedSock
    	};

    	$.post("/api/trade-request/create", tradeRequest);

  	}

  	//rendering user info by owner Id

  	function renderTradeStats(ownerId) {

		$.ajax({
			method: "GET",
			url: "/api/trade-request/all/" + ownerId
		}).done(function(tradeArr){
			console.log(tradeArr);
			tradeArr.forEach(function(trade){
				console.log(trade);
				var requestDiv = $(requestsHtml(trade.Owner.profile_img, trade.Owner.user_name, trade.id));
				
				$(".notification-overflow")[0].append(requestDiv[0]);
				
			})
		})
	}

	$(document).ready(function(){
		renderTradeStats(ownerId);
	})



})()

