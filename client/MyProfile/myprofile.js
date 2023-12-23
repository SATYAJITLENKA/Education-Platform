
const Name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');

const phone = document.getElementById('PhoneNo');
const gender=document.getElementById("Gender");

const age = document.getElementById('age');
const address=document.getElementById('address');
const city = document.getElementById('city');
const state = document.getElementById('state');
const pincode = document.getElementById('Pincode');
const myname=document.getElementById('myname');
const editProfileBtn=document.getElementById('edit-profile')

const savechangesbtn=document.getElementById('save-change')

editProfileBtn.addEventListener('click',editprofile)

let userId;



function editprofile(){

    editProfileBtn.classList.add('disable-btn')
    savechangesbtn.classList.add('enable-btn')
    Name.removeAttribute('readonly')
    phone.removeAttribute('readonly')
    address.removeAttribute('readonly')
    city.removeAttribute('readonly')
    state.removeAttribute('readonly')
    pincode.removeAttribute('readonly')
    age.removeAttribute('readonly')
    password.removeAttribute('readonly')



}

async function getData(){
   
    const response = await fetch("http://localhost:5000/api/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({name, email, password,phone,age,city,state,pincode }),
      });
       const data=await response.json()
       const alld=data.data;
       userId = alld[0]._id;

       alld.forEach(item =>{
        myname.innerText=item.name
        Name.value=item.name
        email.value=item.email
        phone.value=item.phone
        age.value=item.age
        city.value=item.city
        state.value=item.state
        pincode.value=item.pincode
        address.value=item.address
        gender.value=item.gender
        password.value=item.value
       })
}

getData()

savechangesbtn.addEventListener("click",changedInfo)

async function changedInfo(){
    const updatedData={
        name:Name.value,
        age:age.value,
        password:password.value,
        address:address.value,
        state:state.value,
        city:city.value,
        pincode:pincode.value,
        phone:phone.value,
        gender:gender.value,
        
    }
  
    try {
        // Replace with the actual user ID you want to edit
    
        const response = await fetch(`http://localhost:5000/api/edit/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
        });
    
        const data=await response.json()


    
        if (response.ok) {
            alert(data.message);
            window.location.href = "/client/Home/home.html";
            // Redirect or perform other actions as needed
        } else {
            console.error('Error:', result.message);
            // Handle error case
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network or other errors
    }
}