const express = require('express');
const router = express.Router();
const redis = require('../redis/index');

router.get('/', async (_, res, ) => {
    const todoCount = await redis.getAsync('added_todos');
    res.json({
        "added_todos": parseInt(todoCount)
    })
});

module.exports = router;