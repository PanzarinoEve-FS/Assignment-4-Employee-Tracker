/*
Eve Panzarino(jhankins)
6/27/2026
Assignment 4: Employee Tracker
*/
// Create a Main class that contains the majority of the logic. 
class Main {
    constructor() {
        // 3 employees are hard coded initially. 
        // Make sure the output is displayed showing those 3 employees when program starts along with the 4 menu options.
        // An array is used to hold all employee instances.
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
// Main Menu
    showMainMenu = () => {
        let menuChoice = "";
// prompt to select a menu item
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
// if menu item chosen run the function associated with that menu item
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

// Each menu option functionality is coded in its own function in the Main Class.

// Add Employee - Adds an employee to the table. 
// This option will prompt the user with the name, age, payrate and number of hours per week. 
// Depending on the number of hours worked, a part time or manager employee is then instantiated and added to the employee's array. 
// Once added, display the updated information in the console. 
// Hint: Use the Array split() method to convert the string prompt to an array.
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
// Remove Employee - Removes the desired employee from the employees array. 
// This must be done by the employee number shown on the table in the console and also by typing the name of the employee. 
// Once removed, display the updated employee information in the console. 
// Hint: Use the filter() method to help you remove the employee by its name. 
// Check out the isNan function. This may help you in figuring out if what you type is a number or a string.
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
            // A filter() method is used to delete an employee
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
// Edit Employee - This option will allow to edit the payrate only for the chosen employee. 
// For this option, you can just select the employee you want to edit by its employee number on the table shown in the console. 
// Make sure the employee number starts at 1 in the console. 
// Once edited, then display the updated employee information in the console.
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
// Display Employees - Display the employee's information in the console. 
// The Employee number(starting with 1), name, age, salary, hours, pay, and employee type is shown for each employee. 
// Have a console.log() to show the column headers using tabs "\t" such as:
// Console.Log() is used to display the employees in the console.
    displayEmployees = () => {
        // Invoke a console.clear() to clear the console before information is displayed
        console.clear();
        console.log("Employees:");
        console.log("ID\tName\tAge\tSalary\thrs\tpay\tFT/PT");
// Nice use of tabs in the console.
// Employee number starting at 1 not 0
// The Data that is shown for each employee.
        this.employees.forEach((employee, index) => {
            const hours = employee instanceof Manager ? 40 : employee.hours;

            console.log(`${index + 1}\t${employee.name}\t${employee.age}\t$${employee.annualSalary.toFixed(2)}\t${hours}\t$${employee.payRate.toFixed(2)}\t${employee.employeeType}`);
        });

    };
}
// Employee - This is the super class or base class for the employee. 
// It will contain all the necessary methods and properties that are intended to be inherited.
class Employee {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.annualSalary = 0;
    }
}

// The PartTime and Manager class will inherit the name, age, and annualSalary properties from the Employee Class.

// PartTime - This class will extend Employee and contain only the properties needed for a part-time employee. 
// It will also have a calculatePay() method. 
// This class only has 3 properties, payRate, hours, and employee type.
class PartTime extends Employee {
    constructor(name, age, payRate, hours) {
        super(name, age);
        this.payRate = payRate;
        this.hours = hours;
        this.employeeType = "Part Time";
    }

// The calculatePay() method 
// This method is on both of the concrete classes (PartTime and Manager) 
// and should calculate the annual pay based on 52 weeks and assign that value to the annual salary property. 
// Manager employees have a 40+ hour work week and part-time employees have some other value <40 depending on user input. 
// Also, there is a $1000 deduction in the annual pay for manager employees because of medical insurance costs.

    calculatePay() {
        this.annualSalary = this.payRate * this.hours * 52;
        return this.annualSalary;
    }
}
// Manager - This class will extend Employee and contain only the properties needed for a full-time manager employee. 
// It will also have a calculatePay() method. 
// A manager is an employee that works 40+hours. 
// This class only has 2 properties, payRate, and employee Type
class Manager extends Employee {
    constructor(name, age, payRate) {
        super(name, age);
        this.payRate = payRate;
        this.employeeType = "Manager";
    }
// The calculatePay() method - The formulas should be different on each class's calculatePay() method.
    calculatePay(hours = 40) {
        const managerHours = Math.max(hours, 40);
        this.annualSalary = (this.payRate * managerHours * 52) - 1000;
        return this.annualSalary;
    }
}
// The IIFE will be used to instantiate the Main class only and make sure you are using the defer attribute in the HTML script tag.
(function () {
    new Main();
})();
