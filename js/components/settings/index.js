
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Image, View,Picker, Switch, TouchableOpacity, Platform, Keyboard, Dimensions } from 'react-native';

import {resetRoute} from '../../actions/route';
import {openDrawer} from '../../actions/drawer';
import Modal from 'react-native-simple-modal';
import {Container, Header, Content, Text, Button, Icon, Thumbnail, InputGroup, Input} from 'native-base';
import { Grid, Col, Row } from "react-native-easy-grid";

import theme from '../../themes/base-theme';
import styles from './styles';
import { ip } from '../../constants/constant';
const adressServer = ip;
var primary = require('../../themes/variable').brandPrimary;

class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hour : ['8','9','10','11','12','13','12','13','14','15','16','17','18','19'],
            minute :['00','15','30','45'],
            agenda :[{"day":"Monday","amOpening":{"hour":"kk","minute":""},"amClosing":{"hour":"","minute":""},"pmOpening":{"hour":"","minute":""},"pmClosing":{"hour":"","minute":""}}],
            monSwitch: false,
            tueSwitch: false,
            wedSwitch: false,
            thuSwitch: false,
            friSwitch: false,
            satSwitch: false,
            sunSwitch: false,
            Username: '',
            selectedValue:'',
            email: '',
            password: '',
            open: false,
            visibleHeight: Dimensions.get('window').height,
            offset: {
               x:40,
               y:40
        }
    };

    this.constructor.childContextTypes = {
        theme: React.PropTypes.object,
       }
    }
    modalO() {
        this.setState({open: true});
    }
    modalX() {
        this.setState({open: false});
    }
    componentWillMount () {
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    }

    keyboardWillShow (e) {
       let newSize = Dimensions.get('window').height - e.endCoordinates.height
       this.setState({offset :{y: 80}});
   }
   keyboardWillHide (e) {
        this.setState({offset :{y: 0}});
   }
   resetRoute(route) {
        this.props.resetRoute(route);
    }

    pickerTime(typeTime,time,partofday) {


      return(

        <Picker

          style = {{
            height: 50,
            flex: 2,
            borderWidth: 5,
            width:500,
          }}

             selectedValue={this.state.selectedValue}

            onValueChange = {(text) => {
                switch (partofday) {
                  case "amOpening":
                    switch (typeTime) {
                      case "hour":
                      {

                        this.setState({agenda: [].concat( {"day":this.state.agenda[0].day,"amOpening":{"hour":text,"minute": this.state.agenda[0].amOpening.minute},
                        "amClosing":this.state.agenda[0].amClosing,
                        "pmOpening":this.state.agenda[0].pmOpening,
                        "pmClosing":this.state.agenda[0].pmClosing}),selectedValue:this.state.agenda[0].amOpening.hour});
                      }
                        break;
                        case "minute":
                        {this.setState({agenda: [].concat({"day":this.state.agenda[0].day,"amOpening":{"hour": this.state.agenda[0].amOpening.hour,"minute":text},
                        "amClosing":this.state.agenda[0].amClosing,
                        "pmOpening":this.state.agenda[0].pmOpening,
                        "pmClosing":this.state.agenda[0].pmClosing}),selectedValue:this.state.agenda[0].amOpening.minute});
                      }
                          break;
                      }
                    break;
                case "amClosing":
                  switch (typeTime) {
                    case "hour":
                    {this.setState({agenda: [].concat({"day":this.state.agenda[0].day,"amOpening":this.state.agenda[0].amOpening,
                    "amClosing":{"hour":text,"minute": this.state.agenda[0].amClosing.minute},
                    "pmOpening":this.state.agenda[0].pmOpening,
                    "pmClosing":this.state.agenda[0].pmClosing}, ),selectedValue:this.state.agenda[0].amClosing.hour});
                     }
                      break;
                      case "minute":
                      {this.setState({agenda: [].concat( {"day":this.state.agenda[0].day,"amOpening":this.state.agenda[0].amOpening,
                      "amClosing":{"hour": this.state.agenda[0].amClosing.hour,"minute":text},
                      "pmOpening":this.state.agenda[0].pmOpening,
                      "pmClosing":this.state.agenda[0].pmClosing}),selectedValue:this.state.agenda[0].amClosing.minute});
                      }
                        break;
                    }
                break;
                case "pmOpening":
                  switch (typeTime) {
                    case "hour":
                    {this.setState({agenda:[].concat(
                      {"day":this.state.agenda[0].day,"amOpening":this.state.agenda[0].amOpening,
                       "amClosing":this.state.agenda[0].amClosing,
                       "pmOpening":{"hour":text,"minute": this.state.agenda[0].pmOpening.minute},
                       "pmClosing":this.state.agenda[0].pmClosing})
                  ,selectedValue:this.state.agenda[0].pmOpening.hour});
                     }
                      break;
                      case "minute":
                      {this.setState({agenda: [].concat({"day":this.state.agenda[0].day,"amOpening":this.state.agenda[0].amOpening,
                      "amClosing":this.state.agenda[0].amClosing,
                      "pmOpening":{"hour": this.state.agenda[0].pmOpening.hour,"minute":text},
                      "pmClosing":this.state.agenda[0].pmClosing}),selectedValue:this.state.agenda[0].pmOpening.minute});
                      }
                        break;
                    }
                break;
                case "pmClosing":
                  switch (typeTime) {
                    case "hour":
                    {this.setState({agenda: [].concat({"day":this.state.agenda[0].day,"amOpening":this.state.agenda[0].amOpening,
                    "amClosing":this.state.agenda[0].amClosing,
                    "pmOpening":this.state.agenda[0].pmOpening,
                    "pmClosing":{"hour":text,"minute": this.state.agenda[0].pmClosing.minute}}),selectedValue:this.state.agenda[0].pmClosing.hour});
                     }
                      break;
                      case "minute":
                      {this.setState({agenda: [].concat( {"day":this.state.agenda[0].day,"amOpening":this.state.agenda[0].amOpening,
                      "amClosing":this.state.agenda[0].amClosing,
                      "pmOpening":this.state.agenda[0].pmOpening,
                      "pmClosing":{"hour": this.state.agenda[0].pmClosing.hour,"minute":text}}),selectedValue:this.state.agenda[0].pmClosing.minute});
                      }
                        break;
                    }
                  break;
                }


          }

          }



        >

          {time.map((n,i) => {

            return <Picker.Item key={i} value={n} label={n}/>
          })}
        </Picker>



      );
  }

    agenda(){

            return (



            <View  >

                 <View style={Platform.OS === 'android' ? styles.aModalContentBox : styles.iosModalContentBox}>
                     <Grid style={{padding: 20,paddingBottom: 15}}>
                         <Col>
                             <Text style={Platform.OS === 'android' ? {fontSize: 12,marginTop: 5} : {fontSize: 12}}>{this.state.agenda[0].day}</Text>
                         </Col>
                     </Grid>
                 </View>
                 <View style={Platform.OS === 'android' ? styles.aModalContentBox : styles.iosModalContentBox}>
                     <Grid style={{padding: 20,paddingBottom: 15}}>
                         <Col>
                 <Text style={{flex: 3}}>opAm</Text>
                    </Col>
                     <Col>
                 {this.pickerTime("hour",this.state.hour,"amOpening")}
                  </Col>
                   <Col>
                 <Text style={{flex: 0.2}}>:</Text>
                  </Col>
                   <Col>
                 {this.pickerTime("minute",this.state.minute,"amOpening")}
                  </Col>
                   <Col>
                 <Text style={{flex: 3}}>closAm</Text>
                  </Col>
                   <Col>
                 {this.pickerTime("hour",this.state.hour,"amClosing")}
                  </Col>
                   <Col>
                 <Text style={{flex: 0.2}}>:</Text>
                  </Col>
                   <Col>
                 {this.pickerTime("minute",this.state.minute,"amClosing")}
                  </Col>
                  </Grid>
                  <Grid style={{padding: 20,paddingBottom: 15}}>
                      <Col>
              <Text style={{flex: 3}}>opPm</Text>
                 </Col>
                  <Col>
              {this.pickerTime("hour",this.state.hour,"pmOpening")}
               </Col>
                <Col>
              <Text style={{flex: 0.2}}>:</Text>
               </Col>
                <Col>
              {this.pickerTime("minute",this.state.minute,"pmOpening")}
               </Col>
                <Col>
              <Text style={{flex: 3}}>closPm</Text>
               </Col>
                <Col>
              {this.pickerTime("hour",this.state.hour,"pmClosing")}
               </Col>
                <Col>
              <Text style={{flex: 0.2}}>:</Text>
               </Col>
                <Col>
              {this.pickerTime("minute",this.state.minute,"pmClosing")}
               </Col>
               </Grid>

                 <Grid>
                     <Col>
                         <Button transparent style={styles.roundedButton} onPress={() => this.toServer()}>
                             <Icon name="ios-cloud-upload-outline" style={Platform.OS === 'android' ? {} : {lineHeight: 0}} />
                         </Button>
                     </Col>
                  </Grid>
                   </View>
              </View>

            );



       }

       toServer()
    {

       fetch(adressServer + "agenda/agendaUpdate", {method: "POST", body: JSON.stringify({
           agenda: this.state.agenda


         })})
         .then((response) => response.json())
         .then((responseData) => {

           }

             )
         .done();
   }


    render() {
        return (
            <Container theme={theme} >
                <Image source={require('../../../images/glow2.png')} style={styles.container} >
                    <Header>
                        <Button transparent onPress={this.props.openDrawer}  style={Platform.OS === 'android' ? styles.aheaderIcon : styles.iosheaderIcon}>
                            <Icon name="ios-menu" />
                        </Button>

                        <Image source={require('../../../images/Header-Logo.png')} style={styles.logoHeader} />

                        <Button transparent style={Platform.OS === 'android' ? styles.aheaderIcon : styles.iosheaderIcon} onPress={() => this.resetRoute('login')}>
                            <Icon name="ios-power" style={Platform.OS === 'android' ? {paddingBottom: 10,marginTop: 8} : {}}/>
                        </Button>
                    </Header>

                    <Content contentOffset={this.state.offset} scrollEnabled={true} >
                        <View  style={styles.bg}>
                            <Text style={styles.signupHeader}>SETTINGS</Text>
                            <View style={{marginTop: 20}}>
                                <Grid>
                                    <Col>
                                        <Button transparent style={styles.roundedButton}>
                                            <Icon name="ios-cloud-upload-outline" style={Platform.OS === 'android' ? {} : {lineHeight: 0}} />
                                        </Button>
                                    </Col>
                                    <Col>
                                        <TouchableOpacity style={{alignSelf: 'center'}}>
                                            <Thumbnail source={require('../../../images/contacts/sanket.png')} style={Platform.OS === 'android' ? styles.aProfilePic : styles.iosProfilePic} />
                                        </TouchableOpacity>
                                    </Col>
                                    <Col>
                                        <Button transparent style={styles.roundedButton}>
                                            <Icon name="ios-cloud-download-outline" style={Platform.OS === 'android' ? {} : {lineHeight: 0}} />
                                        </Button>
                                    </Col>
                                </Grid>
                            </View>
                            <View style={styles.signupContainer}>
                                <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                    <Icon name="ios-person-outline" />
                                    <Input placeholder="Username"  style={styles.input}/>
                                </InputGroup>
                                <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                    <Icon name="ios-mail-open-outline" />
                                    <Input placeholder="Email"  style={styles.input}/>
                                </InputGroup>
                                <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                    <Icon name="ios-unlock-outline" />
                                    <Input placeholder="Password" secureTextEntry={true}  style={styles.input}/>
                                </InputGroup>
                            </View>
                        </View>
                        <View style={styles.notificationSwitchContainer}>
                            <Text style={styles.notificationHeader}>EMAIL NOTIFICATIONS</Text>
                            <View>
                                <Grid>
                                    <Col>
                                        <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Monday</Text>
                                    </Col>
                                    <Col style={Platform.OS === 'android' ? styles.aswitchContainer : styles.switchContainer}>
                                        <Switch
                                            onValueChange={(value) => this.setState({monSwitch: value,open: !this.state.open,agenda: [].concat({"day":"monday","amOpening":this.state.agenda[0].amOpening,
                                            "amClosing":this.state.agenda[0].amClosing,
                                            "pmOpening":this.state.agenda[0].pmOpening,
                                            "pmClosing": this.state.agenda[0].pmClosing})})}
                                            onTintColor={primary}
                                            style={Platform.OS === 'android' ? styles.aswitch : styles.switch}
                                            thumbTintColor="#ccc"
                                            tintColor="#aaa"
                                            value={this.state.monSwitch} />
                                    </Col>
                                </Grid>
                                <Grid>
                                    <Col>
                                        <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Tuesday</Text>
                                    </Col>
                                    <Col style={Platform.OS === 'android' ? styles.aswitchContainer : styles.switchContainer}>
                                        <Switch
                                            onValueChange={(value) => this.setState({tueSwitch: value , open: !this.state.open,agenda: [].concat({"day":"tuesday","amOpening":this.state.agenda[0].amOpening,
                                            "amClosing":this.state.agenda[0].amClosing,
                                            "pmOpening":this.state.agenda[0].pmOpening,
                                            "pmClosing": this.state.agenda[0].pmClosing})})}
                                            onTintColor={primary}
                                            style={Platform.OS === 'android' ? styles.aswitch : styles.switch}
                                            thumbTintColor="#ccc"
                                            tintColor="#aaa"
                                            value={this.state.tueSwitch} />
                                    </Col>
                                </Grid>
                                <Grid>
                                    <Col>
                                        <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Wednesday</Text>
                                    </Col>
                                    <Col style={Platform.OS === 'android' ? styles.aswitchContainer : styles.switchContainer}>
                                        <Switch
                                            onValueChange={(value) => this.setState({wedSwitch: value, open: !this.state.open,agenda: [].concat({"day":"wednesday","amOpening":this.state.agenda[0].amOpening,
                                            "amClosing":this.state.agenda[0].amClosing,
                                            "pmOpening":this.state.agenda[0].pmOpening,
                                            "pmClosing": this.state.agenda[0].pmClosing})})}
                                            onTintColor={primary}
                                            style={Platform.OS === 'android' ? styles.aswitch : styles.switch}
                                            thumbTintColor="#ccc"
                                            tintColor="#aaa"
                                            value={this.state.wedSwitch} />
                                    </Col>
                                </Grid>
                                <Grid>
                                    <Col>
                                        <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Thursday</Text>
                                    </Col>
                                    <Col style={Platform.OS === 'android' ? styles.aswitchContainer : styles.switchContainer}>
                                        <Switch
                                            onValueChange={(value) => this.setState({thuSwitch: value , open: !this.state.open,agenda: [].concat({"day":"thuresday","amOpening":this.state.agenda[0].amOpening,
                                            "amClosing":this.state.agenda[0].amClosing,
                                            "pmOpening":this.state.agenda[0].pmOpening,
                                            "pmClosing": this.state.agenda[0].pmClosing})})}
                                            onTintColor={primary}
                                            style={Platform.OS === 'android' ? styles.aswitch : styles.switch}
                                            thumbTintColor="#ccc"
                                            tintColor="#aaa"
                                            value={this.state.thuSwitch} />
                                    </Col>
                                </Grid>
                                <Grid>
                                    <Col>
                                        <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Friday</Text>
                                    </Col>
                                    <Col style={Platform.OS === 'android' ? styles.aswitchContainer : styles.switchContainer}>
                                        <Switch
                                            onValueChange={(value) => this.setState({friSwitch: value, open: !this.state.open,agenda: [].concat({"day":"Friday","amOpening":this.state.agenda[0].amOpening,
                                            "amClosing":this.state.agenda[0].amClosing,
                                            "pmOpening":this.state.agenda[0].pmOpening,
                                            "pmClosing": this.state.agenda[0].pmClosing})})}
                                            onTintColor={primary}
                                            style={Platform.OS === 'android' ? styles.aswitch : styles.switch}
                                            thumbTintColor="#ccc"
                                            tintColor="#aaa"
                                            value={this.state.friSwitch} />
                                    </Col>
                                </Grid>
                                <Grid>
                                    <Col>
                                        <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Saturday</Text>
                                    </Col>
                                    <Col style={Platform.OS === 'android' ? styles.aswitchContainer : styles.switchContainer}>
                                        <Switch
                                            onValueChange={(value) => this.setState({satSwitch: value , open: !this.state.open,agenda: [].concat({"day":"saturday","amOpening":this.state.agenda[0].amOpening,
                                            "amClosing":this.state.agenda[0].amClosing,
                                            "pmOpening":this.state.agenda[0].pmOpening,
                                            "pmClosing": this.state.agenda[0].pmClosing})})}
                                            onTintColor={primary}
                                            style={Platform.OS === 'android' ? styles.aswitch : styles.switch}
                                            thumbTintColor="#ccc"
                                            tintColor="#aaa"
                                            value={this.state.satSwitch} />
                                    </Col>
                                </Grid>
                                <Grid>
                                    <Col>
                                        <Text style={Platform.OS === 'android' ? styles.aswitchText : styles.switchText}>Sunday</Text>
                                    </Col>
                                    <Col style={Platform.OS === 'android' ? styles.aswitchContainer : styles.switchContainer}>
                                        <Switch
                                            onValueChange={(value) => this.setState({sunSwitch: value , open: !this.state.open,agenda: [].concat({"day":"sunday","amOpening":this.state.agenda[0].amOpening,
                                            "amClosing":this.state.agenda[0].amClosing,
                                            "pmOpening":this.state.agenda[0].pmOpening,
                                            "pmClosing": this.state.agenda[0].pmClosing})})}
                                            onTintColor={primary}
                                            style={Platform.OS === 'android' ? styles.aswitch : styles.switch}
                                            thumbTintColor="#ccc"
                                            tintColor="#aaa"
                                            value={this.state.sunSwitch} />
                                    </Col>
                                </Grid>
                            </View>
                        </View>
                    </Content>
                    <Modal
                    offset={this.state.offset}
                    open={this.state.open}
                    modalDidOpen={() => console.log('modal did open')}
                    modalDidClose={() => this.setState({open: false})}
                    style={styles.modal}>

                    <View>
                     {this.agenda()}
                    </View>
                    </Modal>
                </Image>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        resetRoute:(route)=>dispatch(resetRoute(route))
    }
}

export default connect(null, bindAction)(Settings);
