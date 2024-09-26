const studentForm = document.getElementById('studentForm');
const addStudentButton = document.getElementById('addStudentButton');
const updateStudentButton = document.getElementById('updateStudentButton')
let data = [];

// API
async function sendStudentDataToAPI(student, method, url) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        });
        
    } catch (error) {
        console.error('Failed to send student data:', error);
    }
}

// Add Document
async function addDocument() {
    const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;

    if (name && dob && country && city) {
        const student = { name, dob, country, city };
        data.push(student);
        await sendStudentDataToAPI(student, 'POST', 'https://usemongodb.onrender.com/students');
        studentForm.reset();
    } else {
        alert('Please fill out all fields');
    }
}

addStudentButton.addEventListener('click', async () => { 
    await addDocument(); 
    studentList(); 
});

function studentList() {
    fetch('https://usemongodb.onrender.com/students')
        .then(response => response.json())
        .then(data1 => {
            const studentUl = document.getElementById('studentUl');
            studentUl.innerHTML = '';
            data1.forEach((s) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${s.name}, ${s.dob}, ${s.country}, ${s.city}</span>
                    <div>
                        <button class="edit" onclick="updateDocument('${s.name}', '${s.dob}', '${s.country}', '${s.city}')">Update</button>
                        <button class="delete" onclick="deleteStudent('${s.name}')">Delete</button>
                    </div>`;
                studentUl.appendChild(li);
            });
        });
}

async function deleteStudent(studentId) {
    await sendStudentDataToAPI({ name: studentId }, 'DELETE', 'https://usemongodb.onrender.com/students');
    studentList();
}

async function updateDocument(name, dob, country, city)  {

    document.getElementById('name').value = name;
    document.getElementById('dob').value = dob;
    document.getElementById('country').value = country;
    document.getElementById('city').value = city;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    

    updateStudentButton.addEventListener('click',async ()=>{
        const name = document.getElementById('name').value;
    const dob = document.getElementById('dob').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    let updatefield = {};

    if (dob) updatefield.dob = dob;           
    if (country) updatefield.country = country; 
    if (city) updatefield.city = city; 
    await sendStudentDataToAPI({namest: name , update : updatefield}, 'PUT', 'https://usemongodb.onrender.com/updatestudent');
    studentList();
    studentForm.reset();

})        
}
async function findDocument() {
    const searchButton = document.getElementById('searchButton');
    const namest = document.getElementById('searchName').value;  // Get the name from the input field

    const response = await fetch(`https://usemongodb.onrender.com/studentbyname?name=${encodeURIComponent(namest)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    let data2 = await response.json();  // Parse the response data as JSON
    console.log(data2);  // Log the data

    if (data2.length > 0) {
        let searchResult = document.getElementById('searchResult');
        searchResult.innerHTML = '';  // Clear previous search results

        data2.forEach(e => {
            searchResult.innerHTML += `<strong>Name:</strong> ${e.name}<br>
            <strong>Date of Birth:</strong> ${e.dob}<br>
            <strong>Country:</strong> ${e.country}<br>
            <strong>City:</strong> ${e.city}<br><br>`;
        });
    } else {
        searchResult.innerHTML = 'No student found with that name.';
    }
}

searchButton.addEventListener('click', async () => findDocument());


// Initial call to load student list
studentList();
