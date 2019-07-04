const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoWebSiteSchema = new Schema({

        adresse: {
            type: String
        },
        telephone: {
            type: String
        },
        email: {
            type: String
        },
        slogan: {
            type: String
        }

});

module.exports = InfoWebSite = mongoose.model('infowebsite', infoWebSiteSchema);