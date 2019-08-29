import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import ActionBar from 'react-native-action-bar';
import Helper from './helper';

const COLUMNS=2;
const SCREEN_HEIGHT=Dimensions.get('window').height;
const SCREEN_WIDTH=Dimensions.get('window').width;
const GRIDVIEW_ITEM_WIDTH_DIVIDER = 2;

const URL_p1="https://gist.githubusercontent.com/dsandin/7b7cd2b834abd8c10908803cac5d1dd3/raw/9a8c0270e0f7a778409b2996419bacdbb06edc87/users_page1";
const URL_p2="https://gist.githubusercontent.com/dsandin/e451f042d2b78143141ea8ea7d97b03f/raw/9847b174d0f5f61701ad64ab73be568270eea3a3/users_page2";
const URL_p3="https://gist.githubusercontent.com/dsandin/459ac3c73b5ea2a2c0b09015de85d930/raw/fc8af8115057bec36561e799aaf5a47ca12521b8/users_page3";


var helper;
var customData = [];

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        showListView: true,
        showGridView: false,
        fetchingData: true,
    };
  }

/* ----------------------------------------------------------------------------- */

  componentDidMount(){
    let customData_p1 = [];
    let customData_p2 = [];
    let customData_p3 = [];
    helper = new Helper();
    helper.fetchDataFromURL(URL_p1)
      .then((response) => {customData_p1.push(response)});
      helper.fetchDataFromURL(URL_p2)
        .then((response) => {customData_p2.push(response)});
        helper.fetchDataFromURL(URL_p3)
          .then((response) =>
          {
            customData_p3.push(response);
            // once all data is fetched, change 'fetchingData' state
            this.setState({fetchingData: false},()=>
              {
                customData = customData_p1[0].concat(customData_p2[0],customData_p3[0]);
                this.setState({data: customData});
              })
          });
  }

/* ----------------------------------------------------------------------------- */

  _onPressItem = () => {
    console.log('open item');
  }

/* ----------------------------------------------------------------------------- */

  // render list view
  renderItemListView({ item, index }) {
    return (
      <TouchableOpacity onPress={this._onPressItem}>
        <View style={{ flex: 1, flexDirection: 'row', backgroundColor: item.backgroundColor }}>
          <Image style={{ width: 100, height: 100 }} source={{ uri: item.avatar }} />
          <View style={{
            flex: 1,
            paddingLeft: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
            <Text>{item.first_name} {item.last_name}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>);
  }

/* ----------------------------------------------------------------------------- */

  // render grid view
  renderItemGridView({ item, index }) {
    return (
      <TouchableOpacity onPress={this._onPressItem} style={{width: SCREEN_WIDTH / GRIDVIEW_ITEM_WIDTH_DIVIDER, flex: 1}}>
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: item.backgroundColor, padding: 10 }}>
          <Image style={{ width: SCREEN_WIDTH / GRIDVIEW_ITEM_WIDTH_DIVIDER, height: 100 }} source={{ uri: item.avatar }} />
          <View style={{
            flex: 1,
            padding: 10,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{marginBottom: 10}}>{item.first_name} {item.last_name}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      </TouchableOpacity>);
  }

  render() {
    // render 'ActivityIndicator' while fetching data from URL
    if(this.state.fetchingData){
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <ActionBar
          containerStyle={styles.bar}
          title={'User List'}
          rightIcons={[
            {
              image: require('./resources/img/grid.png'),
              onPress: () => {this.setState({showGridView: true, showListView: false, data: customData})},
            },
            {
              image: require('./resources/img/list.png'),
              onPress: () => {this.setState({showGridView: false, showListView: true, data: customData})},
            },
            {
              image: require('./resources/img/sort_az.png'),
              onPress: () => {this.setState({data: helper.getDataA_Z(customData)})},
            },
            {
              image: require('./resources/img/sort_za.png'),
              onPress: () => {this.setState({data: helper.getDataZ_A(customData)})},
            },
            {
              image: require('./resources/img/avatar.png'),
              onPress: () => {this.setState({data: helper.getFilteredData(customData)})},
            },
          ]}
        />
      {/* show data in list view */}
        {
          (this.state.showListView ) && (
            <FlatList
              contentContainerStyle={styles.list}
              data={this.state.data}
              renderItem={this.renderItemListView}
            />
            )
        }
      {/* show data in grid view */}
      {
        (this.state.showGridView ) && (
          <FlatList
            numColumns={COLUMNS}
            contentContainerStyle={styles.list}
            data={this.state.data}
            renderItem={this.renderItemGridView}
          />
          )
      }
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }, list: {
    justifyContent: 'center'
  }
});
