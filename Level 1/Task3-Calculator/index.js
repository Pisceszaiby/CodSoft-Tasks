var memory; //memory variable for MC,M+,MR,MS
var result; //Result of evaluation to be stored in result
var calculation //The current value in text input area


function speech(message) {
    let msg = new SpeechSynthesisUtterance(message);
    msg.lang = 'en-US';
    msg.rate = 3;
    window.speechSynthesis.speak(msg);
}
function handleOp(id) {  //Function for handling (0-9) & (+,-,/,*)
    var num = id.id;
    calculation = document.getElementById("calculation").value;
    calculation = calculation + num;  //concatenation of operation/operand
    document.getElementById("calculation").value = calculation; //display back on text area
    if (id.id === "-")
        num = "minus";
    else if (id.id === "*")
        num = "multiply";
    else if (id.id === "/")
        num = "divide";
    speech("Pressed " + num);
}
//function to convert text to speech in JavaScript
function textToSpeech(id) {
    if (id.id === "calculation")
        var text = document.getElementById(id.id).value;
    else if (id.id === "x²")
        var text = "square of x";
    else if (id.id === ".")
        var text = "point";
    else if (id.id === "U+232B")
        var text = "Backspace";
    else if (id.id === "-")
        var text = "minus";
    else if (id.id === "*")
        var text = "multiply";
    else if (id.id === "/")
        var text = "divide";
    else
        var text = id.innerHTML;
    speech(text)
}

function calculate(id) {
    var op = id.id; //Based on the ID of the button which was clicked
    calculation = document.getElementById("calculation").value;
    if (op === "=")  //for =, calculation of input field expression
    {
        result = eval(calculation);
        speech("Result is " + result);
    }
    else if (op === "U+232B") // for backspace
    {
        result = calculation.substring(0, calculation.length - 1);
        speech("Pressed Backspace");
    }
    else if (op === "x²") // for calculating the expression and taking square of it 
    {
        result = (Math.pow(eval(calculation), 2))
        speech("Pressed square of x");
    }
    else if (op === "√")// for calculating the expression and taking square root of it 
    {
        result = (Math.pow(eval(calculation), 0.5))
        speech("Pressed" + op);
    }
    else if (op === ".") // for calculating the expression and adding .0 in input field
    {
        result = calculation + ".0";
        speech("Pressed point");
    }
    else if (op === "±") // for calculating the expression and converting - to + and vice versa
    {
        speech("Pressed" + op);
        result = eval(calculation) * -1
    }
    document.getElementById("calculation").value = result;
}

function clearC() {
    document.getElementById("calculation").value = " ";
    memory = ""; //Clears text input and all variables
    result = "";
    calculation = "";
    speech("Pressed clear");
}

function memoryFunction(id) {
    var mem = id.id;
    speech("Pressed" + mem);
    if (mem === "mc")
        memory = ""; //clears the memory variable only
    else if (mem === "ms")
        memory = document.getElementById("calculation").value; //stores the text input expression in memory
    else if (mem === "mr")
        document.getElementById("calculation").value = memory //displays the memory variable content
    else if (mem === "m+") {
        var input = eval(document.getElementById("calculation").value); //stores the value of text input and adds it with the memory variable expression
        memory = eval(memory) + input;
    }
}

