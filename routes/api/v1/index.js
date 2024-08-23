const express = require('express');
const router = express.Router();
const UPLOAD_ROUTER = require('./upload');

router.use('/upload', UPLOAD_ROUTER);

module.exports = router;