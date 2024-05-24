import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';


function EditOrder() {

    const {orderId} = useParams();

    const navigate = useNavigate(); 

    const[order,setOrder] = useState(null);
    const[orderDetails,setOrderDetails] = useState(null);
    const[items,setItems] = useState(null);
    const [count, setCount] = useState(0);

    const { jwtToken } = useAuth();

    const config = {
      headers: {
          Authorization: `Bearer ${jwtToken}`
       }
      }

    useEffect(()=>{
        
        axios.get(`http://localhost:8080/orders/${orderId}` ,config)
        .then(function (response) {
            
            setOrder(response.data);
            console.log(response)
   
        })
        .catch(function (error) {
            console.log(error)
        });

        axios.get(`http://localhost:8080/orderDetails/${orderId}` ,config)
        .then(function (response) {
            
            setOrderDetails(response.data);
            console.log(response)
   
        })
        .catch(function (error) {
            console.log(error)
        });

        axios.get(`http://localhost:8080/items` ,config)
        .then(function (response) {
            
            setItems(response.data)
            
   
        })
        .catch(function (error) {
            console.log(error)
        });



    },[])


    function getOrderDetails() {

        axios.get(`http://localhost:8080/orderDetails/${orderId}` ,config)
        .then(function (response) {
            
            setOrderDetails(response.data);
            console.log(response)
   
        })
        .catch(function (error) {
            console.log(error)
        });

        axios.get(`http://localhost:8080/orders/${orderId}` ,config)
        .then(function (response) {
            
            setOrder(response.data);
            console.log(response)
   
        })
        .catch(function (error) {
            console.log(error)
        });
        
    }



    
    return(
        <div className='container'>
            
            
            { order &&          
            
            <div>

                {order.status==false &&(
                    <h1> Add Items to Order {orderId}</h1>
                )}

                {order.status==true &&(
                    <h1> Order {orderId}</h1>
                )}
                
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='datetime'>
                        Order Date:{order.orderDate}
                    </div>

                    <div>
                        <h3>Total Price: Rs.{order.totalPrice}</h3>
                    </div>
                
                </div>

                <div className='row'>
                    <div className='col-lg-9'>

                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    {/* <th scope="col">#</th> */}
                                    <th scope="col">Item Name</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Item Price</th>
                                    {order.status == false && (
                                        <th scope="col">Action</th>
                                    )}
                                    
                                </tr>
                            </thead>

                            <tbody>
                                { orderDetails && orderDetails.map((orderDetail)=>(
                                    <tr key={orderDetail.item.itemName}>
                                        <td>{orderDetail.item.itemName}</td>
                                        <td>{orderDetail.unitPrice}</td>
                                        <td>{orderDetail.quntity}</td>
                                        <td>{orderDetail.totalItemPrice}</td>
                                        <td>

                                         {order.status == false && (

                                                <button type="button" class="btn btn-light" onClick={()=>{

                                                    axios.delete(`http://localhost:8080/orders/removeProducts/${orderDetail.orderDetailsId}` ,config)
                                                    .then(function (response) {

                                                        getOrderDetails()

                                                    })
                                                    .catch(function (error) {
                                                        console.log(error)
                                                    });
                                                }}>Delete</button>

                                        )} 
                                        

                                        </td>
                                    </tr>
                                ))}


                            </tbody>



                        </table>
                        
                        {order.status == false && (
                            <div >
                            <button type="button" class="btn btn-warning" onClick={()=>{
                                axios.put(`http://localhost:8080/orders/${orderId}/confirmOrder` ,config)
                                .then(function (response) {
                        
                                    navigate("/orders")
                                    
                        
                                })
                                .catch(function (error) {
                                    console.log(error)
                                });
                            }}>Confirm Order</button>
                        </div>

                        )}
                        
                        
                    
                    </div>

                     {order.status == false && (

                        <div className='col-lg-3'>
                        <div className='products'>
                        {items && items.map((item)=>(
                            <div key={item.itemCode} className='bg-light shadow-sm p-3'> 

                            <h4>{item.itemName}</h4>
                            <p>{item.itemCode}</p>
                            <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                   
                                    <div class="btn-group me-2" role="group" aria-label="First group">

                                        {count}
                                        
                                        <button type="button" class="btn btn-primary" onClick={
                                            ()=>{
                                                setCount(count+1);
                                            }
                                        }>+</button>
                                        <button type="button" class="btn btn-primary" onClick={
                                            ()=>{
                                                if(count>1){

                                                    setCount(count-1);
                                                }
                                            }
                                        }>-</button>
                          
                                    </div>
                                    </div>

                            <button type="button" class="btn btn-light" onClick={()=>{
                                
                                const data = {
                                    itemCode: item.itemCode,
                                    quantity : count
                                }
                                axios.post(`http://localhost:8080/orders/${orderId}/addProducts`,data ,config)
                                .then(function (response) {

                    
                                    getOrderDetails()
                                    setCount(1);
                        
                                })
                                .catch(function (error) {
                                    console.log(error)
                                });




                            }}>Add</button>


                            </div>
                        ))}
                        </div>

                        </div>





                    )}                       
        
                    


                </div>



            </div>

            }

        </div>
    )

}

export default EditOrder;