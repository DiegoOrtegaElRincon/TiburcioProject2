const db = require("../models");
const Bicycle = db.bicycles;
const Op = db.Sequelize.Op;
const path = require('path')

// Create and Save a new Bicycle
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brand || !req.body.model) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }
  // Create a Bicycle
  const bicycle = {
    brand: req.body.brand,
    model: req.body.model,
    filename: req.file ? req.file.filename : ""
  }
  // Save Bicycle in the database
  Bicycle.create(bicycle).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the bicycle"
    })
  });
};

// Retrieve all Bicycles from the database.
exports.findAll = (req, res) => {
  Bicycle.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Bicycles"
    })
  })
};

// Find a single Bicycle with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Bicycle.findByPk(id).then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find bicycle with id=${id}.`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error retrieving bicycle with id=" + id
    });
  });
}

// Update a Bicycle by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (!req.body.brand || !req.body.model) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }
  // Create a Bicycle
  const bicycle = {
    brand: req.body.brand,
    model: req.body.model,
    filename: req.file ? req.file.filename : ""
  }

  Bicycle.update(bicycle, {
    where: { id: id }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Bicycle was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Bicycle with id=${id}. Maybe Bicycle was not found or req.body is empty!`
      });
    }
  }).catch(err => {
    res.status(500).send({
      message: "Error updating Bicycle with id=" + id
    });
  });
};

// Delete a Bicycle with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const fs = require("fs");

  Bicycle.findByPk(id).then(bicycle => {

    const img = bicycle.filename

    Bicycle.destroy({
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
          message: `Cannot delete Bicyle with id=${id}. Maybe Bicycle was not found!`
        });
      }
    }).catch(err => {
      res.status(500).send({
        message: "Could not delete Bicycle with id=" + id
      });
    });


  })
};
