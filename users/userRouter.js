const express = require('express');
const userDb = require('./userDb');
const postDb = require('../posts/postDb');
const router = express.Router();

router.post('/', validateUser(), async (req, res) => {
  // do your magic!
  try {
    res.status(201).json(await userDb.insert(req.body));
  } catch (err) {
    res.status(500).json({
      message: 'There was an error adding the user.'
    });
  }
});

router.post('/:id/posts', validateUserId(), validatePost(), async (req, res) => {
  return res.status(201).json(await postDb.insert({
    text: req.body.text,
    user_id: req.params.id
  }))
});

router.get('/', async (req, res) => {
  // do your magic!
  res.json(await userDb.get());
});

router.get('/:id', validateUserId(), (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId(), async (req, res) => {
  // do your magic!
  res.status(200).json(await userDb.getUserPosts(req.params.id));
});

router.delete('/:id', validateUserId(), async (req, res) => {
  // do your magic!
  res.status(201).json(await userDb.remove(req.params.id));
});

router.put('/:id', validateUserId(), validateUser(), async (req, res) => {
  // do your magic!
  res.status(201).json(await userDb.update(req.params.id, req.body));
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  return async (req, res, next) => {
    try {
      const user = await userDb.getById(req.params.id);
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'invalid user id'});
      }
    } catch (err) {
      next(err);
    }
  }
}

function validateUser(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    console.log('hits');
    if (!req.body) {
      return res.status(400).json({ message: 'missing user data' })
    } else if (!req.body.name) {
      return res.status(400).json({ message: 'missing required name field' })
    }
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: 'missing post data' })
    } else if (!req.body.text) {
      return res.status(400).json({ message: 'missing required text field' })
    }
    next();
  }
}

module.exports = router;
