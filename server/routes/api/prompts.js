const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => {
  const prompts = await loadPostsCollection();
  res.send(await prompts.find({}).toArray());
});

// // Add Post
// router.post('/', async (req, res) => {
//   const posts = await loadPostsCollection();
//   await posts.insertOne({
//     text: req.body.text,
//     createdAt: new Date()
//   });
//   res.status(201).send();
// });

// // Delete Post
// router.delete('/:id', async (req, res) => {
//   const posts = await loadPostsCollection();
//   await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
//   res.status(200).send({});
// });

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://bastienthunus:17711772@cluster0.ehjuupj.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser:true
    }
  );

  return client.db('TFE').collection('PromptPilot');
}

module.exports = router;
