const express = require("express");
const fetchuserdetails = require("../Middlewares/fetchuserdetails");
const Notes = require("../Models/Notes");
const { body, validationResult } = require('express-validator');
const router = express.Router();


// Route 1: This is the route to get all the notes of the user "/api/notes/fetchallnotes" LOGIN REQUIRED
router.get('/fetchallnotes', fetchuserdetails, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }
})

// Route 2: Add a new notes using post "/api/notes/fetchallnotes" LOGIN REQUIRED
router.post('/addnote', fetchuserdetails, [
    body('title', 'Enter the title.').isLength({ min: 3 }),
    body('description', 'Enter the description of minium 5 character').isLength({ min: 5 })
], async (req, res) => {
    try {
        // getting the result of the request to this end point and storing it to the constant as an error to throw error if any.
        const error = validationResult(req);
        const {title, description, tag} = req.body;

        // checking if their is any error and send the response according to it
        if (!error.isEmpty()) {
            return res.status(404).json({ errors: error.array() });
        }
        const note = new Notes({
            title, desc: description, tag, user: req.user.id
        });
        const savedNotes = await note.save();
        res.send(savedNotes);
        console.log(savedNotes);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }


})

// Route 3: Delete a notes using post "/api/notes/deletenote" LOGIN REQUIRED
router.delete('/deletenote/:id', fetchuserdetails, async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id);
        
        if(!note){return res.status(404).send("Note not found")}

        if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
        const deleteNote = await Notes.findByIdAndDelete(req.params.id);
        res.json(deleteNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }


})

// Route 4: Update a notes using put "/api/notes/deletenote" LOGIN REQUIRED
router.put('/updatenote/:id', fetchuserdetails, async (req, res) => {
    try {
        const note = {};
        const {title, description, tag} = req.body;
        if(title){note.title = title}
        if(description){note.desc = description}
        if(tag){note.tag = tag}

        const checkNote = await Notes.findById(req.params.id);

        if(!checkNote){return res.status(404).send("Note not found")}

        if(checkNote.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
        const updateNote = await Notes.findByIdAndUpdate(req.params.id, {$set: note}, {new: true});
        res.json(updateNote);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server error" });
    }


})


module.exports = router;