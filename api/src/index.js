// import express from 'express';
const express = require('express');

// export const app = express();
const app = express();
const router = express.Router();
router.get('/', res => {
    console.log("hello");
});
const PORT = 8080;
const server = app.listen(process.env.PORT || PORT, ()=>{
  console.log(`server started on port ${PORT}`)
});
