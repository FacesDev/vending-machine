const data = require('./data.js');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
const application = express();

application.use(bodyParser.json());

application.get('/api/customer/data', function (request, response) {
  for (var i = 0; i < data.data.length; i++) {
    var description = data.data[i].description;
    var cost = data.data[i].cost;
    var quantity = data.data[i].quantity;
    var combined = "There are " + quantity + " " + description + " remaining for " + cost + ".";
    console.log("Vending Items: ", combined);
  }
  response.json(data);
});

function calculateChange(payment, cost) {
  var change = payment - cost;
  return change;
}

application.post('/api/customer/items/:itemId/purchases', function (request, response) {

  function filterById(item, index, array) {
    return item.id === request.body.id;
  };
  var result = data.data.find(filterById);

  change = calculateChange(request.body.payment, result.cost);
  var remaining = result.quantity - 1;
  var model = {change: change, quantity: remaining};

  response.json(model);
});







if (require.main === "module") {
  application.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
  });
}
// application.listen(3000);
module.exports = application;

