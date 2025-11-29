const namai = document.getElementById('nama');
const passwordi = document.getElementById('password')
const loginForm = document.getElementById('loginForm')
const pesan = document.getElementById('pesan')

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()


    const nama = namai.value;
    const password = passwordi.value;

    const res = await fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nama, password })
    })

    const data = await res.json();

    if(data.sukses) {
        pesan.textContent = 'Berhasil Login'
        window.location.href = '/dashboard'
    } else {
        pesan.textContent = 'Login gagal'
    }


})