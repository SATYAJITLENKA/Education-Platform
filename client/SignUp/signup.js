const signupForm = document.getElementById("signup-form");

signupForm.addEventListener("submit", signup);
async function signup(event) {
  event.preventDefault();
  console.log("  this is workinh");
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const phone = document.getElementById("PhoneNo").value;
  const genderV = document.getElementsByName("Gender");
  const age = document.getElementById("age").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const state = document.getElementById("state").value;
  const pincode = document.getElementById("Pincode").value;
  const errorMsg = document.getElementById("error-message");
  var selectedGenders = [];

  for (var i = 0; i < genderV.length; i++) {
    if (genderV[i].checked) {
      selectedGenders.push(genderV[i].value);
    }
  }

  var gender = selectedGenders[0];

  // googleApiKey
  // first we have to create googleApiKey
  // by going the website https://console.cloud.google.com/ ,first create a project .Selecting this projrct we have to enable 
  // Google Javascript API, Google Place API , Google Direction  API ,Google Geolocation API ,Google Geocoding  API  this .Then We will find Our Api key in Create Credential.
  //i have  some Card issue that's why not able to created this key

  try {
    const validationAddress = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address},${city},${state},${pincode}&key=googleApiKey`
      );
    const validateData = await validationAddress.json();

    if (validateData.results.length === 0) {
      errorMsg.textContent = "Invalid Address";
      return;
    } else {
      errorMsg.textContent = "";
    }



//            5
//          6 5
//        7 6 5
//      6 7 6 5
//    9 6 7 6 5
// 10 9 8 7 6 5

// import java.util.Scanner;

// public class Code {

//   public static void main(String[] args) {
//     Scanner sc=new Scanner(System.in);
//     System.out.println("enter the no of rows");
//     int rows=sc.nextInt();
//     for(int i=1;i<=rows;i++){
//       for(int j=1;j<=rows-i;j++){
//         System.out.print("  ");
//       }
//       for (int k = i; k >= 1; k--) {
//         System.out.print((k + 4) + " ");
//     }
//     System.out.println();
  
//   }
//   }
// }




    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phone,
        gender,
        address,
        age,
        city,
        state,
        pincode,
      }),
    });

    const result = await response.json();
    if (result.message === "Account created successfully") {
      window.location.href = "/client/Login/login.html";
      alert(result.message);
    } else {
      errorMsg.textContent = result.message;
    }
  } catch (error) {
    console.error("Error:", error);
    errorMsg.textContent = "An error occurred while processing your request.";
  }
}
