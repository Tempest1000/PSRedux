import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const products = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (product) => {
    return product.name.toLowerCase();
};

class ProductApi {
    static getAllProducts() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], products));
            }, delay);
        });
    }
}

export default ProductApi;