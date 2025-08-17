import connection from "../db/Connection.js ";

const createAccount=async(req,res)=>{
try {
   const{
    bank_name,
    account_holder_name,
    account_number,
    IFSC_code,
    branch_name,
    payment_method,
    transaction_type,
    transaction_amount
   }=req.body;
const [result]=await connection.query(`insert into account_holders (bank_name, account_holder_name, account_number, IFSC_code, branch_name, payment_method, transaction_type, transaction_amount) values (?, ?, ?, ?, ?, ?, ?, ?)`, [bank_name, account_holder_name, account_number, IFSC_code, branch_name, payment_method, transaction_type, transaction_amount]);
console.log("myresult", result)

res.status(201).json({  message: 'Purchase Successfully', data: result });

} catch (error) {
    res.status(500).json(
        { 
            message: 'Error creating account', error: error.message 
        })
}

}

const getAccountHolders=async(req,res)=>{
    try {
        const [rows] = await connection.query(`SELECT * FROM account_holders`);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'No account holders found' });
        }
         console.log("myrows", rows)
        res.status(200).json({ message: 'Account holders fetched successfully', message: rows });
    } catch (error) {
        res.status(500).json(
            {
                message: 'Error retrieving account holders', 
                error: error.message
            })
    }
}

const getAccountHolderById=async(req,res)=>{
    const{accountId}=req.params;
    try {
       const[user]= await connection.query(`select * from account_holders where bank_id=?`,[accountId])
       if(user.length===0){
           return res.status(404).json({ message: 'Account holder not found' });
       }
       res.status(200).json({ message: 'Account holder fetched successfully', 
        message: user });
    } catch (error) {
        console.log("error in fetching account holder",error)
        res.status(500).json(
            {
                message: 'Error retrieving account holder', 
                error: error.message
            })
        
    }

    

}

const updateAccountHolder=async(req,res)=>{
    const { accountId } = req.params;
    const {
        bank_name,
        account_holder_name,
        account_number,
        IFSC_code,
        branch_name,
        payment_method,
        transaction_type,
        transaction_amount
    } = req.body;

    try {
        const [result] = await connection.query(`UPDATE account_holders SET bank_name = ?, account_holder_name = ?, account_number = ?, IFSC_code = ?, branch_name = ?, payment_method = ?, transaction_type = ?, transaction_amount = ? WHERE bank_id = ?`, [bank_name, account_holder_name, account_number, IFSC_code, branch_name, payment_method, transaction_type, transaction_amount, accountId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Account holder not found' });
        }
        res.status(200).json({ message: 'Account holder updated successfully' });
    } catch (error) {
        res.status(500).json(
            {
                message: 'Error updating account holder',
                error: error.message
            })
    }
}


const deleteAccountHolder=async(req,res)=>{
    const{accountId}=req.params;
    try {
        const [result] = await connection.query(`DELETE FROM account_holders WHERE bank_id = ?`, [accountId]);
        if (result.affectedRows===0) {
            return res.status(404).json({ message: 'Account holder not found' });
        }
        res.status(200).json({ message: 'Account holder deleted successfully',
            data: result
         });
    } catch (error) {
        res.status(500).json(
            {
                message: 'Error deleting account holder',
                error: error.message
            })
    }
}

const getAllTransactions=async(req,res)=>{
    try {
        const{accountNumber}=req.params;
      const [rows]= await connection.query(`select * from account_holders where account_number = ?`, [accountNumber])
      if (rows.length === 0) {
          return res.status(404).json({ message: 'No transactions found for this account' });
      }
      res.status(200).json({ message: 'Transactions fetched successfully', data: rows });
    } catch (error) {
        res.status(500).json(
            {
                message: 'Error retrieving transactions',
                error: error.message
            })
    }
}

export { createAccount, getAccountHolders, getAccountHolderById ,updateAccountHolder,deleteAccountHolder,getAllTransactions};