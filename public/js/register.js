const registForm = document.getElementById('registerForm');
const pesan = document.getElementById('pesan');
const passwordInput = document.getElementById('password');


function clickToggle(){
    if(passwordInput.type === 'password'){
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}



registForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nama = document.getElementById('Nama').value;
    const password = document.getElementById('password').value;
    const telepon = document.getElementById('telepon').value;

    const teleponclean = telepon.replace(/\D/g, '').replace(/^0/, '62');

    if(teleponclean.length < 10 || teleponclean.length > 15) {
        pesan.innerText = 'Nomor telepon tidak valid. Harus antara 10-15 digit.';
        pesan.style.color = 'red';
        return;
    }

    if(!teleponclean.startsWith('62')) {
        pesan.innerText = 'Nomor telepon harus diawali dengan "08" atau "+62".';
        pesan.style.color = 'red';
        return;
    }

    const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nama, password, telepon: teleponclean })
    })

    const data = await res.json();

    if(data.sukses) {
        pesan.innerText = data.message;
        pesan.style.color = 'green';
    } else {
        pesan.innerText = data.message;
        pesan.style.color = 'red';
    }
})