const express= require('express');
const app= express();
const mongoose= require('mongoose');

// middleware
app.use(express.json());

const port= 3001;
const url= 'mongodb://127.0.0.1:27017/pagin'

// database
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Database is connected');
}).catch((err)=>{
    console.log(err); 
})

// models
const postSchema= new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const Post= mongoose.model('Post', postSchema);

// controllers
app.post('/api/posts/create', async(req, res)=>{
    try {
        const {title, description}= req.body;

        if(!title || !description){
            return res.status(400).json({message: 'Title and Description are required.'});
        }

        const newPost= new Post({
            title, 
            description
        });

        await newPost.save();
        res.status(201).json({message: 'Post created successfully', post:newPost});
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
})

app.get('/api/posts', async(req, res)=>{
    const page= parseInt(req.query.page) || 1
    const perPage= 3;
    const totalPosts= await Post.countDocuments();
    const totalPages= Math.ceil(totalPosts/perPage);

    if(page > totalPages){
        return res.status(404).json({message: 'Page not found'});
    }

    const posts= await Post.find()
    .skip((page - 1) *perPage)
    .limit(perPage)
    .exec()

    res.status(200).json({posts, totalPages, page});
})

app.delete('/api/posts/delete/:id', async(req, res)=>{
    try {
        const {id}= req.params;
    
        const deletePost= await Post.findByIdAndDelete(id);
        if(!deletePost){
            return res.status(404).json({message: 'Post not found'});
        }
    
        res.status(200).json({message: 'Post deleted successfully', deletePost});
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
})

app.put('/api/posts/update/:id', async(req, res)=>{
    try {
        const {title, description}= req.body;
        const {id}= req.params;

        const updates= {};

        if(title) updates.title= title;
        if(description) updates.description= description;

        const updatePost= await Post.findByIdAndUpdate(id, updates, { new: true }); // By default, findByIdAndUpdate returns the document before the update. To get the updated document, you need to add the { new: true } option.
        if(!updatePost){
            return res.status(404).json({message: 'Post not found'});
        }

        res.status(200).json({message: 'Post updated successfully', updatePost});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
})

app.listen(port, ()=>{
    console.log(`server is running on http://localhost:${port}`);
    
})



// const express= require('express');
// const mongoose= require('mongoose');
// const app= express();

// app.use(express.json());

// const port= 3000;
// const url= 'mongodb://localhost:27017/surajPagination';


// mongoose.connect(url).then(()=>{
//     console.log('Mongodb connected');
// }).catch((err)=>{
//     console.log(err);
// })

// const postSchema= new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String,
//         required: true
//     }
// });

// const Post= new mongoose.model('post', postSchema);

// app.post('/create', async(req,res)=>{
//     try {
//         const postData= new Post(req.body);
//         const saveData= await postData.save();
//         res.status(201).json({saveData})
        
//     } catch (error) {
//         console.log(error);
//        res.status(500).json({message: 'Internal server error'})
//     }
// })

// app.get('/post', async (req,res)=>{
//     try {
//         const page= parseInt(req.query.page) || 1
//         const perPage= 3;
//         const totalPosts= await Post.countDocuments();
//         const totalPages= Math.ceil(totalPosts/perPage);

//         if(page > totalPages){
//             return res.status(404).json({message: 'Page not found'});
//         }
//         const posts= await Post.find()
//         .skip((page -1) * perPage)
//         .limit(perPage)
//         .exec();

//         res.status(200).json({posts, totalPages, page});
//     } catch (error) {
//         res.status(500).json({message: 'Internal server error'})
//     }
// })


// app.listen(port, ()=>{
//     console.log('server is running');
// })