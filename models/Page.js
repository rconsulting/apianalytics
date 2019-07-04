const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccueilPage = new Schema({
      headTextExplain: {
          type: String
      } ,
      sloganTitle: {
          type: String
      } ,
      sloganTextExplain: {
          type: String
      },
      benefitBlocTitle: {
          type: String
      },
      benefitBlocParagraph: {
          type: String
      },
      benefitBlocItem: [
          {
              icone: {
                  type: String
              },
              title: {
                  type: String
              },
              paragtaph: {
                type: String
              }
             
          }
      ],
      featureSolutionTitle: {
          type: String
      },
      featureSolutionListSeparator: {
          type: String
      },
      tarificationTitle: {
          type: String
      },
      tarificationItem: [
          {
              typeTarification: {
                  type: String,

              },
              tarificationListSeparator: {
                  type: String
              },
              price: {
                  type: String
              },
              period: {
                  type: String
              }
          }
      ],
      date: {
        type: Date,
        default: Date.now
    }

 });



 const OurExpPage = new Schema({
    titleExpPage: {
        type: String
    },
    expPageItem: [
        {
            typeContent: {
                type: String
            },
            titleExpPageItem: {
                type: String
            },
            paragraphExpPageItem: {
                type: String
            }
        }
    ]
 });

const PageSchema = new Schema({
    typePage: {
        type: String,
        required: true
    },
    headPageTitle: {
        type: String,
        required: true
    },
    accueilPage: AccueilPage,
    expertisePage: OurExpPage,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Page = mongoose.model('page', PageSchema);