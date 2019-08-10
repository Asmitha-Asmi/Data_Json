import React, { Component } from 'react'
import { Text, View, StyleSheet,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HTMLView from 'react-native-htmlview';






class BlogMain extends React.Component {
   
   render() {
      const { navigation } = this.props;
      const recivedurl = navigation.getParam('blogUrl');
      const recivedTitle = navigation.getParam('blogTitle');
      const recivedSub = navigation.getParam('blogSub');
      const recivedCon = navigation.getParam('blogCon');
      const htmlContent=recivedCon

      return(
         
         <ScrollView>
         <View>
            <Text style={styles.heading}>
      {recivedTitle}
      </Text>
         <Text style={{textAlign: 'center'}}>
      {recivedSub}
      </Text>
       <Image
              style={styles.stretch}
              source={{uri:recivedurl}} 
            /> 
       <HTMLView
        value={htmlContent}
        stylesheet={styles1}
      />
      </View>
      </ScrollView>
      );
        
   }
   
}



export default BlogMain;

const styles1 = {
   p: {
      alignItems: 'center', 
      marginTop: 10,
      padding: 20,
     fontSize:25,
     textAlign:"justify",
   }
   
 }
 

const styles = StyleSheet.create ({
  
   
   stretch: {
      width: 500,
      height: 250
    },

   heading:{
      marginTop: 20,
      textAlign: 'center',
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30
   }
}
)