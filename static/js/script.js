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
      <p>${text}</p>
  </div>
  `;
}

async function logout() {
  let formData = new FormData();
  let token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  formData.append("csrfmiddlewaretoken", token);

  try {
    let response = await fetch("/logout/", {
      method: "POST",
      body: formData,
    });
    // window.location.href = "/login/";
  } catch (err) {
    console.error(err);
  }
}
