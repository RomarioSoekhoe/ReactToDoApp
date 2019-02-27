const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Task = require("../models/task");

router.get("/", (req, res, next) => {
  Task.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    created_by: req.body.created_by,
    assigned_to: req.body.assigned_to,
    name: req.body.name,
    description: req.body.description,
    // created_at: req.body.created_at
    // updated_at: req.body.updated_at
  });
  task
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST requests to /tasks",
        createdTask: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:taskId", (req, res, next) => {
  const id = req.params.taskId;
  Task.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/complete/:taskId", (req, res, next) => {
  const id = req.params.taskId;

  Task.findById(id, function (err, task) {
    if (err) return handleError(err);
  
    task.set({  completed: true,
                updated_at: Date.now() });
    task.save(function (err, updatedTask) {
      if (err) return handleError(err);
      res.send(updatedTask);
    });
  });
});

router.patch("/:taskId", (req, res, next) => {
  const id = req.params.taskId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Task.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:taskId", (req, res, next) => {
  const id = req.params.taskId;
  Task.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
