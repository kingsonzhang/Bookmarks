const MONGOOSE = require("mongoose");

const BOOKMARKSCHEMA = new MONGOOSE.Schema({
    userID:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});

module.exports = MONGOOSE.model("Websites", BOOKMARKSCHEMA);