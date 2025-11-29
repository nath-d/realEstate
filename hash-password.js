const bcrypt = require('bcrypt');

// Change this to your desired password
const password = 'Admin123!';
const saltRounds = 10;

const hashedPassword = bcrypt.hashSync(password, saltRounds);
console.log('Original password:', password);
console.log('Hashed password:', hashedPassword);

// Verify the hash works
const isValid = bcrypt.compareSync(password, hashedPassword);
console.log('Hash verification:', isValid ? 'SUCCESS' : 'FAILED');
