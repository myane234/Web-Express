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