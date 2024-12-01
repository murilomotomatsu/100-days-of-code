import React from "react";
import Todo from "../components/Todo";
import Navbar from "../components/Navbar";

//Main Home
export default function Home () {

    return(
        <div className="mainApp"> 
            <Navbar />
            <Todo editable={true} />
            <Todo editable={false} />
        </div>
    )
}