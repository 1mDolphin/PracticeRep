
const express = require('express')
const fs = require('fs')
const app = express();
app.use(express.json())

app.get('/hello', (req, res) => {
    res.send('Hello, World');
})

fs.writeFile('example.txt', 'Hello, Node.JS!', (err) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('File has been created')
})

fs.readFile('example.txt', (err, data) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data)
})


app.listen(3000, () => {
    console.log(`Server is running on port 3000}`);

    fetch('http://localhost:8080/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))
})

