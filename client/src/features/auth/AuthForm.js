import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authenticate } from '../../app/store';

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

// this crashes the app if there is no backend to connect to
const AuthForm = ({ name, displayName }) => {

  //console.log(name,displayName)
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };
  
  //console.log( 'error' , error )

  return (
    <div style={{position:"relative",float:"right",marginRight:"5vw",zIndex:'500'}}>
      <form onSubmit={handleSubmit} name={name}>
  
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
          <br></br>
          <button type="submit">{displayName}</button>
  
        {error && <div> {error} </div>}
      </form>
    </div>
  );
  

};

export default AuthForm;
