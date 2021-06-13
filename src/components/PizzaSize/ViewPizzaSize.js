import React, {useState, useEffect} from "react";
import axios from "axios";

export default function ViewPizzaSize(props) {

    const [data, setData] = useState({
        id: "",
        status: ""
    })

    useEffect(() => {
        getPizzaSize();
    }, [])

    function getPizzaSize() {
        const pizzaSizeId = props.match.params.id;
        axios.get("http://localhost:8080/size/" + pizzaSizeId).then((res) => {
            console.log(res.data);
            setData(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    function submit(e) {
        e.preventDefault();
        const pizzaSizeId = props.match.params.id;
        axios.put("http://localhost:8080/size/" + pizzaSizeId, data).then((res) => {
            console.log(data);
            alert(res.data.messages);
            props.history.push("/sizes");
        }).catch((err) => {
            if(err.response.data.status !== undefined) {
                alert("Status " + err.response.data.status);
            } else {
                alert(err);
            }
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
                    <h4>View Size</h4>
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
                            <label htmlFor="status" className="col-sm-3">Status</label>
                            <div className="col-sm-5">
                                <input type="text" className="form-control" onChange={(e) => handle(e)} id="status" placeholder="Enter Status" value={data.status} />
                            </div>
                        </div><br/>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div><br/>
        </div>
    )
}