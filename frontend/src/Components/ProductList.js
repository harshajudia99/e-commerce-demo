import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {

    const [products, setProducts] = React.useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: 'delete',
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        if (result) {
            getProducts();
        }
    }

    const handleSearch = async (event) => {
        let key = event.target.value;
        console.log(key);
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json()
            if (result) {
                setProducts(result)
            }
        }
        else {
            getProducts();
        }
    }

    return (
        <div className='product-list'>
            <h2>Product List</h2>
            <input className='search-product-box' type="text" placeholder='Search product' onChange={handleSearch} />
            <ul>
                <li>Sr. no.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>${item.price}</li>
                        <li>{item.category}</li>
                        <li>{item.company}</li>
                        <li><button onClick={() => deleteProduct(item._id)} className='delete-btn'>Delete</button>
                            <Link to={`/update/${item._id}`}>Update</Link>
                        </li>
                    </ul>
                )
                    : <h2>No result found!</h2>
            }
        </div>
    )
}

export default ProductList
