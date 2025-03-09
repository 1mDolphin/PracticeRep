const { UserModel, sequelize } = require('./seed.js');

const express = require('express');
const app = express();
app.use(express.json())

const initialize = async () => {
    await sequelize.sync({ force: false})
}

initialize()

app.post('/users', async (req, res) => {
    try {
        const users = await UserModel.create(req.body)
        res.status(201).json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await UserModel.findAll()
        res.json(users)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})

app.get('/users', async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id)
        if (user) {
            res.json(user)
        } else {
            req.status(404).json({ error: 'User not found' })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
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

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await UserModel.findByPk(req.params.id)
        if (user) {
            await user.destroy()
            res.json({ message: 'User deleted' })
            res.status(204).end()
        } else {
            res.status(404).json({ error: 'User not found' })
        }
    } catch {
        res.status(500).json({ error: error.message })
    }
})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})