const mongoose = require("mongoose")
exports.mongooseconnection = async()=>{
try {
    await mongoose.connect( `mongodb+srv://arima:kishou@cluster0.y9yviil.mongodb.net/posts?retryWrites=true&w=majority&appName=Cluster0`).then(()=>{
        console.log("data base has been connected.")
    }).catch((error)=>{
        console.log("error in connection with the database.",error.message)
    })
//     const conn=mongoose.createConnection(`mongodb+srv://arima:kishou@cluster0.y9yviil.mongodb.net/posts?retryWrites=true&w=majority&appName=Cluster0`)
//     conn.on('connected', () => console.log('connected'));
    
// conn.on('open', () => console.log('open'));

// conn.on('disconnected', () => console.log('disconnected'));
// conn.on('reconnected', () => console.log('reconnected'));
// conn.on('disconnecting', () => console.log('disconnecting'));
// conn.on('close', () => console.log('close'));
} catch (error) {
    console.log("mongoose error connection",error.message)
}
}

