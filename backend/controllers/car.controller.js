const db = require("../models");
const Car = db.car;
const Op = db.Sequelize.Op;
const path = require('path')

// Create and Save a new Car
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brand || !req.body.model) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }
  // Create a Car
  const car = {
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    filename: req.file ? req.file.filename : ""
  }
  // Save Car in the database
  Car.create(car).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the car"
    })
  });
};

// Retrieve all Car from the database.
exports.findAll = (req, res) => {
  Car.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Cars"
    })
  })
};

// Find a single Car with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Car.findByPk(id).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find car with id=${id}.`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving car with id=" + id
    });
  });
}

// Update a Car by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.brand || !req.body.model) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }
  // Create a Car
  const car = {
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    filename: req.file ? req.file.filename : ""
  }

  Car.update(car, {
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Car was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating Car with id=" + id
    });
  });
};

// Delete a Car with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const fs = require("fs");

  Car.findByPk(id).then(car => {

    const img = car.filename

    Car.destroy({
      where: { id: id }
    }).then(num => {
      if (num == 1) {
        if (img) {
          const directoryPath = path.join(__dirname, '../public/images', img);
          fs.unlink(directoryPath, (err) => {
            if (err) {
              res.status(500).send({
                message: "Could not delete the file. " + err,
              });
            }
            res.send({
              message: "File is deleted.",
            });
          });
        }
      } else {
        res.send({
          message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Could not delete Car with id=" + id
      });
    });
  })
};
