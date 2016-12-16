
'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Keyboard, Image, Platform, Dimensions, Picker, Switch, TouchableOpacity } from 'react-native';

import {popRoute} from '../../actions/route';
import { ip } from '../../constants/constant';
import {Container, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';

import theme from '../login/login-theme';
import styles from './styles';

const adressServer = ip;

class SignUp extends Component {

    constructor(props) {
        super(props);

        navigator.geolocation.getCurrentPosition(
          (position) => {
           var initial = JSON.stringify(position);
            this.setState({
              longitude: position.coords.longitude,
              latitude: position.coords.latitude,
              GpsMsg: 'take your current position as your workplace?',
              Gps: true
            });
          },
          (error) => {
            this.setState({GpsMsg: 'We could not take your position.\nSet it in the setting menu.', Gps: false, switchPosition: false});

          },
          {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
        );

        fetch(adressServer + "job/job", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData.job);
          responseData.job.map( (s) => {
            this.state.jobList.push(s)
          });
          //  this.setState({jobList:responseData.job});

        })
        .done();

        this.state = {
            Gps: false,
            GpsMsg:'',
            professionalboolean: false,
            switchPosition: true,
            firstName:'',
            lastName: '',
            email: '',
            telephone: '',
            username: '',
            password: '',
            confirmPassword: '',
            job: '',
            sector: '',
            error: '',
            errors: [{msg:'', param:''}],
            sectorList: [{'sectorId':'','sectorName':''}],
            jobList:[{'jobName':'Select Job','sectors':['Select Sector']}],
            longitude: '',
            latitude: '',
            aa: '',
            visibleHeight: Dimensions.get('window').height,
            offset: {
                x:0,
                y:0
            }
        };

        this.constructor.childContextTypes = {
            theme: React.PropTypes.object,
        }
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

    popRoute() {
        this.props.popRoute();
    }

    switcherProfessional(value) {
      this.setState({
        professionalboolean: value,
        job: '',
        sector: '',
      });
    }

    //If professional show picker to choose job and sector:
    /************************** jobForm() jobformchange(text) sectorPicker() ***/
    jobForm() {
      if(this.state.professionalboolean){
        return(
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <Icon name="ios-person-outline" />
          <Picker
              style={{
                height: 50,
                flex: 4,
                borderWidth: 5,
                width:50,
              }}
              selectedValue={this.state.job}
              onValueChange={(text) => this.jobformchange(text)}>

                {this.state.jobList.map((s,id) => {

                  return <Picker.Item  key={id} value={s.id} label={s.jobName}/>
                })}


            </Picker>
            <Icon name="ios-person-outline" />
            {this.sectorPicker()}
            </View>

        );
      }
    }

    jobformchange(text) {
        this.setState({job: text});
        this.setState({
          sector: ''
        });
    }

    sectorPicker() {
        return(this.state.jobList.map( (job, id) => {
          if(job.id == this.state.job){
            return(
              <Picker
                key={id}
                style={{
                  height: 50,
                  flex: 4,
                  borderWidth: 5,
                  width:50,
                }}

                onValueChange={(text) => this.setState({sector: text})}
                selectedValue={this.state.sector}>
                {job.sectors.map((n, id) => {

                  return <Picker.Item key={id}  value={n} label={n}/>
                })}

              </Picker>

            );
          }

      }));
    }

//Choose if your position will be token
    position(){
      if(this.state.professionalboolean){
        if(this.state.Gps){
          return(
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Switch
               onValueChange={(value) => this.setState({switchPosition: value})}
               style={{flex: 1}}
               value={this.state.switchPosition}
            />
            <Text style={{flex: 4}}>{this.state.GpsMsg}</Text>
            </View>
          );
        }else{
          return(
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <Text>{this.state.GpsMsg}</Text>
            </View>
          );
        }
      }
    }

//Button SignUp Action:
    onPressSignup() {
      if(this.state.firstName == '' || this.state.lastName == '' || this.state.email == '' || this.state.telephone == '' || this.state.username == '' || this.state.password == ''){
        this.setState({
          error: '(*) required field!'
        })
      }
      else{
        if(this.state.password == this.state.confirmPassword){
          if(!this.state.switchPosition){
            this.setState({
              longitude: '',
              latitude: '',
            })
          }
          fetch(adressServer + "user/signup", {method: "POST", body: JSON.stringify({
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              telephone: this.state.telephone,
              job:this.state.job,
              sector: this.state.sector,
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
              professionalboolean: this.state.professionalboolean,
              adress: 'adress',
              longitude: this.state.longitude,
              latitude: this.state.latitude

            })})
            .then((response) => response.json())
            .then((responseData) => {
              console.log(responseData.errors);
              if(!responseData.next)
              {
                this.setState({errors:responseData.errors});
              }
              else {
                this.setState({errors: [{msg:'', param:''}]});
                // this.props.setUser(responseData.user);
                // this.setState({aa: this.props.user.firstName })
                this.replaceRoute('login');
              }
              }

                )
            .done();
        }
        else{
          this.setState({
            error: 'confirm password does not match!',
          });
        }
      }


    }

    render() {
        return (
            <Container>
                <Content contentOffset={this.state.offset} scrollEnabled={true}>
                    <View theme={theme}>
                        <Image source={require('../../../images/sin.png')} style={styles.background} >
                            <Content padder>
                                <Text style={Platform.OS === 'android' ? styles.asignupHeader : styles.signupHeader}>CREATE ACCOUNT</Text>
                                <View style={Platform.OS === 'android' ? styles.asignupContainer : styles.signupContainer}>

                                <Text>{this.state.error}</Text>
                                  <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                        <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                            <Icon name="ios-person-outline" />
                                            <Input placeholder="*First name"  style={styles.input} onChangeText={(text) => this.setState({firstName: text})} value={this.state.firstName}/>
                                        </InputGroup>

                                        <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                            <Icon name="ios-person-outline" />
                                            <Input placeholder="*Last name"  style={styles.input} onChangeText={(text) => this.setState({lastName: text})} value={this.state.lastName}/>
                                        </InputGroup>

                                    </View>

                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                        <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                            <Icon name="ios-mail-open-outline" />
                                            <Input placeholder="*Email"  style={styles.input} onChangeText={(text) => this.setState({email: text})} value={this.state.email}/>
                                        </InputGroup>

                                    </View>

                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                        <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                            <Icon name="ios-phone-portrait-outline" />
                                            <Input placeholder="*Telephone"  style={styles.input} onChangeText={(text) => this.setState({telephone: text})} value={this.state.telephone}/>
                                        </InputGroup>

                                        <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                            <Icon name="ios-person-outline" />
                                            <Input placeholder="*Username"  style={styles.input} onChangeText={(text) => this.setState({username: text})} value={this.state.username}/>
                                        </InputGroup>

                                    </View>

                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                        <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                            <Icon name="ios-unlock-outline" />
                                            <Input placeholder="*Password" secureTextEntry={true}  style={styles.input} onChangeText={(text) => this.setState({password: text})} value={this.state.password}/>
                                        </InputGroup>

                                        <InputGroup borderType="rounded" style={Platform.OS === 'android' ? styles.inputGrp : styles.iosInputGrp}>
                                            <Icon name="ios-unlock-outline" />
                                            <Input placeholder="*Confirm your Password" secureTextEntry={true}  style={styles.input} onChangeText={(text) => this.setState({confirmPassword: text})} value={this.state.confirmPassword}/>
                                        </InputGroup>

                                    </View>

                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                      <Switch
                                         onValueChange={(value) => this.switcherProfessional(value)}
                                         style={{ flex: 1}}
                                         value={this.state.professionalboolean}
                                      />

                                      <TouchableOpacity  style={{flex:1}} onPress={()=>{var b = this.state.professionalboolean; this.setState({professionalboolean: !b});}}>

                                        <Text style={{flex:1}}>Professional?</Text>

                                      </TouchableOpacity>
                                      <View style={{flex:1}}></View>

                                    </View>

                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>

                                      {this.jobForm()}

                                    </View>


                                      {this.position()}


                                      <Button rounded transparent  block large style={styles.signupBtn} textStyle={Platform.OS === 'android' ? {alignSelf: 'center',marginTop: 7,fontSize: 14,fontWeight: 'bold'} : {marginTop: -12,fontSize: 14,fontWeight: 'bold'}}   onPress={() => this.onPressSignup()}>
                                          Continue
                                      </Button>
                                      <TouchableOpacity>
                                          <Text style={styles.termsText}>Terms & Conditions</Text>
                                      </TouchableOpacity>
                                </View>
                            </Content>
                        </Image>
                    </View>
                </Content>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(SignUp);
