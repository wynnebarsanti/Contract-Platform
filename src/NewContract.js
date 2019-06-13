import React from 'react';
import CompanyNavbar from './CompanyNavbar';
import {FormControl, TextField, AppBar, Toolbar, Button } from '@material-ui/core';
import HeaderLogo from "./HeaderLogo.png";
import { makeStyles } from '@material-ui/core/styles';
import "./NewContract.css"
import firebaseApp from "./firebaseConfig";



class NewContract extends React.Component {

    state = {
        contract_title: "",
        contract_details: "",
        compensation: "",
        addedSuccess: false
    }

    setTitle = (input) => {
        this.setState({
            contract_title: input
        })
    }

    setDetails = (input) => {
        this.setState({
            contract_details: input
        })
    }

    setCompensaton = (input) => {
        this.setState({
            compensation: ""
        })
    }

    addContract = () => {
        const contractsRef = firebaseApp.database().ref(`contracts/`);
        let company_id = firebaseApp.auth().currentUser.uid;
        let currentDate = new Date().toLocaleString();
        let newContract = {
            title: this.state.contract_title,
            details: this.state.contract_details,
            date_created: currentDate,
            payment: this.state.compensation,
            date_claimed: null,
            date_completed: null,
            company_id: company_id,
            student_id: null,
        }
        contractsRef.push(newContract);
        this.setState({
            addedSuccess: true,
        })
        this.clearForm();
    }

    clearForm = () => {
        document.getElementById("create-contract-form").reset();
    }

    render() {    

        return (
            <body>
                <AppBar position="relative">
                    <Toolbar>
                    <img src={HeaderLogo} height="80" alt="Logo" />
                    <div
                        style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%, -50%)",
                        float: "right",
                        textAlign: "right",
                        display: "inline - block",
                        width: "98%",
                        padding: "10px",
                        justifyContent: "space-between"
                        }}
                    >
                        <CompanyNavbar />
                    </div>
                    </Toolbar>
                </AppBar>

                <br/>
                <h1>Post a New Contract</h1>
                <form id="create-contract-form">
                    <div className='new-contract'>
                            <TextField
                                id="outlined-name"
                                placeholder="Contract Title"
                                label="Contract Title"
                                onChange={(e)=>this.setTitle(e.target.value)}
                            />
                            <TextField
                                placeholder="Contract Details"
                                label="Contract Details"
                                id="outlined-multiline-flexible"
                                multiline
                                rows="4"
                                onChange={(e)=>this.setDetails(e.target.value)}
                            />
                            <TextField
                                placeholder="$$$"
                                label="Compensation"
                                onChange={(e)=>this.setCompensaton(e.target.value)}
                            />
                            <br/>
                            <Button 
                                color='primary'
                                variant="contained"
                                size='large'
                                onClick={this.addContract}
                            >
                                Post!
                            </Button>
                    </div>
                </form>

            </body>
        )
    }

}

export default NewContract;