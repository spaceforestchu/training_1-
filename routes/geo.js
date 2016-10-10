var express = require('express');
var router = express.Router();
var superagent = require('superagent');

router.get('/', function(req, res, next){

  var address = req.query.address

   var url = 'https://maps.googleapis.com/maps/api/geocode/json'

   var params = {
     key: 'AIzaSyBHDx7B-4HbrEd3WU3trCsQ9blAabvW14E',
     address: address,
   }


  superagent
  .get(url)
  .query(params)
  .set('Accept', 'text/json')
  .end(function(err, response){
    if (err) {
      res.json({
        confirmation: 'fail',
        message: err
      })
      return
    }

    var results = response.body.results
    var locationInfo = results[0]
    var geometry = locationInfo.geometry
    var latLng = geometry.location

    res.send(latLng)
  })

  // res.json({
  //   confirmation: 'success',
  //   geo: address
  // })
})

module.exports = router
