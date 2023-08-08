const router = require('express').Router();
const userRoutes = require('./userRoutes');
const API = require("../../utils/API");
router.use('/users', userRoutes);

router.get("/news", async function(req, res){
    const data = await API.fetchNews();
    res.json(data)
})

module.exports = router;
