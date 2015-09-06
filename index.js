"use strict";
//fetch the nhl.com html schedule, and convert it to json
var request = require('request');
var cheerio = require('cheerio');
var team_mapping = require("./team_mapping")

//turn 'FINAL: MTL (4) - TOR (3)' into an object
var scoreParser = function (str) {
  str = str.replace(/\n/g, '')
  str = str.replace(/^FINAL: /i, '')
  var teams = str.split(/ +- +/)
  teams = teams.reduce(function (h, s) {
    var team = s.match(/[A-Z]{3}/)
    team = team_mapping[team]
    var score = s.match(/\(([0-9]+)\)/) || []
    score = parseInt(score[1], 10)
    h[team] = score
    return h
  }, {})
  return teams
}

//fetch the recap, video, and photos links
var linkParser = function (el, $) {
  var obj = {}
  el.find("a").map(function () {
    var txt = $(this).text() || ''
    txt = txt.replace(/›/, '').toLowerCase()
    obj[txt] = $(this).attr("href")
  })
  return obj
}

var main = function (season, cb) {

  var url = 'http://www.nhl.com/ice/schedulebyseason.htm?season=' + season + '&gameType=2&team=&network=&venue=';

  //fetch the nhl html
  request(url, function (error, response, html) {
    var $ = cheerio.load(html);

    //grab the main table
    $('.schedTbl').filter(function () {

      var json = []
      $(this).find("tr").each(function (index) {
        //skip the header
        if(index === 0) {
          return
        }

        var teams = $(this).find(".teamName").map(function () {
          return $(this).text()
        }).toArray()

        var obj = {
            date: $(this).find(".skedStartDateSite").text(),
            time: $(this).find(".skedStartTimeEST").text(),
            home_team: teams[1],
            away_team: teams[0],
            score: scoreParser($(this).find(".tvInfo").text()),
            links: linkParser($(this).find(".skedLinks"), $)
          }
          //set winner/loser
        if(obj.score[obj.home_team] > obj.score[obj.away_team]) {
          obj.winner = obj.home_team
          obj.loser = obj.away_team
        } else {
          obj.winner = obj.away_team
          obj.loser = obj.home_team
        }

        json.push(obj)
      });
      cb(json)
    })
  })

}

//actually call the program
var season = process.argv[2] || "20142015"
main(season, console.log)

module.exports = main
