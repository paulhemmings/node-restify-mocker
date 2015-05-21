var FS = require('fs'),
    Promise = require("node-promise").Promise,
    Lodash = require('lodash');

exports.name = "MockerService";

exports.load = function() {
  var promise = new Promise();
  var models_path = __dirname + '/../data/mock-data.json';
  // console.log(models_path);
  FS.readFile(models_path, 'utf8', function (err, data) {
    if (err) throw err;
    // console.log(data);
    promise.resolve(JSON.parse(data));
  });
  return promise;
}

exports.all = function(mock_model) {
  var promise = new Promise();
  promise.resolve (mock_model);
  return promise;
};

exports.get = function(mock_model, model, id) {
  var promise = new Promise();
  var model = Lodash.findWhere(mock_model, {"id": parseInt(id) });
  promise.resolve(model);
  return promise;
};

exports.persist = function(mock_model, model) {
  var promise = new Promise();
  mock_model.push(data);
  promise.resolve (mock_model);
  return promise;
};

exports.delete = function(mock_model, id) {
  var promise = new Promise();
  var index = Lodash.findIndex(mock_model, { 'id': id });
  mock_data.splice(index, 1);
  promise.resolve (mock_model);
  return promise;
};
