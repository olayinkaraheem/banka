import express from 'express';
// const express = require('express');

// export const app = express();
const app = express();
app.get('/', (req, res) => {
  res.send('Welcome');
});
const PORT = 8080;
const server = app.listen(process.env.PORT || PORT, () => {
  console.log(`server started on port ${PORT}`);
});
