

async function kirim() {
    const question = document.getElementById("question").value;

    const res = await fetch('/ai/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ question })
    })
    const data = await res.json();
    document.getElementById("hasil").innerText = data.answer;
}

tableData = document.getElementById("dataBody");

async function loadData() {
    const res = await fetch('/api/users', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    console.log(data);
    // const user = [data];

    tableData.innerHTML = '';

    data.data.forEach(u => {
        tableData.innerHTML += `
        <tr>
            <td>${u.id}</td>
            <td>${u.nama}</td>
            <td>${u.telepon}</td>
            <td>${u.email}</td>
            <td><button onclick="deleteUser(${u.id})">Delete</button>
            <button><a href="/updatepwC">Reset Password</a></button>
            </td>
        </tr>
        `
    })
    
}

async function deleteUser(id) {
    const res = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await res.json();
    console.log(data);
    loadData();
}

loadData();