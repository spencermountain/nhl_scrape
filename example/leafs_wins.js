var nhl_scrape=require("../index")

//count how many winning games for Toronto
nhl_scrape("20142015", function(data){
  var leafs_wins= data.filter(function(game){
    return game.winner==="Toronto"
  })
  console.log("(only) " + leafs_wins.length)
})
