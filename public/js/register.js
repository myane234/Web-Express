const register = document.getElementById('loginForm');
const pesan = document.getElementById('pesan')

register.addEventListener('submit', async (e) =>  {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify({nama, password})
    })

    const data = await res.json();

    

    if(data.sukses) {
        pesan.textContent = 'Berhasil register'
        window.location.href = '/login'
    } else {

        if(data.check) {
        pesan.textContent = 'Sudah ada Users lain'
    } else {
        pesan.textContent = 'gagal register'
    }
        
    }
})