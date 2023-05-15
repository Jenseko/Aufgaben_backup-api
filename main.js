import fsPromises from 'node:fs/promises';

// ------ LEVEL 1 -----------------------------------

async function main() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    // .then((res) => res.json())
    // .then((data) => console.log(data));
    const json = await response.json();
    console.log(json);
    return json;
}

// main();



const createBackup = async () => {
    try {
        await fsPromises.mkdir('./data');
        const json = await main();
        await fsPromises.writeFile('./data/post.json', JSON.stringify(json));
        console.log('Create Backup was successful!');
    } catch (error) {
        console.log('Backup failed!', error);
    }
}

createBackup();