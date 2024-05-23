import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';



function Category() {

    const [catagories,setCategories] = useState(null);
    const[edit,setEdit] = useState(null);
    const [categoryName,setcategoryName] = useState(null);

    useEffect(()=>{

      getCategories();

    },[]);
  
    function handleCategoryName(event) {
  
        setcategoryName(event.target.value);
      
    }

    
  
  
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

    function updateCategory() {

      const data = {
        "categoryName": categoryName
      }

      axios.put("http://localhost:8080/auth/categories/"+edit,data)
  
      .then(function (response) {
        console.log(response)
        getCategories();
        setEdit(null);

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

        

        <div class="container text-center">
        <div class="Row">

            { !edit &&
                  <form>
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

                        <div>
                          <label for="freeSpace"></label>
                        </div>
                        <div>
                          <label for="freeSpace"></label>
                        </div>

                </form>

              }

                { edit &&
                  <form>
                    <div class="row align-items-start">
                    <div class="col">
                    <label for="inputCategory" class="col-sm-2 col-form-label" >Category</label>
                    </div>
                    <div class="col">
                    <input type="text" class="form-control" onChange={handleCategoryName} value={categoryName} id="categoryName"/>
                    </div>
                    <div class="col">
                    <button type="button" class="btn btn-primary" onClick={
                        ()=>{
                            updateCategory();
                        }
                    }>Update</button>
                    </div>
                </div>

                        <div>
                          <label for="freeSpace"></label>
                        </div>
                        <div>
                          <label for="freeSpace"></label>
                        </div>

                </form>

              }


        
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

                <button type="button" class="btn btn-outline-success" onClick={

                    ()=>{
                    setEdit(catagory.categoryId);
                    setcategoryName(catagory.categoryName)
                    }

                }>Edit</button> 


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
        
       



        



        </div>
    );
    
}

export default Category;