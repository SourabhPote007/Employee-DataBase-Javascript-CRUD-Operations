/* Start for control */
var registerForm = document.querySelector("#register-form");
var allInput = registerForm.querySelectorAll("INPUT");
var addBtn = document.querySelector("#add-btn");
var modal = document.querySelector(".modal");
var closeBtn = document.querySelector(".close-icon");
addBtn.onclick = function(){
    // alert();
    modal.classList.add("active");
}
closeBtn.addEventListener("click",()=>
{
    modal.classList.remove("active");
    var i;
    for(i=0;i<allInput.length;i++){
        allInput[i].value = "";
    }

});

// Start all global variable
var id = document.getElementById("id");
var Name = document.getElementById("Name");
var lname = document.getElementById("l-name");
var email = document.getElementById("email");
var office = document.getElementById("office-code");
var job = document.getElementById("job-title");
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");
var userData = [];
var imgUrl;
var ProfilePic = document.querySelector("#profile-pic");
var uploadPic = document.querySelector("#upload-field");
// End all global variable
// Start register coding
registerBtn.onclick = function(e){
    e.preventDefault();
    // registration();
    if(id.value != "" && Name.value != "" && lname.value != "" && email.value != "" && office.value != "" && job.value != "")
    {
        // alert();
        registration();
        registerForm.reset('');
        closeBtn.click();
    }else{
        // alert("Please Enter the above information")
        swal("Input field is empty!", "Please fill above field!", "warning");
    }
    getDataFromLocal();
}
if(localStorage.getItem("userData") != null)
{
userData = JSON.parse(localStorage.getItem("userData"));
}
console.log(userData);

function registration(){
    userData.push({
        id : id.value,
        Name : Name.value,
        lname : lname.value,
        email : email.value,
        office : office.value,
        job : job.value,
        ProfilePic : imgUrl == undefined ? "/img/download.png" : imgUrl 
    });
    var userString = JSON.stringify(userData);
    localStorage.setItem("userData",userString);
    swal("Good job!", "Registration Successful!", "success");
}

// ?Start returning data on page for localStorage
var tableData = document.querySelector("#table-data");
const getDataFromLocal = () =>{
    tableData.innerHTML = "";
    userData.forEach((data,index)=>{
        tableData.innerHTML += `
        <tr index='${index}'>
        <td>${index+1}</td>
        <td><img style="border-radius:50%;" src="${data.ProfilePic}" width="40" height="40"</td>
        <td>${data.id}</td>
        <td>${data.Name}</td>
        <td>${data.lname}</td>
        <td>${data.email}</td>
        <td>${data.office}</td>
        <td>${data.job}</td>
        <td>
        <button class="edit-btn"><i class="fa fa-eye"></i></button>
        <button class="del-btn" style="background-color: #EE534F;"><i class="fa fa-trash"></i></button>
        </td>
    </tr>
        `;
    });
    // !Start delete data Coding Start
    var i;
    var allDelBtn = document.querySelectorAll(".del-btn");
    for(i=0;i<allDelBtn.length;i++)
    {
        allDelBtn[i].onclick = function()
        {
            var tr = this.parentElement.parentElement;
            var id = tr.getAttribute("index");
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    userData.splice(id,1);
            localStorage.setItem("userData",JSON.stringify(userData));
            tr.remove();
                swal("Poof! Your imaginary file has been deleted!", {
                    icon: "success",
                });
                } else {
                swal("Your imaginary file is safe!");
                }
            });
        }
    }
    // !Update Coding Starts
    var allEditBtn = document.querySelectorAll(".edit-btn");
    for(i=0;i<allEditBtn.length;i++)
    {
    allEditBtn[i].onclick = function(){
        var tr = this.parentElement.parentElement;
        var td = tr.getElementsByTagName("TD");
        var index = tr.getAttribute("index");
        var imgTag = td[1].getElementsByTagName("img");
        var profile = imgTag[0].src;
        // alert(profile_pic);
        var idEL = td[2].innerHTML;
        var NameEL = td[3].innerHTML;
        var lnameEL = td[4].innerHTML;
        var emailEL = td[5].innerHTML;
        var officeEL = td[6].innerHTML;
        var jobEL = td[7].innerHTML;
        addBtn.click();
        registerBtn.disabled = true;
        updateBtn.disabled = false;
        id.value = idEL;
        Name.value = NameEL;
        lname.value = lnameEL;
        email.value = emailEL;
        office.value = officeEL;
        job.value = jobEL;
        ProfilePic.src = profile;
        updateBtn.onclick = function updateBtn(e){
            // alert();
            userData[index] = {
                id : id.value,
                Name : Name.value,
                lname : lname.value,
                email : email.value,
                office : office.value,
                job : job.value,
                ProfilePic : uploadPic.value == "" ? ProfilePic.src : imgUrl 
            }
            localStorage.setItem("userData",JSON.stringify(userData));
            swal("Good job!", "Update Successful!", "success");
            e.preventDefault();
            closeBtn.click();
            getDataFromLocal();
        }
    }
    }
}
getDataFromLocal();


// ?Image Processing 

uploadPic.onchange = function()
{
    if(uploadPic.files[0].size < 1000000){
        
        var fReader = new FileReader();
        fReader.onload = function(e)
        {
            imgUrl = e.target.result;
            ProfilePic.src = imgUrl;
        }
        fReader.readAsDataURL(uploadPic.files[0]); 
        }else{
        alert("File Size is too long");
    }
}

// Start Search Input Coding
var SearchEL = document.querySelector('#empID');
SearchEL.oninput = function()
    {
        SearchFun();
    }
function SearchFun()
{
    var tr = tableData.querySelectorAll("TR");
    var filter = SearchEL.value.toLowerCase();
    var i;
    for(i=0;i<tr.length;i++)
    {
        var id = tr[i].getElementsByTagName("TD")[2].innerHTML;
        var name = tr[i].getElementsByTagName("TD")[3].innerHTML;
        var lname = tr[i].getElementsByTagName("TD")[4].innerHTML;
        var email = tr[i].getElementsByTagName("TD")[5].innerHTML;
        var Mobile = tr[i].getElementsByTagName("TD")[6].innerHTML;
        var officeCode = tr[i].getElementsByTagName("TD")[7].innerHTML;
        var jobT = tr[i].getElementsByTagName("TD")[8].innerHTML;
        
        // var id = td.innerHTML;
        if(id.toLowerCase().indexOf(filter) > -1)
        {
            tr[i].style.display = "";
        }
        else if(name.toLowerCase().indexOf(filter) > -1)
        {
            tr[i].style.display = "";
        }
        else if(lname.toLowerCase().indexOf(filter) > -1)
        {
            tr[i].style.display = "";
        }
        else if(email.toLowerCase().indexOf(filter) > -1)
        {
            tr[i].style.display = "";
        }
        else if(Mobile.toLowerCase().indexOf(filter) > -1)
        {
            tr[i].style.display = "";
        }
        else if(officeCode.toLowerCase().indexOf(filter) > -1)
        {
            tr[i].style.display = "";
        }
        else if(jobT.toLowerCase().indexOf(filter) > -1)
        {
            tr[i].style.display = "";
        }
        else{
            tr[i].style.display = "none";
        }
    }
}

// Start Clear All Data
var delAllBtn = document.querySelector("#add-btn2");
var allDelBox = document.querySelector("#del-all-box");
delAllBtn.addEventListener('click',()=>
{
    if(allDelBox.checked == true)
    {
        // alert("success");
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                localStorage.removeItem("userData");
                window.location = location.href;
                swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
            });
            } else {
            swal("Your imaginary file is safe!");
            }
        });
    }
    else{
        swal("Check The Box!", "Please Check the Box!", "success");
    }
})