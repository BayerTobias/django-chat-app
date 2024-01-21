async function sendMessage() {
  const msg = messageInput.value;
  let token = document.querySelector("form").dataset.csrfToken;

  let formData = new FormData();
  formData.append("textmessage", msg);
  formData.append("csrfmiddlewaretoken", token);
  try {
    let response = await fetch("/chat/", {
      method: "POST",
      body: formData,
    });
    renderMessage(response);
  } catch (err) {
    console.error(err);
  }
}

async function renderMessage(response) {
  const data = await response.json();
  const jsonData = JSON.parse(data);

  const text = jsonData.fields.text;
  const date = jsonData.fields.created_at;
  const author = jsonData.fields.author;
  const receiver = jsonData.fields.receiver;

  messagesContainer += /*html*/ `
     <div>
    <span>{{message.author}}:</span>
    <p>{{message.text}}</p>
  </div>
  `;

  console.log(text, date, author);
}
