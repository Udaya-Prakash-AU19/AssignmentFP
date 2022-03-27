const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    userId: {
        type: String,
    },
    id: {
        type: String,
    },
    title: {
        type: String,
    },
    body: {
        type: String,
    }
})


const FileDetails = mongoose.model('FileDetails', fileSchema)

module.exports = FileDetails
