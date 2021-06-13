import React, {useState} from "react";
import axios from "axios";

export default function AddPizzaSize(props) {

    const [data, setData] = useState({
        name: ""
    })

    function submit(e) {
        e.preventDefault();
        axios.post("http://localhost:8080/size/add", data).then((res) => {
            console.log(data);
            alert(res.data.messages);
            props.history.push("/sizes");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert("Size Name " + err.response.data.name);
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
        <div className="container" style={{marginTop: 10}}>
            <div className="card" style={{width : "50%"}}>
                <div className="card-header">
                    <h4>Add Size</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3">Size Name</label>
                            <div className="col-sm-5">
                                <input type="text" onChange={(e) => handle(e)} className="form-control" id="name" placeholder="Enter Size Name" value={data.name} />
                            </div>
                        </div><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}