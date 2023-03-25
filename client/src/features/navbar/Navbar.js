import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';   //no need for <Link /> in this case
import { logout } from '../../app/store';
import { logoutFromServer } from '../players/playersSlice'

const marginL = {margin:"0",marginLeft:"5px"}
const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    dispatch(logoutFromServer(username))
    navigate('/login');
  };

  return ( [
    <div key="navContainer" style={{position:"fixed",zIndex:"200"}}>
    <div className="flexRowx" >
      <h2 style={marginL}>Mancala Player Center</h2>
      <nav>
        {isLoggedIn ? (
          <div style={marginL}>
            <button type="button" onClick={logoutAndRedirectHome}>
              Logout
            </button>
          </div>
        ) : (
          null
        )}
      </nav>
    </div>
     
    {!isLoggedIn &&
      <div style={{position:"relative",top:"12vh",width:"100vw",
          display:"flex",flexDirection:"column"}} >
        <div style={{textAlign:"center",
          marginLeft:"5vw",marginRight:"5vw",
          }}>
          <p style={{fontSize:"1.5em", fontWeight:"bold",textShadow:"-1px 0 white, 0 1px white, 1px 0 white, 0 -1px white"}}>
            You have control of the 6 Dodechedrons at the bottom of the board
            plus one of the big Icosahedrons to your Right.  Click on a Dodecahedron
            to sow the stones one at a time counter clockwise. First Person to clear 
            their side of stones wins. If your last stone lands on the big Isosahedron 
            to your right, you go again.
          </p>
        </div>
        <div>
          <img src="preview.jpg" 
            style={{width:"100%",height:"100%"}}
            alt="Mancala Board Preview"></img>
        </div>
      </div>
    }
    </div> 
  ]);
};

export default Navbar;
