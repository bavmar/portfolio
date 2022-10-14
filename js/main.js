let greetings = [];
let answer = "";
if(true) { answer = 'AY NAH'; } 
else {
  greetings = ['Hello!', 'Heyo!', 'yo', 'hi', 'hello', ''];
  answer = greetings[Math.floor(Math.random() * greetings.length)]
}
console.log(answer);