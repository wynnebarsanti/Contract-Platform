import React from 'react';
import StudentNavbar from './StudentNavbar';
import {FormControl, TextField, AppBar, Toolbar, Button } from '@material-ui/core';
import HeaderLogo from "./HeaderLogo.png";
import "./NewContract.css"

class NewContract extends React.Component {

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
                        <StudentNavbar />
                    </div>
                    </Toolbar>
                </AppBar>

                <br/>
                <h1>Post a New Contract</h1>
                <div className='new-contract'>
                    <TextField
                        placeholder="Contract Title"
                        label="Contract Title"
                        //on change
                    />
                    <TextField
                        placeholder="Contract Details"
                        label="Contract Details"
                        id="outlined-multiline-flexible"
                        multiline
                        rows="4"
                        //onchange
                    />
                    <TextField
                        placeholder="$$$"
                        label="Compensation"
                        //onchange
                    />
                    <br/>
                    <Button 
                        color='primary'
                        variant="contained"
                        size='large'
                        //onclick
                    >
                        Post!
                    </Button>
                </div>


            </body>
        )
    }

}

export default NewContract;