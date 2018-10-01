const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(bodyParser.json());
const register=require('./Controllers/register');
const signin=require('./Controllers/signin');

var db = require('knex')({
  client: 'pg',
  connection: {
   connectionString: process.env.DATABASE_URL,
  ssl: true,
  }
});
app.get('/vs',(req,res)=>
{
 var obj= {
fileid:'1HVmnGTLWTNjJ1eLfysXLXK2LrlqKE_Lb',
dtime:'2017-10-02 19:05:15.646517'
}
 res.json(obj);
});

app.post('/signin',(req,res)=>
{
  signin.handleSignin(req,res,db,bcrypt);
})
app.post('/register',(req,res)=>
{
	register.handleRegister(req,res,db,bcrypt);
})



app.listen(process.env.PORT || 3000,()=>
  {
    console.log(`server is working on port ${process.env.PORT}`);
  });
