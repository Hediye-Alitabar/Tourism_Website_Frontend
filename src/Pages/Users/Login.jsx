// import { Link } from "react-router-dom";
// import { get } from '../../utils/httpClient'
import './Login.css';
import { post } from '../../utils/httpClient'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LoginForm(){
   const [username, setUsername] = useState("");
   const [pasword, setPasword] = useState("");

   const handleSend = async () => {
    const response = await post ('/login', {username, pasword});
        console.log(response);
   }

    return <div className="login">
        <input type="text" placeholder="Username..." value={username} onChange={(e) => setUsername(e.target.value)}/>
        <br />
        <br />
        <input type="text" placeholder="Password..." value={pasword} onChange={(e) => setPasword(e.target.value)}/>
        <br />
        <br />
        <button onClick={handleSend}>Login</button>
        <br />
        <br />
        <Link to="/">Back</Link>
        </div>
}