let employee1 = new Employee(
    "123456",
    "Nguyễn Văn A",
    "a@gmail.com",
    "Abc@123",
    "11/10/2026",
    10000000,
    "Giám đốc",
    192
);

console.log(employee1);

let employee2 = new Employee(
    "123457",
    "Nguyễn Văn B",
    "b@gmail.com",
    "Bcd@123",
    "11/10/2026",
    12000000,
    "Trưởng phòng",
    176
);

console.log(employee2);

let employee3 = new Employee(
    "123458",
    "Nguyễn Văn C",
    "c@gmail,com",
    "Cde@123",
    "11/10/2026",
    9000000,
    "Nhân viên",
    150
);
console.log(employee3);

let employeeList = [];

// Kiểm tra chế độ chỉnh sửa
let isEditing = false;
let editingAccount = null;

employeeList.push(employee1);
employeeList.push(employee2);
employeeList.push(employee3);

loadEmployeeList();

console.log(employeeList);

function renderEmployeeList(list = employeeList) {

    let content = "";

    for (let employee of list) {

        content += `
            <tr>
                <td class="p-4">${employee.account}</td>
                <td class="p-4">${employee.name}</td>
                <td class="p-4">${employee.email}</td>
                <td class="p-4">${employee.position}</td>
                <td class="p-4">${employee.totalSalary}</td>
                <td class="p-4">${employee.employeeType}</td>
                
<td class="p-4">
    <td class="p-4">
    <button
        onclick="editEmployee('${employee.account}')"
        class="px-3 py-1 bg-blue-600 text-white rounded-lg"
    >
        Sửa
    </button>

    <button
        onclick="deleteEmployee('${employee.account}')"
        class="px-3 py-1 bg-red-600 text-white rounded-lg"
    >
        Xóa
    </button>
</td>

            </tr>
        `;
    }

    document.getElementById("employeeList").innerHTML = content;
}

renderEmployeeList();

for (let employee of employeeList) {

    employee.tinhTongLuong();

    employee.xepLoai();

}

renderEmployeeList();


function deleteEmployee(account) {

    // Tìm vị trí nhân viên
    let index = employeeList.findIndex(
        employee => employee.account === account
    );

    // Kiểm tra nhân viên có tồn tại không
    if (index !== -1) {

        // Xóa nhân viên khỏi mảng
        employeeList.splice(index, 1);

        saveEmployeeList();

        // Cập nhật lại bảng
        renderEmployeeList();

        alert("Xóa nhân viên thành công!");
    }
}

function editEmployee(account) {

    // Tìm nhân viên cần chỉnh sửa
    let employee = employeeList.find(
        employee => employee.account === account
    );

    if (employee) {

        isEditing = true;
editingAccount = account;
        console.log(employee);

        accountInput.value = employee.account;
nameInput.value = employee.name;
emailInput.value = employee.email;
passwordInput.value = employee.password;
dateInput.value = employee.date;
salaryInput.value = employee.salary;
positionInput.value = employee.position;
workingHoursInput.value = employee.workingHours;

document.getElementById("employeeModal")
    .classList.remove("hidden");
    }
}

// Lấy các phần tử từ HTML
let accountInput = document.getElementById("account");
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let dateInput = document.getElementById("date");
let salaryInput = document.getElementById("salary");
let positionInput = document.getElementById("position");
let workingHoursInput = document.getElementById("workingHours");

console.log(nameInput);
console.log(nameInput.value);


function addEmployee() {

    // 1. Lấy dữ liệu từ Form
    let account = accountInput.value.trim();
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let password = passwordInput.value;
    let date = dateInput.value;
    let salary = salaryInput.value;
    let position = positionInput.value;
    let workingHours = workingHoursInput.value;



    // 2. Kiểm tra Validation

    if (!validateAccount(account)) {
        alert("Tài khoản phải có từ 4 - 6 chữ số!");
        return;
    }

    if (employeeList.some(
    emp => emp.account === account && emp.account !== editingAccount
)) {
    console.log("isEditing:", isEditing);
    console.log("editingAccount:", editingAccount);
    alert("Tài khoản nhân viên đã tồn tại");
    return;
}

    if (!validateName(name)) {
        alert("Họ tên không hợp lệ!");
        return;
    }

    if (!validateEmail(email)) {
        alert("Email không đúng định dạng!");
        return;
    }

    if (!validatePassword(password)) {
        alert("Mật khẩu phải có 6 - 10 ký tự, gồm chữ hoa, số và ký tự đặc biệt!");
        return;
    }

    if (!validateDate(date)) {
        alert("Ngày làm không hợp lệ!");
        return;
    }

    if (!validateSalary(salary)) {
        alert("Lương phải từ 1.000.000 đến 20.000.000!");
        return;
    }

    if (!validatePosition(position)) {
        alert("Vui lòng chọn chức vụ hợp lệ!");
        return;
    }

    if (!validateWorkingHours(workingHours)) {
        alert("Giờ làm phải từ 80 đến 200 giờ!");
        return;
    }

    // 3. Tạo đối tượng nhân viên
    let employee = new Employee(
        account,
        name,
        email,
        password,
        date,
        Number(salary),
        position,
        Number(workingHours)
    );

    // 4. Tính lương và xếp loại
    employee.tinhTongLuong();
    employee.xepLoai();

   // 5. Thêm mới hoặc cập nhật nhân viên

if (isEditing) {
    // Tìm vị trí nhân viên cũ
    let index = employeeList.findIndex(
        emp => emp.account === editingAccount
    );

    // Cập nhật thông tin nhân viên
    if (index !== -1) {
        employeeList[index] = employee;
    }

    alert("Cập nhật nhân viên thành công!");

} else {
    // Thêm nhân viên mới
    employeeList.push(employee);

    alert("Thêm nhân viên thành công!");
}

// 6. Lưu dữ liệu
saveEmployeeList();

// 7. Cập nhật bảng
renderEmployeeList();

// 8. Đặt lại chế độ
isEditing = false;
editingAccount = null;

// 9. Đóng Form
document.getElementById("employeeModal")
    .classList.add("hidden");

console.log(employeeList);
}

function validateAccount(account) {
    let regex = /^\d{4,6}$/;

    return regex.test(account);
}
console.log(validateAccount("123456"));
console.log(validateAccount("123"));
console.log(validateAccount("ABC123"));
 
function validateName(name) {
    let regex = /^[\p{L}]+(?:\s[\p{L}]+)*$/u;

    return regex.test(name.trim());
}

console.log(validateName("Nguyễn Văn A"));
console.log(validateName("Hoàng Đạo"));
console.log(validateName("Nguyen123"));
console.log(validateName(""));


function validateEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);
}

console.log(validateEmail("abc@gmail.com"));
console.log(validateEmail("minh@yahoo.com"));
console.log(validateEmail("abcgmail.com"));
console.log(validateEmail("abc@"));
console.log(validateEmail("abc gmail@gmail.com"));


function validatePassword(password) {
    let regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{6,10}$/;

    return regex.test(password);
}


console.log(validatePassword("Abc@123"));
console.log(validatePassword("abcdef"));
console.log(validatePassword("ABC123"));
console.log(validatePassword("Ab@1"));
console.log(validatePassword("Abcdef@12345"));


function validateDate(date) {
    if (date === "") {
        return false;
    }

    let selectedDate = new Date(date);

    return !isNaN(selectedDate.getTime());
}

console.log(validateDate("2026-11-12"));
console.log(validateDate(""));
console.log(validateDate("abc"));


function validateSalary(salary) {
    let number = Number(salary);

    return salary !== "" &&
           Number.isFinite(number) &&
           number >= 1000000 &&
           number <= 20000000;
}

console.log(validateSalary(5000000));
console.log(validateSalary(1000000));
console.log(validateSalary(20000000));
console.log(validateSalary(500000));
console.log(validateSalary(""));


function validatePosition(position) {
    let validPositions = [
        "Giám đốc",
        "Trưởng phòng",
        "Nhân viên"
    ];

    return validPositions.includes(position);
}

console.log(validatePosition("Giám đốc"));
console.log(validatePosition("Trưởng phòng"));
console.log(validatePosition("Nhân viên"));
console.log(validatePosition("Kế toán"));
console.log(validatePosition(""));


function validateWorkingHours(hours) {
    let number = Number(hours);

    return hours !== "" &&
           Number.isFinite(number) &&
           number >= 80 &&
           number <= 200;
}

console.log(validateWorkingHours(80));
console.log(validateWorkingHours(160));
console.log(validateWorkingHours(200));
console.log(validateWorkingHours(50));
console.log(validateWorkingHours(250));
console.log(validateWorkingHours(""));

function saveEmployeeList() {
    localStorage.setItem(
        "employeeList",
        JSON.stringify(employeeList)
    );
}

function loadEmployeeList() {

    let data = localStorage.getItem("employeeList");

    if (data) {
        employeeList = JSON.parse(data).map(item =>
            new Employee(
                item.account,
                item.name,
                item.email,
                item.password,
                item.date,
                item.salary,
                item.position,
                item.workingHours
            )
        );
    }
}

function filterEmployeeByType() {

    // Lấy loại nhân viên được chọn
    let type = document.getElementById("employeeTypeFilter").value;

    // Lọc nhân viên
    let result = employeeList.filter(employee =>
        employee.employeeType === type
    );

    // Hiển thị kết quả
    if (type === "") {
        renderEmployeeList();
    } else {
        renderEmployeeList(result);
    }
}


function searchEmployee() {

    // 1. Lấy từ khóa tìm kiếm
    let keyword = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();

    // 2. Lấy xếp loại được chọn
    let type = document
        .getElementById("employeeTypeFilter")
        .value;

    // 3. Lọc nhân viên theo tên và xếp loại
    let result = employeeList.filter(employee => {

        let matchName = employee.name
            .toLowerCase()
            .includes(keyword);

        let matchType = type === "" ||
            employee.employeeType === type;

        return matchName && matchType;
    });

    // 4. Hiển thị kết quả
    renderEmployeeList(result);

}

// Lọc nhân viên tự động khi thay đổi xếp loại
document
    .getElementById("employeeTypeFilter")
    .addEventListener("change", searchEmployee);

