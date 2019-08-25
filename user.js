import React from 'react';
import{Card, CardColumns,Nav} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import './check.css';


export default class Display extends React.Component
{
constructor(props)
{
super(props);
this.state={
items:[],
isLoaded: false,
}
}

componentDidMount()
{
fetch('http://4b2379b5.ngrok.io/list')
.then(res=>res.json())
// .then(res=>console.log(res));
.then(json => {
this.setState({
isLoaded:true,
items: json,
})
});
}




render(){

var { isLoaded, items} = this.state;
if(!isLoaded){
return (<div>Server not responding!</div>);
}
else{
return(
<div>
<Merge/>


<div>
<CardColumns className="column-layout" >
{this.state.items.map((item,i)=>
<Card style={{ width: '20rem' }}>
<div>
<Card.Body>
<Card.Title>{'Check List:'+item.checklist_name}</Card.Title>
{(typeof(item.data)=='object')?
<div>
{item.data.map((subItem,k)=>
<div>
<div>{'Description:'+subItem.description}</div>
<ul>
{subItem.document_name}
</ul>
</div>
)}
</div>
:null
}
<Button size="sm" variant="primary">Assign</Button> &nbsp; &nbsp;
<Button size="sm" variant="danger">Delete</Button>
</Card.Body>
</div>
</Card>
)}
</CardColumns>
</div>

</div> //main div



);

}

}
}



// <CardColumns className="main-column" >
// {items.map(item => (
// <Card style={{ width: '18rem' }}>

// <Card.Body key={item.id}>
// <Card.Title> {item.name }</Card.Title>
// <Card.Text key={item.id.address}>
// {item.email}
// </Card.Text>
// <Button size="sm" variant="primary">Edit</Button> &nbsp; &nbsp;
// <Button size="sm" variant="primary">Delete</Button>

// </Card.Body>
// </Card>

// ))}
// </CardColumns>











// <ul>
// {items.map(item => (
// <li key={item.id}>
// Name:{item.checklist_name }</li>
// ))}
// </ul>
// <ul>

// {items.map(item =>
// (
// <li key={item.id}>
// name:{item.data.name} </li>
// ))}

// </ul>
