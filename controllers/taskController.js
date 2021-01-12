const { Task } = require('../models')

class taskController {
    static getTask(req, res, next){
        Task.findAll()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static addTask(req, res, next){
        const task = {
            title : req.body.title,
            category : "Back-Log",
            UserId : req.user.id
        }
        Task.create(task)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static editTask(req, res, next){
        const taskId =  +req.params.id
        const category = req.body.category
        const edittedTask = {
            category
        }
        Task.update(edittedTask, {
            where : {
                id : taskId
            }
        })
        .then(data => {
            if(data[0] === 1){
                return Task.findOne({
                    where : {
                        id : taskId
                    }
                })
            }
        })
        .then(updatedTask => {
            res.status(200).json(updatedTask)
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }

    static deleteTask(req, res, next){
        const taskId = req.params.id
        const userId = req.user.id
        Task.destroy({
            where : {
                id : taskId
            }
        })
        .then(task => {
            if(task === 1){
                res.status(200).json({message : "Task have been deleted"})
            } 
        })
        .catch(err => {
            res.status(500).json(err)
        })
    }
}

module.exports = taskController