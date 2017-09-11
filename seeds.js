var mongoose = require("mongoose"),
  Campground = require("./models/campgrounds"),
  Comment = require("./models/comments");
var data = [
  {
    name: "Black Tea",
    image:
      "https://images.unsplash.com/photo-1497800640957-3100979af57c?dpr=1&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=",
    description:
      'Black tea is a type of tea that is more oxidized than oolong, green and white teas. Black tea is generally stronger in flavor than the less oxidized teas. All four types are made from leaves of the shrub (or small tree) Camellia sinensis. Two principal varieties of the species are used – the small-leaved Chinese variety plant (C. sinensis subsp. sinensis), used for most other types of teas, and the large-leaved Assamese plant (C. sinensis subsp. assamica), which was traditionally mainly used for black tea, although in recent years some green and white have been produced. In Chinese and the languages of neighboring countries, black tea is known as "red tea" (Chinese 紅茶 hóngchá, pronounced [xʊ̌ŋʈʂʰǎ]; Japanese 紅茶 kōcha; Korean 홍차 hongcha, Bengali লাল চা Lal cha, Assamese ৰঙা চাহ Ronga chah), a description of the colour of the liquid; the Western term "black tea" refers to the colour of the oxidized leaves. In Chinese, "black tea" is a commonly used classification for post-fermented teas, such as Pu-erh tea; outside of China and its neighbouring countries, "red tea" more commonly refers to rooibos, a South African herbal tea. While green tea usually loses its flavor within a year, black tea retains its flavour for several years. For this reason, it has long been an article of trade, and compressed bricks of black tea even served as a form of de facto currency in Mongolia, Tibet and Siberia into the 19th century.[1] Although green tea has recently seen a revival due to its purported health benefits, black tea still accounts for over ninety percent of all tea sold in the West.[2] In Canada, the definition of black tea is a blend of two or more black teas of the leaves and buds of the Camellia Sinensis plant[3] that contain at least 30 percent water-soluble extractive, with 4 to 7 percent ash. Unblended black tea contains at least 25 percent water-soluble extractive, with 4 to 7 percent ash. Packaging of black tea is based on the packaging guidelines from the country of origin.'
  },
  {
    name: "Jasmine Green Tea",
    image:
      "https://images.unsplash.com/photo-1484836443634-3d3fd80edccf?dpr=1&auto=format&fit=crop&w=1500&h=1001&q=80&cs=tinysrgb&crop=",
    description:
      "Green tea is a type of tea that is made from Camellia sinensis leaves that have not undergone the same withering and oxidation process used to make oolong and black tea.[1] Green tea originated in China, but its production has spread to many countries in Asia. Several varieties of green tea exist, which differ substantially because of the variety of C. sinensis used, growing conditions, horticultural methods, production processing, and time of harvest."
  },
  {
    name: "Oolong",
    image:
      "https://images.unsplash.com/photo-1470162656305-6f429ba817bf?dpr=1&auto=format&fit=crop&w=1500&h=2250&q=80&cs=tinysrgb&crop=",
    description:
      "Oolong ( /ˈuːlɒŋ/) (simplified Chinese: 乌龙; traditional Chinese: 烏龍; pinyin: wūlóng) is a traditional Chinese tea (Camellia sinensis) produced through a process including withering the plant under strong sun and oxidation before curling and twisting.[1] Most oolong teas, especially those of fine quality, involve unique tea plant cultivars that are exclusively used for particular varieties. The degree of oxidation can range from 8-85%,[2] depending on the variety and production style. Oolong is especially popular in south China and Chinese expatriates in Southeast Asia,[3] as is the Fujian preparation process known as the Gongfu tea ceremony."
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
                    text: "great taste"
                  },
                  function(err, comment) {
                    if (err) {
                      console.log(err);
                    } else {                      
                      console.log(comment);
                      campground.comments.push(comment);                      
                      campground.save(function(err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            console.log(data);
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
