'use strict';
import React, {Component} from 'React';
import App from './App';
import configureStore from './configureStore'
import {ip} from './constants/constant'
import {Provider} from 'react-redux';
import {StyleSheet, View, DeviceEventEmitter} from 'react-native';
var GcmAndroid = require('react-native-gcm-android');
import Notification from 'react-native-system-notification';
var adressServer = ip ;
function setup():React.Component {

    class Root extends Component {

        constructor() {
            super();
            this.state = {
                token:"nothing",
                isLoading: false,
                store: configureStore(()=> this.setState({isLoading: false})),
            };
        }

        componentDidMount() {
       GcmAndroid.addEventListener('register', function(token){
         console.log('send gcm token to server', token);
         fetch(adressServer + "store/registertoken", {method: "POST", body: JSON.stringify({
           token: token,

         })})
         .then((response) => response.json())
         .then((responseData) => {
           console.log("haithem");
         })
         .done();
       });
       GcmAndroid.addEventListener('registerError', function(error){
         console.log('registerError', error.message);
       });
       GcmAndroid.addEventListener('notification', function(notification){
               console.log(notification);
               var info = notification.data;
               if (!GcmAndroid.isInForeground) {
                  console.log('receive gcm notification');
                 Notification.create({
                   subject: info.subject,
                   message: info.message,
                 });
               }
             });

       DeviceEventEmitter.addListener('sysNotificationClick', function(e) {
         console.log('sysNotificationClick', e);
       });

       GcmAndroid.requestPermissions();
     }
        render() {
            return (
                <Provider store={this.state.store}>
                    <App token={this.state.token} store={this.state.store} />
                </Provider>
            );
        }
    }
    return Root
}

export default setup;
