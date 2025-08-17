import connection from "../db/Connection.js";


    
        await connection.query(`
  CREATE TABLE IF NOT EXISTS account_holders (
    bank_id INT AUTO_INCREMENT PRIMARY KEY,
    bank_name VARCHAR(100) NOT NULL,
    account_holder_name VARCHAR(100) NOT NULL,
    account_number VARCHAR(100) NOT NULL,
    IFSC_code VARCHAR(100) NOT NULL,
    branch_name VARCHAR(100) NOT NULL,
    payment_method ENUM('Cash', 'Card','UPI','Wallet','Cheque') NOT NULL,
    transaction_type ENUM('Credit', 'Debit') NOT NULL,
    transaction_amount DECIMAL(10, 2) NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);
    