const teamInput = document.getElementById('teamname')
const reasonInput = document.getElementById('reason')
const formEl = document.getElementById('form')
const containerEl = document.querySelector('.container')
const usernameInput = document.getElementById("username")


const activeArray =[]

const fetchPostData = (items) => 
    fetch('/reasons',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(items)
    })




const fetchGetData = () =>
    fetch('/getreasons')
    .then((res)=>res.json())
    .then((data)=>{
        
        return data
    })

const getRenderItems =  (info)  => {
    console.log(info)
    
    
    info.forEach((items)=> {
        const cardDiv = document.createElement('div')
        const newH1 = document.createElement('h1')
        const newP = document.createElement('p')
        const newName = document.createElement('p')
        cardDiv.classList.add('card')
       
        newH1.textContent = items.teamname
        newP.textContent = items.reason
        newName.textContent = 'sent by '+ items.name
        
        cardDiv.append(newH1,newP,newName)
        containerEl.append(cardDiv)

    })
   
}


const postDataHandler = () => {
    
    let review = {
        username: usernameInput.value.trim(),
        teamname: teamInput.value.trim(),
        reason: reasonInput.value.trim()
    }

    fetchPostData(review).then((response)=>response.json()).then((data)=> {
        return data
    })


}


const renderFetch = () => fetchGetData().then(getRenderItems)

    
renderFetch()


formEl.addEventListener('submit',postDataHandler)





