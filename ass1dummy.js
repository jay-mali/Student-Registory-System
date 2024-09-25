// Get the form by its ID
const form = document.getElementById('registrationForm');

// Add new student record when form is submitted
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Retrieve user input
    const studentName = form.studentName.value.trim();
    const studentID = form.studentID.value.trim();
    const emailID = form.emailID.value.trim();
    const contactNo = form.contactNo.value.trim();

    // Validate input and save
    if (validateInputs(studentName, studentID, emailID, contactNo)) {
        const student = { studentName, studentID, emailID, contactNo };
        saveStudent(student); // Save student data to local storage
        form.reset(); // Reset the form after submission
    }
});

// Function to save student data in local storage
function saveStudent(student) {
    const students = JSON.parse(localStorage.getItem('students')) || []; // Retrieve existing students or start with an empty array
    students.push(student); // Add new student to array
    localStorage.setItem('students', JSON.stringify(students)); // Save the updated student array
}

// Validate form input before submission
function validateInputs(studentName, studentID, emailID, contactNo) {
    const nameRegex = /^[A-Za-z\s]+$/; // Name should only contain letters and spaces
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    const contactRegex = /^[0-9]{10}$/; // Contact number should be exactly 10 digits

    // Validate each field
    if (!studentName || !nameRegex.test(studentName)) {
        alert('Please enter a valid name (letters only).');
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
        alert('Please enter a valid Contact No (10 digits).');
        return false;
    }
    return true; // Return true if all inputs are valid
}
