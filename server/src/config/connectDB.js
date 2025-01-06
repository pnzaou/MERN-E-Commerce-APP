const mongoose = require("mongoose")
require("dotenv").config()

if(!process.env.MONGO_URI){
    throw new Error(
        "Veuillez ajouter MONGO_URI dans le fichier .env"
    )
}

const connexion = async () =>{
    try {
        const rep = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connexion réussie à la bd ${rep.connection.name}`)
    } catch (error) {
        console.log("Erreur de connexion à la bd", error)
        process.exit(1)
    }
}

module.exports = connexion 