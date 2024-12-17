import React from "react";
import Todo from "../components/Todo";
import Navbar from "../components/Navbar";
import ChristmasLights from "../components/ChristmasLights";
import Snowfall from "react-snowfall";
import Sled from "../components/Sled";

//Main Home
export default function Home () {

    return(
        <div className="mainApp"> 
            <Snowfall 
                snowflakeCount={200}
                maxSpeed={5}
                style={{zIndex:-1, height:'200%'}}
            />
            <ChristmasLights />
            <Navbar />
            <Todo editable={true} />
            <Todo editable={false} />
            <Sled />
        </div>
    )
}