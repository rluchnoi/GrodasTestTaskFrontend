import { fetchData, sortAgeDesc, sortRatingDesc } from "./helpers";
import logTagsData from "./scripts";

/**
 * Create latest products
 * 
 * @param {object} parent 
 * @param {array} data 
 */
function createMultipleLatestProducts(parent, data) {
    for (const element of data) {
        const product = assembleLatestProduct(element);
        parent.appendChild(product);
    }
}

/**
 * Assemble latest product element
 * 
 * @param {object} element 
 * @returns 
 */
function assembleLatestProduct(element) {
    const latestProductWrapper = createLatestProductWrapper();
    const product              = createProduct(element.image, false);
    const productTitle         = createProductTitle(element.title);
    const productTags          = createProductTags(element.tags);

    latestProductWrapper.appendChild(product);
    latestProductWrapper.appendChild(productTitle);
    latestProductWrapper.appendChild(productTags);

    return latestProductWrapper;
}

/**
 * Create latest product wrapper element
 * 
 * @returns 
 */
function createLatestProductWrapper()
{
    const productWrapper     = document.createElement("div");
    productWrapper.className = "latest-product-wrapper";

    return productWrapper;
}

/**
 * Create top products
 * 
 * @param {object} parent 
 * @param {array} data 
 */
function createMultipleTopProducts(parent, data) {
    for (const element of data) {
        const product = assembleTopProduct(element);
        parent.appendChild(product);
    }
}

/**
 * Assemble top product
 * 
 * @param {object} element 
 * @returns 
 */
function assembleTopProduct(element) {
    const product      = createProduct(element.image, true);
    const productTitle = createProductTitle(element.title);
    const productTags  = createProductTags(element.tags);

    product.appendChild(productTitle);
    product.appendChild(productTags);

    return product;
}

/**
 * Create product element
 * 
 * @param {string} image 
 * @returns 
 */
function createProduct(image, isTop)
{
    const product     = document.createElement("div");
    product.className = "product";

    checkImageExists(product, image);

    const productStar = createProductStar(isTop);
    product.appendChild(productStar);

    return product;
}

/**
 * Create product star element
 * 
 * @returns 
 */
function createProductStar(isTop)
{
    const productStar     = document.createElement("img");
    productStar.className = "product-star";

    if (isTop) {
        productStar.src = "./icons/star-solid.svg";
    } else {
        productStar.src = "./icons/star-regular.svg";
    }

    return productStar;
}

/**
 * Check if image exists and perform some actions if so
 * 
 * @param {string} imageUrl 
 * @returns 
 */
function checkImageExists(product, imageUrl) {
    var img = new Image();

    img.onload = function() {
        product.style.backgroundImage = `url(./${imageUrl})`;
    };

    img.onerror = function() {
        // do nothing for now
    };

    img.src = imageUrl;
}

/**
 * Create title element
 * 
 * @param {string} title 
 * @returns 
 */
function createProductTitle(title) {
    const productTitle       = document.createElement("span");
    productTitle.textContent = title;
    productTitle.className   = "product-title";

    return productTitle;
}

/**
 * Create tag element
 * 
 * @param {array} tags 
 * @returns 
 */
function createProductTags(tags) {
    const productTags       = document.createElement("span");
    productTags.textContent = `#${tags.join(" #")}`;
    productTags.className   = "product-tags";

    return productTags;
}

/**
 * Append banner
 */
function createBanner (parent) {
    const banner     = document.createElement('div');
    const bannerText = document.createTextNode('banner');

    banner.appendChild(bannerText);
    banner.className = 'banner';

    parent.appendChild(banner)
}

/**
 * Execute js
 */
async function main() {
    logTagsData();

    const data = await fetchData();

    const top5ByRating = (data.sort(sortRatingDesc)).slice(0, 5);
    const bottom2ByAge = (data.sort(sortAgeDesc)).slice(0, 2);

    const topRatingEl  = document.getElementById('top-rating');
    const newestEl     = document.getElementById('newest');

    await createMultipleTopProducts(topRatingEl, top5ByRating);
    await createMultipleLatestProducts(newestEl, bottom2ByAge);

    createBanner(newestEl);
}

main();
