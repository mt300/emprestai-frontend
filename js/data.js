// import "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
// import "./axios.min.js";


const Data = [
    {
        id: 1,
        user: "user@1",
        obj: "Batedeira",
        voltage: "110V",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur",
        type: "offer"
    },
    {
        id: 2,
        user: "user@2",
        obj: "Furadeira",
        voltage: "220V",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur",
        type: "demand"
    },
    {
        id: 3,
        user: "user@3",
        obj: "Martelo",
        voltage: "Não se aplica",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur",
        type: "offer"
    },
    {
        id: 4,
        user: "user@4",
        obj: "Cerra",
        voltage: "110V",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur",
        type: "demand"
    },
    {
        id: 5,
        user: "user@5",
        obj: "Furadeira",
        voltage: "110V",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur",
        type: "demand"
    },
    {
        id: 6,
        user: "user@6",
        obj: "Maquinha",
        voltage: "110V",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur",
        type: "offer"
    }
];

const Users = [
    {
        name: "Jon",
        login: "user@email.com",
        password: "123",
        city: "Rio de Janeiro/RJ"
    },
    {
        name: "Aly",
        login: "resu@email.com",
        password: "123",
        city: "Aracaju/SE"
    }
]

// const Logged = {
//     value: false,
//     user: "",
//     city: ""
// }
// if( localStorage.getItem("data") == undefined){
//     localStorage.setItem("data", JSON.stringify(Data));
//     localStorage.setItem("id-counter", Data.length)
//     // localStorage.setItem("data-demand", JSON.stringify(Data.filter(e=>{return (e.type == "demand")})));
//     sessionStorage.setItem("data-demand", JSON.stringify(Data.filter(e=>{return (e.type == "demand")})));
//     sessionStorage.setItem("data-offer", JSON.stringify(Data.filter(e=>{return (e.type == "offer")})));
//     sessionStorage.setItem("users",JSON.stringify(Users));
//     sessionStorage.setItem("logged",JSON.stringify(Logged))
// }



 // delete data
function deletePost(id){
    var database = JSON.parse(localStorage.getItem("data"));
    var index = database.findIndex(p => p.id == id);
    var type = database[index].type;
    // console.log(type)
    if(index >= 0){
        database.splice(index,1);
    }
    
    if(type == "demand"){
        var demands = JSON.parse(sessionStorage.getItem("data-demand"));
        var ind = demands.findIndex(p => p.id == id);
        if(ind >= 0){
            demands.splice(ind,1);
        }
        console.log("demand: "+ind)
        sessionStorage.setItem("data-demand",JSON.stringify(demands)); 
    }else{
        console.log("offer: "+ ind)
        var offers = JSON.parse(sessionStorage.getItem("data-offer"));
        var ind = offers.findIndex(p => p.id == id);
        if(ind >= 0){
            offers.splice(ind,1);
        }
        sessionStorage.setItem("data-offer",JSON.stringify(offers));
    }
    console.log("deletou " + id)
    localStorage.setItem("data",JSON.stringify(database));
    location.reload();
}
 //fetch data 

function loadUserProfile(){
    var user = JSON.parse(sessionStorage.getItem("logged"));
    var users = JSON.parse(sessionStorage.getItem("users"));
    var index = users.findIndex(item => item.name == user.user)
    var userLoged = users.pop(index);
    document.getElementById("username-userprofile").textContent = user.user;
    document.getElementById("email-userprofile").textContent = userLoged.login;
    document.getElementById("city-1-userprofile").value = user.city.split("/")[0];
    document.getElementById("city-2-userprofile").value = user.city.split("/")[1];        
}

function updateUserProfile(){
    var email = document.getElementById("email-userprofile").textContent
    var users = JSON.parse(sessionStorage.getItem("users"));
    users.forEach((user) => {
        if(email == user.login){
            var password = document.getElementById("password-userprofile").value 
            var repeat = document.getElementById("repeat-userprofile").value 
            if(repeat == password){
                var city1 = document.getElementById("city-1-userprofile").value 
                var city2 = document.getElementById("city-2-userprofile").value 
                user.city = city1 + "/" + city2;
                user.password = password;
                console.log(user)
                sessionStorage.setItem("logged",JSON.stringify({value: true,user: user.name, city: user.city}))
            }
        }    
    })
    console.log(users[1]);
    sessionStorage.setItem("users",JSON.stringify(users));
}

function redirectIndex(){
    var logged = JSON.parse(sessionStorage.getItem("loggedUser"));
    console.log(logged.email)
    if(logged != undefined){
        var url = location.href.split("sign-in.html")[0] + "index.html"
        location.replace(url);
    }   
}

function logout(){
    sessionStorage.setItem("loggedUser",undefined);    
}

function fetchRequests(){
    var database = JSON.parse(sessionStorage.getItem("data-demand"));
    // console.log("oi gente ");
    // console.log(database)
    var post = document.getElementById("post-request");
    var postsSection = document.getElementById("requests-section");
    postsSection.removeChild(post);
    database.sort(function(a,b){ return (b.id - a.id)})
    database.forEach( data => {
        var newPost = document.createElement("div");
        
        // copying and creating new posts with data stored
        newPost.innerHTML = post.innerHTML;
        newPost.classList.add("usr-question");

        var user = newPost.querySelector("#user-request") 
        user.childNodes[0].textContent = data.user;

        var obj = newPost.querySelector("#obj-request")
        obj.childNodes[1].data = data.obj

        var deadLine = newPost.querySelector("#dead-line-request")
        deadLine.childNodes[1].data = data.deadLine;


        var voltage = newPost.querySelector("#voltage-request")
        voltage.childNodes[1].data = data.voltage;

        var desc = newPost.querySelector("#desc-request")
        desc.childNodes[1].data = data.desc;

        // newPost.querySelector("#delete-post-").addEventListener("click",() => deletePost(data.id));
        
        // console.log(deleteBtn)
        
        postsSection.appendChild(newPost)
    });    
}

function fetchOffers(){
    var database = JSON.parse(sessionStorage.getItem("data-offer"));
    console.log("oi gente ");
    console.log(database)
    var post = document.getElementById("post-offer");
    var postsSection = document.getElementById("offers-section");
    postsSection.removeChild(post);
    database.sort(function(a,b){ return (b.id - a.id)})
    database.forEach( data => {
        var newPost = document.createElement("div");
        
        // copying and creating new posts with data stored
        newPost.innerHTML = post.innerHTML;
        newPost.classList.add("usr-question");

        var user = newPost.querySelector("#user-offer") 
        user.childNodes[0].textContent = data.user;

        var obj = newPost.querySelector("#obj-offer")
        obj.childNodes[1].data = data.obj

        var deadLine = newPost.querySelector("#dead-line-offer")
        deadLine.childNodes[1].data = data.deadLine;


        var voltage = newPost.querySelector("#voltage-offer")
        voltage.childNodes[1].data = data.voltage;

        var desc = newPost.querySelector("#desc-offer")
        desc.childNodes[1].data = data.desc;

        // newPost.querySelector("#delete-post-").addEventListener("click",() => deletePost(data.id));
        
        // console.log(deleteBtn)
        
        postsSection.appendChild(newPost)
    });   
}

// comment
const newPostOffer = function(){
    var obj = document.getElementById("obj-input").value;
    var deadLine1 = document.getElementById("dead-line-1-input").value;
    var deadLine2 = document.getElementById("dead-line-2-input").value;
    var desc = document.getElementById("desc-input").value;
    var voltage = document.getElementById("voltage-input").value;
    var id = Number(localStorage.getItem("id-counter")) + 1;
    localStorage.setItem("id-counter",id);
    var user = document.getElementById("user-name-logged").textContent;
    var post = {
        id: id,
        user: user, 
        obj: obj,
        voltage: voltage,
        deadLine: deadLine1+deadLine2,
        desc: desc,
        type: "offer"
    }

    var dataSession = JSON.parse(sessionStorage.getItem("data-offer"));
    dataSession.push(post);
    sessionStorage.setItem("data-offer",JSON.stringify(dataSession));
    

    var dataLocal = JSON.parse(localStorage.getItem("data"));
    dataLocal.push(post);
    localStorage.setItem("data",JSON.stringify(dataLocal));
    
    // console.log(window.location.href); 
    // window.location.replace("http://www.w3schools")
    // console.log(data);
}

const newDemand = function () {
    var obj = document.getElementById("obj-input-demand").value;
    var deadLine1 = document.getElementById("dead-line-1-input-demand").value;
    var deadLine2 = document.getElementById("dead-line-2-input-demand").value;
    var desc = document.getElementById("desc-input-demand").value;
    var voltage = document.getElementById("voltage-input-demand").value;
    var user = document.getElementById("user-name-logged").textContent;
    var id = Number(localStorage.getItem("id-counter")) + 1;
    localStorage.setItem("id-counter",id);
    var post = {
        id: id,
        user: user, 
        obj: obj,
        voltage: voltage,
        deadLine: deadLine1+deadLine2,
        desc: desc,
        type: "demand"
    }
    var dataSession = JSON.parse(sessionStorage.getItem("data-demand"));
    dataSession.push(post);
    sessionStorage.setItem("data-demand",JSON.stringify(dataSession));
    

    var dataLocal = JSON.parse(localStorage.getItem("data"));
    dataLocal.push(post);
    localStorage.setItem("data",JSON.stringify(dataLocal));
}

// function resetarApresentacao(){
//     var url = location.href.split("/");
//     url.splice(url.length - 1,1);
//     var urlIndex = "";
//     url.forEach(item => {
//         urlIndex = urlIndex + item + "/";
//     })
//     location.replace(urlIndex + "index.html");
//     localStorage.clear();
//     location.reload();
//     // location.replace(urlIndex + "sign-in.html");
//     console.log("oi")
// }