const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticate");
const bcrypt = require("bcryptjs");

const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");

/**
 * @POST api/users/register
 * @des register user
 *@ access public
 */

 router.post("/register",[
  auth, [
    check("name", "Name is required")
    .not()
    .isEmpty(),
    check("email", "Please include a valid Email").isEmail(),
    check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 })
  ]
 
 ], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, password, telephone, isAdministrator } = req.body;

      try {
        //see if user exists
        let user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        user = new User({
            name,
            email,       
            password,
            telephone,
            isAdministrator
          });

        //Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);
      await user.save();

      res.status(200).json(user);

      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
      }
 });


 /**
  * @PUT api users/modify/:user_id
  * 
  * @ Modify user by id 
  */
 router.put("/modify/:user_id",
 [
  auth,  [
    check("name", "Name is required")
    .not()
    .isEmpty(),
    check("email", "Please include a valid Email").isEmail()
  ]
 ]
 , async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { name, email, telephone, isAdministrator } = req.body;

      try {
        //see if user exists
        let userFromDb = await User.findOne({ _id: req.params.user_id });
        
        if (!userFromDb) {
            res.status(404).json({ msg: "User not found" });
        }
        let user = {};

        if(name) user.name = name;
        if(email) user.email = email;
        if(telephone) user.telephone = telephone;
        if(isAdministrator) user.isAdministrator = isAdministrator;

    const password = req.body.password || '';

    if(password.trim() !== '') {
      if ( password.length > 5) {
            //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      } else {
        return res.status(400).json({ errors: "Please enter a password with 6 or more characters" });
      }
       
    } 
    
      userDB = await User.findOneAndUpdate(
        { _id: req.params.user_id },
        { $set: user },
        { new: true }
      ).select('-password');

      res.json(userDB);

      } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
      }
 });


 //@route GET api/users
//@desc     get all users
//@access Public
router.get('/', auth, async (req, res) => {

  try{
      const users = await User.find().select('-password');
      res.json(users);

  } catch(error) {
      console.error(error.message);
      res.status(500).send("Server Error");
  }
});



/*
/@route GET api/users/:user_id
//@desc     get user by user id
//@access Public
*/
router.get('/:user_id', auth, async (req, res) => {

    try{
  
        const user =  await User.findOne({ _id: req.params.user_id }).select('-password');;
        
        if (!user) return res.status(400).json({ msg: 'User not found'})
        
        res.json(user);

    } catch(error) {
        console.error(error.message);

        if(error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'User not found'})
        }

        res.status(500).send("Server Error");
    }
});

module.exports = router;