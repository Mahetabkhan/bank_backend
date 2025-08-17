import express from 'express'
import { createAccount, deleteAccountHolder, getAccountHolderById, getAccountHolders, getAllTransactions, updateAccountHolder } from '../controllers/accountholdercontroller.js'
const router = express.Router()

router.post('/accountHolder',createAccount)
router.get('/getAccountHolders',getAccountHolders)
router.get('/getAccountHolders/:accountId',getAccountHolderById)
router.put('/updateAccountHolder/:accountId', updateAccountHolder)
router.delete('/deleteAccountHolder/:accountId',deleteAccountHolder)
router.get('/getAllTransaction/:accountNumber',getAllTransactions)





export default router