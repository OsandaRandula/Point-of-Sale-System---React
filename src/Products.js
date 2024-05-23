
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

function Products() {

    const [itemName,setItemName] = useState(null);
    const [itemCode,setItemCode] = useState(0);
    const [items,setItems] = useState(null);
    const [catagories,setCategories] = useState(null);
    const [categoryId,setCategory] = useState(null);
    const [edit,setEdit] = useState(null);
    const [defaultValue, setDefaultValue] = useState(null);
    
    

    useEffect( () =>{

        axios.get("http://localhost:8080/auth/items")
        .then(function (response) {
            setItems(response.data);
        })
        .catch(function (error) {

            console.log(error);
        })



        axios.get("http://localhost:8080/auth/categories")
        .then(function (response) {
            
            setCategories(response.data);
        })
        .catch(function(error){
            console.log(error)
        })


    }, []);
        
    // empty dependency array means this effect runs only once
    
    
    function saveItem(event) {

                event.preventDefault();
                
                const data = {

                    "itemCode":itemCode,
                    "itemName":itemName,
                    "categoryId":categoryId

                }

                axios.post("http://localhost:8080/auth/items",data)

                .then(function (response) {
                    getItems();
                    console.log(response)
                })
                .catch(function(error){
                    console.log(error)
                });
                
                }


                function updateProduct(event) {

                    event.preventDefault();
                    
                    const data = {
    
                        "itemCode":itemCode,
                        "itemName":itemName,
                        "categoryId":categoryId
    
    
                    }
                    
                    axios.put("http://localhost:8080/auth/items/"+edit,data)
    
                    .then(function (response) {
                        getItems();
                        console.log(response)
                        setEdit(null);
                    })
                    .catch(function(error){

                        console.log(error)
                    });
                    
                    }



                function handleItemName(event) {
                
                    setItemName(event.target.value);

                }

                function handleItemCode(event) {

                    setItemCode(event.target.value);
                
                }

                function handleCategories(event) {

                    setCategory(event.target.value);
                    setDefaultValue(event.target.value);
                
                }


                function getItems() {

                axios.get("http://localhost:8080/auth/items")

                .then( 
                    function (response) {

                    setItems(response.data);
                    console.log(response);

                    }
                )
                .catch(
                    function (error) {
                    console.log(error);
                    }
                );
                
                }

        return (
            <div class = "Products"> 
            
                        <div class="container">

                    <div class= "row">

                        <div>
                            <label for="freeSpace"></label>
                        </div>
                    
                    </div>

                    <div class="row">

                        <div class="col-4">
                                { !edit &&
                                <form onSubmit={saveItem}>

                                <div class="form-group">
                                <label for="exampleInputProduct">Item Code</label>
                                <input type="product" class="form-control" id="inputProduct" onChange={handleItemCode} placeholder="Enter item code"></input>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputQuntity">Item Name</label>
                                    <input type="itemName" class="form-control" id="inputItemName" onChange={handleItemName} placeholder="Enter item Name"></input>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPrice">Category</label>
                                    <div>
                                    
                                        <select onChange={handleCategories} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" required>
                                    
                                        <option value="" disabled selected hidden>Select a category</option>

                                             { catagories && catagories.map(category => (

                                            <option  key={category.categoryId} value={category.categoryId}>{category.categoryName}</option> 

                                             ))}
                                        
                                                 

                                        </select>
                                    
                                    
                                    </div>
                                    
                                </div>

                                <div>
                                <label for="freeSpace"></label>
                                </div>

                                <button type="submit" class="btn btn-primary">Submit</button>

                                </form>
                                }

                                        { edit &&
                                        
                                        <form onSubmit={updateProduct}>

                                        <div class="form-group">
                                                <label for="exampleInputProduct">Item Code</label>
                                                <input type="product" class="form-control" id="inputProduct" onChange={handleItemCode} value={itemCode}></input>
                                                </div>

                                                <div class="form-group">
                                                    <label for="exampleInputQuntity">Item Name</label>
                                                    <input type="itemName" class="form-control" id="inputItemName" onChange={handleItemName} value={itemName} ></input>
                                                </div>

                                        <div class="form-group">
                                            <label for="exampleInputPrice">Category</label>
                                            <div>




                                                <select onChange={handleCategories} value={defaultValue} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" required>
                                            
                
                                                    
                                                            { catagories && catagories.map(category => (

                                                    <option  key={category.categoryId} value={category.categoryId}>{category.categoryName}</option> 

                                                    ))}
                                                
                                            

                                                </select>
                                            
                                            
                                            </div>
                                            
                                        </div>

                                        <div>
                                        <label for="freeSpace"></label>
                                        </div>

                                        <button type="submit" class="btn btn-primary">Update</button>

                                        </form>
                                
                                
                                }
                            
                                <div>
                                <label for="freeSpace"></label>
                                </div>
                               

                        </div>
                        <div class="col">
                        
                        {items &&

                            <table class="table table-bordered">
                            <thead>
                                <tr>
                                <th scope="col">Item Code</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Category</th>
                                <th scope="col"> </th>

                                </tr>
                            </thead>
                            <tbody>
                                { items.map(item => (
                                <tr>

                                    <td>{item.itemCode}</td>
                                    <td>{item.itemName}</td>
                                    <td>{item.itemCategory?.categoryName}</td>
                                    <td>
                                    <button type="button"  class="btn btn-light" onClick={

                                        ()=>{

                                        axios.delete("http://localhost:8080/auth/items/"+item.itemCode)

                                        .then(

                                            function(){
                                            getItems();
                                            
                                            }
                                        )

                                        .catch( function(error){
                                            console.log(error);
                                        })

                                        }


                                        }>Delete</button>


                                        <button type="button"  class="btn btn-light" onClick={
                                            ()=>{
                                                setEdit(item.itemCode)
                                                setItemName(item.itemName)
                                                setItemCode(item.itemCode)
                                                setCategory(item.itemCategory?.categoryId)                                          
                                                setDefaultValue(item.itemCategory?.categoryId)

                                            }
                                        }>Edit</button>

                                        

                                    </td>

                                    
                                </tr>



                                ))}

                                
                                
                            </tbody>
                            </table>

                            }

                        
                        </div>

                        

                    </div>
                </div>
            
            
            
            
            
            
            
            
            
            
            
            </div>


        );
        
    }

export default Products;