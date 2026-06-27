/*
Eve Panzarino(jhankins)
6/27/2026
Assignment 4: Employee Tracker
*/

class Main {
    constructor() {
        this.employees = [
            new Manager("Eve Panzarino", 27, 15),
            new PartTime("Lynn Wiseman", 20, 15, 30),
            new PartTime("Mabel Anddress", 32 ,20 ,20)
        ];

        this.employees.forEach((employee) => employee.calculatePay());
        this.displayEmployees();

        if (typeof prompt === "function") {
            this.showMainMenu();
        }
    }

    showMainMenu = () => {
        let menuChoice = "";

        while (menuChoice !== null) {
            menuChoice = prompt(
                "Main Menu\n" +
                "1. Add Employee\n" +
                "2. Remove Employee\n" +
                "3. Edit Employee\n" +
                "4. Display Employees\n\n" +
                "Enter an option number or name. Press Cancel to exit."
            );

            if (menuChoice === null) {
                console.log("Employee tracker closed.");
                return;
            }

            const choice = menuChoice.trim().toLowerCase();

            if (choice === "1" || choice === "add employee") {
                this.addEmployee();
            } else if (choice === "2" || choice === "remove employee") {
                this.removeEmployee();
            } else if (choice === "3" || choice === "edit employee") {
                this.editEmployee();
            } else if (choice === "4" || choice === "display employees") {
                this.displayEmployees();
            } else {
                this.displayEmployees();
                console.log("Please choose a menu option.");
            }
        }
    };

    addEmployee = () => {
        const employeePrompt = prompt(
            "Enter the employee's name, age, pay rate, and hours per week separated by commas.\n" +
            "Example: Eve Panzarino, 27, 15, 20"
        );

        if (employeePrompt === null) {
            this.displayEmployees();
            return;
        }

        const employeeInfo = employeePrompt.split(",").map((info) => info.trim());
        const [name, ageInput, payRateInput, hoursInput] = employeeInfo;
        const age = Number(ageInput);
        const payRate = Number(payRateInput);
        const hours = Number(hoursInput);

        if (employeeInfo.length !== 4 || name === "" || isNaN(age) || isNaN(payRate) || isNaN(hours)) {
            this.displayEmployees();
            console.log("Employee was not added. Please enter name, age, pay rate, and hours.");
            return;
        }

        const employee = hours >= 40
            ? new Manager(name, age, payRate)
            : new PartTime(name, age, payRate, hours);

        employee.calculatePay();
        this.employees.push(employee);
        this.displayEmployees();
        console.log(`${employee.name} was added.`);

    };

    removeEmployee = () => {
        const employeeChoice = prompt("Enter the employee ID number or name to remove.");

        if (employeeChoice === null) {
            this.displayEmployees();
            return;
        }

        const cleanChoice = employeeChoice.trim();

        if (cleanChoice === "") {
            this.displayEmployees();
            console.log("Employee was not removed. Please enter an ID or name.");
            return;
        }

        if (!isNaN(cleanChoice)) {
            const employeeNumber = Number(cleanChoice);
            const employeeIndex = employeeNumber - 1;

            if (!Number.isInteger(employeeNumber) || employeeIndex < 0 || employeeIndex >= this.employees.length) {
                this.displayEmployees();
                console.log("Employee was not removed. Please enter a valid employee ID.");
                return;
            }

            const removedEmployee = this.employees[employeeIndex];
            this.employees = this.employees.filter((employee, index) => index !== employeeIndex);
            this.displayEmployees();
            console.log(`${removedEmployee.name} was removed.`);
            return;
        }

        const employeeCount = this.employees.length;
        this.employees = this.employees.filter((employee) => employee.name.toLowerCase() !== cleanChoice.toLowerCase());
        this.displayEmployees();

        if (this.employees.length === employeeCount) {
            console.log("Employee was not removed. No matching name was found.");
        } else {
            console.log(`${cleanChoice} was removed.`);
        }

    };

    editEmployee = () => {
        const employeeChoice = prompt("Enter the employee ID number to edit.");

        if (employeeChoice === null) {
            this.displayEmployees();
            return;
        }

        const employeeNumber = Number(employeeChoice.trim());
        const employeeIndex = employeeNumber - 1;

        if (!Number.isInteger(employeeNumber) || employeeIndex < 0 || employeeIndex >= this.employees.length) {
            this.displayEmployees();
            console.log("Employee was not edited. Please enter a valid employee ID.");
            return;
        }

        const newPayRatePrompt = prompt(`Enter the new pay rate for ${this.employees[employeeIndex].name}.`);

        if (newPayRatePrompt === null) {
            this.displayEmployees();
            return;
        }

        const newPayRate = Number(newPayRatePrompt.trim());

        if (isNaN(newPayRate)) {
            this.displayEmployees();
            console.log("Employee was not edited. Please enter a valid pay rate.");
            return;
        }

        this.employees[employeeIndex].payRate = newPayRate;
        this.employees[employeeIndex].calculatePay();
        this.displayEmployees();
        console.log(`${this.employees[employeeIndex].name}'s pay rate was updated.`);

    };

    displayEmployees = () => {
        console.clear();
        console.log("Employees:");
        console.log("ID\tName\tAge\tSalary\thrs\tpay\tFT/PT");

        this.employees.forEach((employee, index) => {
            const hours = employee instanceof Manager ? 40 : employee.hours;

            console.log(`${index + 1}\t${employee.name}\t${employee.age}\t$${employee.annualSalary.toFixed(2)}\t${hours}\t$${employee.payRate.toFixed(2)}\t${employee.employeeType}`);
        });

    };
}

class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.annualSalary = 0;
    }
}

class PartTime extends Employee {
    constructor(name, age, payRate, hours) {
        super(name, age);
        this.payRate = payRate;
        this.hours = hours;
        this.employeeType = "Part Time";
    }

    calculatePay() {
        this.annualSalary = this.payRate * this.hours * 52;
        return this.annualSalary;
    }
}

class Manager extends Employee {
    constructor(name, age, payRate) {
        super(name, age);
        this.payRate = payRate;
        this.employeeType = "Manager";
    }

    calculatePay(hours = 40) {
        const managerHours = Math.max(hours, 40);
        this.annualSalary = (this.payRate * managerHours * 52) - 1000;
        return this.annualSalary;
    }
}

(function () {
    new Main();
})();
