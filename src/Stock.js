import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';


function Stock() {

    const [unit,setUnit] = useState(null);
    const [qtyOnHand,setQtyOnHand] = useState(null);
    const [unitPrice,setUnitPrice]= useState(null);
    const [items,setItems] = useState(null);
    const [item,setItem] = useState(null);
    const [stocks,setStocks] = useState(null);
    const [edit,setEdit] = useState(null);
    const [defaultValue,setDefaultValue] = useState(null);

    useEffect(()=>{

        axios.get(`http://localhost:8080/auth/items`)
        .then(function (response) {
            
            setItems(response.data)
            
   
        })
        .catch(function (error) {
            console.log(error)
        });

        getStock();
  
      },[]);

      function handleItems(event) {

        setItem(event.target.value);
        setDefaultValue(event.target.value);
    
    }

    function handleUnit(event) {

        setUnit(event.target.value);
        
    }

    function handleQtyOnHand(event) {

        setQtyOnHand(event.target.value);
        
    }

    function handleUnitPrice(event) {

        setUnitPrice(event.target.value);
        
    }

    function getStock() {

        axios.get(`http://localhost:8080/auth/stocks`)
        .then(function (response) {
            
            setStocks(response.data)
            
   
        })
        .catch(function (error) {
            console.log(error)
        });
        
    }

    function saveStock(event) {

        event.preventDefault();

        const data = {
            "itemCode": item,
            "unit": unit,
            "qtyOnHand": qtyOnHand,
            "unitPrice": unitPrice
          }
      
          axios.post("http://localhost:8080/auth/stocks",data)
      
          .then(function (response) {
            console.log(response)
            getStock();
                  
          })
          .catch(function(error){
            console.log(error)
          });

        
        

    }

    function updateStock(event) {

        event.preventDefault();

        const data = {
            "itemCode": item.itemCode,
            "unit": unit,
            "qtyOnHand": qtyOnHand,
            "unitPrice": unitPrice
          }
      
          axios.put("http://localhost:8080/auth/stocks/"+item.itemCode,data)
      
          .then(function (response) {
            console.log(response)
            getStock();
            setEdit(null);
                  
          })
          .catch(function(error){
            console.log(error)
          });
        
    }




return(
    <div className='Stock'>

    <div class="container">

                    <div class= "row">

                        <div>
                            <label for="freeSpace"></label>
                            
                        </div>
                    
                    </div>

                    <div class="row">

                        <div class="col-4">
                                { !edit &&
                                <form onSubmit={saveStock}>

                                <div class="form-group">
                                    <label for="exampleInputPrice">Item</label>
                                    <div>
                                    
                                        <select onChange={handleItems} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" required>
                                    
                                        <option value="" disabled selected hidden >Select a Item</option>

                                             { items && items.map(item => (

                                            <option  key={item.itemCode} value={item.itemCode}>{item.itemName}</option> 

                                             ))}
                                            
                                        </select>
                                    </div>
                                </div>

                                <div class="form-group">
                                <label for="exampleInputProduct">Unit</label>
                                <input type="unit" class="form-control" id="inputUnit" onChange={handleUnit} placeholder="Enter unit size"></input>
                                </div>

                                <div>
                                <label for="freeSpace"></label>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputQuntity">Quantity on hand</label>
                                    <input type="qtyOnHand" class="form-control" id="inputqtyOnHand" onChange={handleQtyOnHand} placeholder="Enter Quantity on hand"></input>
                                </div>

                                <div>
                                <label for="freeSpace"></label>
                                </div>

                                <div class="form-group">
                                    <label for="exampleInputQuntity">Unit Price</label>
                                    <input type="unitPrice" class="form-control" id="inputUnitPrice" onChange={handleUnitPrice} placeholder="Enter Unit Price"></input>
                                </div>

                               

                                <div>
                                <label for="freeSpace"></label>
                                </div>

                                <button type="submit" class="btn btn-primary">Submit</button>

                                </form>
                                }

                                        { edit &&
                                        
                                        <form onSubmit={updateStock}>

                                            <div class="form-group">
                                                <label for="exampleInputPrice">Item</label>
                                                <div>
                                                
                                                    <select onChange={handleItems} value={defaultValue} class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" required>
                                                
                                                    <option value="" disabled selected hidden >Select a Item</option>

                                                        { items && items.map(item => (

                                                        <option  key={item.itemCode} value={item.itemCode}>{item.itemName}</option> 

                                                        ))}
                                                        
                                                    </select>
                                                </div>
                                            </div>

                                            
                                            <div class="form-group">

                                                    <label for="exampleInputProduct">Unit</label>
                                                    <input type="unit" class="form-control" id="inputUnit" onChange={handleUnit} value={unit}></input>
                                                    </div>

                                                    <div>
                                                    <label for="freeSpace"></label>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="exampleInputQuntity">Quantity on hand</label>
                                                        <input type="qtyOnHand" class="form-control" id="inputqtyOnHand" onChange={handleQtyOnHand} value={qtyOnHand}></input>
                                                    </div>

                                                    <div>
                                                    <label for="freeSpace"></label>
                                                    </div>

                                                    <div class="form-group">
                                                        <label for="exampleInputQuntity">Unit Price</label>
                                                        <input type="unitPrice" class="form-control" id="inputUnitPrice" onChange={handleUnitPrice} value={unitPrice}></input>
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
                        
                        {stocks &&

                            <table class="table table-bordered">
                            <thead>
                                <tr>
                                <th scope="col">Item Code</th>
                                <th scope="col">Item Name</th>
                                <th scope="col">Unit Size</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col"> </th>

                                </tr>
                            </thead>
                            <tbody>
                                { stocks.map(stock => (
                                <tr>

                                    <td>{stock.item?.itemCode}</td>
                                    <td>{stock.item?.itemName}</td>
                                    <td>{stock.unit}</td>
                                    <td>{stock.qtyOnHand}</td>
                                    <td>{stock.unitPrice}</td>
                                    
                                    <td>                               


                                        <button type="button"  class="btn btn-light" onClick={
                                            ()=>{
                                                setEdit(stock.item?.itemCode)
                                                setItem(stock.item)
                                                setUnit(stock.unit)
                                                setQtyOnHand(stock.qtyOnHand) 
                                                setUnitPrice(stock.unitPrice)                                    
                                                setDefaultValue(stock.item?.itemCode)

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

export default Stock;