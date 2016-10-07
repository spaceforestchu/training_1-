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

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource check your spelling'
    })
    return
  }

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
  var controller = controllers[resource]

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource check your spelling'
    })
    return
  }

  controller.getById(id)
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
      message: 'Not Found'
    })
    return
  })
});


router.post('/:resource', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource]
  var data = req.body

  controller.post(data)
  .then(function(profile){
    res.json({
      confirmation: 'success',
      result: profile
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
})

router.put('/:resource/:id', function(req, res, next){
  var resource = req.params.resource
  var id = req.params.resouce
  var controller = controllers[resource]
  var data = req.body

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message: 'Invalid Resource check your spelling'
    })
    return
  }


  controller.put(id, data)
  .then(function(profile){
    res.json({
      confirmation: 'success',
      result: profile
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

  // if(resource == 'profile'){
  //   Profile.findByIdAndUpdate(id, req.body, {new: true}, function(err, result){
  //     if (err) {
  //       res.json({
  //         confirmation: 'fail',
  //         message: err
  //       })
  //       return
  //     }
  //     res.json({
  //       confirmation: 'success',
  //       result: result
  //     })
  //     return
  //   })
  // }
})

module.exports = router;
