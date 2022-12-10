import React from "react";
import HeadComponent from '../components/Head';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Product from "../components/Product"
import CreateProduct from "../components/CreateProduct";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import styles from "../styles/CreateProduct.module.css";

// Constants
const TWITTER_HANDLE = "_AIC";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const REALMS_LINK = `https://app.realms.today/dao/bbG3PnjjvDeWWEWY1miRgEKGqwep2FyAZNvir9YEGb9?cluster=devnet`;

const App = () => {
  const { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState([]);
  
  const renderNotConnectedContainer = () => (
    <div>
      <img width="750" height="400" src="https://media.giphy.com/media/1Rj8aaXgAvMoGN2bYu/giphy.gif" alt="emoji" />

      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>    
    </div>
  );
  
  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="App">
      <HeadComponent/>
      <div className="container">
        <header className="header-container">
          <p className="header">AIC DAO STORE</p>
          <p className="sub-text">Weekly publication for places to see around the world by AI CITY DAO</p>
          
          {isOwner && (
            <button className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close" : "Create Product"}
            </button>
          )}
        </header>

        <main>
          {creating && <CreateProduct />}
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>

        <div>
          <div className="sub-text">
           <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
           <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
            >{`@${TWITTER_HANDLE}`}</a>
          </div>
           <div class="sub-text">
            <a
              className="footer-text"
              href={REALMS_LINK}
              target="_blank"
              rel="noreferrer"
            >{`DAO on Realms`}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
  
export default App;


