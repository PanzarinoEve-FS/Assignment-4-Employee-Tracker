# Assignment: Employee Tracker

**Objective:** Create a small employee tracker program that will utilize inheritance, modular design, and the use of data structures and more advanced array methods. This assignment uses ONLY prompts and Console.Log. NO CSS is required and NO HTML (except for loading the script tag)

## Key topics:

- Inheritance
- Array methods with iteration
- Modular design
- Course Book Requirement:
  
## Overview:

You will code a console-based application (No HTML / CSS) that will track employee objects. You will be able to add, delete, and modify the employee data. 

**Setup**

Create a Main class that contains the majority of the logic. 
Do not have any code outside of a class except for the IIFE. 
The IIFE will be used to instantiate the Main class only and make sure you are using the defer attribute in the HTML script tag.

**Classes**

Besides the Main class, you will need to create the following classes:

- **Employee** - This is the super class or base class for the employee. It will contain all the necessary methods and properties that are intended to be inherited. Hint: The class should NOT be instantiated. You do not need any methods in this class. 
- **PartTime** - This class will extend Employee and contain only the properties needed for a part-time employee. It will also have a calculatePay() method. This class only has 3 properties, payRate, hours, and employee type.
- **Manager** - This class will extend Employee and contain only the properties needed for a full-time manager employee. It will also have a calculatePay() method. A manager is an employee that works 40+hours. This class only has 2 properties, payRate, and employee Type
The PartTime and Manager class will inherit the name, age, and annualSalary properties from the Employee Class.

The calculatePay() method

This method is on both of the concrete classes (PartTime and Manager) and should calculate the annual pay based on 52 weeks and assign that value to the annual salary property. Manager employees have a 40+ hour work week and part-time employees have some other value <40 depending on user input. Also, there is a $1000 deduction in the annual pay for manager employees because of medical insurance costs. Hint: The formulas should be different on each class's calculatePay() method.

Ex 1: A Manager employee working 40 hours a week that earns a whopping $5 per hour should earn an annual salary of $9400

Ex 2: A Part-time employee working 12 hours a week that earns a whopping $8 per hour should earn an annual salary of $4992

## The Main Menu

**The following menu options are required:**

- **Add Employee** - Adds an employee to the table. This option will prompt the user with the name, age, payrate and number of hours per week. Depending on the number of hours worked, a part time or manager employee is then instantiated and added to the employee's array. Once added, display the updated information in the console. Hint: Use the Array split() method to convert the string prompt to an array.

- **Remove Employee** - Removes the desired employee from the employees array. This must be done by the employee number shown on the table in the console and also by typing the name of the employee. Once removed, display the updated employee information in the console. Hint: Use the filter() method to help you remove the employee by its name. Check out the isNan function. This may help you in figuring out if what you type is a number or a string.

- **Edit Employee** - This option will allow to edit the payrate only for the chosen employee. For this option, you can just select the employee you want to edit by its employee number on the table shown in the console. Make sure the employee number starts at 1 in the console. Once edited, then display the updated employee information in the console.

- **Display Employees** - Display the employee's information in the console. The Employee number(starting with 1), name, age, salary, hours, pay, and employee type is shown for each employee. Have a console.log() to show the column headers using tabs "\t" such as:



## Javascript
console.log("Bob's Burger Joint");        console.log("ID\tName\tSalary\thrs\tpay\tFT/PT")
Code execution

3 employees are hard coded initially. Make sure the output is displayed showing those 3 employees when program starts along with the 4 menu options.

Each menu option functionality is coded in its own function in the Main Class.

An array is used to hold all employee instances.

Invoke a console.clear() to clear the console before information is displayed

Console.Log() is used to display the employees in the console.

A filter() method is used to delete an employee

Make sure all code is in a class as stated in the setup instructions.

Use the provided screen shot to get an idea of output expectations.

Textbook Reading Requirement:**

Sample output
Things to note:

Nice use of tabs in the console.
Employee number starting at 1 not 0
The Data that is shown for each employee.
