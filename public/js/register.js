document.getElementById('RegisterForm').addEventListener("submit", async (e) => {
    e.preventDefault();


    const nama = e.target.nama.value;
    const password = e.target.password.value;

    try {
        const respon = await fetch('http://localhost:3000/register', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ nama, password })
        })

        const data = await respon.json();

        if(respon.ok) {
            alert(data.message);
            // window.location.href = '';
        } else {
            alert(data.message);
        }

    } catch(err) {
        console.error(err);
    }
})