import  mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },

    category: {
        type: String,
        enum: ["hotel","resturant", "attraction", "transport"],
        required: true
    },

    location: {
        address: String,
        city: String,
        coutry: String
    },

    accessibility:{
        wheelchairAccess: Boolean,
        brailleSignage: Boolean,
        hearingSupport: Boolean,
        serviceAnimalAllowed: Boolean
    },

    photos:[String], 

    verified:{
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Place",PlaceSchema );