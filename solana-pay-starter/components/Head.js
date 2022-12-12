import React from "react";
import Head from "next/head";
import DAOImage from '../public/favicon.ico'

export default function HeadComponent() {
  return (
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="theme-color" content="#000000" />

      <title>AIC DAO Journal Store</title>
      <meta name="title" content="III Manga Store" />
      <meta name="description" content={DAOImage} />

      {/* Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://aicities.vercel.app/" />
      <meta property="og:title" content="III Manga Store" />
      <meta property="og:description" content="Buy III DAO mangas with USDC using Solana Pay!" />
      <meta property="og:image" content={DAOImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://aicities.vercel.app/" />
      <meta property="twitter:title" content="III Manga Store" />
      <meta property="twitter:description" content="Buy III DAO mangas with USDC using Solana Pay!" />
      <meta property="twitter:image" content={DAOImage} />
    </Head>
  );
}
