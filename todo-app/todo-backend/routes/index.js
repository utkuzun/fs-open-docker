const express = require('express');
const router = express.Router();
const redis = require('../redis')

const configs = require('../util/config')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get("/statistics", async (req, res) => {

  const todosCount = await redis.getAsync("todosCounter")
  return res.json({added_todos : todosCount || 0})
  
})

module.exports = router;
