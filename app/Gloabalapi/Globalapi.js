    
const myPapers=()=>fetch('https://desci.onrender.com/api/data')
.then((res)=>res.json())
.then((res)=>{ console.log(res)
    return res })

const getRecent=()=>fetch('https://desci.onrender.com/api/data')
.then((res)=>res.json())
.then((res)=>{
    return res.slice(0,3)})

export default {
    getRecent,
    myPapers
}