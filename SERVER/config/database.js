const mongoose = require('mongoose');
const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MONGOURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log('successfully connected to the db')

    } catch (error) {
        console.log(error,'db connection failed')
        console.log(error.message)
        process.exit(1)
    }
}

module.exports = dbConnect
