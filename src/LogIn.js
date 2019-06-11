import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "./Login.css";
import "firebase/auth";
import firebaseApp from "./firebaseConfig";
import {Container, Paper, Card, Chip, Button, Typography} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import LoginLogo from "./LoginLogo.png";
import GoogleIcon from "./googleicon.png";
import Register from "./Register.js"
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const firebaseAppAuth = firebaseApp.auth();

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: "new user",
      register: false,
      hasAccount: false,
    };
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  // pass this to register page, so that you can create an account with the google user
  setStudentFields = (registerStudentObject) => {
    this.setState({
      status: registerStudentObject.status,
      linkedIn: registerStudentObject.linkedIn,
      github: registerStudentObject.github
    }, this.createStudentInDatabase) // move to create the student in the database
  }

  // set the state to refer to a company, then create company in database
  setCompanyFields = (registerCompanyObject) => {
    this.setState({
      status: registerCompanyObject.status,
      website: registerCompanyObject.website,
      companyName: registerCompanyObject.name
    }, this.createCompanyInDatabase)
  }

  // creates a student in the database
  createStudentInDatabase = () => {

    firebaseApp.auth().signInWithPopup(this.googleProvider).then(
      (socialAuthUser) => {
        let isNewUser = socialAuthUser.additionalUserInfo.isNewUser; // accesses google object with this boolean field

        if (isNewUser) {
          let currentUser = firebaseApp.auth().currentUser; // currentGoogleUser object

          const studentsRef = firebaseApp.database().ref(`students/`); // list of students in database
      
          const newStudent = { // new student object
            name: currentUser.displayName,
            email: currentUser.email,
            uid: currentUser.uid,
            photoURL: currentUser.photoURL,
            github: this.state.github,
            linkedIn: this.state.linkedIn,
            contracts_interested: [],
            contracts_working: [],
            contracts_completed:[],
            posts: [], 
            
          };
          studentsRef.push(newStudent); // push new student to list of students 

          // redirect to student profile and pass the uid to profile
          this.props.history.push({pathname: '/users/student/profile', state: {uid: newStudent.uid}});
        }
        
        else { // already has account
          console.log("this email already has an account! ")
        }
      }
    )
  }

  // create a company in the database
  createCompanyInDatabase = () => {
    firebaseApp.auth().signInWithPopup(this.googleProvider).then(
      (socialAuthUser) => {
        let isNewUser = socialAuthUser.additionalUserInfo.isNewUser;

        if (isNewUser) {
          let currentUser = firebaseApp.auth().currentUser;

          const companiesRef = firebaseApp.database().ref(`companies/`);
  
          const newCompany = {
            name: this.state.companyName,
            uid: currentUser.uid,
            photoURL: currentUser.photoURL,
            email: currentUser.email,
            website: this.state.website,
            contracts:[]
          };
  
          companiesRef.push(newCompany); // create new company user!
  
          // redirect to company profile, pass the uid to the profile!
          this.props.history.push({pathname: '/users/company/profile', state: {uid: newCompany.uid}})
        }
        else {
          console.log("this email already has an account")
        }
      }
    )
  }

// displays the register page
  setRegister = () => {
    this.setState({
      register: true,
    })
  }

  loginStudent = () => {
    if (this.props.user) {
      this.props.history.push({pathname: '/users/student/profile', state: {uid: firebaseApp.auth().currentUser.uid}});
    }
    else{
    firebaseApp.auth().signInWithPopup(this.googleProvider).then( // connect to google account
      (socialAuthUser) => {
        let isNewUser = socialAuthUser.additionalUserInfo.isNewUser;
        if (isNewUser) {
          console.log('you need to create an account!!')
        }
        else {
          // redirect to student profile and pass the uid to profile
          this.props.history.push({pathname: '/users/student/profile', state: {uid: firebaseApp.auth().currentUser.uid}}); // pass google auth uid
        }
      }
    ) 
  }
  }

  loginCompany = () => {
    if (this.props.user) {
      this.props.history.push({pathname: '/users/company/profile', state: {uid: firebaseApp.auth().currentUser.uid}});
    }
    else{
    firebaseApp.auth().signInWithPopup(this.googleProvider).then(
      (socialAuthUser) => {
        let isNewUser = socialAuthUser.additionalUserInfo.isNewUser;
        if (isNewUser) {
          console.log('you need to create an account!!')
        }
        else {
          // redirect to student profile and pass the uid to profile
          this.props.history.push({pathname: '/users/company/profile', state: {uid: firebaseApp.auth().currentUser.uid}}); // pass google auth uid
        }
      }
    )
    }
  }

  // componentDidMount() {
  //   firebaseApp.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.setState({
  //         currentUser: user.uid
  //       });
  //     } else {
  //       this.setState({
  //         currentUser: "no_login"
  //       });
  //     }
  //   });
  // }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;

    return (
      <Container className="login" maxWidth="sm">
          <img src={LoginLogo} alt="Logo" width='220px' />

          <div class="login-form">
            
            <p>{"\n"}</p>

                {user ? <p>Hello, {user.displayName}</p> : <p> Please connect to your google account.</p>}

            <p>{"\n"}</p>

              <div >
                <div className='login-as'> Login as: </div>
                <Button variant="outlined" color="primary" size="medium" onClick={this.loginStudent}>
                  Student
                </Button>
                
                <Button variant="outlined" color="primary" size="medium" onClick={this.loginCompany}>
                  Company
                </Button>
                <p>
                  { (user) ? 
                    <div>
                      <br/>
                      Not {user.displayName}?
                      <Button size="small" onClick={signOut} >
                        Log out
                      </Button>
                    </div>
                    : <div></div>
                  } 
                </p>
              </div>

  
            <p>{"\n"}</p>
            <div>
              New to RevTech? <Button size="small" onClick={this.setRegister}>Register Now!</Button>
              {this.state.register? <Register setStudentFields={this.setStudentFields} setCompanyFields={this.setCompanyFields}/> : <div></div>}
            </div>

        </div>
        <br />
        <br />
        <p>
          RevTech connects software engineering students 
            and companies in search of freelance hires.
        </p>
        <p>
          If you are new to us, simply register as either a student or company, 
          and connect using your Google Login.
        </p>
      </Container>
    );
  }
}

export default withFirebaseAuth({
  //providers,
  firebaseAppAuth
})(Login);
