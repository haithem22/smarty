/**
 * NotificationController
 *
 * @description :: Server-side logic for managing Notifications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var gcm = require('node-gcm')
 request= require('request');
module.exports = {

send: function(req,res) {

 // var token = this.getToken('cLlHcE9C6mI:APA91bHOdtIsbv1zzvMLTjyQdLWSMs7NUpD_7wqRwbOexAHOI4yKQbjGZ9w8w7ay2LYF4Flk82bD2S_6d4H-jeUxzF_tkt4obAyDSjyQxWfgKGG0G3I4twbrkW_YHKYwLXOSWKH7aYuJ');

    var message = new gcm.Message({
      collapseKey: 'demo',
      priority: 'high',
      contentAvailable: true,
      delayWhileIdle: true,
      timeToLive: 3,
      restrictedPackageName: 'com.flatapp',
      dryRun: false

	 });
	 message.addData('key1','message1');
	 message.addData('key2','message2');
   message.addData('subject','message2');
   message.addData('message','message2');
	 message.addNotification('title', 'hello');
	 message.addNotification('body', 'bughuygyug');
	 message.addNotification('icon', 'ic_launcher');
     // as object



    var sender = new gcm.Sender('AIzaSyBCOtVoaNO0a0B-5cGEXyAYWrzbQ4r8ZXE');

    // Add the registration tokens of the devices you want to send to
		var registrationTokens = [];
    registrationTokens.push('dNDdeIzQ4uc:APA91bFlg1TNSLctcIP8GeOTFSzJTbHsgmXdDC0jTmOWSdTZKhq1uMOP_jRoSv0Es-5wJGHgGPfg44vk_J1kfy2UB0ZxtlnGOjzdby134nzjJCPigDi7we3Nmd84BpTbinNVCxYM_w2S');


    setTimeout(function(){ sender.send(message, { registrationTokens: registrationTokens }, 10, function (err, response) {
      if(err) {
        console.error('ERROR =>'+err);
      }
      else {
        console.log("OK ==>"+ JSON.stringify(response));
      }
    }); }, 5000);

  },
groupDevice: function(devices){

    var registration_ids =['f2lvf8SrK0g:APA91bEzIbAjptFbY6GANL4m1vE-D-6Kn9h5WsjgZFPkiZiYEkHATizlzyAS1Ew4iRe5nRC5yiO9bbea_BY80_YOGXYhBW2AscN6qcjkpFqOYhk8AGFH1_9L_Z8rKcdeO_m-ZUf9ETR3'];
  request.post({
      uri: 'https://android.googleapis.com/gcm/notification',
      json: {
        'operation': 'create',
        'notification_key_name': 'flatApp',
        'registration_ids': registration_ids
      },
      headers: {
        Authorization: 'key=AIzaSyBCOtVoaNO0a0B-5cGEXyAYWrzbQ4r8ZXE',
        project_id: '473531331820',
         "Content-Type": "application/json",
      }
    }, function(err, response, body) {
      console.log(JSON.stringify(response));
      return body.notification_key;
    });
  },
   getToken: function(devices){

     return this.groupDevice(devices);
    }

};
