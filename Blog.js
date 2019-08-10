import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, ScrollView,TouchableOpacity,TextInput,ActivityIndicator,Button } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import HTMLView from 'react-native-htmlview';

class Blog extends Component {


  
  constructor(props) {
    super(props);
    this.state = ({
      isLoading:true,
      dataSource:null,
      id:'',
      numOfLines: 0
    });
   
  }
  

  
  componentDidMount() {
    return fetch("https://raw.githubusercontent.com/Asmitha-Asmi/Data_Json/master/blog.json")
    .then((response) => response.json())
    .then((responseJson)=>{
        this.setState({
          isLoading:false,
          dataSource: responseJson,
        })
    })
    .catch((error) => {
      console.log(error)
    });
}



    render() {
      if(this.state.isLoading){
        return(
         <View style={styles.container}>
           <ActivityIndicator/>
         </View>
        )
      }else{
        let blog = this.state.dataSource.map((val,key)=>{
          const htmlContent=val.content

          return ( 
                   
          <View key={key} >     
      <Card >
    
          <CardImage 
          source={{uri:val.url}}  
          title={val.title}
        /> 
        
        
        
        <CardTitle
          subtitle={val.subject}
        />
        <CardContent>
        
           <HTMLView
        value={htmlContent}
        stylesheet={styles1}
        nodeComponentProps={{numberOfLines: 2}}
      />
        </CardContent>
        <CardAction 
          separator={true} 
          inColumn={false}>
  
          <CardButton
            onPress={() => this.props.navigation.navigate('Blog2',{blogUrl:val.url,blogTitle:val.title,blogSub:val.subject,blogCon:val.content})}
            title="Explore"
            color="#841584"
            />
           
        </CardAction>
      </Card>


           </View>)
        });
        return (
            
          
            
             <View > 
             
             <ScrollView>
            <Image
              style={styles.stretch}
              source={require('../Images/bev.jpg')}
            />
             <Text style={styles.header}>Recent Blogs</Text> 
            
     {blog}
  
    </ScrollView>
          </View>
       
        );
      }
  }
}

const styles1 = {
  p: {
    fontSize:25,
    textAlign:"justify",
  }
  
}

  const styles = StyleSheet.create({
    container: {
     
      alignItems: 'center',
      justifyContent: 'center',
    },
    read:{
      fontSize:20
    },
    stretch: {
        width: 600,
        height: 250
      },
      header: {
        fontSize: 28,
        fontFamily: 'vincHand'
      },
      texts:{
fontSize:25
      }
     
     
      
  });

export default Blog;