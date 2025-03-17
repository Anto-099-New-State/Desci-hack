    
const myPapers=()=>fetch('https://desci.onrender.com/api/data')
.then((res)=>res.json())
.then((res)=>{ 
    return res 
})

const getRecent=()=>fetch('https://desci.onrender.com/api/data')
.then((res)=>res.json())
.then((res)=>{
    return 
})

export default {
    getRecent,
    myPapers
}