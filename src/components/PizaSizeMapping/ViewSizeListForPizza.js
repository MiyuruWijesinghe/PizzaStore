import React, {useState, useEffect} from "react";
import axios from "axios";

export default function ViewSizeListForPizza(props) {

    const [pizza, setPizza] = useState({
        id: "",
        name: "",
        image: ""
    })

    useEffect(() => {
        getPizza();
    }, [])

    function getPizza() {
        const pizzaId = props.match.params.id;
        axios.get("http://localhost:8080/pizza/" + pizzaId).then((res) => {
            console.log(res.data);
            setPizza(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    const [pizzaSizes, setPizzaSizes] = useState([]);

    useEffect(() => {
        getPizzaSizes();
    }, [])

    function getPizzaSizes() {
        const pizzaId = props.match.params.id;
        axios.get("http://localhost:8080/pizza-size/pizza/"+pizzaId).then((res) => {
            setPizzaSizes(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function viewSize(sizeId) {
        props.history.push("size/"+sizeId)
    }

    return(
        <div className="container" style={{marginTop: 20}}>
            <div className="card" style={{width : "50%"}}>
                <div className="card-header">
                    <h4>{pizza.name}</h4>
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-group row">
                            <label htmlFor="id" className="col-sm-3">Pizza Id</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="id" value={pizza.id} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3">Pizza Name</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="name" value={pizza.name} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <div className="col-sm-5">
                                <div className="card">
                                    <img className="card-img-top" src={pizza.image} alt="Card image cap"/>
                                </div>
                            </div>
                        </div><br/>
                    </form>
                </div>
            </div><br/>

            <h3>Sizes</h3><br/>
            <table className="table table-striped table-light">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">View</th>
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
                                <td>{pizzaSize.pizzaSizeName}</td>
                                <td>Rs. {pizzaSize.price}</td>
                                <td><button className="btn btn-primary" onClick={() => viewSize(pizzaSize.pizzaSizeId)}>View</button></td>
                            </tr>
                        ))
                }
                </tbody>
            </table>
        </div>
    )
}