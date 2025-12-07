const form = document.getElementById('FormGanti');
const pesan = document.getElementById('pesan');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const telepon = document.getElementById('Telepon').value;

    try {
        const res = await fetch('/api/checkTelepon', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ telepon })
        })


        const data = await res.json();

        if(data.sukses) {
            pesan.innerText = data.message
            window.location
        } else {
            pesan.innerText = data.message
        }
    } catch(err) {
        console.error('Error:', err);
    }
})