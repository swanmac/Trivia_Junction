console.log("working")


const url = `https://opentdb.com/api.php?amount=10` //${textInput}`

//reg and res
//request and response
//use Event as a parameter

async function getData (event) {
    //preventing the default behavior of the browser
    event.preventDefault()

    fetch(`https://opentdb.com/api.php?amount=10`) //${textInput}`)
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log("success!", res)

let question = document.querySelector(`#question`)
question.innerText = res.results[0].question

let correct_answer = document.querySelector(`#answer`)
correct_answer.innerText = res.results[0].correct_answer

       })

    //    let btnValue = document.querySelector("#btnValue")
    //    btnValue.innerText = "Question: " + res.btnValue

    

        .catch( err => {
            console.log("error!", err)
            
        })

       
}
 
// trivia_category.addEventListener("click", getData)
// trivia_difficulty.addEventListener("click", getData)
// trivia_type.addEventListener("click", getData)

let button = document.querySelector("#btnValue").addEventListener("click", getData)
       // pokemonHeight.innerText = "Height: " + res.height
    
 

 //1 Attach Event to button  
// button.addEventListener("click", getData)


 //2 Read the input bar variable
