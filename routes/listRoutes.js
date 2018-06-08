const list = require('../models/surveys.js')
const passport = require('passport')

module.exports = (app) => {

app.get('/api/list', (req, res) => {
    var user =  req.user[0].id
    list.view(user).then( result => {
        res.send(result)
    })
})

app.post('/api/list/item', (req,res) => {
    console.log(req.body.item)
    console.log(req.body.name)
    if (!req.body.item) {
        console.log('Blank')
        res.end()
    } else {
    list.insert(req.body.item.trim(),req.body.name.trim(),req.user[0].id).then (result => {
        console.log(result)
        res.end()
    })
}
})

app.put('/api/list/complete', (req,res) => {
    //console.log(req.body)
    var number = parseInt(req.body.taskId)
    //var task = req.body.taskName
    list.updateOne2(true, number).then(result => {
        //console.log(result)
    })
    res.end()
})

app.put('/api/list/restore', (req,res) => {
    //console.log(req.body)
    var number = parseInt(req.body.taskId)
    //var task = req.body.taskName
    list.updateOne2(false, number).then(result => {
        //console.log(result)
    })
    res.end()
})

app.put('/api/list/edit', (req,res) => {
    //console.log(req.body)
    if (!req.body.updatedTask) {
        res.end()
    }
    else {
    var number = parseInt(req.body.taskId)
    var updatedTask = req.body.updatedTask.trim()
    //var task = req.body.taskName
    list.updateEdit(updatedTask, number).then(result => {
        //console.log(result)
    })
    res.end()
    }
})
app.delete('/api/list/delete', (req,res) => {
    console.log(req.body)
    var number = parseInt(req.body.taskID)
    //var task = req.body.taskName
    list.remove(number).then(result => {
        //console.log(result)
    })
    res.end()
})
}