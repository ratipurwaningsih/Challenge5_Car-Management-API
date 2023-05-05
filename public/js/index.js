const { response } = require("express");

async function addProduct() {
    e.preventDefault()
    const data = {
        name: document.getElementById("name").value
    }

    const responseApi = await axios.post('/api/products', data);
    if (responseApi.data.status === 'success') {
        alert("berhasil tambah data baru")
    } else {
        alert(response.data.message)
    }
}