
const signupForm=document.getElementById("signup-form")
console.log(signupForm)

 signupForm.addEventListener("submit",signup)
async function signup(event) {
    event.preventDefault();
   console.log("  this is workinh")
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const phone = document.getElementById('PhoneNo').value;
    const gender=document.getElementsByName("Gender").value;
    const age = document.getElementById('age').value;
    const address=document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('Pincode').value;
    const errorMsg = document.getElementById("error-message");
   try{
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password,phone,age,city,state,pincode }),
      });
  
      const result = await response.json();
      if (result.message ==="Account created successfully") {
        window.location.href = "/client/Login/login.html";
        alert(result.message);
      } else {
        errorMsg.textContent = result.message;
      }
    } catch (error) {
      console.error('Error:', error);
      errorMsg.textContent = 'An error occurred while processing your request.';
    }
  
    
  }