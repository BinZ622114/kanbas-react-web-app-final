import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signup = async () => {
    const currentUser = await client.signup(user);
    dispatch(setCurrentUser(currentUser));
    navigate("/Kanbas/Account/Profile");
   };  
  return (
    <div className="wd-signup-screen">
       <h1>Sign up</h1>
       <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="wd-username form-control mb-2" placeholder="username" />
       <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password"
              className="wd-password form-control mb-2" placeholder="password" />

       <div className="mb-3 row">
        <label htmlFor="user-role" className="col-sm-4 col-form-label text-end">
          Role
        </label>
        <div className="col-sm-8" id="user-role">
          <select className="form-select" value={user.role} 
                  onChange={(e) => setUser({ ...user, role: e.target.value })}>
            <option value="STUDENT">STUDENT</option>
            <option value="FACULTY">FACULTY</option>
          </select>
        </div>
      </div>

       <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br />
       <Link to="/Kanbas/Account/Signin" className="wd-signin-link">Sign in</Link>
    </div>
);}
