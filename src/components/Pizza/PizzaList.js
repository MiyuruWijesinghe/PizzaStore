import React, {useState, useEffect} from "react";
import axios from "axios";

export default function PizzaList(props) {

    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        getPizzas();
    }, [])

    function getPizzas() {
        axios.get("http://localhost:8080/pizza/all").then((res) => {
            setPizzas(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewPizza(pizzaId) {
        props.history.push("pizzas/"+pizzaId+"/sizes")
    }

    function updatePizza(pizzaId) {
        props.history.push("pizzas/update/"+pizzaId)
    }

    function addPizza() {
        props.history.push("pizzas/add")
    }

    function deletePizza(pizzaId) {
        if(window.confirm("Do you want to delete this record?")) {
            axios.delete("http://localhost:8080/pizza/"+pizzaId).then((res) => {
                alert(res.data.messages);
                const currentData = pizzas.filter(pizza =>  pizza.id !== pizzaId);
                setPizzas(currentData);
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
                <h3 className="col-sm-3">Pizza List</h3>
                <div className="col-sm-5">
                    <button className="btn btn-success" onClick={() => addPizza()}>+ Add Pizza</button>
                </div>
            </div><br/>
            <table className="table table-striped table-light">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">View</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    pizzas.length === 0 ?
                        <tr align="center">
                            <td colSpan="6">No Records Available</td>
                        </tr> :
                        pizzas.map((pizza, index) => (
                            <tr key={index}>
                                <td>{pizza.id}</td>
                                <td>{pizza.name}</td>
                                <td>{pizza.status}</td>
                                <td><button className="btn btn-primary" onClick={() => viewPizza(pizza.id)}>View</button></td>
                                <td><button className="btn btn-success" onClick={() => updatePizza(pizza.id)}>Update</button></td>
                                <td><button className="btn btn-danger" onClick={() => deletePizza(pizza.id)}>Delete</button></td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    )
}