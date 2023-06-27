
const endpoint= "http://0.0.0.0:4321/"
apiCallPullDataToTable()

function checkWorkDesc(){
        data=document.getElementById("WorkDesc").value
        if(data==""){
        alert("Please add description")
        return
    }else
    upDateDB()
}
async function upDateDB(){
  workDesc=document.getElementById("WorkDesc").value;
  payload = {method: "POST",headers: {'Content-Type': 'application/json'},body: JSON.stringify({desc: workDesc})};
  resp = await fetch(endpoint, payload);
  data= await resp.json();
  console.log( data);
}


async function getDB(){
    resp = await fetch(endpoint,{method: "GET"});
    data= await resp.json();
    return data;
}

function jello(ele){ele.classList.add('jello-horizontal');}
function jelloRemove(ele){ele.classList.remove("jello-horizontal");}

async function apiCallPullDataToTable() {
    try{
        const rawData = await getDB();
        const jsonData = JSON.parse(rawData); // Parse the JSON string to convert it into an array
        console.log(jsonData.dataAdded)
        for (let key in jsonData.dataAdded) {addRow(key, jsonData.dataAdded[key]);}
        }
        catch(error){
            alert('Error:Check if the Server is Running')
            console.log("Error: "+error);
        }
}
async  function addRow(slNo,Work){
               tableRow = document.getElementById("currentStackTable");
               cellClass="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200";
               row = tableRow.insertRow(-1);
               cell1 = row.insertCell(-1);
               cell1.setAttribute("class", cellClass);
               cell1.innerHTML = slNo;

               cell2 = row.insertCell(-1);
               cell2.setAttribute("class", cellClass);
               cell2.innerHTML = Work;

             cell3 = row.insertCell(-1);
               cell3.setAttribute("class", cellClass);
               btn=getDeleteButton(slNo,"delete_")
             cell3.appendChild(btn);
               }

    function getDeleteButton(id,prefix=""){
              dBtn = document.createElement("a");
              delClass="text-blue-500 hover:text-blue-700";
              dBtn.innerHTML = "delete";
              dBtn.setAttribute("class", delClass);
              dBtn.setAttribute("id", prefix+id);
              dBtn.setAttribute("onclick", "deleteRecord(this)");
              return dBtn;
    }

async function deleteRecord(ele){
  payload={method:"POST"}
  data=await fetch(endpoint+"delete/"+ele.id.split("_")[1], payload)
  console.log(data)
  document.getElementById("currentStackTable").deleteRow(this.id);
}


