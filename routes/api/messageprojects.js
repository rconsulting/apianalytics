const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticate");
const { check, validationResult } = require("express-validator/check");
const MessageProject = require('../../models/MessageProject');


/**
 * @route POST api/messageproject
 * @desc create new messwage project
 * @access private
 */
router.post('/', [
    [
        check("name", "Le nom est  est requis")
        .not()
        .isEmpty(),
    check("firstname", "Le prenom est requis")
        .not()
        .isEmpty(),
    check("email", "Veuillez saisir un email valide")
        .isEmail(),
    check("message", "Le message est trop coup court.  ")
    .isLength({ min: 6 })
     

    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

        const {
            name, 
            firstname,
            beginningDate,
            company,
            email,
            telephone,
            objet,
            message

        } = req.body;

        const newMessageProject = {
            name, 
            firstname,
            beginningDate,
            company,
            email,
            telephone,
            objet,
            message
        }  ;


    try {
       
        //Create new message project
        const messageProject = new MessageProject(newMessageProject);
        await messageProject.save();
        return res.json(messageProject);
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});



/**
 * @route GET api/messageproject/:mesp_id
 * @desc Get Message Project by id
 * @access private
 */
router.get('/:mesp_id',auth , async (req, res) => {

    try {
        const messageProject = await MessageProject.findOne({ _id: req.params.mesp_id });

        if(!messageProject) {
            return res.status(400).json({ msg: 'Message not found'})
        }

        return res.json(messageProject)
     
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});


/**
 * @route GET api/messageproject/:mesp_id
 * @desc Get All message Project
 * @access private
 */
router.get('/',auth , async (req, res) => {

    try {
        const messageProjects = await MessageProject.find();

        return res.json(messageProjects)
     
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});



/**
 * @route DELETE api/messageproject/:mesp_id
 * @desc Get Message Project by id
 * @access private
 */
router.delete('/:mesp_id',auth , async (req, res) => {

    try {
        const messageProject = await MessageProject.findById(req.params.mesp_id);

        if(!messageProject) {
            return res.status(400).json({ msg: 'Message ask Project not found'})
        }
        await messageProject.remove();

        res.json({msg: "Message ask project removed"})
     
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});

module.exports = router;