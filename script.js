// document.addEventListener('DOMContentLoaded', function() {
//     let radioButtons = document.querySelectorAll('input[type=radio]');
//     let submitButton = document.getElementById('submitQuiz');

//     radioButtons.forEach(function(radio) {
//         radio.addEventListener('change', function() {
//             checkAllAnswered();
//         });
//     });

//     document.getElementById("submitQuiz").addEventListener("click", function() {        
//         let result = getRandomResult();
//         displayResults(result);
//     });

//     function checkAllAnswered() {
//         let questions = document.querySelectorAll('.question');
//         let allAnswered = true; // Assume all are answered to start

//         questions.forEach(function(question) {
//             let radios = question.querySelectorAll('input[type=radio]');
//             let oneChecked = Array.from(radios).some(r => r.checked);
//             if (!oneChecked) allAnswered = false; // At least one question is unanswered
//         });

//         submitButton.disabled = !allAnswered;
//     }
    
// });

document.addEventListener('DOMContentLoaded', function() {
    let password = prompt("Please enter the password:", "");
    if (password !== "9/3/22") {
        alert("Incorrect password!")
        window.location.href = "https://www.google.com";
    }

    let options = document.querySelectorAll('.grid-item');
    let submitButton = document.getElementById('submitQuiz');

    options.forEach(option => {
        option.addEventListener('click', function() {
            
            // Find the parent .question of the clicked option
            let parentQuestion = this.closest('.question');

            if(parentQuestion) {
                // Find all .option elements within parent .question
                let optionsInSameQuestion = parentQuestion.querySelectorAll('.grid-item.selected');

                // Remove 'selected' class from all options in the same question
                optionsInSameQuestion.forEach(opt => opt.classList.remove('selected'));
                
                this.classList.add('selected');
            }

            // After an option is clicked or unclicked, check if all questions have a selection

            if(checkAllQuestionsSelected()) {
                submitButton.disabled = false;
            } else {
                submitButton.disabled = true;
            }

        });
    });

    document.getElementById('submitQuiz').addEventListener('click', function(){
        submit();      
    });

    document.getElementById('submitQuiz').addEventListener('touchstart', function(){
        submit();
    });

});

function submit() {
    let selectedOptions = document.querySelectorAll('.grid-item.selected');
    let questions = document.querySelectorAll('.question');
    let numQuestions = questions.length;

    let types = {
        'comfort': 0,
        'silly': 0
    };

    selectedOptions.forEach(option => {
        let optionValue = option.getAttribute('data-answer');

        if (optionValue === 'comfort'){
            types['comfort']++
        }
        else if (optionValue === 'silly'){
            types['silly']++
        };
    });  

    let result = getRandomResult(types);
    displayResults(result);
}

function checkAllQuestionsSelected(){
    let allQuestions = document.querySelectorAll('.question');

    for(let question of allQuestions) {
        if(question.querySelector('.grid-item.selected') === null) {
            return false;
        }
    }
    return true;
}


function getRandomResult(types){
    let result = {};

    let comfortMessages = ["My honey is the best baby!! You're doing great my love!! <3",
                            "My honey had a long day, make sure to drink water and rest baby!!",
                            "My baby is so smart and sweet and hardworking!! A very social and productive baby!",
                            "Sending you all my love!! and kisses!! and cuddles!! Mua mua mua mua <3",
                            "Give Pengy and the Baguettes (children's band) a good cuddle and get some kisses!",
                            "You're doing amazing!! I'm so proud of you honey <3",
                            "I believe in you baby. We're in this together!!",
                            "You're a very sweet baby hehe my honey is awesome!!",
                            "Don't forget that you're doing great my love! If you need to, please take a break!",
                            "Give me a call if you wanna talk honey! I'm always here for you! <3",
                            "Looooove you!!! Keep your head up my prince!"
                            ];

    let sillyMessages = ["Honey (me): *baby noises* Honey (you): *giggles* 'My honey so cute' Honey (me): *blush* 'Thank you!'",
                        "My baby is such a cute and funny baby! You make me laugh hehehehe all day long MUA",
                        "Here's some looooove mua mua mua kisses! and hugs hugs hugs!",
                        "I like how we are the cartoon babies IRL hehehe!",
                        "We're both George Clooney LMAOO",
                        "I love how we can be silly babies together <3",
                        "Can't wait for the next time I see my honey!!",
                        "'There are many like it, but this one is mine.' LMAOO I thought you made up that quote at first.",
                        "Welcome to instant honey love!! MUA MUA MUA MUA",
                        "The cartoon babies gifs are so funny sometimes LOL"
                        ];
    
    /* Edit these with how many highest # gif in the folder*/
    let numComfortGifs = 24
    let numSillyGifs = 23

    if (types['comfort'] > types['silly']){
        result.message = comfortMessages[Math.floor(Math.random() * comfortMessages.length)]
        result.image = "images/comfort/" + (Math.floor(Math.random() * numComfortGifs)) + ".gif";
    }
    else {
        result.message = sillyMessages[Math.floor(Math.random() * sillyMessages.length)]
        result.image = "images/silly/" + (Math.floor(Math.random() * numSillyGifs)) + ".gif";
    };

    return result
};

function displayResults(result){
    document.getElementById("resultMessage").textContent = result.message;
    document.getElementById("resultImage").src = result.image;
    document.getElementById("quizResults").style.display = "block";
};