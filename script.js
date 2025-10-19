function showSection(sectionId){
    const sections=document.querySelectorAll(".form-section");
    sections.forEach(sec=>sec.style.display="none");
    document.getElementById(sectionId).style.display="block";
}
showSection('personal');

// Generate 6-digit ID card number
function generateIdCard(){
    let students=JSON.parse(localStorage.getItem("students"))||[];
    let maxId=100000;
    if(students.length>0){
        const ids=students.map(s=>parseInt(s.idCardNumber));
        maxId=Math.max(...ids)+1;
    }
    return maxId;
}

// Generate Roll Number (YYMMDD + unique)
function generateRollNumber(){
    let date=new Date();
    let yy=date.getFullYear().toString().slice(-2);
    let mm=("0"+(date.getMonth()+1)).slice(-2);
    let dd=("0"+date.getDate()).slice(-2);
    let students=JSON.parse(localStorage.getItem("students"))||[];
    let uniqueNum=students.length+1;
    let roll=yy+mm+dd+("00000"+uniqueNum).slice(-6);
    return roll;
}

// Render table
function renderTable(){
    const students=JSON.parse(localStorage.getItem("students"))||[];
    const tbody=document.querySelector("#studentTable tbody");
    tbody.innerHTML="";
    students.forEach((s,index)=>{
        const tr=document.createElement("tr");
        tr.innerHTML=`
            <td>${s.idCardNumber}</td>
            <td>${s.firstName} ${s.middleName} ${s.lastName}</td>
            <td>${s.rollNumber}</td>
            <td>${s.classSelect||"-"}</td>
            <td>${s.attendancePercent||"-"}</td>
            <td>${s.feePaid||"-"}</td>
            <td>${s.feePending||"-"}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})" class="delete-btn">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Add / Save student
document.getElementById("studentForm").addEventListener("submit", function(e){
    e.preventDefault();
    const students=JSON.parse(localStorage.getItem("students"))||[];
    
    const student={
        firstName: document.getElementById("firstName").value||"-",
        middleName: document.getElementById("middleName").value||"-",
        lastName: document.getElementById("lastName").value||"-",
        fatherName: document.getElementById("fatherName").value||"-",
        fatherOccupation: document.getElementById("fatherOccupation").value||"-",
        motherName: document.getElementById("motherName").value||"-",
        motherOccupation: document.getElementById("motherOccupation").value||"-",
        dob: document.getElementById("dob").value||"-",
        gender: document.getElementById("gender").value||"-",
        bloodGroup: document.getElementById("bloodGroup").value||"-",
        religion: document.getElementById("religion").value||"-",
        caste: document.getElementById("caste").value||"-",
        nationality: document.getElementById("nationality").value,
        contact: document.getElementById("contact").value||"-",
        email: document.getElementById("email").value||"-",
        whatsapp: document.getElementById("sameWhatsapp").checked ? document.getElementById("contact").value : document.getElementById("whatsapp").value||"-",
        emergency: document.getElementById("sameEmergency").checked ? document.getElementById("contact").value : document.getElementById("emergency").value||"-",
        studentID: document.getElementById("studentID").value||"-",
        idCardNumber: generateIdCard(),
        classSelect: document.getElementById("classSelect").value||"-",
        rollNumber: generateRollNumber(),
        academicYear: document.getElementById("academicYear").value||"-",
        attendancePercent: document.getElementById("attendancePercent").value||"-",
        feePaid: document.getElementById("feePaid").value||"-",
        feePending: document.getElementById("feePending").value||"-"
    };

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
    document.getElementById("studentForm").reset();
    showSection("personal");
});

// Delete student
function deleteStudent(index){
    const students=JSON.parse(localStorage.getItem("students"))||[];
    students.splice(index,1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
}

// Edit student
function editStudent(index){
    const students=JSON.parse(localStorage.getItem("students"))||[];
    const s=students[index];
    
    document.getElementById("firstName").value=s.firstName;
    document.getElementById("middleName").value=s.middleName;
    document.getElementById("lastName").value=s.lastName;
    document.getElementById("fatherName").value=s.fatherName;
    document.getElementById("fatherOccupation").value=s.fatherOccupation;
    document.getElementById("motherName").value=s.motherName;
    document.getElementById("motherOccupation").value=s.motherOccupation;
    document.getElementById("dob").value=s.dob;
    document.getElementById("gender").value=s.gender;
    document.getElementById("bloodGroup").value=s.bloodGroup;
    document.getElementById("religion").value=s.religion;
    document.getElementById("caste").value=s.caste;
    document.getElementById("contact").value=s.contact;
    document.getElementById("email").value=s.email;
    document.getElementById("whatsapp").value=s.whatsapp;
    document.getElementById("emergency").value=s.emergency;
    document.getElementById("studentID").value=s.studentID;
    document.getElementById("classSelect").value=s.classSelect;
    document.getElementById("academicYear").value=s.academicYear;
    document.getElementById("attendancePercent").value=s.attendancePercent;
    document.getElementById("feePaid").value=s.feePaid;
    document.getElementById("feePending").value=s.feePending;

    // Remove old student
    students.splice(index,1);
    localStorage.setItem("students", JSON.stringify(students));
    showSection("personal");
    renderTable();
}

// Search Student
function searchStudent(){
    const input=document.getElementById("searchInput").value.toLowerCase();
    const students=JSON.parse(localStorage.getItem("students"))||[];
    const tbody=document.querySelector("#studentTable tbody");
    tbody.innerHTML="";
    students.filter(s=>
        s.firstName.toLowerCase().includes(input) ||
        s.rollNumber.includes(input) ||
        s.classSelect.includes(input)
    ).forEach((s,index)=>{
        const tr=document.createElement("tr");
        tr.innerHTML=`
            <td>${s.idCardNumber}</td>
            <td>${s.firstName} ${s.middleName} ${s.lastName}</td>
            <td>${s.rollNumber}</td>
            <td>${s.classSelect||"-"}</td>
            <td>${s.attendancePercent||"-"}</td>
            <td>${s.feePaid||"-"}</td>
            <td>${s.feePending||"-"}</td>
            <td>
                <button onclick="editStudent(${index})">Edit</button>
                <button onclick="deleteStudent(${index})" class="delete-btn">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Initial render
renderTable();