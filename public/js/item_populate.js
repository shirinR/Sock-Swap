function renderSocks(){
	$.ajax({
		method: "GET",
		url: "/api/socks/"
	}).done(function(sockArr){
		sockArr.forEach(function(sock){
			var sockDiv = $(getSockHtml(sock.item_name, sock.description, sock.image_path, sock.Owner.profile_img));
			$(".container")[0].append(sockDiv[0]);
		})
	})
}