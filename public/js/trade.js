

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
	
//onclick event for populate trade request (spefic request):
	$(".notification-overflow").on("click", ".notification-bar", function(){
		
		var tradeId = $(this).attr("data-trade-id");
		renderTradeDialog(tradeId)		

	})


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

			var count = $('.notification-bar').length;

	  	if (count === 0){
	  		$('.notification-count').css('display','none');
	  	}else{
	  		$('.notification-count').text(count);
	  	}
	  	
		})
	}

	function renderTradeDialog(id) {
		$.ajax({
			method: "GET",
			url: "/api/trade-request/" + id
		}).done(function(res){
			var tradeRequestSubmitter = res[0].Owner.user_name;
			var requesteeSockId = res[0].requesteeSockId;
			var ownerSockId = res[0].ownerSockId;
			var ownerSockName;
			var requesteeSockName;
			
				$.ajax({
					method: "GET",
					url: "/api/socks/" + ownerId + "/" + ownerSockId
				}).done(function(ownerSock){
					ownerSockName = ownerSock[0].item_name;
				})

				$.ajax({
					method: "GET",
					url: "/api/socks/" + ownerId + "/" + requesteeSockId
				}).done(function(requesteeSock){
					requesteeSockName = requesteeSock[0].item_name;
					var div = "<p>" + tradeRequestSubmitter + " wants to trade their " + requesteeSockName + " for your " + ownerSockName + " ! Do you accept?.</p>";
					console.log(div);
					$(".trade-dialog").append(div);
				})

				$(".accept").on("click", function() {
					alert("trade request accepted!");

					$.ajax({
						method: "POST",
						url: "/api/trade-request/accept/" + id
					}).done(function(done){
						console.log("finished");
					})

					
				})

		})
	}


	$(document).ready(function(){
		renderTradeStats(ownerId);

	})



})()

