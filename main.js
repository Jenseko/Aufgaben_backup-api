import fsPromises from 'node:fs/promises';

// ------LEVEL 1 -----------------------------------

// async function main() {
//     const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//     // .then((res) => res.json())
//     // .then((data) => console.log(data));
//     const json = await response.json();
//     console.log(json);
//     return json;
// }

// // main();


// const createBackup = async () => {
//     try {
//         await fsPromises.mkdir('./data');
//         const json = await main();
//         await fsPromises.writeFile('./data/post.json', JSON.stringify(json, null, 2));
//         console.log('Create Backup was successful!');
//     } catch (error) {
//         console.log('Backup failed!', error);
//     }
// }

// createBackup();

// ------LEVEL 2 -----------------------------------

async function saveJSONComments() {
    // fetch the first time to get the main object and preparing for mapping
    const request = await fetch(`https://jsonplaceholder.typicode.com/comments`)
    const comments = await request.json();
    // start mapping of the whole json to filter the postId and get access to the specific comments
    const promisesArray = comments.map(async (elt) => {
        const postRequest = await fetch(`https://jsonplaceholder.typicode.com/posts/${elt.postId}/comments`)
        const postComments = await postRequest.json();
        console.log(postComments);
        return postComments;
    });

    await Promise.all(promisesArray);
    // write all filtered comments in the comments.json which was created as a sub-folder from mainfolder 'data'
    await fsPromises.writeFile('./data/comments.json', JSON.stringify(promisesArray, null, 2));
}

saveJSONComments();