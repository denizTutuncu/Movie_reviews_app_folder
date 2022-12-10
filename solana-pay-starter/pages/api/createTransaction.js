import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import BigNumber from "bignumber.js";
import products from "./products.json";
import { createTransferCheckedInstruction, getAssociatedTokenAddress, getMint } from "@solana/spl-token";

// const mainNetUSDCAddress = new PublicKey("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
const usdcDevNetAddress = new PublicKey("Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr");

const sellerSOLAddress = 'GBByA19DBaJuSYUZU6fckCv6BmHxn8wR2HdBu2YNkB2B'
const sellerUSDCAddress = '5BP8Pu21u1NxsJvG2rXrHUC9Gq5icgcgzgLFNLyGzQa3'
const sellerUSDCPublicKey = new PublicKey(sellerUSDCAddress);
const sellerSOLPublicKey = new PublicKey(sellerSOLAddress);

const createTransaction = async (req, res) => {
  try {
    // Extract the transaction data from the request body
    const { buyer, orderID, itemID } = req.body;
    // If we don't have something we need, stop!
    if (!buyer) {
      return res.status(400).json({
        message: "Missing buyer address",
      });
    }

    if (!orderID) {
      return res.status(400).json({
        message: "Missing order ID",
      });
    }

    // Fetch item price from products.json using itemID
    const itemPrice = products.find((item) => item.id === itemID).price;
    console.log("itemPrice", itemPrice);

    if (!itemPrice) {
      return res.status(404).json({
        message: "Item not found. please check item ID",
      });
    }
    
    // Convert our price to the correct format
    const bigAmount = BigNumber(itemPrice);
    const buyerPublicKey = new PublicKey(buyer);
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const connection = new Connection(endpoint);
    // A blockhash is sort of like an ID for a block. It lets you identify each block.
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("finalized");

    const tx = new Transaction({
        blockhash: blockhash,
        feePayer: buyerPublicKey,
        lastValidBlockHeight: lastValidBlockHeight
    });

    // This is the "action" that the transaction will take
    // We're just going to transfer some SOL
    const transferInstruction = SystemProgram.transfer({
      fromPubkey: buyerPublicKey,
      // Lamports are the smallest unit of SOL, like Gwei with Ethereum
      lamports: bigAmount.multipliedBy(LAMPORTS_PER_SOL).toNumber(), 
      toPubkey: sellerSOLPublicKey,
    });

    // We're adding more instructions to the transaction
    transferInstruction.keys.push({
      // We'll use our OrderId to find this transaction later
      pubkey: new PublicKey(orderID), 
      isSigner: false,
      isWritable: false,
    });

    tx.add(transferInstruction);
  
    // Formatting our transaction
    const serializedTransaction = tx.serialize({
      requireAllSignatures: false,
    });
    const base64 = serializedTransaction.toString("base64");

    res.status(200).json({
      transaction: base64,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "error creating tx" });
    return;
  }
}

const createUSDCTransaction = async (req, res) => {
    try {
      // Extract the transaction data from the request body
      const { buyer, orderID, itemID } = req.body;
      console.log("buyer", buyer);
      console.log("orderID", orderID);
      console.log("itemID", itemID);
      console.log("orderID", orderID);
     
  
      // If we don't have something we need, stop!
      if (!buyer) {
        return res.status(400).json({
          message: "Missing buyer address",
        });
      }
  
      if (!orderID) {
        return res.status(400).json({
          message: "Missing order ID",
        });
      }
  
      // Fetch item price from products.json using itemID
      const itemPrice = products.find((item) => item.id === itemID).price;
      console.log("itemPrice", itemPrice);
  
      if (!itemPrice) {
        return res.status(404).json({
          message: "Item not found. please check item ID",
        });
      }
      
      // Convert our price to the correct format
      const bigAmount = BigNumber(itemPrice);
      const buyerPublicKey = new PublicKey(buyer);
      const network = WalletAdapterNetwork.Devnet;
      const endpoint = clusterApiUrl(network);
      const connection = new Connection(endpoint);
  
      // A blockhash is sort of like an ID for a block. It lets you identify each block.
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash("finalized");
  
    //   MARK:- USDC PAYMENT STARTS ***
    //   This is new, we're getting the mint address of the token we want to transfer
      const buyerUsdcAddress = await getAssociatedTokenAddress(usdcDevNetAddress, buyerPublicKey);
      const shopUsdcAddress = await getAssociatedTokenAddress(usdcDevNetAddress, sellerUSDCPublicKey);
      console.log("shopUsdcAddress", shopUsdcAddress.toString());
      const usdcMint = await getMint(connection, usdcDevNetAddress);
  
      const tx = new Transaction({
          blockhash: blockhash,
          feePayer: buyerPublicKey,
          lastValidBlockHeight: lastValidBlockHeight
      });
  
      // Here we're creating a different type of transfer instruction
      const usdcTransferInstruction = createTransferCheckedInstruction(
          buyerUsdcAddress, 
          usdcDevNetAddress,     // This is the address of the token we want to transfer
          shopUsdcAddress, 
          buyerPublicKey, 
          bigAmount.toNumber() * 10 ** (await usdcMint).decimals, 
          usdcMint.decimals // The token could have any number of decimals
      );
        // The rest remains the same :)
      usdcTransferInstruction.keys.push({
          pubkey: new PublicKey(orderID),
          isSigner: false,
          isWritable: false,
      });
  
  
      tx.add(usdcTransferInstruction);
  
      const usdcSerializedTransaction = tx.serialize({
          requireAllSignatures: false,
      });
  
      const base64 = usdcSerializedTransaction.toString("base64");
  
      res.status(200).json({
          transaction: base64,
        });
    } catch (error) {
      console.error(error);
  
      res.status(500).json({ error: "error creating tx" });
      return;
    }
  }

export default function handler(req, res) {
  if (req.method === "POST") {
    createTransaction(req, res);
    // createUSDCTransaction(req, res);
  } else {
    res.status(405).end();
  }
}