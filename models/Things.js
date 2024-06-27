/* Import mongoose */
const mongoose = require('mongoose');

/* Creation du schema */
const thingSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
    userId: {type: String, required: true},
    price: {type: Number, required: true},
});

/* Export du modele */
module.exports = mongoose.model('Thing', thingSchema)