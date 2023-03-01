/**
 * Fetch data
 * 
 * @returns {Array}
 */
async function fetchData () {
    const fetched = await fetch('./data.json');
    return await fetched.json();
}

/**
 * Sort products rating
 * 
 * @param {object} a 
 * @param {object} b 
 * @returns {number}
 */
function sortRatingDesc (a, b) {
    if (a.rating > b.rating){
        return -1;
    }
    if (a.rating < b.rating){
        return 1;
    }
    return 0;
}

/**
 * Sort products age
 * 
 * @param {object} a 
 * @param {object} b 
 * @returns {number}
 */
function sortAgeDesc (a, b) {
    if (a.age > b.age){
        return 1;
    }
    if (a.age < b.age){
        return -1;
    }
    return 0;
}

export { fetchData, sortRatingDesc, sortAgeDesc }