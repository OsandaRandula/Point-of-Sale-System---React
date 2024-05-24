import axios from "axios";
import { useState } from "react";
import { useAuth } from "./utils/AuthContext";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            userName: username,
            password: password,
        }

        axios.post("http://localhost:8080/auth/login",data)
            .then((response) => {
                
                login(response.data);

                console.log(response.data);
                // toast.success("Login Successful");
                navigate("/home");
            })
            .catch((error) => {
               
                // toast.error("Invalid Credentials");
                console.log(error);
            });
    }

    return (
        <div className="container">

                        <div>
                            <label for="freeSpace"></label> 
                        </div>
                        <div>
                            <label for="freeSpace"></label> 
                        </div>

                        <div class="row">
                                <div class="col">
                                
                                </div>
                                <div class="col-5">

                                    <form onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <label htmlFor="username">User Name</label>
                                            <input type="text" className="form-control" onChange={(e) => setUsername(e.target.value)} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                                        </div>

                                        
                                        <div>
                                            <label for="freeSpace"></label> 
                                        </div>

                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </form>



                               
                                </div>
                                <div class="col">
                                
                                </div>
                        </div>

           
        </div>
    );
}

export default LoginPage;