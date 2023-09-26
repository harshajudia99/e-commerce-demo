import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductsDetails();
    }, [])

    const getProductsDetails = async () => {
        console.log(params.id);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateProduct = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        navigate('/')
    }

    return (
        <div className='product'>
            <h2>Update Product</h2>
            <input type="text" placeholder='Enter product name' className='inputbox' onChange={(e) => { setName(e.target.value) }} value={name} />
            <input type="text" placeholder='Enter product price' className='inputbox' onChange={(e) => { setPrice(e.target.value) }} value={price} />
            <input type="text" placeholder='Enter product category' className='inputbox' onChange={(e) => { setCategory(e.target.value) }} value={category} />
            <input type="text" placeholder='Enter product company' className='inputbox' onChange={(e) => { setCompany(e.target.value) }} value={company} />

            <button onClick={updateProduct} className='appbutton'>Update Product</button>
        </div>
    )
}

export default UpdateProduct

