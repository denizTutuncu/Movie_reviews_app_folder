# Solana Study

## 🎥 On-chain Movie Review Program with comments 💬
## 💳 Online Solana Store 💳

#### 1. `movie_review_comments` is a Rust application which can be deployed on Solana blockchain to securely hold our movie data.

#### 2. `solana-movie-frontend` application is a Next.js project bootstrapped with `create-next-app` and it displays our data which comes from Solana blockchain.

#### 3. `solana-pay-starter` application is a Next.js project bootstrapped with `create-next-app` and it is an online store that accepts $SOL/$USDC as a payment method.

#### This directory includes 3 different solutions. 
 
#### `movie_review_comments` & `solana-movie-frontend` are related projects. 

`movie_review_comments` demonstrates a simple movie review program that allows users to post movie reviews and other users to comment on them. The program stores all the data on chain and is implemented using a set of Rust BPF programs. 
`solana-movie-frontend` demonstrates a simple front-end application that interacts with deployed Solana program which is `movie_review_comments`.


#### `solana-pay-starter` demonstrates a simple front-end application that accepets $SOL/$USDC with Solana Pay.

### Instructions

1. Set-up your local Solana development environment.
2. cd `movie_review_comments`
3. Run `cargo build-bpf` in the `movie_review_comments` directory to build the BPF programs.
4. Run command `solana program deploy ./target/deploy/movie_review_comments.so` to deploy the program.
5. You will get a Program Id that can be used to communicate with the onchain program.
* You can use either devnet or local cluster to deploy your program. (I've used devnet to deploy my program.)

Setting up client to test the program

1. cd `solana-movie-frontend`
2. Run `npm install` in the `solana-movie-frontend` directory to install the dependencies.
3. Replace the Program Id in the `client/utils/constants.ts` file with the Program Id you got after deploying the program.
4. Run `npm run dev` to start the client. Open http://localhost:3000 in your browser to interact with the program.

Online store /w Solana Pay
1. cd `solana-pay-starter`
2. Run `npm install` in the `solana-pay-starter` directory to install the dependencies.
3. Create .env file in the root directory and add a wallet address that responsible to adding new items to sale.
4. Run `npm run dev` to start the client. Open http://localhost:3000 in your browser to interact with the program.