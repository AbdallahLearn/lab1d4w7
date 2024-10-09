import mongoose from "mongoose";
const {Schema} = mongoose;


//table has coulmns and name articleSchema
const articleSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body: String ,
    editor: String,
    isEmployee: Boolean

},
{timestamps:true}
);

//
const Atricle = mongoose.model('Article', articleSchema);

export default Atricle;