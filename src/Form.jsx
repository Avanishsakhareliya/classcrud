import React, { Component } from 'react'

export default class Form extends Component {


    constructor() {

        super();

        this.state =
        {

            e1: "",
            e2: "",
            e3: "",
            ff: false,
            narr: [],
            fname: '',
            lname: '',
            email: '',
            gender: '',
            city: '',
            indexId: null,
            option: [],
            hobby: [{ id: 0, label: "cricket", value: false },
            { id: 1, label: "reading", value: false },
            { id: 2, label: "dancing", value: false }]

        }
        this.handlechange = this.handlechange.bind(this);
        this.postdata = this.postdata.bind(this)
        this.onHobby = this.onHobby.bind(this)
        this.validationdata = this.validationdata.bind(this)
    }

    handlechange(e) {
        console.log(e.target.value);
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    onHobby(e) {

        if (e.target.checked) {
            this.state.option.push(e.target.name)
        }
        else {
            //  document.getElementsByClassName("hob").checked=false;
            let rr = this.state.option.indexOf(e.target.name)

            this.state.option.splice(rr, 1)
        }
        this.setState({ ...this.state, option: this.state.option })
    }

    validationdata() {

        this.state.fname === "" ? this.setState({ e1: "enter your fname", ff: true }) : this.setState({ e1: "", ff: false })
        this.state.lname === "" ? this.setState({ e2: "enter your lname", ff: true }) : this.setState({ e2: "", ff: false })
        this.state.email === "" ? this.setState({ e3: "enter your email", ff: true }) : this.setState({ e3: "", ff: false })

    }

    postdata(e) {
        e.preventDefault();

        this.validationdata()
        if (this.state.ff === false) {

            let i_id = this.state.indexId;
            let obj = {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                gender: this.state.gender,
                city: this.state.city,
                option: this.state.option,

            }
            // console.log("name", this.state.name);

            if (i_id !== null) {
                this.state.narr[i_id] = obj;
                this.setState({ ...this.state.narr })
            }
            else {

                this.state.narr.push(obj);
                this.setState({ ...this.state.narr })
            }

            this.setState({
                fname: "",
                lname: "",
                email: "",
                gender: '',
            })
            document.getElementById("male").checked = false
            document.getElementById("female").checked = false

            this.state.hobby.map((val) => {
                return document.getElementById(val.label).checked = false
            })
            this.setState({ option: [] })
        }

    }

    handeldeletedata(index) {
        console.log("id", index);
        this.state.narr.splice(index, 1);
        this.setState({ narr: this.state.narr })
    }

    updatedata(index) {
        let data = this.state.narr[index]
        console.log("data", data);
        this.setState({
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            city: data.city,
            indexId: index
            // gender: data.gender
        })

        // this.setState({ ...this.state, indexId: index })

        if (data.gender === "male") {

            document.getElementById("male").checked = true
        } else {
            document.getElementById("female").checked = true

        }

        for (let i = 0; i < data.option.length; i++) {
            console.log(data.option);
            if (data.option[i] === "cricket") {
                document.getElementById('cricket').checked = true;
                console.log(data.option[i]);

            }
            else if (data.option[i] === "reading") {

                document.getElementById('reading').checked = true;
                console.log(data.option[i]);


            } else if (data.option[i] === "dancing") {
                document.getElementById('dancing').checked = true;
                console.log(data.option[i]);

            }

        }


    }

    render() {


        return (
            <div>
                <center>
                    <form action="/" name="forms" onSubmit={(e) => this.postdata(e)}>

                        <label>First name:</label><br />
                        <input type="text" id="fname" name="fname" placeholder="enter your fname" onChange={this.handlechange} value={this.state.fname} /><br /><span id="fn">{this.state.e1}</span><br /><br />
                        <label>Last name:</label><br />
                        <input type="text" id="lname" name="lname" placeholder="enter your lname" onChange={this.handlechange} value={this.state.lname} /><br /><span id="ln">{this.state.e2}</span><br /><br />
                        <label>email:</label><br />
                        <input type="email" id="email" name="email" placeholder="enter your email" onChange={this.handlechange} value={this.state.email} /><br /><span id="em">{this.state.e3}</span><br /><br />
                        <div onChange={this.handlechange}>
                            <label>select your gender :</label><br /><br />
                            <input type="radio" id="male" name="gender" value="male" />
                            <label>Male</label><br />
                            <input type="radio" id="female" name="gender" value="female" />
                            <label>female</label><br /> <span id="gn"></span><br />
                        </div>
                        <br />
                        <label>Choose city:</label><br />
                        <select name="city" id="city" onChange={this.handlechange}>
                            <option>surat</option>
                            <option>gandhinagar</option>
                            <option>vadodara</option>
                            <option>jamnagar</option>
                        </select>
                        <br /><span id="ci"></span><br />

                        {
                            this.state.hobby.length > 0 ?
                                this.state.hobby.map((val, id) => {
                                    return (<div>
                                        <input type="checkbox"
                                            id={val.label}

                                            name={val.label}
                                            className="hob"
                                            value={this.state.hobby[id].value}
                                            onChange={this.onHobby}

                                        />
                                        <label >{val.label}</label><br />
                                    </div>);
                                })
                                : null

                        }

                        <button id="submit">submit</button>

                    </form>

                    <br /><br />

                    <div className="input-group" >
                        <input type="search" id="iner" className="form-control rounded" placeholder="Search" aria-label="Search"
                            aria-describedby="search-addon" />
                        <button type="button" className="btn btn-outline-primary" id="search">search</button>
                    </div>
                    <br /><br /><br />
                    <table border="1">
                        <thead>
                            <tr>
                                <th>no.</th>
                                <th>fname</th>
                                <th>lname</th>
                                <th>email</th>
                                <th>gender</th>
                                <th>city</th>
                                <th>hobby</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>


                            {this.state.narr.map((val, index) => {
                                return <tr>
                                    <td>{val.key}</td>
                                    <td>{val.fname}</td>
                                    <td>{val.lname}</td>
                                    <td>{val.email}</td>
                                    <td>{val.gender}</td>
                                    <td>{val.city}</td>
                                    <td>{val.option}</td>
                                    <td><button onClick={() => this.handeldeletedata(val.key)} >delete</button><button onClick={() => this.updatedata(index)}>update</button></td>


                                </tr>
                            })

                            }

                        </tbody>


                    </table>

                </center>
            </div>
        )
    }
}
