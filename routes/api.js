var express = require('express');
var router = express.Router();
var Profile = require('../models/Profile')
var Place = require('../models/Place')
var ProfileController = require('../controllers/ProfileController')
var PlaceController = require('../controllers/PlaceController')
var controllers = {
  profile: ProfileController,
  place: PlaceController
}



router.get('/:resource', function(req, res, next) {
  var resource = req.params.resource
  var controller = controllers[resource]

    controller.get(null)
    .then(function(results){
      res.json({
        confirmation: 'success',
        results: results
      })
      return
    })
    .catch(function(err){
      res.json({
        confirmation: 'fail',
        message: err
      })
      return
    })

});

router.get('/:resource/:id', function(req, res, next){
  var resource = req.params.resource
  var id = req.params.id

  ProfileController.get(id)
  .then(function(result){
    res.json({
      confirmation: 'success',
      results: result
    })
    return
  })
  .catch(function(err){
    res.json({
      confirmation: 'fail',
      message: err
    })
    return
  })
});


router.post('/:resource', function(req, res, next){
  var resource = req.params.resource
  // if (resource == 'profile'){
  //  Profile.create(req.body, function(err, result){
  //    if (err) {
  //      res.json({
  //        confirmation: 'fail',
  //        message: err
  //      })
  //      return
  //    }
  //    res.json({
  //      confirmation: 'success',
  //      result: result
  //    })
  //    return
  //  })
  // }
})

router.put('/:resource/:id', function(req, res, next){
  var resource = req.params.resource
  var id = req.params.resouce

  if(resource == 'profile'){
    Profile.findByIdAndUpdate(id, req.body, {new: true}, function(err, result){
      if (err) {
        res.json({
          confirmation: 'fail',
          message: err
        })
        return
      }
      res.json({
        confirmation: 'success',
        result: result
      })
      return
    })
  }
})

module.exports = router;
