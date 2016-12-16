/**
 * AgendaController
 *
 * @description :: Server-side logic for managing Agenda
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var moment = require('moment');

module.exports = {
  //suggestion

  suggestion:function (req,res) {
    console.log('Hello suggestion ! ');
    var idProfessional =/**/ '57ac3dd2ccb45aa40ef63be4'; // req.session.idProfessional; //Pour tester rapidement j'utilise un exemple deja stocker dans ma base de donnée.
    //je dois tester avec authentification et un idProfessional envoyé par la session
    var day =  req.body.day; //'25/02/2016';
    console.log(day);
    var dayOfWeek = req.body.dayOfWeek;
    var s = [];
    // Appointment.create({
    //     idUser: 'qsds',
    //     idProfessional: idProfessional,
    //     day: day,
    //     time: '11h:00min',
    //     noteUser: 'sdkflnqs',
    //     notePrfessional: 'fdsfjshdf',
    //     status: 'en attente',
    // },
    // function (err, m) {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log('appointment created!');
    //     console.log(m);
    //   }
    // });
    Configuration.findOne({idProfessional: idProfessional},function (err, config) {
      if(config){
        Agenda.findOne({idProfessional: idProfessional, day : dayOfWeek}, function (err, agenda) {
          if(agenda){
            Appointment.find({idProfessional: idProfessional, day: day}, function (err, appointment) {
              console.log('appointmen find?');
              if (err) {
                console.log(err);
              }
                    if(appointment.length != 0){
                      /*
                      Algorithme pour eliminer les date ou il y a Rdv !!
                      A faire bientôt

                      */
                        console.log(appointment);
                       console.log('there is appointment');
                       console.log(appointment.length);
                       console.log(appointment[0].time);

                      /*
                        A terminer !!!
                        var z = i % 1;
                        var min = '';
                        if(z == 0){
                          min = "00";
                        }else if(z == 0.25){
                          min = "15";
                        }else if (z == 0.5) {
                          min = "30";
                        }else if (z == 0.75) {
                          min = "45";
                        }
                        var h = parseInt(i / 1) ;
                        var elt = h+"h:"+min+"min";
                        ceci doit être dans le code du client. un code de convertisseur pour afficher le temps correctement ! A corriger !!!
                      */
                      for (i = parseInt(agenda.timeOpeningAm) ; i <= (parseInt(agenda.timeClosingAm) - parseFloat(config.duration)) ; i += parseFloat(config.duration)) {

                           //var h = parseInt(i * 100 ) div 100 ;
                           var z = i % 1;
                           var min = '';
                           if(z == 0){
                             min = "00";
                           }else if(z == 0.25){
                             min = "15";
                           }else if (z == 0.5) {
                             min = "30";
                           }else if (z == 0.75) {
                             min = "45";
                           }
                           var h = parseInt(i / 1) ;
                           var elt = h+"h:"+min+"min";
                           var appointmentfound = false;
                          //  var i = 0;
                          //  do {
                          //    if(appointment[i].time == elt){
                          //      appointmentfound = true;
                          //    }
                          //    i++
                          //  } while (appointment.length < 1);
                           for(j = 0 ; j<appointment.length ; j++){
                             if(appointment[j].time == i){
                               appointmentfound = true;
                             }
                           }
                           if (!appointmentfound) {
                             s.push(elt);
                           }

                           console.log(i);
                       }
                       for (i = parseInt(agenda.timeOpeningPm) ; i <= (parseInt(agenda.timeClosingPm) - parseFloat(config.duration)) ; i += parseFloat(config.duration)) {

                            //var h = parseInt(i * 100 ) div 100 ;
                            var z = i % 1;
                            var min = '';
                            if(z == 0){
                              min = "00";
                            }else if(z == 0.25){
                              min = "15";
                            }else if (z == 0.5) {
                              min = "30";
                            }else if (z == 0.75) {
                              min = "45";
                            }
                            var h = parseInt(i / 1) ;
                            var elt = h+"h:"+min+"min";
                            var appointmentfound = false;
                            // il faut rendre la boucle for en do while !
                            for(j = 0 ; j<appointment.length ; j++){
                              if(appointment[j].time == i){
                                appointmentfound = true;
                              }
                            }
                            if (!appointmentfound) {
                              s.push(elt);
                            }

                            console.log(i);
                        }

                      /*

                      for (i = parseInt(agenda.timeOpeningAm) ; i < parseInt(agenda.timeClosingAm) ; i += parseFloat(config.duration)) {

                          s.push(i);
                          console.log(s);
                      }
                      for (i = parseInt(agenda.timeOpeningPm) ; i < parseInt(agenda.timeClosingPm) ; i += parseFloat(config.duration)) {
                        s.push(i);
                        console.log(s);
                      }
                      */

                      return res.send({"suggestions": s});
                    }
                    else{
                      console.log("no appointment!!");
                      console.log(agenda.timeOpeningAm);
                      console.log(agenda.timeClosingAm);
                      console.log(config.duration);
                      // for(i = 8; i < 12; i++){
                      //   var fin = i + parseInt(config.duration);
                      //   var t = i + '----->' + fin;
                      //   s.push(t);
                      //   console.log(s);
                      // }

                     for (i = parseInt(agenda.timeOpeningAm) ; i <= (parseInt(agenda.timeClosingAm) - parseFloat(config.duration)) ; i += parseFloat(config.duration)) {

                          //var h = parseInt(i * 100 ) div 100 ;
                          var z = i % 1;
                          var min = '';
                          if(z == 0){
                            min = "00";
                          }else if(z == 0.25){
                            min = "15";
                          }else if (z == 0.5) {
                            min = "30";
                          }else if (z == 0.75) {
                            min = "45";
                          }
                          var h = parseInt(i / 1) ;
                          var elt = h+"h:"+min+"min";
                          s.push(elt);
                          console.log(i);
                      }
                      for (i = parseInt(agenda.timeOpeningPm) ; i <= (parseInt(agenda.timeClosingPm) - parseFloat(config.duration)) ; i += parseFloat(config.duration)) {

                        var z = i % 1;
                        var min = '';
                        if(z == 0){
                          min = "00";
                        }else if(z == 0.25){
                          min = "15";
                        }else if (z == 0.5) {
                          min = "30";
                        }else if (z == 0.75) {
                          min = "45";
                        }
                        var h = parseInt(i / 1) ;
                        var elt = h+"h:"+min+"min";
                        s.push(elt);
                        console.log(i);
                      }
                      return res.send({"suggestions": s});
                    }

            });
          }
        });
      }
    });



  },
  agendaUpdate:function(req,res)  {
    console.log("we are here");
    console.log(req.body.agenda);
    var idProfessional=req.session.user.id;
    var agenda = req.body.agenda;



     var day = agenda[0].day;
     var timeOpeningAm = agenda[0].amOpening.hour+Agenda.convert(agenda[0].amOpening.minute);
     var timeClosingAm = agenda[0].amClosing.hour+Agenda.convert(agenda[0].amClosing.minute);
     var timeOpeningPm = agenda[0].pmOpening.hour+Agenda.convert(agenda[0].pmOpening.minute);
     var timeClosingPm = agenda[0].pmClosing.hour+Agenda.convert(agenda[0].pmClosing.minute);

  Agenda.update({"idProfessional":idProfessional,"day":day},{"timeOpeningAm":timeOpeningAm,"timeClosingAm":timeClosingAm,
  "timeOpeningPm":timeOpeningPm,"timeClosingPm":timeClosingPm},function(err,agenda){
      console.log(agenda);
    });
  },


  takeAppointment: function (req, res) {
//var hour = moment(req.body.time).hour.format("HHh:MMmin");
// var hour = moment(req.body.time).get('hour');
// console.log(moment(req.body.time).get('hour'));






/*convertisseur date pour stocker dans la base de donnée*/
    var t = req.body.time;
    var arr = t.split(":");
    var h = arr[0].split("h");
    var m = arr[1].split("min");

    if(m[0] == 00){
      time = parseInt(h[0]);
    }
    else if (m[0] == 15) {
      time = parseInt(h[0])+ 0.25;
    }
    else if (m[0] == 30) {
      time = parseInt(h[0])+ 0.5;
    }
    else if (m[0] == 45) {
      time = parseInt(h[0])+ 0.75;
    }
    console.log(time);
/*fin convertisseur*/


    var appointment = {
      idUser:  '57ac3dd2ccb45aa40ef63be4' ,//req.session.idUser,
      idProfessional: '57ac3dd2ccb45aa40ef63be4'  ,//req.session.idProfessional,
      day: req.body.day,
      time: time,
      noteUser: req.body.noteUser,
      notePrfessional: '',
      status: 'en attente'
    };
    Appointment.create(appointment,function (err, appointment) {
      if(err){
        console.log(err);
      }
      else{
        console.log('appointment created');
        console.log(appointment);
      }
    });

  }




};
