const express = require(`express`);
const htmlRoutes = require(`./routes/htmlroutes`)
const apiRoutes = require(`./routes/apiroutes`)


const PORT = process.env.PORT || 3001

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
