![GitHub issues](https://img.shields.io/github/issues/strandgeek/algo-comments) ![GitHub last commit](https://img.shields.io/github/last-commit/strandgeek/algo-comments)

# AlgoComments

AlgoComments is a platform that, through Smart Contracts, rewards users who engage by commenting on Algorand Blockchain. It can be easily integrated with any dApp or frontend app such as blogs, ecommerces and so on.

![App Screenshot](./webapp/public/app-screenshot.png)

--------

## Quick Links
- [📹 Video Presentation](https://youtu.be/oJ0gx3LSXzE)
- [⚡️ AlgoComments Platform](https://algo-comments.strandgeek.com)
- [⚡️ Demo: Blog Using AlgoComments](https://algo-comments-blog-demo.strandgeek.com/coming-soon#comments)


## Setup

To setup the project environment, follow these steps:

1 - Clone this repository

2 - Go to the api and install dependencies

```
cd api
npm i
```

3 - Create `.env` file for the API.

Example:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:55432/algocomments?schema=public"
JWT_SECRET=your-secure-jwt-secret

# IPFS
INFURA_PROJECT_ID=
INFURA_PROJECT_SECRET=
```

4 - Generate prisma schema and push to DB:

```
  npx prisma generate && npx prisma db push
```

6 - Start the API:

```
npm run dev
```

7 - Go to the webapp in another terminal and install dependencies:

```
cd webapp
npm i
```

8 - Set the .env file:

```
REACT_APP_PURESTAKE_SERVER=https://testnet-algorand.api.purestake.io/ps2
REACT_APP_PURESTAKE_INDEXER_SERVER=https://testnet-algorand.api.purestake.io/idx2
REACT_APP_PURESTAKE_TOKEN=
```


9 - Start the webapp:

```
npm run start
```
