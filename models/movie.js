var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// naming the schema
var MovieSchema = new Schema (
    {
    title: {type: String},
    watched: {type: Boolean},
    }
);

// Virtual for movie url
MovieSchema
.virtual('url')
.get(function () {
    return 'catalog/movie/' + this._id;
});

// export model
module.exports = mongoose.model('Movie', MovieSchema);