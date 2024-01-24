const weatherForm = document.getElementById("inputForm");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (eventObject) => {
  eventObject.preventDefault();
  const location = search.value;
  console.log(location);
  messageOne.textContent = "Loading..";
  messageTwo.textContent = "..";

  fetch("http://localhost:3000/weather?address=" + location).then(
    (responce) => {
      responce.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
          // console.error("Error has generated");
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecast;
          // console.log(data.location);
          // console.log(data.forecast);
        }
      });
    }
  );
  // console.log(location);
});
