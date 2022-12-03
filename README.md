# 🎥 On-chain Movie Review Program with comments 💬
## Movie_reviews_app_folder
The folder contains a Rust application and a React NextJS application /w Typescript to create a movie reviewing application.


#### 1. `movie_review_comments` is a Rust application which can be deployed on Solana blockchain to securely hold our movie data.
#### 2. `solana-movie-frontend` application is our next application and it displays our data which comes from Solana blockchain.
 

 This program demonstrates a simple movie review program that allows users to post movie reviews and other users to comment on them. The program stores all the data on chain and is implemented using a set of Rust BPF programs.

### Instructions

1. Set-up your local Solana development environment.
2. Run `cargo build-bpf` in the `movie_review_comments` directory to build the BPF programs.
3. Run command `solana program deploy ./target/deploy/movie_review_comments.so` to deploy the program.
4. You will get a Program Id that can be used to communicate with the onchain program.
* You can use either devnet or local cluster to deploy your program. (I've used devnet to deploy my program.)

Setting up client to test the program

1. Run `npm install` in the `solana-movie-frontend` directory to install the dependencies.
2. Replace the Program Id in the `client/utils/constants.ts` file with the Program Id you got after deploying the program.
3. Run `yarn next dev` to start the client. Open http://localhost:3000 in your browser to interact with the program.