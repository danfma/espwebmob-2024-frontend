
function fetchNumber(): Promise<number> {
    return Promise.resolve(10);
}

async function main() {
    const num = await fetchNumber();

    console.log(num);
}


function beforeAsyncAwait() {
    return fetchNumber().then(num => {
        console.log(num);
    })
}
