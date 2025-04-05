const cluster= require('cluster');
const os= require('os');

const totalCPUs= os.cpus().length;

if(cluster.isPrimary){              
    for(let i=0;i<totalCPUs; i++){
        cluster.fork();
    }
}
else{
    require('./app');
}

// cluster.isPrimary : responsible for managing worker processes