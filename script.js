console.log("working")

const url = `https://opentdb.com/api.php?amount=10` 

async function getData (event) {
  
    event.preventDefault()

    fetch(`https://opentdb.com/api.php?amount=10`) 
        .then(res => {
            return res.json()
        })
        .then(res => {
            console.log("success!", res)

let question = document.querySelector(`#question`)
    question.innerText = res.results[0].question

let correct_answer = document.querySelector(`#answer`)
    correct_answer.innerText = res.results[0].correct_answer


    });

    
}

let button = document.querySelector("#btnValue").addEventListener("click", getData)


function sayAnything() {
    const message = document.getElementById("myText").value;
    console.log(message);
    
    }
    const userInput = document.getElementById("userInput")
    userInput.addEventListener("click", sayAnything)
    sayAnything()
console.log(userInput);

