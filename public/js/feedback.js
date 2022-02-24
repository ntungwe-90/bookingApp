const timer = document.querySelector("#countdown")
let timeout = 5
timer.textContent = timeout
 let count = setInterval(()=>{
timeout = timeout -1
timer.textContent = timeout;
if (timeout==0){
   
    clearInterval(count)
    window.location.href='/'

}
},1000)
