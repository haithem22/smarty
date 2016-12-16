/**
 * Job.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */


module.exports = {
  connection:'userMongodbServer',
  schema:true,
  attributes: {
  jobName:{
    type:"string",
    required:true
  },
 sectors:{
   type: 'array'
 }
  },
};
