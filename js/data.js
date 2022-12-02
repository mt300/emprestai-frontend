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

if( localStorage.getItem("data") == undefined){
    localStorage.setItem("data", JSON.stringify(Data));
    localStorage.setItem("id-counter", Data.length)
    localStorage.setItem("data-demand", JSON.stringify(Data.filter(e=>{return (e.type == "demand")})));
    sessionStorage.setItem("data-demand", JSON.stringify(Data.filter(e=>{return (e.type == "demand")})));
    sessionStorage.setItem("data-offer", JSON.stringify(Data.filter(e=>{return (e.type == "offer")})));
    
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