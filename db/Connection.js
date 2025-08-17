import mysql from 'mysql2/promise'



const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Root@123',
  database: 'banking'
});

console.log("connection established");

await connection.query(`create database if not exists banking`);
await connection.query(`use banking`);




// try {
//   await connection.connect();
//   console.log('Connected to the MySQL database');
// } catch (error) {
//   console.error('Error connecting to the database:', error);
// }   




export default connection;
