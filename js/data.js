const Data = [
    {
        id: 1,
        user: "user@1",
        obj: "Batedeira",
        voltage: "110V",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur"
    },
    {
        id: 2,
        user: "user@2",
        obj: "Furadeira",
        voltage: "220V",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur"
    },
    {
        id: 3,
        user: "user@3",
        obj: "Martelo",
        voltage: "Não se aplica",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur"
    },
    {
        id: 4,
        user: "user@4",
        obj: "Cerra",
        voltage: "110V",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur"
    },
    {
        id: 5,
        user: "user@5",
        obj: "Furadeira",
        voltage: "110V",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur"
    },
    {
        id: 6,
        user: "user@6",
        obj: "Maquinha",
        voltage: "110V",
        deadLine: "4 dias",
        desc: "Lorem ipsum dolor sit amet consectetur"
    }
];

if( localStorage.getItem("data") == undefined){
    localStorage.setItem("data", JSON.stringify(Data));
}
if( localStorage.getItem("data-offer") == undefined){
    localStorage.setItem("data-offer", JSON.stringify(Data.filter(e=>{return (e.id%2 == 0)})));
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

const newPostOffer = function(){
    var obj = document.getElementById("obj-input").value;
    var deadLine1 = document.getElementById("dead-line-1-input").value;
    var deadLine2 = document.getElementById("dead-line-2-input").value;
    var desc = document.getElementById("desc-input").value;
    var voltage = document.getElementById("voltage-input").value;
    var post = {
        user: "Nome Do Usuário", 
        obj: obj,
        voltage: voltage,
        deadLine: deadLine1+deadLine2,
        desc: desc
    }
    var data = JSON.parse(localStorage.getItem("data"));
    data.push(post);
    localStorage.setItem("data",JSON.stringify(data));
    console.log(data);
}

const newOffer = function () {
    var obj = document.getElementById("obj-input-demand").value;
    var deadLine1 = document.getElementById("dead-line-1-input-demand").value;
    var deadLine2 = document.getElementById("dead-line-2-input-demand").value;
    var desc = document.getElementById("desc-input-demand").value;
    var voltage = document.getElementById("voltage-input-demand").value;
    var post = {
        user: "Nome Do Usuário", 
        obj: obj,
        voltage: voltage,
        deadLine: deadLine1+deadLine2,
        desc: desc
    }
    var data = JSON.parse(localStorage.getItem("data-offer"));
    data.push(post);
    localStorage.setItem("data-offer",JSON.stringify(data));
    console.log(data);
}