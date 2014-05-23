var request = require('request');
var moment = require('moment');

exports.index = function(req, res) {
  //is this the best place for this list? 
  var today_events = []
  var rss = "http://www.ursulineacademy.org/data/calendar/rsscache/page_357.rss"
  request(rss, function(error, response, xml) {
    if (!error && response.statusCode == 200) {
      while (xml.indexOf("<item>") != -1) {
        i1 = xml.indexOf("<item>")
        i2 = xml.indexOf("</item>")
        xml = xml.substring(i1, xml.length)
        t1 = xml.indexOf("<title>") + 7
        t2 = xml.indexOf("</title>")
        title = xml.substring(t1, t2)
        l1 = xml.indexOf("<link>") + 6
        l2 = xml.indexOf("</link>")
        link = xml.substring(l1, l2)
        d1 = xml.indexOf("<description>") + 13
        d2 = xml.indexOf("</description>")
        description = xml.substring(d1, d2)
        date1 = description.indexOf("Date: ") + 6
        date2 = description.indexOf("<br")
        date = description.substring(date1, date2)
        xml = xml.substring(d2+13, xml.length)
        //find the titles for today's dates
        var ua_calendar_day = moment(date).toDate()
        var current_day = new Date()
        if (ua_calendar_day.getFullYear() == current_day.getFullYear()) {
          if (ua_calendar_day.getMonth() == current_day.getMonth()) {
            if (ua_calendar_day.getDate() == current_day.getDate()) {
              console.log("same day")
              // console.log("current_day: " + current_day + "ua_calendar_day: " + ua_calendar_day)
              today_events.push(title)
            }
          }
        }
      }
      console.log(today_events)
    }
  });

  res.render('index', { title: 'Express' });
};
