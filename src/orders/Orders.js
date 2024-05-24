import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import EditOrder from './EditOrder';
import { useAuth } from '../utils/AuthContext';


function Orders() {

    const [orders,setOrders] = useState([]);

    const { jwtToken } = useAuth();

    const config = {
      headers: {
          Authorization: `Bearer ${jwtToken}`
       }
    }

    useEffect(()=>{

        getOrders();

    },[])

    const navigate = useNavigate();

    function getOrders() {

        axios.get("http://localhost:8080/orders" ,config)
        .then(function (response) {
            setOrders(response.data);
        })
        .catch(function (error) {
            console.log(error)
        });
        
    }

    function createOrder() {

        axios.post("http://localhost:8080/orders" ,config)
                        .then(function (response) {

                            console.log(response)
                            navigate(`/orders/${response.data.orderId}/products`)
                            
                        })
                        .catch(function (error) {
                            console.log(error)
                        });
        
    }



return(

    <div class="container">

            <div class="vertical-space">
                <p></p>
            </div>

            <div class= "grid text-left">
                    <button type="button" onClick={createOrder} class="btn btn-primary">Add Order</button>
            </div>

            <div class="vertical-space">
                <p></p>
            </div>

        
     
        <div className="Orders">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Order Date</th>
                    <th scope="col">Total Price</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>

            <tbody>
                { orders && orders.map((order)=>(
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{order.orderDate}</td>
                        <td>{order.totalPrice}</td>

                        
                        <td>
                            {order.status == true && (
                                <button type="button" class="btn btn-warning" onClick={()=>{

                                    navigate(`/orders/${order.orderId}/items`)
   
                               }}>View</button>

                            )}

                            {order.status == false && (

                                <button type="button" class="btn btn-success" onClick={()=>{

                                    navigate(`/orders/${order.orderId}/items`)
        
                                }}>Edit</button>
                                

                            )}

                            
                        </td>

                    </tr>
                ))}



            </tbody>





        </table>
        </div>

    </div>
)

    
}

export default Orders;