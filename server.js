const express=require('express');
const bcrypt=require('bcrypt-nodejs');
const bodyParser=require('body-parser');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(bodyParser.json());
const register=require('./Controllers/register');
const signin=require('./Controllers/signin');
const profile=require('./Controllers/profile');
const image=require('./Controllers/image');
var db = require('knex')({
  client: 'pg',
  connection: {
   connectionString: process.env.DATABASE_URL,
  ssl: true,
  }
});
app.get('/vs',(req,res)=>
{
 res.json([
{
"fileid":"1HVmnGTLWTNjJ1eLfysXLXK2LrlqKE_Lb",
"dtime":"2017-10-02 19:05:15.646517"
},
{
"fileid":"1FW3xkHySebuctQ_02NtaAmj16DpXSPzC",
"dtime":"2017-10-02 19:05:15.646517"
},
{
"fileid":"11zYDqrr6PcEZgsx_BtjOuOiXMWps-CXD",
"dtime":"2017-10-01 23:59:15.646517"
},
{
"fileid":"1PWNAvsYzkdnMvr7GnwBmNe1basXhGQuI",
"dtime":"2017-10-02 19:05:15.646517"
},
{
"fileid":"1a_x1YkbIP_yFJyfun7bTZkAZQIQVTJ3A",
"dtime":"2017-10-01 23:58:15.646517"
}
]
})
app.post('/signin',(req,res)=>
{
	signin.handleSignin(req,res,db,bcrypt);
}));

app.post('/register',(req,res)=>
{
	register.handleRegister(req,res,db,bcrypt);
})


app.get('/profile/:id',(req,res)=>
{
	profile.handleProfile(req,res,db);
})

app.put('/image',(req,res)=>
{
	image.handleImage(req,res,db);
})

app.post('/imageurl',(req,res)=>
{
  image.handleApiCall(req,res);
})


app.listen(process.env.PORT || 3000,()=>
  {
    console.log(`server is working on port ${process.env.PORT}`);
  });
