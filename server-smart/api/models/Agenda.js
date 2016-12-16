/**
 * Agenda.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

 module.exports = {

   connection:'userMongodbServer',
   schema:true,
   attributes: {
     idProfessional: {
       type: 'string',
       required: true
     },
     day: {
       type: 'string',
       required: true
     },
     timeOpeningAm:{
       type: 'string',
       required: true,
      //  default: 8,
     },
     timeClosingAm: {
       type: 'string',
       required: true,
      //  default: 12,
     },
     timeOpeningPm: {
       type: 'string',
       required: true,
      //  default: 14,
     },
     timeClosingPm: {
       type: 'string',
       required: true,
      //  default: 18,
     }



   },

 };

 module.exports.convert=function(minute)
   {  switch (minute) {
       case "15":

         return ".25";

       break;

       case "30":

        return ".5";

       break;
       case "45":

        return".75";

       break;
       case "00":

         return ".00"

       break;

     }};
