const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('input');

const API_URL = 'https://1a40-2600-8801-1080-b60-00-16df.ngrok-free.app/api/chat';

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  input.value = '';
  input.disabled = true;

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'Goldfelty_AI/ora1b', prompt: message }),
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);

    const data = await res.json();
    // Assuming the response JSON has a 'response' field with the AI reply
    appendMessage(data.response || 'No response from Ora.', 'bot');
  } catch (err) {
    appendMessage('Error contacting Ora: ' + err.message, 'bot');
  }

  input.disabled = false;
  input.focus();
});

function appendMessage(text, sender) {
  const p = document.createElement('p');
  p.textContent = text;
  p.className = sender;
  chat.appendChild(p);
  chat.scrollTop = chat.scrollHeight;
}
