var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app", { useMongoClient: true });

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

// var cat = new Cat({
// 	name: "Amber",
// 	age: 2,
// 	temperament: "Noisy" 
// });
// cat.save(function(err, cat){
// 	if(err){
// 		console.log("Something went wrong!");
// 	}
// 	else{
// 		console.log(cat);
// 		console.log(" is saved to the DB");
// 	}
// });
Cat.create({
	name: "Snow",
	age: 15,
	temperament: "Bland"
}, function(err, cats){
	if(err){
		console.log("Error: ");
		console.log(err);
	}
	else{
		console.log("Create: ");
		console.log(cats);
	}
})
Cat.find({}, function(err, cats){
	if(err){
		console.log("Error: ");
		console.log(err);
	}
	else{
		console.log("Found: ");
		console.log(cats);
	}
})
