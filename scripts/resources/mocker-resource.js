
// example of using a service to retrieve data from MongoDB

exports.initialize = function(server, services) {

  // grab the services we need

  var mockService = services["MockerService"];

  function buildInterface(mock_model, model, models) {

    // get
    var route = "/" + (models || (model + "s"));
    console.log('register: ' + route);
    server.get(route, function(req, res, next) {
      mockService.all(mock_model).then(function(data) {
          res.send(data);
          next();
      });
    });

    // get/:id
    route = "/" + model + "/:id";
    console.log('register: ' + route);
    server.get(route, function(req, res, next) {
      mockService.get(mock_model, model, req.params.id).then(function(data) {
          res.send(data);
          next();
      });
    });

    // put
    route = "/" + model;
    console.log('register: ' + route);
    server.put(route, function(req, res, next) {
      mockService.update(mock_model, req).then(function(data) {
          res.send(data);
          next();
      });
    });

    // post
    route = "/" + model;
    console.log('register: ' + route);
    server.post(route, function(req, res, next) {
      mockService.persis(mock_model, req).then(function(data) {
          res.send(data);
          next();
      });
    });
  }

  function initialize(mock_data) {
      for (var mi = 0; mi < mock_data.length; mi++) {
        buildInterface(
          mock_data[mi].values,
          mock_data[mi].model,
          mock_data[mi].models);
      }
  }

  mockService.load().then(function(data) {
    initialize(data);
  });

};
