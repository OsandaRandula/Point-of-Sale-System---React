
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import Users from './Users';
import Products from './Products';
import Home from './Home';
import {BrowserRouter,  Route, Routes } from 'react-router-dom';
import Category from './Category';
import Orders from './orders/Orders';
import EditOrder from './orders/EditOrder';
import Stock from './Stock';



function App() { 
  
    return(
        <div>
          
          
            <BrowserRouter>
            
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        
                        <a class="nav-link active" aria-current="page" href="Home">Home</a>
                        <a class="nav-link active" href="Users">Users</a>
                        <a class="nav-link active" href="Products">Items</a>
                        <a class="nav-link active" href="Category">Category</a>
                        <a class="nav-link active" href='Stock'>Stock</a>   
                        <a class="nav-link active" href='Orders'>Orders</a>
                        <a class="nav-link active" href='Login'>LoginPage</a> 
                                             
                    
                    </div>
                    </div>
                </div>
            </nav>

                <Routes>


                        <Route path='/home' element={ <Home /> }/>
                        <Route path='/users' element={ <Users /> }/>
                        <Route path='/products' element={ <Products/> }/>
                        <Route path='/stock' element={<Stock/>}/>
                        <Route path='/category' element={ <Category/> }/>
                        <Route path='/orders' element={<Orders/>}/>
                        <Route path='/orders/:orderId/items' element={<EditOrder/>}/>
                        
                

                </Routes>
            
            </BrowserRouter>
         
        
          
        </div>
    );
  


}


export default App;
