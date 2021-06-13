import React, {useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";

export default function AddPizza(props) {

    const [sizeList, setSizeList] = useState([]);
    const [optionsList, setOptionsList] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [sizes, setSizes] = useState([]);

    function onSelect(e) {
        let cat = []
        cat = e.map((topping, index) => ({
            sizeId : topping.value
        }))
        setSizes(cat)
    }

    useEffect(() => {
        getSizes();
    }, [])

    function getSizes() {
        axios.get("http://localhost:8080/size/all").then((res) => {
            setSizeList(res.data);
        }).catch((err) => {
            alert(err);
        })
    }

    useEffect(() => {
        if(sizeList.length > 0) {
            setOptionValues();
        }
    }, [sizeList])

    function setOptionValues() {
        const gotOptions = sizeList.map((size, index) => ({
            value : size.id,
            label : size.name
        }))
        setOptionsList(gotOptions)
    }

    function submit(e) {
        e.preventDefault();
        const dataObject = {
            name,
            description,
            image,
            sizes
        }
        axios.post("http://localhost:8080/pizza/add", dataObject).then((res) => {
            console.log(dataObject);
            alert(res.data.messages);
            props.history.push("/");
        }).catch((err) => {
            if(err.response.data.name !== undefined) {
                alert("Pizza Name " + err.response.data.name);
            } else {
                alert(err);
            }
        })
    }

    return(
        <div className="container" style={{marginTop: 10}}>
            <div className="card" style={{width : "50%"}}>
                <div className="card-header">
                    <h4>Add Pizza</h4>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => submit(e)}>
                        <div className="form-group row">
                            <label htmlFor="name" className="col-sm-3">Pizza Name</label>
                            <div className="col-sm-5">
                                <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" id="name" placeholder="Enter Pizza Name"/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="description" className="col-sm-3">Description</label>
                            <div className="col-sm-5">
                                <input type="text" onChange={(e) => setDescription(e.target.value)} className="form-control" id="description" placeholder="Enter Description"/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="image" className="col-sm-3">Image</label>
                            <div className="col-sm-5">
                                <input type="text" onChange={(e) => setImage(e.target.value)} className="form-control" id="image" placeholder="Enter Image"/>
                            </div>
                        </div><br/>
                        <div className="form-group row">
                            <label htmlFor="sizes" className="col-sm-3">Sizes</label>
                            <div className="col-sm-5">
                                <Select options={optionsList} onChange={(e) => onSelect(e)} id="sizes" placeholder="Select Size" className="basic-multi-select" isMulti autoFocus isSearchable/>
                            </div>
                        </div><br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}