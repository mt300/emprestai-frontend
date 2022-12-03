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

const Logged = {
    value: false,
    user: "",
    city: ""
}
if( localStorage.getItem("data") == undefined){
    localStorage.setItem("data", JSON.stringify(Data));
    localStorage.setItem("id-counter", Data.length)
    localStorage.setItem("data-demand", JSON.stringify(Data.filter(e=>{return (e.type == "demand")})));
    sessionStorage.setItem("data-demand", JSON.stringify(Data.filter(e=>{return (e.type == "demand")})));
    sessionStorage.setItem("data-offer", JSON.stringify(Data.filter(e=>{return (e.type == "offer")})));
    sessionStorage.setItem("users",JSON.stringify(Users));
    sessionStorage.setItem("logged",JSON.stringify(Logged))
}



 // delete data
function deletePost(id){
    var database = JSON.parse(localStorage.getItem("data"));
    var index = database.findIndex(p => p.id == id);
    if(index >= 0){
        database.splice(index,1);
    }
    console.log("deletou " + id)
    localStorage.setItem("data",JSON.stringify(database));
    location.reload();
}
 //fetch data 
function fetchData(){
    var database = JSON.parse(localStorage.getItem("data"));
    var post = document.getElementById("post-bar");
    var deleteBtn = document.getElementById("delete-post");
    var postsSection = document.getElementById("posts-section");
    postsSection.removeChild(post);
    // console.log(database)
    database.sort(function(a,b){ return (b.id - a.id)})
    database.forEach( data => {
        var newPost = document.createElement("div");
        
        // copying and creating new posts with data stored
        newPost.innerHTML = post.innerHTML;
        newPost.classList.add("post-bar");
        
        var user = newPost.querySelector("#user") 
        user.childNodes[0].data = data.user;
        
        var obj = newPost.querySelector("#obj")
        obj.childNodes[1].data = data.obj
        
        var deadLine = newPost.querySelector("#dead-line")
        deadLine.childNodes[1].data = data.deadLine;
        
        
        var voltage = newPost.querySelector("#voltage")
        voltage.childNodes[1].data = data.voltage;
        
        var desc = newPost.querySelector("#desc")
        desc.childNodes[1].data = data.desc;
        
        newPost.querySelector("#delete-post").addEventListener("click",() => deletePost(data.id));
        
        // console.log(deleteBtn)
        
        postsSection.appendChild(newPost)
    });
    var user = JSON.parse(sessionStorage.getItem("logged"));
    if(user.value == true){
        document.querySelector("#user-name-logged").textContent = user.user;
        document.querySelector("#city").textContent = user.city;
    }
}

function login() {
    var users = JSON.parse(sessionStorage.getItem("users"));
    var userLogin = document.querySelector("#user-login").value;
    var userPassword = document.querySelector("#password-login").value;
    var name;
    var city;
    if(users.find((user) => { 
        if(userPassword == user.password){
            // console.log("Access.")    
            name = user.name;
            city = user.city;
            return userLogin == user.login
        }else{
            // console.log("invalid password")
            return false;
        }
    })){
        // window.location.href = "file:///home/tomazi/Documents/getninjas/stupids/EmprestaAi/index.html"
        // var logged = sessionStorage.getItem("logged");
        var logged = {
            value:true,
            user: name,
            city: city
        };
        console.log(name);
        sessionStorage.setItem("logged",JSON.stringify(logged));
        // console.log(location.href)
    }else{
        console.log("No")
    }
}
function redirectIndex(){
    var logged = JSON.parse(sessionStorage.getItem("logged"));
    // console.log(logged.value)
    if(logged.value == true){
        location.replace("file:///home/tomazi/Documents/getninjas/stupids/EmprestaAi/index.html");
        console.log(logged)
    }   
    // console.log(logged)
        
}
function logout(){
    var logged = JSON.parse(sessionStorage.getItem("logged"));
    logged.value = false;
    sessionStorage.setItem("logged",JSON.stringify(logged));    
}

function join(){
    var name = document.querySelector("#nome").value;
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#senha").value;
    var municipio = document.querySelector("#municipio").value;
    var estado = document.querySelector("#estado").value;
    var tc = document.querySelector("#c2").value;

    var user = {
        name: name,
        login: email,
        password: password,
        city: municipio + "/" + estado
    }
    var users = JSON.parse(sessionStorage.getItem("users"));
    users.push(user);
    console.log(user)
    sessionStorage.setItem("users",JSON.stringify(users));
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