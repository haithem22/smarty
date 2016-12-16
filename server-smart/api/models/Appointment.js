/**
 * Appointment.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection:'userMongodbServer',
  schema:true,
  attributes: {
    idUser: {
      type: 'string',
      required: true
    },
    idProfessional: {
      type: 'string',
      required: true
    },
    day: {
      type: 'string',
      required: true
    },
    time: {
      type: 'string',
      required: true
    },
    noteUser: {
      type: 'string'
    },
    notePrfessional: {
      type: 'string'
    },
    status: {
      type: 'string',
      required: true,
      // default: 'en attente',
    }
  }
};
