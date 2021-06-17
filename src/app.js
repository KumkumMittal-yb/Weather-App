const path = require('path');
const express = require('express');
const app = express();
const hbs=require('hbs');
const geocode= require('./utils/geocode');
const forecast= require('./utils/forecast');
const { query } = require('express');

const port= process.env.PORT || 8000;

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));

//Deifne paths for ecpress config
const dirPath = (path.join(__dirname, '../public'));
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


//Setup static directory to serve
app.use(express.static(dirPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Kumkum Mittal'
    });
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Kumkum Mittal'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name: 'Kumkum Mittal',
        message:'Type your query here..'
    });
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address '
        })
    }
    geocode(req.query.address, (error, {latitude,longitude,location}={}) => {
        if(error){
            return res.send({error});
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send(error);
            }
    
            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            });
          })
    })
})

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

//app.com is our domain
//app.com/help
//app.com/about
app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Kumkum Mital',
        ErrorMessage:'Help Article not found'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Kumkum Mital',
        ErrorMessage:'Page not found'
    })
})
app.listen(port, () => {
    console.log('Server is up on port'+ port);
})