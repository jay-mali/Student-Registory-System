// Get the studentRecords table body where student records will be displayed
const studentRecords = document.getElementById('studentRecords');

// Load student records from local storage when the page loads
window.onload = () => {
    const savedStudents = JSON.parse(localStorage.getItem('students')) || []; // Retrieve stored students or initialize an empty array
    if (savedStudents.length === 0) {
        studentRecords.innerHTML = '<tr><td colspan="5">No registered students yet</td></tr>'; // Show message if no students are found
    } else {
        savedStudents.forEach(addStudentToTable); // Add each student to the table
    }
    addVerticalScrollbar(); // Add scrollbar if needed
};

// Function to add a student row to the table
function addStudentToTable(student) {
    const newRow = document.createElement('tr'); // Create a new table row

    // Fill the row with student data and action buttons
    newRow.innerHTML = `
        <td>${student.studentName}</td>
        <td>${student.studentID}</td>
        <td>${student.emailID}</td>
        <td>${student.contactNo}</td>
        <td>
            <button onclick="editStudent(this)">Edit</button>
            <button onclick="deleteStudent(this)">Delete</button>
        </td>
    `;
    studentRecords.appendChild(newRow); // Add the row to the table body
}

// Function to edit a student's record
function editStudent(button) {
    const row = button.parentNode.parentNode; // Get the table row of the clicked button
    const studentName = prompt('Edit Student Name', row.cells[0].textContent); // Prompt user to edit name
    const studentID = prompt('Edit Student ID', row.cells[1].textContent); // Prompt user to edit ID
    const emailID = prompt('Edit Email ID', row.cells[2].textContent); // Prompt user to edit email
    const contactNo = prompt('Edit Contact No', row.cells[3].textContent); // Prompt user to edit contact number

    // Validate inputs before saving
    if (validateInputs(studentName, studentID, emailID, contactNo)) {
        row.cells[0].textContent = studentName; // Update the row with new name
        row.cells[1].textContent = studentID;   // Update the row with new ID
        row.cells[2].textContent = emailID;     // Update the row with new email
        row.cells[3].textContent = contactNo;   // Update the row with new contact number
        updateLocalStorage(); // Save the updated records to local storage
    }
}

// Function to delete a student record
function deleteStudent(button) {
    if (confirm('Are you sure you want to delete this record?')) {
        const row = button.parentNode.parentNode; // Get the table row of the clicked button
        row.remove(); // Remove the row from the table
        updateLocalStorage(); // Update local storage after deletion
    }
}

// Update local storage with the latest student records
function updateLocalStorage() {
    const students = [];
    document.querySelectorAll('#studentRecords tr').forEach((row) => {
        students.push({
            studentName: row.cells[0].textContent,
            studentID: row.cells[1].textContent,
            emailID: row.cells[2].textContent,
            contactNo: row.cells[3].textContent
        });
    });
    localStorage.setItem('students', JSON.stringify(students)); // Save updated student list
}

// Function to validate inputs (same as in ass1.js)
function validateInputs(studentName, studentID, emailID, contactNo) {
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactRegex = /^[0-9]{10}$/;

    if (!studentName || !nameRegex.test(studentName)) {
        alert('Please enter a valid name.');
        return false;
    }
    if (!studentID || isNaN(studentID)) {
        alert('Please enter a valid Student ID.');
        return false;
    }
    if (!emailID || !emailRegex.test(emailID)) {
        alert('Please enter a valid Email ID.');
        return false;
    }
    if (!contactNo || !contactRegex.test(contactNo)) {
        alert('Please enter a valid Contact No.');
        return false;
    }
    return true;
}

// Function to add a vertical scrollbar if there are many student records
function addVerticalScrollbar() {
    const tableContainer = document.getElementById('tableContainer');
    const maxHeight = 300; // Set the maximum height for the table container
    if (tableContainer.scrollHeight > maxHeight) {
        tableContainer.style.overflowY = 'scroll'; // Add vertical scrollbar if content exceeds max height
        tableContainer.style.maxHeight = `${maxHeight}px`; // Limit height to 300px
    }
}
