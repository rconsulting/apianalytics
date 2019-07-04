const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticate");
const { check, validationResult } = require("express-validator/check");
const Message = require('../../models/Message');


/**
 * @route POST api/messages
 * @desc create new messwage project
 * @access private
 */
router.post('/', [
   
        check("name", "Le nom est  est requis")
        .not()
        .isEmpty(),
    check("email", "Veuillez saisir un email valide")
        .isEmail(),
    check("message", "Le message est trop coup court.  ")
    .isLength({ min: 6 })
    
], async (req, res) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

        const {
            name, 
            email,
            telephone,
            objet,
            message

        } = req.body;

        const newMessage = {
            name, 
            email,
            telephone,
            objet,
            message

        }  ;


    try {
       
        //Create new message
        const message = new Message(newMessage);
        await message.save();
        res.json(message);
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});



/**
 * @route GET api/message/:mes_id
 * @desc Get Message  by id
 * @access private
 */
router.get('/:mes_id',auth , async (req, res) => {

    try {
        const message = await Message.findOne({ _id: req.params.mes_id });

        if(!message) {
            return res.status(400).json({ msg: 'Message not found'})
        }

        res.json(message)
     
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});


/**
 * @route GET api/message
 * @desc Get All message Project
 * @access private
 */
router.get('/',auth , async (req, res) => {

    try {
        const message = await Message.find();

        return res.json(message)
     
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});



/**
 * @route DELETE api/message/:mes_id
 * @desc Get Message Project by id
 * @access private
 */
router.delete('/:mes_id',auth , async (req, res) => {

    try {
        const message = await Message.findById(req.params.mes_id);

        if(!message) {
            return res.status(400).json({ msg: 'Message does  not found'})
        }
        await message.remove();

        res.json({msg: "Message  removed"})
     
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});

module.exports = router;