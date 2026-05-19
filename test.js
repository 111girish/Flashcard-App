import bcrypt from 'bcrypt';

const password = "Grishma@123";
const saltRounds = 12;

const hashedPass = await bcrypt.hash(password, saltRounds);
console.log("Hashed:", hashedPass);

const result = await bcrypt.compare(password, hashedPass);
console.log("Match:", result);

const wrongResult = await bcrypt.compare("wrongpassword", hashedPass);
console.log("Wrong match:", wrongResult);