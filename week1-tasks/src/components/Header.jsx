import React from "react";
import './styles/header.css';

import {GoogleButton} from 'react-google-button';
import { UserAuth } from "../context/AuthContext";


const Header = () =>{
    const {googleSignIn , logOut , user} = UserAuth();

    const handleGoogleSignIn = async () =>{
        try{
            await  googleSignIn();
        }catch(err){
            console.log(err);
        }
    }

    const handleSignOut = async () =>{
        try{
            await logOut();
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="Header">
            <div className="logo">Calculator</div>
            <div className="user">
                <div className="name"><span>Welcome!  </span><span>{user? user.displayName : 'Guest'}</span></div>
                <div>
                {
                    user?
                    <button className="" onClick={handleSignOut}>Logout</button>
                    :
                    <button className="" onClick={handleGoogleSignIn}>Sign In</button>
                }
                </div>
            </div>
        </div>
    )
}
export default Header;