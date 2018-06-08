const connect = require('../config/connection.js');

module.exports = {
    view: (param) => {
        return new Promise ((resolve, reject) => {
            var queryString = 'SELECT * FROM users WHERE googleID = (?);'
            connect.query(queryString,[param], function (error,result){
                if (error) {reject(error) } else{
                    resolve(result)
                    }
            })
        })
    },
    insert: (param) => {
        return new Promise ((resolve, reject) => {
            var queryString = 'INSERT INTO users (googleID) VALUES (?);'
            connect.query(queryString,[param], function (error,result){
                if (error) {reject(error) } else{
                    resolve(result)
                    }
            })
        })
    },
    all: (param) => {
        return new Promise ((resolve, reject) => {
            var queryString = 'SELECT * FROM users'
            connect.query(queryString, function (error,result){
                if (error) {reject(error) } else{
                    resolve(result)
                    }
            })
        })
    },
}



