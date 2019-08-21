import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, ScrollView,YellowBox ,ActivityIndicator,Picker,Button,Alert} from 'react-native';
import { Menu, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

import DropdownMenu from 'react-native-dropdown-menu';

import DropDownItem from 'react-native-drop-down-item';



const IC_ARR_DOWN = require('../Images/ic_arr_down.png');
const IC_ARR_UP = require('../Images/ic_arr_up.png');


class FAQs extends Component {
  constructor(props) {
    super(props);
    this.state = ({
      isLoading:true,
      abc:[],
      PickerValueHolder : '',
      dataSource:''
    });
   
  }


 

  Insert_Data_Into_MySQL = ( PickerValueHolder) =>
  {
    this.setState({PickerValueHolder: PickerValueHolder})
     
       return fetch('http://b0f864d1.ngrok.io/faq/display',
          {
              method: 'POST',
              headers: 
              {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(
              {
                category : this.state.PickerValueHolder
              })

          })
          .then((response) => response.json())
          .then((responseJson) =>
          {
            this.setState({
              isLoading:false,
              //abc: responseJson
            }
          )
            this.setState({abc:responseJson})
            console.warn(this.state.abc)
         })

          
  }

    
    componentDidMount() {
      return fetch("http://b0f864d1.ngrok.io/faq/distinct")
      .then((response) => response.json())
      .then((responseJson)=>{
          this.setState({
            isLoading:false,
            dataSource: responseJson,
          })
          console.warn(this.state.dataSource)
      })
      .catch((error) => {
        console.log(error)
      });
     
  }

  GetPickerSelectedItemValue=()=>{
 
    Alert.alert(this.state.PickerValueHolder);

  }


 render() {
   if(this.state.isLoading){
     return(
      <View style={styles.container}>
        <ActivityIndicator/>
      </View>
     )
   }else{
     let faq = this.state.abc.map((val,key)=>{
       return (        
       <View key={key} >

<Card style={{flex:1, backgroundColor:'#eeeeee'}} >
      
        <CardContent header style={{backgroundColor:'#b0c1df'}}>

        <Text style={styles.ques}>Q:{val.question}</Text>

</CardContent>
<CardContent>
     <Text style={styles.ans}>A:{val.answer}</Text>
          </CardContent>
        <CardAction 
          separator={true} 
          inColumn={false}>
  
        </CardAction>
      </Card>
  
        </View>)
     });
     
    // let data= this.state.dataSource.map((val)=>{
    //   return(
    //     <View>
    //       <Text>{val}</Text>
    //     </View>
    //   )
    //  });
     


     return(
    
          <View >
          
          <ScrollView>
          <View style={styles.MainContainer}> 
          <Picker
                        selectedValue={this.state.PickerValueHolder}
                        onValueChange={this.Insert_Data_Into_MySQL}
                        // onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} 
                >        
        {  this.state.dataSource.map( (val) => (
                       <Picker.Item label={val}  value={val}  />
                    ))
        }
                                </Picker>

          {/* <Picker
          selectedValue={this.state.PickerValueHolder}
          onValueChange={(itemValue, itemIndex) => this.setState({PickerValueHolder: itemValue})} >
          <Picker.Item label={data}  value={data}  />
          </Picker>  */}

 {/* <Text>{this.state.dataSource}</Text>  */}

          {/* <Button title="Apply" onPress={ this.Insert_Data_Into_MySQL } /> */}

          </View>

          {faq}
          </ScrollView>
          </View>
    );
  }
       

}
}
 

export default FAQs;

const styles = StyleSheet.create({
  ques:{
    padding: 2, 
    fontSize: 22

  },
  ans:{
    padding: 2, 
    fontSize: 20

  },
  
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 60
  },
  
  headerText: {
    fontSize: 20,
    margin: 10,
    fontWeight: "bold"
  },
    menuContent: {
      color: "#000",
      fontWeight: "bold",
      padding: 2,
      fontSize: 20
    },
    
    header: {
      width: '100%',
      paddingVertical: 8,
      paddingHorizontal: 12,
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTxt: {
      fontSize: 12,
      color: 'rgb(74,74,74)',
      marginRight: 60,
      flexWrap: 'wrap',
    },
    txt: {
      fontSize: 14,
    },
    
});
