import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

// this crashes the app if there is no backend to connect to
const AuthForm = ({ name, displayName }) => {

  //console.log(name,displayName)
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [method,setMethod] = React.useState("login")

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log("method is",method)
    const formName = method
    const username = evt.target.username.value;
    const password = "horseshit"; //evt.target.password.value;  //password doesn't matter anymore
    dispatch(authenticate({ username, password, method: formName }));
  };
  
  return (
    <div style={{position:"relative",float:"right",marginRight:"5vw",zIndex:'500'}}>
      <form onSubmit={handleSubmit} name={name}>
  
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />

          {/*
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
          */}
          
          <br></br>

          <button onClick={()=>void setMethod("login")} type="submit" name="authMethod" value="login">Login</button>
          <button onClick={()=>void setMethod("signup")} type="submit" name="authMethod" value="signup">SignUp</button>
  
        {error && <div> {error} </div>}
      </form>
    </div>
  );
  
};

export default AuthForm;
