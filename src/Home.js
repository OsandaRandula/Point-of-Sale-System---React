
import { useAuth } from "./utils/AuthContext";
import 'bootstrap/dist/css/bootstrap.css';


function Home() {

    const { logout } = useAuth();

    return(

        <div>

        
        <img src="https://media.licdn.com/dms/image/C511BAQHvFxKd1Q28ww/company-background_10000/0/1584134948489/jma_supermarket_cover?e=2147483647&v=beta&t=mg3IpIPI-vVZJYn_JMsPwIfdq1HgiQHMszbpjMZuQos" alt="React Image" width="1400" height="400" />
        

        <div>
            <label></label>          
        </div>
        <div>
            <label></label>          
        </div>


            <div class="container">
                
                <div className= "d-flex justify-content-end">  
                
                <button className="btn btn-primary" onClick={logout}>Logout</button>
            
                </div>

                </div>

            </div>

        

    );
    
}

export default Home;