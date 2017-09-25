var mongoose = require("mongoose"),
  Campground = require("./models/campgrounds"),
  Comment = require("./models/comments");
var data = [
  {
    name: "Neves-Stausee, Italy",
    image:
      "https://images.unsplash.com/photo-1500053857731-701d06fac2fa?dpr=1&auto=format&fit=crop&w=1500&h=903&q=80&cs=tinysrgb&crop=",
    description:
      'The Neves-Stausee is a reservoir in the Mühlwaldertal in South Tyrol, Italy. It belongs to the municipality of Mühlwald.'
  },
  {
    name: "Les Portes-en-Re, France",
    image:
      "https://images.unsplash.com/photo-1475139450941-3b6464b2dde3?dpr=1&auto=format&fit=crop&w=1500&h=842&q=80&cs=tinysrgb&crop=",
    description:
      "Les Portes-en-Ré is a commune in the Charente-Maritime department in southwestern France on the Île de Ré"
  }
];

function seedDB() {
  //Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed campgrounds!");
      Comment.remove({}, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("removed comment!");
          data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
              if (err) {
                console.log(err);
              } else {
                console.log("Added: " + campground.name);
                Comment.create(
                  {
                    author: "jkoeh",
                    text: "Great place"
                  },
                  function(err, comment) {
                    if (err) {
                      console.log(err);
                    } else {                                            
                      campground.comments.push(comment);                      
                      campground.save(function(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                          console.log("Comment Created by " +comment.author);
                        }
                      });
                    }
                  }
                );
              }
            });
          });
        }
      });
    }
  });
  //add a few campgrounds
}
module.exports = seedDB;
