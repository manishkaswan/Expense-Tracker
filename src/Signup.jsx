import React, { useState } from "react";
import "./signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [userexists, setUserexist] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  async function checkauth() {
    const response = await fetch('https://expense-tracker-3a5a8-default-rtdb.firebaseio.com/signup.json', {
        method: 'GET', 
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
    const adata = await response.json();
    for (let key in adata) {
        if(adata[key].email === email) {
           setUserexist(true);
            return;
        }
    }
    console.log(adata);
    
  }

  async function handleSignup (e) {
    e.preventDefault();
    await checkauth()
    if(userexists) {
      setErrorMessage("User already exists");
      return;
    }

    // Simple validation
    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }
    const userdate = {
        email: email,
        password: password
    }
    const response = await fetch('https://expense-tracker-3a5a8-default-rtdb.firebaseio.com/signup.json', {
        method: 'POST', 
        body: JSON.stringify(userdate),
        headers: {
            'Content-Type': 'application/json'
        }
        
    })
    const data = await response.json();
    console.log(data);

    console.log("Signup successful!");
    
  };

  

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-input"
          />
        </div>
        <button onClick={handleSignup} type="submit" className="form-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
