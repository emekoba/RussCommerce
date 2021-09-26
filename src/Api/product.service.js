export function fetchAllProducts(limit) {
  fetch(`https://fakestoreapi.com/products?limit=${limit}`)
    .then(res => res.json())
    .then(json => json);
}
