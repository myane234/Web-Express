async function loadUsers() {
    try {
        const res = await fetch('/api/users')
        console.log('berhasil fetch')

        if(!res.ok) {
            throw new Error('Failed fetch Users')
        }

        const result = await res.json(); 
        console.log(result)
        console.log(result.data)
        displayUsers(result.data)
    } catch(err) {
        console.error(err)
    }
}

async function displayUsers(users) {
    const tableBody = document.getElementById('UsersBody')
    const tableElement = document.getElementById('tableUsers')

    tableBody.innerHTML = users.map(u => `
        <tr>
        <td>${u.id}</td>
        <td>${u.nama}</td>
        <td>${u.password}</td>
        <td>${u.created_at}</td>
        <td> <button onclick="deleteUser(${u.id})">Delete</button> </td>
        </tr>
        `).join(' ');
}

async function deleteUser(usersId) {
    if(!confirm('yakin mau hapus?')) {
        return
    }

    try {

        const res = await fetch(`/api/users/${usersId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })

        if(!res.ok) {
            throw new Error("gagal delete users")
        }

        await res.json();
        loadUsers();

    } catch(err) {
        console.error(err)
    }
}

document.addEventListener('DOMContentLoaded', loadUsers)