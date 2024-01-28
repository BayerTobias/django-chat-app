async function sendMessage() {
  const msg = messageInput.value;
  const sender = userName.value;
  const options = { month: "short", day: "numeric", year: "numeric" };
  const date = new Date().toLocaleDateString("en-US", options);
  const formData = getFormData(msg);

  renderSentMessage(msg, date, sender);
  try {
    let response = await fetch("/chat/", {
      method: "POST",
      body: formData,
    });
    renderMessage(msg, date, sender);
  } catch (err) {
    console.error(err);
  }
}

function getFormData(msg) {
  let token = document.querySelector("form").dataset.csrfToken;

  let formData = new FormData();
  formData.append("textmessage", msg);
  formData.append("csrfmiddlewaretoken", token);
  return formData;
}

function renderMessage(msg, date, sender) {
  deleteElements = document.querySelectorAll(".delete");
  deleteElements.forEach((message) => {
    message.remove();
  });
  messagesContainer.innerHTML += getMessage(true, msg, date, sender);
}

function renderSentMessage(msg, date, sender) {
  messagesContainer.innerHTML += getMessage(false, msg, date, sender);
}

function getMessage(success, msg, date, sender) {
  if (success) {
    return /*html*/ `
    <div class="message">
      <span class="date">${date}</span>
      <span class="sender">${sender}</span>
      <p class="message-content">${msg}</p>
    </div>
    `;
  } else {
    return /*html*/ `
    <div class="message delete">
    <span class="date">${date}</span>
      <span class="sender">${sender}</span>
      <p class="message-content">${msg}</p>
    </div>
    `;
  }
}

async function logout() {
  window.location.href = "/logout/";
}
