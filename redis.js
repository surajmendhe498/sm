const express= require('express');
const app= express();
const axios= require('axios');
const redis= require('redis');

const client= redis.createClient();

client.on('connect', ()=>{
    console.log('Redis is connected');    
})

client.on('error', (err)=>{
    console.log('Redis error', err);
})

// Connect to Redis
const connectRedis= async()=>{
    await client.connect();
}
connectRedis();

app.get('/data', async(req, res)=>{
    const cacheKey= 'apiData';

    try {
        const cachedData= await client.get(cacheKey);  // Check if data exists in Redis cache
        if(cachedData){
            return res.json(JSON.parse(cachedData));     // Return cached data
        }else{
            const response= await axios.get('http://jsonplaceholder.typicode.com/posts');    // Fetch new data
            await client.setEx(cacheKey, 3600, JSON.stringify(response.data));        // Save to cache with an expiration time

            res.json(response.data);
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'});
    }
})

const port= 3000;

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})


/*

How It Works-

1. When a client requests /data:
- The server checks if the data is present in Redis.
- If found, it retrieves and sends the cached data.

2. Otherwise, it fetches fresh data from the external API, caches it in Redis, and sends the response.
   Redis acts as a fast in-memory store, significantly reducing the time taken for repeated requests by eliminating the need for external API calls.

*/



/*
JSON.parse() – Convert string ->  JS object
When retrieving the data from Redis:
return res.json(JSON.parse(cachedData));


JSON.stringify() – Convert JS object -> string
Before storing the data in Redis:
await client.setEx(cacheKey, 3600, JSON.stringify(response.data));
 */