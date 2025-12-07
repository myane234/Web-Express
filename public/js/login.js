const loginForm = document.getElementById('loginForm');
const pesan = document.getElementById('pesan');
const passwordInput = document.getElementById('password');
    


function clickToggle(){
    if(passwordInput.type === 'password'){
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}



loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nama = document.getElementById('Nama').value;
    const password = document.getElementById('password').value;

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nama, password })
    });

    const data = await res.json();

    if(data.sukses) {
        pesan.innerText = data.message;
        pesan.style.color = 'green';
        window.location.href = '/menu';
    } else {
        pesan.innerText = data.message;
        pesan.style.color = 'red';
    }
})