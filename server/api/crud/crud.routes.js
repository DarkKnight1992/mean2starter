const express = require('express');
const mongodb = require("mongodb");
const db = require('../../config/db');

const router = express.Router();

const getAllTodos = (req, res, next)=>{
  const todoCollection = db.getInstance().collection('todos');

  todoCollection.find({}).toArray((err, docs) => {
    res.json(docs);
  });

}
const getTodo = (req, res, next)=>{
  const todoCollection = db.getInstance().collection('todos');

  todoCollection.find({'_id': mongodb.ObjectId(req.params.id)}).toArray((err, docs) => {
    res.json(docs);
  });

}
const addTodo = (req, res, next)=>{
  const todoCollection = db.getInstance().collection('todos');
  var obj = req.body;
  todoCollection.insert(obj, (err, docs) => {
    res.json(docs);
  });
}
const updateTodo = (req, res, next)=>{
  const todoCollection = db.getInstance().collection('todos');

  let updateObj = {};

  if(req.body.title){
    updateObj.title = req.body.title;
  }
  if(req.body.description){
    updateObj.description = req.body.description;
  }

  if(req.body.isComplete){
    updateObj.isComplete = req.body.isComplete;
  }
  
  if(!updateObj){
    res.send(404);
  } else{
    todoCollection.updateOne(
    {
      '_id': mongodb.ObjectId(req.params.id)
    }, 
    { 
      $set : updateObj
    }, 
    (err, docs) => {
      res.json(docs);
    });

  }

}
const deleteTodo = (req, res, next)=>{
  const todoCollection = db.getInstance().collection('todos');
  todoCollection.deleteOne({'_id': mongodb.ObjectId(req.params.id)}, (err, docs) => {
    res.json(docs);
  });

}

router.get('/todo', getAllTodos);
router.post('/todo', addTodo);
router.get('/todo/:id', getTodo);
router.put('/todo/:id', updateTodo);
router.delete('/todo/:id', deleteTodo);

module.exports = router;