const connect = require('../config/connection.js');

module.exports ={
    view: (param) => {
        return new Promise ((resolve,reject) => {
            var queryString = `SELECT * FROM list WHERE user_id = (?)`
            connect.query(queryString,[param], function (error,result){
                if (error) {reject(error) } else{
                    resolve(result)
                    }
            })
        })
    },
    insert: (param, taskGroup, id) => {
        return new Promise ((resolve,reject) => {
            var queryString = `INSERT INTO list (task, task_group, user_id) VALUES ("${param}","${taskGroup}", ${id})`
            connect.query(queryString,[param,taskGroup, id], function (error,result){
                if (error) {reject(error) } else{
                    resolve(result)
                    }
            })
        })
    },
    updateOne: function(valOfState,valOfId, taskGroup) {
        return new Promise ((resolve,reject) => {
        var queryString = 'UPDATE list SET complete = (?) WHERE id = (?) and task_group = (?);'
        connect.query(queryString,[valOfState,valOfId, taskGroup], function (error, results) {
        if (error) {reject(error) } else{
        resolve(results)
        }
        })
        })
    },
    updateOne2: function(valOfState,valOfId) {
        return new Promise ((resolve,reject) => {
        var queryString = 'UPDATE list SET complete = (?) WHERE id = (?);'
        connect.query(queryString,[valOfState,valOfId], function (error, results) {
        if (error) {reject(error) } else{
        resolve(results)
        }
        })
        })
    },
    updateEdit: function(updatedTask,valOfId,) {
        return new Promise ((resolve,reject) => {
        var queryString = 'UPDATE list SET task = (?) WHERE id = (?);'
        connect.query(queryString,[updatedTask,valOfId], function (error, results) {
        if (error) {reject(error) } else{
        resolve(results)
        }
        })
        })
    },
    remove: function(valOfId) {
        return new Promise ((resolve,reject) => {
        var queryString = 'DELETE FROM list WHERE id = (?);'
        connect.query(queryString,[valOfId], function (error, results) {
        if (error) {reject(error) } else{
        resolve(results)
        }
        })
        })
    }
}