import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';



function Category() {

    const [categoryName,setcategoryName] = useState(null);

    useEffect(()=>{

      getCategories();

    },[]);
  
    function handleCategoryName(event) {
  
        setcategoryName(event.target.value);
      
    }

    const [catagories,setCategories] = useState(null);
  
  
    function getCategories() {
  
      axios.get("http://localhost:8080/auth/categories")
  
        .then(function (response) {
          setCategories(response.data);
          console.log(response);
        })
  
        .catch(function error(error) {
          console.log(error);
        })
      
    }

    function saveCategory() {
  
      const data = {
        "categoryName": categoryName
      }
  
      axios.post("http://localhost:8080/auth/categories",data)
  
      .then(function (response) {
        console.log(response)
        getCategories();
      })
      .catch(function(error){
        console.log(error)
      });
  
        
    }
  

    return(
        <div class ="Category">

        <div>
            <label></label>          
        </div>

        <form>

        <div class="container text-center">
        <div class="Row">

                    <div class="row align-items-start">
                    <div class="col">
                    <label for="inputCategory" class="col-sm-2 col-form-label" >Category</label>
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" onChange={handleCategoryName} id="categoryName"/>
                    </div>
                    <div class="col">
                    <button type="button" class="btn btn-primary" onClick={
                        ()=>{
                            saveCategory();
                        }
                    }>Add</button>
                    </div>
                </div>


        
        <div class="col-sm4">

                        <table class="table">

                <thead>
                <tr>
                    
                    
                </tr>

                </thead>

                <tbody>

                {catagories && catagories.map((catagory)=>(


                <tr>

                    <td scope="row" >{catagory.categoryId}</td>
                    <td>{catagory.categoryName}</td>


                <td>

                {/* <button type="button" class="btn btn-outline-danger" onClick={

                    ()=>{
                    setEdit(user);
                    setUsername(user.username);
                    setEmail(user.email);
                    setPassword(user.password);
                    }

                }>Edit</button> */}


                <button type="button" class="btn btn-outline-warning"  onClick={

                    ()=>{

                    axios.delete("http://localhost:8080/auth/categories/"+catagory.categoryId)

                    .then(

                        function(){
                           getCategories();
                        
                        }
                    )

                    .catch( function(error){
                        console.log(error);
                    })

                    }


                }>Delete</button>

                </td>

                </tr>


                ))

                    
                }

                </tbody>
                </table>








        </div>

        
        </div>
        
        </div>
        
        </form>



        



        </div>
    );
    
}

export default Category;