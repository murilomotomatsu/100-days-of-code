import React from "react";
import Todo from "../components/Todo";
import Navbar from "../components/Navbar";
import ChristmasLights from "../components/ChristmasLights";

//Main Home
export default function Home () {

    return(
        <div className="mainApp"> 
            <ChristmasLights />
            <Navbar />
            <Todo editable={true} />
            <Todo editable={false} />
        </div>
    )
}