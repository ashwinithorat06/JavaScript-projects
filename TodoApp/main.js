	var  current_item;
	//deleting row from to do list
	function dlt(ele){
		ele.parentNode.parentElement.remove();
	}

	//adding new item in the list
	function additem(){
		var new_item=document.getElementById("addtext").value;
		var get_table=document.getElementById("mytable");
		console.log(get_table);
		if(new_item==""){
			alert("please enter task to do.");
		}
		else{
			var addrow=get_table.insertRow(-1);
			addrow.insertCell().innerHTML="<td><input type='checkbox' checked id='complete' disabled></td> ";
			addrow.insertCell().innerHTML="<td class='todo_item'>"+new_item+"<span id='description_set'></span><span id='date_set'></span><span id='time_set'></span></td>"
			//calling edit function
			addrow.insertCell().innerHTML="<td><button id='edit' onclick='edit(this);'class='btn'><i class='fas fa-pencil-alt'></i></button></td>";
			//delete function call
			addrow.insertCell().innerHTML="<td><button id='delete' onclick='dlt(this);' class='btn'><i class='fas fa-times'></i></button></td>";
			new_item="";
			document.getElementById("addtext").value=null;
		}
	} 

	//edit info function
	function edit(ele){
		current_item=ele;
		var gettask=ele.parentElement.previousElementSibling.textContent;	
		// console.log(gettask);
		var settasktitle=document.getElementById("tasktitle").textContent="Reminder For "+gettask;
		console.log(settasktitle);
		//console.log(gettask);
		document.getElementById("filter").style.visibility="hidden";
		var form=document.getElementById("todoform");
		form.style.visibility="visible";
		var table=document.getElementById("mytable");
		table.style.visibility="hidden";
		//hiding the add item 
		var hideadd=document.getElementById("additem");
		hideadd.style.display="none";
		form.childNodes[1].childNodes[3].value="";
		form.childNodes[1].childNodes[6].value="";
		form.childNodes[1].childNodes[9].value="";
	}

	//all todo list 
	function showall(){
		var tableData=document.getElementById("mytable").getElementsByTagName("tbody")[0].children;
		for(var i=0;i<tableData.length;i++){
			tableData[i].style.visibility="visible";
			tableData[i].style.position="relative";
		}
	}
	
    // completed todo list
    function showcompleted(){
    var table_Data=document.getElementById("mytable").getElementsByTagName("tbody")[0].children;
		for(var i=0;i<table_Data.length;i++){
			var z=table_Data[i].style.backgroundColor;
    		if(z=="gray"){
    			table_Data[i].style.visibility="visible";
    			table_Data[i].style.position="relative";
    		}
    		else{
    			table_Data[i].style.visibility="hidden";
    			table_Data[i].style.position="absolute";
    		}
    	}
	}
	
    // incomplete todo list
    function showincomplete(){
    	var incompleteTableData=document.getElementById("mytable").getElementsByTagName("tbody")[0].children;
		for(var i=0;i<incompleteTableData.length;i++){
    		var z=incompleteTableData[i].style.backgroundColor;
    		if(z=="gray")
			{
    			incompleteTableData[i].style.visibility="hidden";
    			incompleteTableData[i].style.position="absolute";
    			console.log(incompleteTableData[i].firstElementChild.childNodes)
    			incompleteTableData[i].style.zIndex="-1";	
			}
    		else{
    			incompleteTableData[i].style.visibility="visible";
    			incompleteTableData[i].style.position="relative";
    		}
		}
    }

	//search the inputed reminder
	function searchme(){
		var get_text=document.getElementById("search_text").value;
		var access_table=document.getElementById("mytable").getElementsByTagName("tbody")[0].children;
		console.log(access_table.length);
		for(var i=0;i<access_table.length;i++){
			var iter=access_table[i].firstElementChild.nextElementSibling.textContent;
			//console.log(iter);
			var n=iter.search(get_text);
			if(n>=0){
				access_table[i].style.visibility="visible";
			}
			else{
				access_table[i].style.visibility="hidden";
				access_table[i].style.position="absolute";
			}
			console.log(n);
		}
	}

	// view the reminders date time and description
	function viewme(ele)
	{
		var viewer=ele.parentElement.previousElementSibling.previousElementSibling.childNodes;
		alert("description :"+viewer[1].textContent+"\n Date :"+viewer[2].textContent+"\n Time:"+viewer[3].textContent);
	}

	//update the reminder items
	function updateme(ele){
		var get_old_details=ele.parentElement.previousElementSibling.childNodes;
		console.log(ele.parentElement.previousElementSibling.previousElementSibling.childNodes);
		var name=get_old_details[0];
		console.log(name);
		var a=get_old_details[1];
		console.log(a);
		var b=get_old_details[2];
		console.log(b);
		var c=get_old_details[3];
		console.log(c);
		for(var i=1;i<=3;i++)
		{
			get_old_details[i].textContent=prompt("description :",get_old_details[i].textContent);
		}
	}

	//saving data inside do to item like description, date ,time etc
	function setall(){
		document.getElementById("filter").style.visibility="visible";
		var time=document.getElementById("time").value;
		var description=document.getElementById("description").value;
		var date=document.getElementById("date").value;
		if(time!==""||description!==""||date!==""){
			var x=window.confirm("Description :"+description+" date:"+date+" time:"+time);
			if(x==true){
				console.log(current_item)
				current_item.parentNode.previousElementSibling.childNodes[1].textContent=description;
				current_item.parentNode.previousElementSibling.childNodes[2].textContent=date;
				current_item.parentNode.previousElementSibling.childNodes[3].textContent=time;
				var form=document.getElementById("todoform");
				form.style.visibility="hidden";
				var table=document.getElementById("mytable");
				table.style.visibility="visible";
				var hideadd=document.getElementById("additem");
				hideadd.style.display="block";
				current_item.parentElement.parentElement.style.backgroundColor="gray";
				current_item.parentElement.parentElement.style.color="white";
				current_item.parentElement.previousElementSibling.previousElementSibling.firstElementChild.style.visibility="visible";
				current_item.parentElement.previousElementSibling.previousElementSibling.firstElementChild.style.color="green !important";
				var parent_for_update=current_item.parentElement;
				var parent_for_view=current_item.parentElement.nextElementSibling;
				parent_for_view.removeChild(parent_for_view.childNodes[0]);
				//calling view function
				parent_for_view.innerHTML='<button id="view" onclick="viewme(this);" class="btn">View</button></td>';
				parent_for_update.removeChild(parent_for_update.childNodes[0]);
				//calling update function
				parent_for_update.innerHTML='<button id="update" onclick="updateme(this);" class="btn">Update</button></td>';	
			}
			else{
				alert("please fill up all fields");
			}
		}
	}

	//go back to main page
	function backme(){
		var form=document.getElementById("todoform");
		form.style.visibility="hidden";
		var table=document.getElementById("mytable");
		table.style.visibility="visible";
		var hideadd=document.getElementById("additem");
		hideadd.style.display="block";
		document.getElementById("filter").style.visibility="visible";
	}