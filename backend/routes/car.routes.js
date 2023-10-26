module.exports = app => {
  const car = require("../controllers/car.controller");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  // Create a new Car
  router.post("/", upload.single('file'), car.create);
  //router.post("/", car.create);

  // Retrieve all Car
  router.get("/", car.findAll);

  // Retrieve a single Car with id
  router.get("/:id", car.findOne);

  // Update a Car with id
  router.put("/:id", upload.single('file'), car.update);

  // Delete a Car with id
  router.delete("/:id", car.delete);

  app.use("/api/car", router);
}