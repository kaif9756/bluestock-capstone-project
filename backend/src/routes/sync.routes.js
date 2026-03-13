const express = require('express');
const router = express.Router();
const { syncDailyScore, getLeaderboard } = require("../controllers/sync.controller");
router.post('/daily-scores', syncDailyScore);
router.get('/leaderboard', getLeaderboard);
module.exports = router;