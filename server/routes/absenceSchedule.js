const express = require('express');
const multer  = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const router = express.Router();
const XLSX = require("xlsx");

router.post('/import', upload.single('data'), (req, res, next) => {
    let workbook = XLSX.read(req.file.buffer);
    res.send('hmm')
})

module.exports = router;
