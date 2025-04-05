const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

const port = 3000;
const url = 'mongodb://localhost:27017/surajSearch';

// mongodb connection
mongoose.connect(url).then(() => {
    console.log('mongodb connected');
}).catch((err) => {
    console.log('Error connecting to MongoDB:', err);
});

// search schema
const searchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

const Search = mongoose.model('Search', searchSchema);

// create search
app.post('/create', async (req, res) => {
    try {
        const searchData = new Search(req.body);
        const saveData = await searchData.save();
        res.status(201).json(saveData);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// search api
app.post('/search', async (req, res) => {
    try {
        const { query } = req.body;

        const filter = {
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { phone: { $regex: query, $options: 'i' } },
                { course: { $regex: query, $options: 'i' } },
            ]
        };

        const filterData = await Search.find(filter);

        if (filterData.length === 0) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(filterData);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }

});


app.get('/fetch', async(req,res)=>{
        const fetchData=  await Search.find();
        res.json(fetchData);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`);
});

