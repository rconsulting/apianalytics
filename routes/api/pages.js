const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authenticate");
const { check, validationResult } = require("express-validator/check");
const Page = require('../../models/Page');



/**
 * @route POST api/pages
 * @desc create or update page
 * @access private
 */
router.post('/create', [
    auth,
    [
    check("typePage", "typePage is required")
        .not()
        .isEmpty(),
      check("headPageTitle", "Head Title Page is required")
        .not()
        .isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

  
    try {

        if (req.body.typePage === 'home') {
            const {
                typePage, 
                headPageTitle,
                accueilPage
            } = req.body;
    
            const newPage = {
                typePage, 
                headPageTitle,
                accueilPage
            }  
              //Create new page
        page = new Page(newPage);
        } else if (req.body.typePage === 'expertise') {
            const {
                typePage, 
                headPageTitle,
                expertisePage
            } = req.body;
    
            const newPage = {
                typePage, 
                headPageTitle,
                expertisePage
            }  
              //Create new page
        page = new Page(newPage);
        } else {
          return res.status(400).json({msg: "Type Page is not correct"})
        }
        
        await page.save();
        res.json(page);
        
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});


/**
 * @route POST api/pages
 * @desc create or update page
 * @access private
 */
router.put('/modify/:page_id', [
    auth,
    [
    check("typePage", "typePage is required")
        .not()
        .isEmpty(),
      check("headPageTitle", "Head Title Page is required")
        .not()
        .isEmpty()
    ]
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
    
        const pageDb = await Page.findOne({ _id: req.params.page_id });

        if (!pageDb) {
           return res.status(400).json({msg: "Page not found"})
        }

        if (req.body.typePage === 'home') {
            const {
                typePage, 
                headPageTitle,
                accueilPage
            } = req.body;
    
            newPage = {
                typePage, 
                headPageTitle,
                accueilPage
            }  

        } else if (req.body.typePage === 'expertise') {
            const {
                typePage, 
                headPageTitle,
                expertisePage
            } = req.body;
    
           newPage = {
                typePage, 
                headPageTitle,
                expertisePage
            }  
        } else {
          return res.status(400).json({msg: "Type Page is not correct"})
        }

             //page exist update
             page = await Page.findOneAndUpdate(
                { _id: req.params.page_id},
                {$set: newPage},
                {new: true}
            );
        res.json(page);

    } catch (error) {
        console.error(error.message);
      res.status(500).send("Server Error");
    }

});




/**
 * @route GET /api/pages
 * @desc Gell all page
 * @access public
 */
router.get('/', async (req, res) => {

    try {
        const pages = await Page.find();

        res.json(pages);
    } catch (error) {
         console.error(error.message);
            res.status(500).send("Server Error");
    }
});


/**
 * @route GET /api/pages/type/
 */
router.get('/type/:type_page', async (req, res) => {

    try {
        const page = await Page.findOne({ typePage: req.params.type_page});

        if(!page) {
            return res.status(400).json({ msg: 'Page not found'});
        }

        res.json(page);
    } catch (error) {
         console.error(error.message);
         if(error.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Page not found'});
        }
            res.status(500).send("Server Error");
    }
});


module.exports = router;