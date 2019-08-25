import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { Card, Icon,Image,Button } from 'semantic-ui-react'
import './Component/check.css'

export default class App extends React.Component
{
  constructor(props)
  {
      super(props);
      this.state={
          checked:false,
          data:[],
          idata:[],
          isLoaded: true
  
      }
  }

componentDidMount(){
 return fetch('http://bb1341ea.ngrok.io/list')
.then(res=>res.json())
// .then(res=>console.log(res));
.then(json => {
this.setState({
isLoaded:false,
data:json,
})
});
}

sendResponse(item){
  fetch('http://bb1341ea.ngrok.io/json',{
    method:'POST',
    headers:{
      Accept:'application/json',
      'content-Type':'application/json'
      },
      body:JSON.stringify(item),
  }
).then(response=>{
  const statusCode= response.status;
  this.componentDidMount()
})
}
render(){
  return (


<div className='abc'>
<section class="container"  >
 
  
  <div class="left-half">
 
   <Card
    style={{height:'635px' ,width:'auto',margin:'10px',padding:'60px'}}
    class="cardView">
    <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQbV5SgrUFQAfOK_QxSoffelnRrg1dJmIgHSbaEB2pz3t9UHRSb' 
    style={{height:'100px' ,width:'100px'}} />

    <Card.Content>
      
       
    
      <h1>My BRO</h1>
      <text>this guy works in nineleaps</text>
      <br/>
      <br/>
      <Icon disabled name='mail'/><text className='textStyle'>abcd@gmail.com </text>
      <br/>
      <br/>
      <Icon disabled name='phone'/><text className='textStyle'>1234567890</text>
      <br/>
      <br/>
      <Icon disabled name='address card'/><text className='textStyle'>pune</text>
      <br/>
      <br/>
      <Icon disabled name='briefcase'/><text className='textStyle'>Developer</text>
      <br/>
      <br/>
      <br/>
      <Button primary>Edit</Button>
      <Button secondary>Save</Button>
     
      </Card.Content>
    </Card>

  </div>
  <Card style={{height:'10%',width:'50%'}}>
  <Card.Content>
   <h1 >Document Status</h1>
   </Card.Content>
  </Card>
  <div class="right-half">
  
  {
    this.state.data.map((item)=>{
         return(
      
      
  <Card  
  
   style={{height:'auto' ,width:'auto',backgroundcolor:'#e6e6e6',margin:'10px',padding:'10px',borderRadius:'10px'}}>
     
  <Card.Content>
   <Card.Header style={{fontWeight:'1000',fontSize:'50'}}>{item.checklist_name}</Card.Header>
   </Card.Content>
   <hr/>
    
     <List>
     {item.data.map((doc,i)=>{
         
         return (
           <ListItem >
             <ListItemText  primary={doc.document_name} />
             <ListItemSecondaryAction>
               <Checkbox document_name
                 edge="end" 
                 value={doc.document_status}
                 onChange={()=>{doc.document_status=!doc.document_status;this.sendResponse(item)}}
                 checked={doc.document_status}/>
             </ListItemSecondaryAction>
           </ListItem>
         );
         })
       }
     </List>     
   </Card>
   
     )
  })}
  </div>
</section>

</div>
  );
}

}
