import React, {useState, useEffect} from "react";
import axios from "axios";

export default function ViewSizeForPizza(props) {

    const [data, setData] = useState({
        id: "",
        pizzaName: "",
        pizzaSizeName: "",
        price: ""
    })

    useEffect(() => {
        getPizzaSize();
    }, [])

    function getPizzaSize() {
        const pizzaSizeId = props.match.params.id;
        axios.get("http://localhost:8080/pizza-size/" + pizzaSizeId).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const pizSizeId = props.match.params.id;
        axios.put("http://localhost:8080/pizza-size/" + pizSizeId, data).then((res) => {
            console.log(data);
            alert(res.data.messages);
            props.history.push("/");
        }).catch((err) => {
            alert(err);
        })
    }

    function handle(e) {
        const newData = {...data}
        newData[e.target.id] = e.target.value
        setData(newData)
    }

    return(
        <div className="container" style={{marginTop: 20}}>
            <div className="card" style={{width : "50%"}}>
                <div className="card-header">
                    <h4>Add Price</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                        <div className="form-group row">
                            <label htmlFor="id" className="col-sm-3">Id</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="id" value={data.id} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="pizzaName" className="col-sm-3">Pizza Name</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="pizzaName" value={data.pizzaName} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="pizzaSizeName" className="col-sm-3">Size Name</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" id="pizzaSizeName" value={data.pizzaSizeName} readOnly/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="price" className="col-sm-3">Price</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" onChange={(e) => handle(e)} id="price" placeholder="Enter Price" value={data.price} />
                            </div>
                        </div><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div><br/>
        </div>
    )
}