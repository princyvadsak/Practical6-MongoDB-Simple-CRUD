require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
app.use(express.json());
const songModel = require("./Model/song");
const singerModel = require("./Model/Singer");


mongoose.connect(process.env.MONGOURL).then(() => console.log("MONGODB Connect"));

app.get("/",(req,res)=>{
    console.log("Simple Crud Opreation For Singers and Songs Data");
});

app.get("/songDetails", async (req,res)=>{
    const details = await songModel.find();

    if(details === 0){
        return res.json({data:"No Song Data Found"});
    }

    return res.json({data:details});
});


app.get("/singerDetails", async (req,res)=>{
    const details = await singerModel.find();

    if(details === 0){
        return res.json({data:"No Singer Data Found"});
    }

    return res.json({data:details});
});

app.get("/songOfSinger", async (req,res)=>{
    const name = req.body.name;
    if(name)
    {
    const details = await singerModel.findOne({name:name});
    if(details){
        const sDetail = await songModel.find({singer_id:details["singer_id"]});
        return res.json({data:sDetail});
               }
    return res.json({data:"No Data Found"});  
    }
    return res.json({data:"Name is blank.plese enter name."});

});

app.get("/singerOfSong/:title", async (req,res)=>{
    const title = req.params.title;
    
    const details = await songModel.findOne({title:title});
    if(details){
        const sDetail = await singerModel.find({singer_id:details["singer_id"]});
        return res.json({data:sDetail});
               }
    return res.json({data:"No Data Found"});  
   
});

app.post("/addSinger", (req,res)=>{
    const {addsinger} = req.body;
    const addData = singerModel.create(addsinger);
    if(addData){
        return res.json({data:"Add Singer Details Successfully"});
    }
    return res.json({data:"Somthing Went To Wrong"});
});

app.post("/addSong", (req,res)=>{
    const {addsong} = req.body;
    const addData = songModel.create(addsong);
    if(addData){
        return res.json({data:"Add Song Details Successfully"});
    }
    return res.json({data:"Somthing Went To Wrong"});
});
app.put("/updateSongTitle", async (req,res)=>{
    const sId = req.body.song_id;
    const title = req.body.title;
    if(sId && title){
        const updateData = await songModel.findOneAndUpdate(
            {song_id: sId},
            {title : title},
            {new:true}
        ); 
    
        if(updateData){
            return res.json({data:"Song Title Update Successfully",Update : updateData});
        }
        return res.json({data:"No Song Data Found"});
}
return res.json({data:"please enter songid and title both."});

});

app.put("/updateSingerName", async (req,res)=>{
    const sId = req.body.singer_id;
    const name = req.body.name;

    if(sId && name ){
        const updateData = await singerModel.findOneAndUpdate(
            {singer_id: sId},
            {name : name},
            {new:true}
        ); 
    
        if(updateData){
            return res.json({data:"Singer data Update Successfully",Update : updateData});
        }
        return res.json({data:"No Singer Data Found"});
}
return res.json({data:"please enter all require data."});

});


app.delete("/deleteSongWithId", async (req,res)=>{
    const sId = req.body.song_id;
    if(sId){
    const deleteData = await songModel.findOneAndDelete({Song_id:sId});
    if(deleteData){
        
        return res.json({data:"Delete Song Successfully",deleted:deleteData});
         }
       return res.json({data:"No Song Data Found"});
}
return res.json({data:"please enter song id."});
});

app.delete("/deleteSingerWithId", async (req,res)=>{
    const sId = req.body.singer_id;
    if(sId){
    const deleteData = await singerModel.findOneAndDelete({singer_id:sId});
    if(deleteData){
        
        return res.json({data:"Delete Singer Successfully",deleted:deleteData});
         }
       return res.json({data:"No Singer Data Found"});
}
return res.json({data:"please enter singer id."});
});


app.delete("/deleteSong/:title", async (req,res)=>{
    const stitle = req.params.title;
    const deleteData = await songModel.findOneAndDelete(
        {title : stitle}
    );
    if(deleteData){
        return res.json({data:"Detele Data Successfully"});
    }
    return res.json({data:"Somthing Went To Wrong.May be song title is not correct."});


});

app.delete("/deleteSinger/:name", async (req,res)=>{
    const sname = req.params.name;
    const deleteData = await singerModel.findOneAndDelete(
        {name : sname}
    );
    if(deleteData){
        return res.json({data:"Detele Data Successfully"});
    }
    return res.json({data:"Somthing Went To Wrong.May be singer name is not correct."});
});


app.listen(port , () => {console.log(`Application Run On Port ${port}`);});