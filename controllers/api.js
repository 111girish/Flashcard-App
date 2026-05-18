let users = [];


export const register = (req, res) => {
  const {first_name, last_name, password, username, email, phone_no} = req.body;

  if(!first_name || !last_name || !password || !username || !email){
    res.send(`Something is missing man`)
  }

  res.send(`The data is recieved.${first_name} ${last_name}`);
}