function add(){
    let dta={
        id:document.getElementById('id').value,
        namee:document.getElementById('namee').value,
        numberr:document.getElementById('numberr').value,
        writer:document.getElementById('writer').value
    }
    fetch("http://localhost:3000/Book",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(dta)
    })

    .then((res)=>alert("data stored"));
}


async function fun(){
    let d=await fetch("http://localhost:3000/Book");
    let re=await d.json();
    let p=re.map((e)=>
    `
    <tr>
    <td>${e.id}</td>
    <td>${e.namee}</td>
    <td>${e.numberr}</td>
    <td>${e.writer}</td>
    <td><button onclick="assign(${e.id})">assign</button></td>
    </tr>
    `).join(' ')
    document.getElementById('displaydata').innerHTML=p;
}
fun();

let dupid=0;
async function assign(id){
    document.getElementById('userform').style.display="block";
    document.getElementById('userassignbook').style.display="block";
    let dupid=id;
    let s1= await fetch(`http://localhost:3000/Book/${dupid}`)
    let re= await s1.json();
    postdata(re)
}

let bookid=0;
function postdata(re){
    let s=document.getElementById('displaydataforuser');
    bookid=re.id;
    s.innerHTML=
    `
    <tr>
    <td>${re.id}</td>
    <td>${re.namee}</td>
    <td>${re.numberr}</td>
    <td>${re.writer}</td>
    </tr>
    `
}

function add1(){
    let udta={
        id:document.getElementById("userid").value,
        username:document.getElementById("username").value,
        usercontact:document.getElementById("usercontact").value,
        bookid:bookid
    }
    fetch("http://localhost:4000/user",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(udta)
    })
    .then(()=>{
    const userid=document.getElementById('userid').value;
    userdatadisplay(userid);
    });
}

async function userdatadisplay(userid){
    document.getElementById('usertable').style.display="block";
    let s=await fetch("http://localhost:4000/user")
    let res=await s.json();
    let p=res.filter((e)=>{return e.id==userid})
    displayuserbookdata(p);
}

function displayuserbookdata(p){
    document.getElementById('userbookdata').innerHTML=
    p.map((e)=>
    `
    <tr>
    <td>${e.id}</td>
    <td>${e.username}</td>
    <td>${e.usercontact}</td>
    <td>${e.bookid}</td>
    </tr>
    `).join(' ')
    userid=0;
}