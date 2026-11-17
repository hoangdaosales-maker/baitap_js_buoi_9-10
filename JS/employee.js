
class Employee {
    constructor(account, name, email, password, date, salary, position, workingHours) {

        this.account = account;
        this.name = name;
        this.email = email;
        this.password = password;
        this.date = date;
        this.salary = salary;
        this.position = position;
        this.workingHours = workingHours;

        this.totalSalary = 0;
        this.employeeType = "";
    }

    tinhTongLuong() {

    if (this.position === "Giám đốc") {
        this.totalSalary = this.salary * 3;
    }
    else if (this.position === "Trưởng phòng") {
        this.totalSalary = this.salary * 2;
    }
    else {
        this.totalSalary = this.salary;
    }

}
xepLoai() {

    if (this.workingHours >= 192) {
        this.employeeType = "Xuất sắc";
    }
    else if (this.workingHours >= 176) {
        this.employeeType = "Giỏi";
    }
    else if (this.workingHours >= 160) {
        this.employeeType = "Khá";
    }
    else {
        this.employeeType = "Trung bình";
    }

}

}
