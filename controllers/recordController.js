const faker = require('faker');
const Records = require('../models/records');
const {Types} = require('mongoose');

exports.getAllRecord = async (req,res,next)=>{
    try {
        const records = await Records.find();
        return res.json(records);
    } catch (error) {
        console.log(error);
    }
}

exports.createRecord = async (req,res,next)=>{
    try {
        let {productName,price} = req.body;
        const newRecord = new Records({productName,price});
        await newRecord.save();

        res.json({
            message: "new product saved successfully.",
            product: newRecord
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateRecord = async (req,res,next)=>{
    let {id} = req.params;
    let {productName, price} = req.body;
    const record = await Records.findOneAndUpdate({_id : id},{$set : {productName,price}},{new: true});
    res.json({
        message: "product updated successfully.",
        product: record
    })
}

exports.deleteRecord = async (req,res,next)=>{
    let {id} = req.params;
    await Records.findOneAndDelete({_id: id});
    res.json({
        message: "product deleted successfully."
    })
}


const generateRandomRecords = () => {
    const records = [];
    for(let i=0;i<50;i++){
        const productName = faker.commerce.productName();
        const price = Math.floor(Math.random()*99) + 1;
        records.push({productName,price});
    }
    return records;
}

const insertRecords = async ()=>{
    try {
        const records = generateRandomRecords();
        await Records.insertMany(records);
        console.log("Records inserted successfully");
    } catch (error) {
        console.log(error);
    }
}

exports.init = async (req,res,next)=>{
    await insertRecords();
    res.send("Records inserted successfully");
}