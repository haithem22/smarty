/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection:'userMongodbServer',
  schema:true,
  attributes: {
    firstName:{
      type:"string",
      required:"true"
    },
    lastName:{
      type:"string",
      required:"true"
    },

    password : {
      type:"string",
      required:"true"
    },
    email : {
      type:"string",
      required:"true"
    },
    username:{
      type:"string",
      required:"true"
    },
    job:{
      type:"string",

    },
    sector:{
      type:"string",

    },
    // adress:{
    //   type:"string",
    //   required:"false"
    // },
    telephone:{
      type:"string",
      required:"true"
    },
    professionalboolean: {
      type:"boolean",
      required: true
    },

    token: {
      type:"string",
      required:false
    },

    longitude: {
      type: "string",
      required: false
    },
    latitude: {
      type: "string",
      required: false
    },


  }
};
