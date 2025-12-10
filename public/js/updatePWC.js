const form = document.getElementById('FormGanti');
const pesan = document.getElementById('pesan');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('Email').value;

    try {
        const res = await fetch('/api/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })


        const data = await res.json();

        if(data.sukses) {
            pesan.innerText = data.message
            alert(data.isi)
            window.location
        } else {
            pesan.innerText = data.message
        }
    } catch(err) {
        console.error('Error:', err);
    }
})