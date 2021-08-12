import React from 'react';
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";



const FormData = () => {
    const [state, setstate] = useState({ name: "", email: "", password: "" });


    const data = {
        name: state.name,
        email: state.email,
        password: state.password

    }

    const handleclick = (e) => {
        e.preventDefault();
     
        console.log("data", data)
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),

            headers: {
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded',
            }
        };
        console.log("body", requestOptions.body)
        fetch('http://localhost:3001/users/', requestOptions)
            .then(response => response.json())
 }

    return (
        <form >
            <TextField
                value={state.name}
                onChange={(e) => setstate({ ...state, name: e.target.value })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                autoFocus
            />
            <TextField
                value={state.email}
                onChange={(e) => setstate({ ...state, email: e.target.value })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                value={state.password}
                onChange={(e) => setstate({ ...state, password: e.target.value })}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleclick}
            >
                Sign In
          </Button>

        </form>
 );
}


export default FormData;