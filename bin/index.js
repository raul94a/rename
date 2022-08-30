const fs = require('fs/promises')
const path = require('path');

const filepath = process.argv[2]

async function recursiveChanger(filepath) {
    const info = await fs.readdir(filepath)
    for(let item of info){
        const newPath = path.join(filepath,item)
        if((await fs.lstat(newPath)).isDirectory()){
            recursiveChanger(newPath)
        }
        else{
            const newFilename = item.toLowerCase();
            fs.rename(newPath, path.join(filepath,newFilename))
        }
    }
}

recursiveChanger(filepath)