const express = require('express');
const postDb = require('./postDb');
const router = express.Router();

router.get('/', async (req, res) => {
  // do your magic!
  res.json(await postDb.get());
});

router.get('/:id', validatePostId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId(), async (req, res) => {
  // do your magic!
  res.status(201).json(await postDb.remove(req.params.id));
});

router.put('/:id', validatePostId(), async (req, res) => {
  // do your magic!
  res.status(201).json(await postDb.update(req.params.id, req.body));
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  return async (req, res, next) => {
    try {
      const post = await postDb.getById(req.params.id);
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: 'invalid post id'});
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = router;
