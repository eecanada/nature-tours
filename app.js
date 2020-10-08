const express = require('express')

const app = express()

app.get('/', (req,res)=>{
  res.status(200).json({message: "hello world", app:"nature tours"})
})

app.post('/', (req,res)=>{
  res.send('you can post to this input')
})

const port = 3001;
app.listen(port, ()=>{
  console.log(`app running on port: ${port}`)
})

