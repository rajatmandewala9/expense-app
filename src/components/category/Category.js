import React, { Component } from 'react'
import NavBar from '../common/NavBar';
import {Table, Container, FormGroup,Form, Button,Label ,Input} from 'reactstrap';
import {Link} from 'react-router-dom';
import axios from 'axios'
//import loading1 from './loading1.gif';
import loading1 from './loading1.gif';
//import Img from 'react-image'

class Category extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            isLoading : true,
            Categories :[],
            isSort:true,
            isUpdate : false,
            loadUpdateCat: {
                category:'',
                description:''
            },
            Cat :{
                id :'',
                category:'',
                description:''
            }
        }
        this.submitHandler=this.submitHandler.bind(this);
    }

    async remove(id){
     await fetch(`https://expense-springboot.herokuapp.com/category/${id}`
     ,{
         method :'DELETE',
         headers : {
             'Accept' : 'application/json',
             'Content-Type' : 'application/json'
         }
     }).then(() => {
             let updatedCategories = [...this.state.Categories].filter(i => i.id != id);
             this.setState({
                Categories :updatedCategories
             })
         }
     )
    }

    async loadEdit(Categories){
        console.log(Categories);
        this.setState({
            isUpdate :true,
            Cat :Categories
        })
    }

    async componentDidMount(){
        const responseCategory=await fetch('https://expense-springboot.herokuapp.com/category')
        const bodyCategory=await responseCategory.json();
        this.setState({
            Categories:bodyCategory,
            isLoading : false
        })
       // console.log('data')
    }

    onchangeHandler= (e) =>{
      const target= e.target;
      const value= target.value;
      const name = target.name;
      let Cat={...this.state.Cat};
      Cat[name] = value;
        this.setState({Cat})
    } 

    onSort(event, sortKey){        
        const {isSort}=this.state
        const data = this.state.Categories;
        if(isSort){            
            data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
            this.setState({
                isSort : false
            })
        }else{
            //data.sort((a,b) => b.id - a.id);
            data.sort((a,b) => b[sortKey].localeCompare(a[sortKey]))
            this.setState({
                isSort : true
            })
        }
        //data.asort((a,b) => a[sortKey].localeCompare(b[sortKey]))
        //let sortedInput = input.slice().sort((a, b) => b.id - a.id);
        //let JsonReversedArray= JsonArray.sort((a,b) => b.id - a.id);
        this.setState({data})
      }

    async submitHandler(e){       
        e.preventDefault()               
        axios.post('https://expense-springboot.herokuapp.com/category',this.state.Cat)
        .then(
            response => {
                let { Categories } = this.state;
               Categories.push(response.data);             
               this.setState({ Categories });
            }
        ).catch(
            error =>{
                console.log(error)
            }
        ) 
    }
    render() {
        const {Categories,isLoading,loadUpdateCat,isUpdate,Cat}=this.state;
        let cnt=0;
        let btn
        if(isUpdate){
            btn=<Button color="primary" type="submit">Update</Button>
        }else{
            btn=<Button color="primary" type="submit">Add</Button>
        }
        
       // const logo=require('./loading1.gif');   
      //  return (<div>Loading...</div>);
        console.log(Categories.length)
       // console.log(Cat.Category)
        const title=<h3>Category</h3>
        let rows=Categories.map(   
            (categories) =>
            <tr key={categories.id}>
                <td>{++cnt}</td>
                <td>{categories.category}</td>
                <td>{categories.description}</td>
                <td><Button size="sm" color="success" >Edit</Button></td>
                <td><Button size="sm" color="danger" onClick={ ()=> this.remove(categories.id)}>Delete</Button></td>
            </tr>
        )
        return (
            <div>
               <NavBar/>               
               <Container  className="center">
                   {title}
                   <Form onSubmit={this.submitHandler} method="POST" >
                       <FormGroup className="col-md-4 mb-3 center"  >
                           <Label htmlFor="category">Category</Label>
                           {/* <Input type="text" id="category" name="category"  value={loadUpdateCat.category} onChange={this.onchangeHandler}></Input> */}
                           <Input type="hidden" id="id" name="id"  value={Cat.id} onChange={this.onchangeHandler}></Input>
                           <Input type="text" id="category" name="category"  value={Cat.category} onChange={this.onchangeHandler}></Input>
                       </FormGroup>

                       <FormGroup className="col-md-4 mb-3 center">
                           <Label htmlFor="description">Description</Label>
                           <Input type="text" id="description" name="description" value={Cat.description}  onChange={this.onchangeHandler}></Input>
                       </FormGroup>

                       <FormGroup className="center">
                           {/* <Button color="primary" type="submit">Add</Button>{' '} */}
                           {btn} {' '}
                           <Button color="secondary" tag={Link} to="/">Reset</Button>
                       </FormGroup>
                   </Form>
               </Container>
               
               {' '}

                {
                    isLoading ? 
                    <Container className="center">
                        {/* <h1>Loading...</h1> */}
                        <img src={loading1} className="center" style={{ alignSelf: 'center' }} alt="loading" className="img-responsive"/>
                   </Container>
                    :
                    <Container>
                        
                   <h3>List of Categories</h3>
                   <Table className="mt-4">
                       <thead>
                           <tr>
                               <th width="10">SRNO</th>
                               <th onClick={e => this.onSort(e, 'category')} width="10">Categories</th>
                               <th onClick={e => this.onSort(e, 'description')} width="20">Description</th>
                               <th width="10">Edit</th>
                               <th width="10">Delete</th>
                           </tr>
                       </thead> 
                       <tbody>
                           {rows}
                       </tbody>
                   </Table>
               </Container>
                }
            </div>
        )
    }
}

export default Category