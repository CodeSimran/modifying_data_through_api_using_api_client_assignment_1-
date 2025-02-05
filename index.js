
const mongoose = require('mongoose');

const MenuItems = require('./schema.js');
const express = require('express');
const { resolve } = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
const port = 3010;

app.use(express.static('static'));


const DB_URL = process.env.DB_URL;
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.post('/menu',(req,res)=>{
  const newMenu = new MenuItems(req.body);
  newMenu.save()
  .then(()=>res.status(201).json({message : "items added sucessfully"}))
  .catch((error)=>res.status(500).json({message:"error ahs occured"}))

})


app.get('/menu', async (req, res) => {
  try {
    const menuItems = await MenuItems.find();
    res.status(200).json({
      success: true,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching menu items',
      error: error.message,
    });
  }
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});








