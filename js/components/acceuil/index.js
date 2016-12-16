
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Dimensions} from 'react-native';
import { Container, Header, Title, Content, Text, Button, Icon,Picker, InputGroup, Input, ListItem, List } from 'native-base';
import { openDrawer } from '../../actions/drawer';
import { popRoute } from '../../actions/route';
import { replaceRoute } from '../../actions/route';
import { ip } from '../../constants/constant';
import MapView from 'react-native-maps';


import theme from '../../themes/base-theme';

const adressServer = ip;

var screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;

const LATITUDE_DELTA = 0.00922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Acceuil extends Component {
  constructor(props) {
      super(props);

      navigator.geolocation.getCurrentPosition(
        (position) => {
         var initial = JSON.stringify(position);
          this.setState({longitude: position.coords.longitude });
          this.setState({latitude: position.coords.latitude });
        },
        (error) => {
          this.setState({longitude: 122.4324});
          this.setState({latitude: 77.78825 });
        },
        {enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
      );

      this.state = {

          scroll: false,
          job:'',
          sector: '',
          nom: '',
          jobList:[{'jobName':'','sectors':['']}],
          usersList:[''],
          usersListError:'',
          usersListboolen: true,
          latitude: 37.78825,
          longitude: -122.4324
      };
      //get position


      //Upload List of Jobs and sectors:
      try {
        fetch(adressServer + "job/job", {method: "GET"})
        .then((response) => response.json())
        .then((responseData) => {
           this.setState({jobList:responseData.job});

        })
        .done();
      }
      catch(err) {

      }
  }
  goToAgenda() {
    try {
      fetch(adressServer + "agenda/agenda", {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
         if(!responseData.next)
         {
           this.replaceRoute('login');
         }

      })
      .done();
    }
    catch(err) {

    }
  }
  onPressRechercher() {
    fetch(adressServer + "user/acceuil", {method: "POST", body: JSON.stringify({
        job:this.state.job,
        sector:this.state.sector,
        nom: this.state.nom,


      })})
      .then((response) => response.json())
      .then((responseData) => {
        if(responseData.errorb){
          this.setState({
            usersList: responseData.usersList,
            usersListError: '',
            usersListboolen: true,
          });

        }
        else{
          this.setState({
            usersList: [''],
            usersListError: responseData.err,
            usersListboolen: false,
          });

        }
        }

          )
      .done();
  }

    popRoute() {
        this.props.popRoute();
    }
    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    pickerSector() {
      try{


      var a = this.state.jobList.map((s) => {
        if (this.state.job == ''){
          return (<Text> job vide </Text>);
        }
        if(s.id == this.state.job) {
          return(
            <Picker
              style={{
                height: 50,
                flex: 1,
                borderWidth: 5,
                width:500,
              }}

              onValueChange={(text) => this.setState({sector: text})}
              selectedValue={this.state.sector}>

              {s.sectors.map((n) => {

                return <Picker.Item  value={n} label={n}/>
              })}
            </Picker>

          );
        }

      })  } catch(err){

      }
      if (a){
        return a;
      }


      return(
        <Picker
          style={{
            height: 50,
            flex: 1,
            borderWidth: 5,
            width:5000,
          }}
          >
            <Picker.Item  value={'select sector'} label={'select sector'}/>
        </Picker>
      );

    }


    usersListView(){
      if(this.state.usersListboolen){
         var a = this.state.usersList.map((user) => {
          var a = '';
          this.state.jobList.map((job) => {
            if(job.id == user.job){
              a = job.jobName;
            }
          });
          return(
            <ListItem>
              <Button transparent onPress={() => this.goToAgenda()}>
                  <Text>{user.firstName} {user.lastName} {a} {user.sector}</Text>
              </Button>
            </ListItem>
          );
        });
        return a ;
      }
      else if(!this.state.usersListboolen){
        return (
          <ListItem>
            <Text>{this.state.usersListError}</Text>
          </ListItem>
        );
      }
      else {
        return(
          <ListItem> Rechecher svp ... ! </ListItem>
        );
      }

    }

    render() {

        return (

            <Container theme={theme} style={{backgroundColor: '#565051'}}>
                <Header style={{backgroundColor: '#322A2A'}} foregroundColor="#fff">
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back" />
                    </Button>

                    <Title>acceuil</Title>

                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                </Header>

                    <Content>

                    <MapView
                      style={
                        {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                        }
                      }
                      region={{
                       latitude: this.state.latitude,
                       longitude: this.state.longitude,
                       latitudeDelta: LATITUDE_DELTA,
                       longitudeDelta: LONGITUDE_DELTA,
                     }}
                    >
                    <MapView.Marker
                      key={'11'}
                      coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,

                      }}
                      pinColor={'#124578'}
                    >
                    </MapView.Marker>
                    <MapView.Marker
                      key={'11'}
                      coordinate={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,

                      }}
                      pinColor={'#12ff78'}
                    >
                    </MapView.Marker>
                    </MapView>
                        <View >



                                  <View >
                                  <Picker
                                    style={{
                                      height: 50,
                                      flex: 1,
                                      borderWidth: 5,
                                      width:500,
                                    }}
                                    selectedValue={this.state.job}
                                    onValueChange={(text) => this.setState({job: text})}>

                                      {this.state.jobList.map((s) => {
                                        return <Picker.Item  value={s.id} label={s.jobName}/>
                                      })}


                                  </Picker>
                              {this.pickerSector()}



                                  </View>



                              <InputGroup  >
                                    <Icon name="ios-person" />
                                    <Input
                                      placeholder="Nom"
                                      onChangeText={(text) => this.setState({nom: text})}
                                      value={this.state.nom}
                                    />
                                </InputGroup>
                                  <Button onPress={() => this.onPressRechercher()}>
                                      Rechercher
                                  </Button>
                                  <Text>
                                      longitude: {this.state.longitude}
                                  </Text>
                                  <Text>
                                      longitude: {this.state.latitude}
                                  </Text>

                              </View>


                              <List>
                                {this.usersListView()}

                              </List>



                    </Content>


            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Acceuil);
