
const upvoted = ()=>{
   // console.log("up");

    const id = document.getElementById("blogId").innerHTML;
   // console.log(id);
   
    const req  = new XMLHttpRequest;

    req.onreadystatechange = async function(){

        if(this.readyState == 4 && this.status == 200)
         {
            let data = JSON.parse(this.responseText);
            document.getElementById("upvote").innerHTML = data.upvote;
         }
    };

    req.open("GET", "http://localhost:3000/singleBlog/upvote/"+id,true);
    req.send();
};

