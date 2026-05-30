import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    email: "", 
    password: ""
  })
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginData({
      ...loginData,
      [name] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post("http://localhost:5000/api/auth/login/", loginData)
      console.log("User is qualified");
      localStorage.setItem('token', result.data.token);
      navigate("/dashboard");
    }
    catch(err){
      console.log(err);
      console.log("The match was not found!!!");
    };

  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" name='username' onChange={handleChange} />
        <input type="email" placeholder='email' name='email' onChange={handleChange}/>
        <input type="password" placeholder='password' name='password' onChange={handleChange} />
        <input type="submit" />
      </form>
    </>
  );

}

export default Login;