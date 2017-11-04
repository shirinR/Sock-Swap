$(document).ready(function() {

	function getSocks() {
    	$.get("/api/socks", function(data) {
	      	todos = data;
	      	initializeRows();
    	});
  	
  	}

  
	function addSock() {
	    // event.preventDefault();
	    var sock = {
	      	item_name: "Stance test socks",
	      	description: "Worn once on a hike, never washed!"
	    };

	    $.post("/api/socks", sock, getSocks);
	    
	}


	

});