const { randomUUID } = require('crypto');
const express = require(`express`)
const path = require(`path`)
const api = (``)
const { clog } = require('./middleware/clog');
// const db = require(`./db/db.json`)

const PORT = process.env.port || 3001

const app = express();
app.use(clog)

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);
app.use(express.static('public'));

// These 3 are doing the same thing (returns home page)

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/assets/index.html'))
);

app.get(`/index`, (req, res) =>
    res.sendFile(path.join(__dirname, `/public/assets/index.html`))
)

app.get('', (req, res) =>
    res.sendFile(path.join(__dirname, `/public/assets/index.html`))
)

// returns notes html page

app.get(`/notes`, (req, res) =>{
    res.sendFile(path.join(__dirname, `/public/assets/notes.html`))
}
    
)

// return notes in db to client

app.get(`/db/db.json`, (req, res) => {
    return res.json(notes);
}
    
)

// app.get(`/data`, (req, res) =>
//     res.sendFile(path.join(__dirname, `/db/db.json`))
// )

app.post(`/db/db.json`, (req, res) => {
    console.info(`${req.method} request received to add a review`);

    const {title, text} = req.body;
    if(title && text){
        const newNote = {
            title,
            note,
            review_id: randomUUID()
        };
        const noteString = JSON.stringify(newNote)

        fs.writeFile(`./db/db.json`, noteString, (err) =>
            err
                ? console.error(err)
                : console.log(
                    `Review for ${newReview.product} has been written to JSON file`
                )
        );

    }else{
        res.status(500).json(`Error in posting note`)
    }
}
)
app.get(`/notes`, (req, res) => {
    console.info(`${req.method} request received to add a review`);
    fs.readFile(`./db/db.json`).then((data) => res.json(JSON.parse(data)))
}
)
app.post('/api/reviews', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);

    // Destructuring assignment for the items in req.body
    const { product, review, username } = req.body;

    // If all the required properties are present
    if (product && review && username) {
        // Variable for the object we will save
        const newReview = {
            product,
            review,
            username,
            upvotes: Math.floor(Math.random() * 100),
            review_id: uuid(),
        };

        // Convert the data to a string so we can save it
        const reviewString = JSON.stringify(newReview);

        // Write the string to a file
        fs.writeFile(`./db/${newReview.product}.json`, reviewString, (err) =>
            err
                ? console.error(err)
                : console.log(
                    `Review for ${newReview.product} has been written to JSON file`
                )
        );

        const response = {
            status: 'success',
            body: newReview,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting review');
    }
});


app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
