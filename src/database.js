const mongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.DB_CONNECTION);

        console.log('DB is contected')

    } catch (error) {
        console.log(error);
        throw new Error('Error to try connect on DB');
    }

}

module.exports = {
    dbConnection
}