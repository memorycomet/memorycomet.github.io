

     mylist = [];
    var randm_val = "";
    /*🐞debug🐞 line--  var stre="";   --🐞debug🐞 line*/
    times_to_run = 0;   /*counting the times it ran*/
    var user_answer = "";
    var maxx = 20;
    var flag = 2;
    var giv_rt_cube = "";
    var timerVariable = 0;
    var totalSeconds = 0;
    var minute = 0;
    var seconds = 0;
    var crt=0;
    var wrg=0;
    let scores=0;
    var skip_count=0;

    /*This func will change the maximum range of questions */
    function max() {
        document.getElementById("entr_btn").disabled = false;
        document.getElementById("skip_btn").disabled = false;
        maxn = document.getElementById("max_id").value;
        /*getting value of select and save in maxn*/
        /*    document.getElementById("demooo").innerHTML=maxn;  */
        /*display that in demooo paragraph for 🐞debug🐞*/
        document.getElementById("ques_box").value = "Press enter to start";
        /*Display message to press enter*/
        maxx = maxn;
        restartt();
        /*changing the maxx value range*/
    }


    function restartt()
  {
        if (flag == 2) {
            chng_cube_root(22)
        }
        else {
            chng_cube_root(3)
        }

    }

    function chng_cube_root(value_rec)
   {
        if (value_rec == 22) 
       {
            flag = 2;
            times_to_run = 0;
            mylist = [];
            totalSeconds = 0;
            minute = 0;
            seconds = 0;
            scores=0;
            crt=0;
            wrg=0;
            skip_count=0;
            startg();
            clearInterval(timerVariable);
            document.getElementById("count_up_timer").innerHTML = "00:00";
            document.getElementById("time_aftr_game").innerHTML = "";
            /*neutralize time variables */
            document.getElementById("Ans_review").innerHTML = "Ready!! ";
            document.getElementById("Ans_review").style.background = "#E894FF";
            document.getElementById("entr_btn").disabled = false;
                        document.getElementById("skip_btn").disabled = false;
            document.getElementById("crt_tbody").innerHTML = "";
            document.getElementById("wrg_tbody").innerHTML = "";
            document.getElementById("headin").innerHTML = "Find the square root of:";
            document.getElementById("scoree").innerHTML ="";
        }
   
        else 
    {
            flag = 3;
            times_to_run = 0;
            mylist = [];
            totalSeconds = 0;
            minute = 0;
            seconds = 0;
            scores=0;
            crt=0;
            wrg=0;
            skip_count=0;
            startg();
            clearInterval(timerVariable);
            document.getElementById("count_up_timer").innerHTML = "00:00";
            document.getElementById("time_aftr_game").innerHTML = "";
            /*neutralized time variables */
            document.getElementById("Ans_review").innerHTML = "Ready!! ";
            document.getElementById("Ans_review").style.background = "#CC99FF";
            document.getElementById("entr_btn").disabled = false; 
                        document.getElementById("skip_btn").disabled = false; 
            document.getElementById("crt_tbody").innerHTML = "";
            document.getElementById("wrg_tbody").innerHTML = "";
            document.getElementById("headin").innerHTML = "Find the cube root of:";
            document.getElementById("scoree").innerHTML ="";
        }
    }


    function cube_sqr() {
        if (flag == 2) {
            giv_rt_cube = randm_val ** 2
            return giv_rt_cube;
        }
        else {
            giv_rt_cube = randm_val ** 3
            return giv_rt_cube;
        }

    }



    /*This function will generate random Value and return non-repeating value*/
    function checklist() {
        q = Math.floor(Math.random() * (maxx - 1 + 1)) + 1;
        if (mylist.includes(q))
        {
            return checklist()
        }
        else 
       {
            mylist.push(q);
            return q
        }
    }

    /*MAIN FUNCTION */
    function startg() 
    {
        if (times_to_run == 1)
         {
            start_time()
        }

        document.getElementById('ans_box').value = ' ';
        if (times_to_run < maxx) 
         {
            times_to_run = times_to_run + 1;
            randm_val = checklist()
            document.getElementById("ques_box").value = cube_sqr();
        }
        else 
     {
            document.getElementById("entr_btn").disabled = true;
            document.getElementById("skip_btn").disabled = true;
            document.getElementById("ques_box").value = "Done with all!";

            document.getElementById("time_aftr_game").innerHTML = "Time taken: <span style='color:#959d3a;'> " + minute + ":" + seconds+"</span>" ;
            clearInterval(timerVariable); 
            scores= Math.floor((crt - wrg + skip_count)*100)/100;
            document.getElementById("scoree").innerHTML = "You scored: <span style='color:#959d3a;'> "+scores+"/"+maxx+"</span>" ; 
        }
    }

    /*Function to show text user typing */
    function typeTxt(x) {
        var t = document.getElementById("ans_box").value;
        var c = t + x;
        document.getElementById("ans_box").value = c;
    }


    /*Delete last word by backspace */
    function backspc() {
        var str = document.getElementById("ans_box").value;
        var res = str.substring(0, str.length - 1);
        document.getElementById("ans_box").value = res;
    }



    /*Add to table and start startg() */
    function add_to_table() {
        var user_answer = document.getElementById("ans_box").value;
        if (user_answer == randm_val)
       {
            correct_table(randm_val)
            document.getElementById("Ans_review").innerHTML = randm_val + "<sup> " + flag + " </sup>= " + giv_rt_cube;
            document.getElementById("Ans_review").style.background = "#04D55A";
            crt=crt +1;
            startg()
        }
        else 
       {
            incorrect_table(randm_val)
            document.getElementById("Ans_review").innerHTML = randm_val + "<sup> " + flag + " </sup>= " + giv_rt_cube;
            document.getElementById("Ans_review").style.background = "#F4474D";
            wrg = Math.floor((wrg + 0.33)*100)/100;
            startg()
        }
    }



    /*These two functions are solely responsible to add digit to table at the end*/
    function correct_table(randm_val) {
        var tableRef = document.getElementById('myTable1').getElementsByTagName('tbody')[0];
        // Insert a row in the table at row index 0

        var newRow = tableRef.insertRow(tableRef.rows.length);
        // Insert a cell in the row at index 0
        var newCell = newRow.insertCell(0);
        // Append a text node to the cell

        var spann = document.createElement('sup');
        spann.appendChild(document.createTextNode(flag));
        /*          newCell.appendChild(spann); 
            var newText = document.createTextNode(randm_val+ "=" + giv_rt_cube)
            */
        var newText = document.createTextNode(randm_val)
        var aftertxt = document.createTextNode(" = " + giv_rt_cube)
        newCell.appendChild(newText);
        newCell.appendChild(spann);
        newCell.appendChild(aftertxt);
    }

    function incorrect_table(user_answer) {
        var tableRef = document.getElementById('myTable2').getElementsByTagName('tbody')[0];
        // Insert a row in the table at row index 0
        var newRoow = tableRef.insertRow(tableRef.rows.length);
        // Insert a cell in the row at index 0
        var newCeell = newRoow.insertCell(0);
        // Append a text node to the cell

        var suup = document.createElement('sup');
        suup.appendChild(document.createTextNode(flag));
        /*Get flag value inside sup element*/

        var neewText = document.createTextNode(user_answer)
        /*taking random value in newtext*/
        var afterrtxt = document.createTextNode(" = " + giv_rt_cube)
        /*Getting the square or cube of that random genererated number*/

        newCeell.appendChild(neewText);
        newCeell.appendChild(suup);
        newCeell.appendChild(afterrtxt);
    }



function skip() {
		skip_count=Math.floor((skip_count + 0.33)*100)/100;
		add_to_table()
	}



    /* Code for timerrrr 🕒 🕒 🕒 🕒  */

    function start_time() {
        timerVariable = setInterval(countUpTimer, 1000);
    }
    /*Initiating variable to increase seconds */

    function countUpTimer() {
        ++totalSeconds;
        /* Increase it by one when call of func */
        var hour = pad(Math.floor(totalSeconds / 3600));

        minute = pad(Math.floor((totalSeconds - hour * 3600) / 60));

        seconds = pad(totalSeconds - (hour * 3600 + minute * 60));

        /* pad function is to add 0 before digit if it is less than 9 
      Converting all seconds into three units
      */
        document.getElementById("count_up_timer").innerHTML = minute + ":" + seconds;
        /*Assigning these units in html */
    }

    function pad(value) { return value > 9 ? value : "0" + value; }
/* Code for timerrrr finished🕒 🕒 🕒  */


/* Navigation script*/

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}



function setting(){
	coloor=document.getElementById("setting").value;
document.getElementById("container").style.background= coloor;
document.getElementById("setting2").value=coloor;
	}
	
	function setting2(){
	coloor=document.getElementById("setting2").value;
document.getElementById("container").style.background= coloor;
document.getElementById("setting").value=coloor;
	}
	
	function toptext(){
	coloor=document.getElementById("toptext").value;
document.getElementsByClassName("toptexts")[0].style.color= coloor;
document.getElementsByClassName("toptexts")[1].style.color= coloor;
document.getElementById("toptext2").value=coloor;
	}
	
	function toptext2(){
	coloor=document.getElementById("toptext2").value;
document.getElementsByClassName("toptexts")[0].style.color= coloor;
document.getElementsByClassName("toptexts")[1].style.color= coloor;
document.getElementById("toptext").value=coloor;
	}

function settininput(){
	coloor=document.getElementById("settininput").value;
document.getElementById("container").style.background= coloor;
document.getElementById("settininput2").value=coloor;
	}
	
	function settininput2(){
	coloor=document.getElementById("settininput2").value;
document.getElementById("container").style.background= coloor;
document.getElementById("settininput").value=coloor;
	}
	
	
	
	function activenavv(){
	coloor=document.getElementById("activenavv").value;
document.getElementsByClassName("active")[0].style.background= coloor;
document.getElementById("activenavv2").value=coloor;
	}
	
	function activenavv2(){
	coloor=document.getElementById("activenavv2").value;
document.getElementsByClassName("active")[0].style.background= coloor;
document.getElementById("activenavv").value=coloor;
	}
	
	
	function fancyswitch(){
	coloor=document.getElementById("fancyswitch").value;
document.getElementsByClassName("switch-field input:checked").style.background = 
 "#4400ff";
document.getElementById("fancyswitch2").value=coloor;
	}
	
	function fancyswitch2(){
	coloor=document.getElementById("fancyswitch2").value;
document.getElementsByClassName("active")[0].style.background= coloor;
document.getElementById("fancyswitch").value=coloor;
	}
