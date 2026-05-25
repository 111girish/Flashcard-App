import { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name:"",
    username: "",
    email:"",
    password: ""
  })

  const handleSubmit = () => {
    console.log(formData.first_name);
  }

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData, 
      [name]: value
    })
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit = {handleSubmit}>
        <input type="text" placeholder="first name" onChange = {handleChange} />
        <input type="text" placeholder="last name" onChange = {handleChange}/>
        <input type="text" placeholder="username" onChange = {handleChange}/>
        <input type="email" placeholder="email" onChange = {handleChange}/>
        <input type="text" placeholder="password" onChange = {handleChange}/>
        <input type="submit"></input>
      </form>
    </>
  );
};

export default Register;
