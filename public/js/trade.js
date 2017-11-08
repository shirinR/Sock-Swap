(function(){
	
//onclick event for choosing sock from current user to trade 

	$('.modal-sock-pix').on("click", '.photo-holder', function(){		
		var requester = ownerId;
		var userOwnedSock = $(this).attr("data-sock-id");
		console.log($(this).attr("data-sock-id"));

	});

	$('.container').on("click", ".trade", function(){	
		console.log(this);
		// var requestedSock = $(this).attr("data-sock-id");
		// var currentSockOwner = $(this.attr("data-owner-id");

		;
	});


})()

