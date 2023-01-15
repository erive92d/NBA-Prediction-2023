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
    .then((response)=>response.json())
    .then((data) => {
        data
        getRenderItems(items);
    })
    .catch((error)=> console.error(error))




const fetchGetData = () =>
    fetch('/getreasons')
    .then((res) => res.json())
    .then((data) => data)
    .catch((error)=>console.error(error))
    

const getRenderItems =  (items)  => {
    // console.log(info)
    
    console.log(items)
    
        const cardDiv = document.createElement('div')
        const newH1 = document.createElement('h1')
        const newP = document.createElement('p')
        const newName = document.createElement('p')
        cardDiv.classList.add('card')
       
        newH1.innerHTML = items.teamname
        newP.innerHTML = items.reason
        newName.innerHTML = 'sent by '+ items.name
        
        cardDiv.append(newH1,newP,newName)
        containerEl.append(cardDiv)

   
   
}


const postDataHandler = (e) => {
    e.preventDefault()
    const review = {
        username: usernameInput.value.trim(),
        teamname: teamInput.value.trim(),
        reason: reasonInput.value.trim()
    }

    fetchPostData(review)
    }





fetchGetData().then((data)=>data.forEach((items)=>getRenderItems(items)))




formEl.addEventListener('submit',postDataHandler)





