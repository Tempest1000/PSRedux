import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const products = [
    {category: "Books", price: "$49.99", stocked: true, name: "Learning React"},
    {category: "Books", price: "$39.99", stocked: true, name: "React Up and Running"},
    {category: "Books", price: "$29.99", stocked: false, name: "Fullstack React"},
    {category: "Online Courses", price: "$99.99", stocked: true, name: "Building Applications in React and Flux"},
    {category: "Online Courses", price: "$99.99", stocked: true, name: "Clean Code: Writing Code for Humans"},
    {category: "Online Courses", price: "$149.99", stocked: true, name: "Online Course Package"}
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