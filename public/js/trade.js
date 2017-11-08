var currentUserTradeRequests = [];

(function(){
	var requestedSock;
	var currentSockOwner;
	var requester;
	var userOwnedSock;
	var tradeDetails;

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

	function getCurrentUserRequests() {
	    $.get("/api/trade-request/all/" + ownerId, function(data) {
	      // currentUserTradeRequests = data;
	      
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





})()

