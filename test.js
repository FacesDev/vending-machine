const assert = require("assert");
const data = require('./data.js');
const request = require('supertest');
const moment = require('moment');
const application = require("./vending-machine");

describe("GET /api/customer/data", function () {
  it("should return a JSON file successfully", function (done) {
    request(application)
      .get("/api/customer/data")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .end(done);
  })
})

describe("POST /api/customer/items/:itemId/purchases", function () {
  it("should return change and new quantity", function (done) {

    request(application)

      .post("/api/customer/items/2/purchases")
      .send({
        id: 3,
        payment: 120
      })
      .set('Accept', 'application/json')
      
      .expect({change: 75, quantity: 11})
      .end(done);
  })
})









describe("GET /", function () {




});
