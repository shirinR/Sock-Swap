var db = require("../models");

module.exports = function(app) {
	app.get("/api/socks/:OwnerId?",function(req,res){
		var query = {
		 	include: [{
		 		model: db.Owner,
		 		attributes: ["profile_img", "user_name"]

		 	}]
		 };

		if(req.params.OwnerId) {
		 	query.where = {
		 		OwnerId: req.params.OwnerId
		 	}
		}

		 	db.Sock.findAll(query)
			.then(function(dbPost) {
		  	res.json(dbPost)
		});
	});

	app.get("/api/user/:id", function(req,res) {
		db.Owner.findAll({
			where: {
				id: req.params.id
			}
		}).then(function(dbUser){
			res.json(dbUser)
		});
	});

	app.get("/api/owners", function(req,res){
      	db.Owner.findAll({ }).then(function(dbPost){
          	res.json(dbPost);
      	});
  	});

	app.get("/api/trade-request/all/:OwnerId?",function(req,res){
		var query = {
		 	include: [{
		 		model: db.Owner,
		 		attributes: ["profile_img", "user_name"]

		 	}]
		 };
		if(req.params.OwnerId) {
		 	query.where = {
		 		OwnerId: req.params.OwnerId
		 	}
		}
		 	db.TradeRequest.findAll(query)
			.then(function(dbPost) {
		  	res.json(dbPost)
		});
	});
	app.post("/api/trade-request/create",function(req,res){
			// console.log("body",req.body)

		 	db.TradeRequest.create({
		 		OwnerId: req.body.OwnerId,
		 		requesteeId: req.body.requesteeId,
		 		ownerSockId: req.body.ownerSockId,
		 		requesteeSockId: req.body.requesteeSockId

		 	})
			.then(function(dbPost) {
			  	res.json(dbPost)
			});
	});
	app.delete("/api/trade-request/delete/:id", function(req,res){
		var id = parseInt(req.params.id);
		db.TradeRequest.destroy({ where: { id: id } })
		.then(function(){
			console.log("destroyed")

		})
	})
};
