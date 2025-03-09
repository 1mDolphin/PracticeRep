const { UserModel, sequelize, requestLogger } = require('./seed.js')

const express = require('express')
const fs = require('fs')
const app = express();
app.use(express.json())
app.use(requestLogger)

const initialize = async () => {
    await sequelize.sync({ force: false })
}

initialize()

app.get('/hello', (req, res) => {
    res.send('Hello, World');
})
fs.writeFile('example.txt', 'Hello, Node.JS!', (err) => {
    if (err) {
        console.error(err)
        return
    }

    fs.readFile('example.txt', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data.toString())
        })
    console.log('File has been created')
})


const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json()
        console.log(data)
    } catch (error) {
        console.error(error)
    }
}

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.findAll()
        res.json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.post('/users', async (req, res) => {
    try {
        const users = await UserModel.create(req.body)
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id)
        if (user) {
            await user.destroy()
            res.json({ message: 'User has been deleted' })
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id)
        if (user) {
            await user.update(req.body)
            res.json(user)
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.listen(8080, () => {
    console.log(`Server is running on port 8080`);
    fetchUsers()
})

