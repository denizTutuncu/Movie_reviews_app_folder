import React from "react";
import HeadComponent from '../components/Head';
import { useWallet } from '@solana/wallet-adapter-react';
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Product from "../components/Product"
import CreateProduct from "../components/CreateProduct";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Constants
const TWITTER_HANDLE = "_IIIDAO";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const REALMS_LINK = `https://app.realms.today/dao/bbG3PnjjvDeWWEWY1miRgEKGqwep2FyAZNvir9YEGb9?cluster=devnet`;

const App = () => {
  const { publicKey } = useWallet();
  const isOwner = ( publicKey ? publicKey.toString() === process.env.NEXT_PUBLIC_OWNER_PUBLIC_KEY : false );
  const [creating, setCreating] = useState(false);
  const [products, setProducts] = useState([]);
  
  const renderNotConnectedContainer = () => (
    <div>
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
        <header>

          <div className="hstack">
            <div className="textaligment">
              <p className="header">III MANGA STORE</p>
        
              <p className="sub-text">
                Welcome to III, the ultimate online destination for manga enthusiasts! Created and managed by the III DAO, III is a one-of-a-kind manga store that offers a vast collection of titles spanning every genre and demographic.
              </p>

              <p className="sub-text">
                Whether you're a fan of action-packed shounen series or heartwarming slice-of-life stories, III has you covered. Our collection includes classic titles and the latest releases, so you'll never run out of great manga to read.
              </p>
              <p className="sub-text">
                But III is more than just a manga store – we also offer a community for fans to connect and share their love for their favorite series. Join our forums and chat with other manga fans, or take part in our monthly manga challenges and competitions.
              </p>
          
              <p className="sub-text">
                Join the III DAO and discover a world of endless manga possibilities. Start your journey today at III!
              </p>
            </div>

            <div className="header">
              <img src="https://media.giphy.com/media/ggzoiqGhU1Pg5fptUe/giphy.gif" alt="emoji" />
            </div>
         </div>
        
          {isOwner && (
            <button className="create-product-button" onClick={() => setCreating(!creating)}>
              {creating ? "Close" : "Create Product"}
            </button>
          )}
        </header>

        <main>
          {creating && <CreateProduct /> }
          {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>


            <div className="socialBottomAligment">
            <div className="hstack">
          <div>
            <div className="sub-text">
              <img alt="Twitter Logo" className="twitter-logo" src="twitter-logo.svg" />
            </div>

            <div className="sub-text">
              <a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">
                {`@${TWITTER_HANDLE}`}
              </a>
            </div>
          </div>
          
          <div>
            <div className="sub-text">
              <img alt="DAO Logo" className="DAO-logo" src="DAO.png" />
            </div>

            <div className="sub-text">
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
       
      </div>
    </div>
  );
};
  
export default App;


