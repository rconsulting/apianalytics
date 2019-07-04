const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticate");
const { check, validationResult } = require("express-validator/check");
const InfoWebSite = require('../../models/InfoWebSite');


/**
 * @route POST api/infowebsite
 * @desc create or update infoWebSite
 * @access private
 */
router.post('/create', [
    auth,
    [
    check("email", "Please include a valid email")
        .isEmail()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

        const {
            adresse, 
            telephone,
            email,
            slogan
        } = req.body;

        const newInfoWebSite = {
            adresse, 
            telephone,
            email,
            slogan
        }  ;


    try {

        //Create new infoWebSite
        infoWebSite = new InfoWebSite(newInfoWebSite);
        await infoWebSite.save();
        res.json(infoWebSite);
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});

/**
 * @route PUT api/infowebsite
 * @desc  update infoWebSite
 * @access private
 */
router.put('/modify', [
    auth,
    [
    check("email", "Please include a valid email")
        .isEmail()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

        const {
            adresse, 
            telephone,
            email,
            slogan
        } = req.body;

        const newInfoWebSite = {
            adresse, 
            telephone,
            email,
            slogan
        }  ;


    try {
        let infoWebSite = await InfoWebSite.findOne();

        if(!infoWebSite) {
            return res.status(400).json({ msg: "Info Web Site Not Found"});
        }

        //infoWebSite exist update
        infoWebSite = await InfoWebSite.findOneAndUpdate(
            { _id: infoWebSite._id},
            {$set: newInfoWebSite},
            {new: true}
        );
    
        res.json(infoWebSite);
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});





/**
 * @route GET /api/infowebsite
 * @desc Gell all infoWebSite
 * @access public
 */
router.get('/', async (req, res) => {

    try {
        const infowebsite = await InfoWebSite.findOne();

        res.json(infowebsite);
    } catch (error) {
         console.error(error.message);
            res.status(500).send("Server Error");
    }
});

module.exports = router;