const multer = require('multer')
const fs = require('fs')
const path = require('path')
const FileDetails = require('../model/fileDetails')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './backend/public')
    },
    extname: (req, file, cb) => {
        // fileName = file.originalname + '.json'
        cb(null, 'newFile.json')
    }
})

const transferData = async () => {
    const filePath = './backend/public/newFile.json'
    const readData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    await FileDetails.create(readData)
    console.log('File Saved')
    fs.unlinkSync(filePath)
    
}

const upload = multer({ storage: storage})

module.exports = { upload, transferData }