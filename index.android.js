'use strict';

import { AppRegistry, View, DeviceEventEmitter } from 'react-native'
import setup from './js/setup'
var GcmAndroid = require('react-native-gcm-android');
import Notification from 'react-native-system-notification';

if (GcmAndroid.launchNotification) {
  console.log("nous somme ici")
  var notification = GcmAndroid.launchNotification;
  var info = JSON.parse(notification.info);
  Notification.create({
    subject: info.subject,
    message: info.message,
  });
  //GcmAndroid.stopService();
} else {

      AppRegistry.registerComponent('FlatApp', setup);
      }
