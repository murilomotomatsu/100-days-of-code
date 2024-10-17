import React from "react";
import Todo from "../components/Todo";

//Main Home
export default function Home () {

    return(
        <>
            <h1>Home Page</h1>
            <Todo editable={true} />
            <Todo editable={false} />
        </>
    )
}