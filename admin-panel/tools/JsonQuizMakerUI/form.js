function selectNext(){
  var select = document.getElementById('form');
  select.selectedIndex++;
}

function autoquest(x) {
        var t = document.getElementById("ques").value;
        var c = t + x;
        document.getElementById("ques").value = c;
        document.getElementById("ques").focus();
    }


// Function to insert text in between

function typeInTextarea(newText, el) {
	
    const start = el.selectionStart
    const end = el.selectionEnd
    const text = el.value
    const before = text.substring(0, start)
    const after  = text.substring(end, text.length)
    el.value = (before + newText + after)
    el.selectionStart = el.selectionEnd = start + newText.length
    el.focus()
  }

  
  function quesCount(obj){
    var maxLength = 300;
    var strLength = maxLength - obj.value.length;
    
    if(strLength >=0){
        document.getElementById("quesid").innerHTML = '<span style="color: #5cd40b;">'+strLength+'</span>';
    }else{
        document.getElementById("quesid").innerHTML = '<span style="color: #e14133;">'+strLength+'</span>';
    }
}

function countExplaChar(obj) {
    var objj = obj.value.replace(/<b>/g, '');
    objj = objj.replace(/\<\/b>/g, '');
    objj = objj.replace(/<u>/g, '');
    objj = objj.replace(/\<\/u>/g, '');
    var maxLength = 200;
    var strLength = maxLength - objj.length;

    if (strLength >= 0) {
      document.getElementById("charNum").innerHTML = '<span style="color: #5cd40b;">' + strLength + '</span>';
    } else {
      document.getElementById("charNum").innerHTML = '<span style="color: #e14133;">' + strLength + '</span>';
    }
  }

  function option(obj, optcount) {
    var maxLength = 99;
    var strLength = maxLength - obj.value.length;

    if (strLength >= 0) {
      document.getElementById(optcount).innerHTML = '<span style="color: #5cd40b;">' + strLength + '</span>';
    } else {
      document.getElementById(optcount).innerHTML = '<span style="color: #e14133;">' + strLength + '</span>';
    }
  }



  //Move from one input box to another
  var inputs = document.querySelectorAll("input,select");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("keypress", function (e) {
      if (e.which == 13) {
        e.preventDefault();
        var nextInput = document.querySelectorAll('[tabIndex="' + (this.tabIndex + 1) + '"]');
        if (nextInput.length === 0) {
          nextInput = document.querySelectorAll('[tabIndex="1"]');
        }
        nextInput[0].focus();
      }
    })
  }

// To expand the textarea with ID 'question'
var tx = document.getElementById('question');
tx.style.height = 'auto'; // Reset height to auto to correctly calculate the scrollHeight
tx.style.height = (tx.scrollHeight) + 'px'; // Set height to scrollHeight
tx.addEventListener("input", OnInput, false);

function OnInput() {
    this.style.height = 'auto'; // Reset height to auto to correctly calculate the scrollHeight
    this.style.height = (this.scrollHeight) + 'px'; // Set height to scrollHeight
}



// saving the data to local storage to restore
const form = document.querySelector('form');
const input1 = document.querySelector('#optionA');
const input2 = document.querySelector('#optionB');
const input3 = document.querySelector('#optionC');
const input4 = document.querySelector('#optionD');
const input5 = document.querySelector('#question');
const input6 = document.querySelector('#explanation');


const saveData = () => {
  const formData = {
    input1: input1.value,
    input2: input2.value,
    input3: input3.value,
    input4: input4.value,
    input5: input5.value,
    input6: input6.value,
  };

  localStorage.setItem('formData', JSON.stringify(formData));
};

input1.addEventListener('input', saveData);
input2.addEventListener('input', saveData);
input3.addEventListener('input', saveData);
input4.addEventListener('input', saveData);
input5.addEventListener('input', saveData);
input6.addEventListener('input', saveData);


form.addEventListener('submit', (event) => {
  event.preventDefault();
});

const storedFormData = JSON.parse(localStorage.getItem('formData'));

if (storedFormData) {
  input1.value = storedFormData.input1;
  input2.value = storedFormData.input2;
  input3.value = storedFormData.input3;
  input4.value = storedFormData.input4;
  input5.value = storedFormData.input5;
  input6.value = storedFormData.input6;
  
}

 
  // Get the input element
  var input = document.getElementById('key');

  // Check if the user's ID is stored in localStorage
  if (localStorage.getItem('key')) {
    // If it is, set the value of the input element to the stored ID
    input.value = localStorage.getItem('key');
  }