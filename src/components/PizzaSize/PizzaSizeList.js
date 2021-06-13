import React, {useState, useEffect} from "react";
import axios from "axios";

export default function PizzaSizeList(props) {

    const [pizzaSizes, setPizzaSizes] = useState([]);

    useEffect(() => {
        getPizzaSizes();
    }, [])

    function getPizzaSizes() {
        axios.get("http://localhost:8080/size/all").then((res) => {
            setPizzaSizes(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewPizzaSize(pizzaSizeId) {
        props.history.push("sizes/view/"+pizzaSizeId)
    }

    function addPizzaSize() {
        props.history.push("sizes/add")
    }

    function deletePizzaSize(pizzaSizeId) {
        if(window.confirm("Do you want to delete this record?")) {
            axios.delete("http://localhost:8080/size/"+pizzaSizeId).then((res) => {
                alert(res.data.messages);
                const currentData = pizzaSizes.filter(pizzaSize =>  pizzaSize.id !== pizzaSizeId);
                setPizzaSizes(currentData);
            }).catch((err) => {
                alert(err);
            })
        } else {
            alert("Delete cancelled.");
        }
    }

    return(
        <div className="container" style={{marginTop: 20}}>
            <div className="form-group row">
                <h3 className="col-sm-3">Size List</h3>
                <div className="col-sm-5">
                    <button className="btn btn-success" onClick={() => addPizzaSize()}>+ Add Size</button>
                </div>
            </div><br/>
            <table className="table table-striped table-light">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">View</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    pizzaSizes.length === 0 ?
                        <tr align="center">
                            <td colSpan="6">No Records Available</td>
                        </tr> :
                        pizzaSizes.map((pizzaSize, index) => (
                            <tr key={index}>
                                <td>{pizzaSize.id}</td>
                                <td>{pizzaSize.name}</td>
                                <td>{pizzaSize.status}</td>
                                <td><button className="btn btn-primary" onClick={() => viewPizzaSize(pizzaSize.id)}>View</button></td>
                                <td><button className="btn btn-danger" onClick={() => deletePizzaSize(pizzaSize.id)}>Delete</button></td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    )
}