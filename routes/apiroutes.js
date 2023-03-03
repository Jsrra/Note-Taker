const router = require(`express`).Router()
const fs = require("fs")
const { v4: uuidv4 } = require('uuid');

router.get(`/notes`, (req, res) => {

  fs.readFile(`./db/db.json`, `utf8`, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      return res.json(JSON.parse(data))
    }
  })
})

router.post(`/notes`, (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    }

    fs.readFile(`./db/db.json`, `utf8`, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNotes = JSON.parse(data)

        parsedNotes.push(newNote)

        fs.writeFile(`./db/db.json`, JSON.stringify(parsedNotes, null, 4),
          (writeErr) => writeErr ? console.error(writeErr) : console.info(`Successfully added note!`)

        )
        res.json(newNote)
      }



    })
  }
})

// router.delete()

module.exports = router;