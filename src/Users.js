
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


function Users() {


    const [userName,setUsername] = useState(null);
    const [password,setPassword] = useState(null);
    const [email,setEmail] = useState(null);
    const [edit,setEdit] = useState(null);

    useEffect(()=>{

      getUsers();

    },[]);
  
    function handleUsername(event) {
  
      setUsername(event.target.value);
      
    }
  
    function handlePassword(event) {
  
      setPassword(event.target.value);
      
    }
  
    function handleEmail(event) {
  
      setEmail(event.target.value);
      
    }
  
    function save(event) {
  
      event.preventDefault();
  
      const data = {
        "username": userName,
        "password": password,
        "email": email
      }
  
      axios.post("http://localhost:8080/auth/users",data)
  
      .then(function (response) {
        console.log(response)
        getUsers();
      })
      .catch(function(error){
        console.log(error)
      });
  
      
    }
  
    function updateUser(event) {
  
      event.preventDefault();
  
      const data = {
        "username": userName,
        "password": password,
        "email": email
      }
  
      axios.put("http://localhost:8080/auth/users/"+edit.id,data)
  
      .then(function (response) {
        console.log(response)
        getUsers();
      })
      .catch(function(error){
        console.log(error)
      });
      
    }
  
  
    const [users,setUsers] = useState(null);
  
  
    function getUsers() {
  
      axios.get("http://localhost:8080/auth/users")
  
        .then(function (response) {
          setUsers(response.data);
          console.log(response);
        })
  
        .catch(function error(error) {
          console.log(error);
        })
      
    }

    return(
        <div className="Users">

                { !edit &&
                <form onSubmit={save}>

                <div >

                <label class="form-text">User Name</label>
                <input class="form-control" type="text" onChange={handleUsername}></input>

                </div>

                <div >

                <label class="form-text" >Password</label>
                <input class="form-control" type="text" onChange={handlePassword}></input>

                </div>


                <div >

                <lable class="form-text" >email</lable>
                <input class="form-control" type="text" onChange={handleEmail}></input>

                </div>

                <div>

                <div><label> </label></div>
                
                <button type="submit" class="btn btn-primary" >Save</button>

                </div>

                </form>
                }

                  {edit && 

                                        

                    <div>

                        
                        <form onSubmit={save}>

                    <div >

                    <label class="form-text">User Name</label>
                    <input type="text" class="form-control" onChange={handleUsername} value={userName}></input>

                    </div>

                    <div >

                    <label class="form-text">Password</label>
                    <input type="text" class="form-control" onChange={handlePassword} value={password}></input>

                    </div>


                    <div >

                    <label class="form-text">email</label>
                    <input type="text" class="form-control" onChange={handleEmail} value={email}></input>

                    </div>
                    <label></label>
                    <div>

                    <button type="submit" class="btn btn-primary" onClick={updateUser}>Save</button>
                    <button type="button" class="btn btn-primary" onClick={

                    ()=>{
                    setEdit(null);
                    }

                    }>cancel</button>

                    </div>

                    </form>




                    </div>
                            

                    }    



                <table class="table">

                <thead>
                  <tr>
                      
                    
                  </tr>

                </thead>

                <tbody>

                {users && users.map((user)=>(


                <tr>
                
                    <td scope="row" >{user.username}</td>
                    <td>{user.email}</td>
      
              
                <td>
                
                <button type="button" class="btn btn-outline-danger" onClick={

                    ()=>{
                    setEdit(user);
                    setUsername(user.username);
                    setEmail(user.email);
                    setPassword(user.password);
                    }

                }>Edit</button>


                <button type="button" class="btn btn-outline-warning"  onClick={

                    ()=>{

                    axios.delete("http://localhost:8080/auth/users/"+user.id)

                    .then(

                        function(){
                        getUsers();
                        
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
    );

    
}

export default Users;