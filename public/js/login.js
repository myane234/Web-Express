document.getElementById("loginForm").addEventListener('submit', async(e) => {
    e.preventDefault();

    const nama = e.target.nama.value;
    const password = e.target.password.value;

    try {
        const respon = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nama, password }) // stringify data yang di input
        });

        const data = await respon.json();

        document.getElementById("hasil").innerText = data.message;

        if(data.succes) {
            console.log('sukses');
            window.alert('Berhasil login')
            window.location.href = 'dashboard.html'
        }
    } catch(err) {
        console.error(err);
    }
})