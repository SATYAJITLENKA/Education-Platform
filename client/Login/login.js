const form = document.getElementById("loginForm");
form.addEventListener("submit", login);

async function login(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("error-message");

 try{
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (result.message == "Login Successful") {
      window.location.href = "/client/Home/home.html";
      alert(result.message);
    } else {
      errorMsg.textContent = result.message;
    }
  } catch (error) {
    console.error('Error:', error);
    errorMsg.textContent = 'An error occurred while processing your request.';
  }

  
}

// async function getData(){
//     const response = await fetch('http://localhost:5000/api/get', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },

//   });
//   // console.log(response)

//   const newItem = await response.json();

//   // console.log(newItem.data)
// }
// let email="sangram@gmail.com"
// let password="sangram";
