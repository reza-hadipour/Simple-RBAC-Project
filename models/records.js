const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    productName: {type: String},
    price: {type: Number}
});


const Record = new mongoose.model('Record',recordSchema);

module.exports = Record