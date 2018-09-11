


var ddlcategories = document.getElementById('ddlcategories');
var ddlforces = document.getElementById('ddlforce');
var div_Error = document.getElementById('div_Error');
var tbodydata = document.getElementById('tbodydata');
var tblcrime = document.getElementById('tblcrime');




/// fetech data for crime and set te dropdown
fetch("https://data.police.uk/api/crime-categories")
    .then(response => response.json())
    .then(JsonData => load_Categories(JsonData))


/// fetech data for force and set te dropdown

fetch("https://data.police.uk/api/forces")
    .then(response => response.json())
    .then(JsonData => Load_forces(JsonData))







function FetchCrimeReportData() {
    var crimeRef = document.getElementById("ddlcategories");
    var strUserCrime = crimeRef.options[crimeRef.selectedIndex].value;

    var forceRef = document.getElementById("ddlforce");
    var strUserForce = forceRef.options[forceRef.selectedIndex].value;
    var crimeType = crimeRef.value;
    var force = forceRef.value;

    fetch(`https://data.police.uk/api/crimes-no-location?category=${crimeType}&force=${force}`)
        .then(res => res.json())
        .then(myJson => crimes(myJson))
}




// load crime categoreis dropdown
function load_Categories(JsonData) {
    for (var i = 0; i < JsonData.length; i++) {
        ddlcategories.innerHTML += `<option value="${JsonData[i].url}">${JsonData[i].name}</option>`;
    }
}   

// load force categoreis dropdown
function Load_forces(JsonData) {
    for (var i = 0; i < JsonData.length; i++) {
        ddlforces.innerHTML += `<option value="${JsonData[i].id}">${JsonData[i].name}</option>`;
    }
}


function crimes(myJson) {
    div_Error.innerHTML = '';

    if (myJson.length !== 0) {
        for (var i = 0; i < myJson.length; i++) {
            tblcrime.style.visibility = 'visible';
            tbodydata.innerHTML += `
                <tr>
                    <td>${i+1}</td>
                    <td>${myJson[i].id}</td>
                    <td>${myJson[i].category}</td>
                    <td>${myJson[i].month}</td>
                </tr>`;                             

        }
    }
    else {
        tblcrime.style.visibility = 'hidden';
        tbodydata.innerHTML = " ";
        div_Error.innerHTML = "Cirminal Record Not Found";

    }
}