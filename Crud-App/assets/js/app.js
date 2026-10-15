
const form = document.querySelector("#student-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const studentList = document.querySelector("#student-list");
const submitBtn = document.querySelector("#submit-btn");

let students = [];
let editIndex = null;

// Read: Display students
const displayStudents = () => {
    studentList.innerHTML = "";

    students.forEach((student, index) => {
        studentList.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.email}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">
                        Edit
                    </button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
};

// Create and Update
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const student = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim()
    };

    if (editIndex === null) {
        students.push(student);
    } else {
        students[editIndex] = student;
        editIndex = null;
        submitBtn.textContent = "Add Student";
    }

    form.reset();
    displayStudents();
});

// Edit: Load student data into inputs
const editStudent = (index) => {
    nameInput.value = students[index].name;
    emailInput.value = students[index].email;

    editIndex = index;
    submitBtn.textContent = "Update Student";
};

// Delete: Remove student
const deleteStudent = (index) => {
    students.splice(index, 1);

    if (editIndex === index) {
        editIndex = null;
        form.reset();
        submitBtn.textContent = "Add Student";
    } else if (editIndex !== null && editIndex > index) {
        editIndex--;
    }

    displayStudents();
};
