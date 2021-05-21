const moongose = require('mongoose');
const Schema = moongose.Schema;

const blogSchema = new Schema({
    Title: {
        type : String,
        required : true,

    },
    Summary: {
        type : String,
        required : true,
    },
    Content: {
        type : String,
        required : true,
    }

}, {timestamps:true}
);

const Blog  = moongose.model('Blog', blogSchema);
module.exports = Blog;
