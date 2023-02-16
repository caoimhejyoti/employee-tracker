# Employee Tracker
CMS application to manage our Employee database with MySQL.

![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)   ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)   ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)   ![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)  

[![MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://opensource.org/licenses/MIT)

----------------------------------------------------------------

[About](#about)  ✦  [User Story](#user-story)  ✦  [Acceptance Criteria](#acceptance-criteria)  ✦  [Prerequisites](#prerequisites)  ✦  [Usage](#usage)  ✦  [Future Developments](#future-developments)  ✦  [Resources](#resources)  ✦  [License](#license)  ✦  [Contact](#contact)

----------------------------------------------------------------

## About
This application allows non-developers to ewasily view and interact with the information within the Database. 

Working with NodeJS and MySQL, this application allows users to easily view, edit and add Employees, Jobs and Departments to the database. 

## User Story
```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Prerequisites
This program opporates from your command line interface(CLI). First navigate to the application directory. Then run the following commands:

```bash
npm install
```
Ensure that you have also added the database. This can be done within MySQL. Please follow the instructions below. Ensure you are in the root folder of the application.

```bash
mysql -u root -p

<ENTER YOUR PASSWORD>

SOURCE db/schema.sql

SOURCE db/seeds.sql

EXIT
```


## Usage

Once fully installed, this program is invoked with either of the following commands:
```bash
node index.js
```

```bash
npm start
```

Then follow the CL prompted questions. Users can explore the database as required. 

To see this app in opperation, watch our live demo!

[![Youtube screen grab of live demo recording.](./public/img/Employee-Tracker-livedemo%20screenshot.png)](https://youtu.be/DDGxIyzbAHE)


## Resources
https://www.w3schools.com/mysql/mysql_datatypes.asp

https://www.w3resource.com/mysql/creating-table-advance/constraint.php

https://stackoverflow.com/questions/28715142/reference-a-foreign-key-to-a-primary-key-within-the-same-table

https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp

https://2u-20.wistia.com/medias/2lnle7xnpk
https://stackoverflow.com/questions/22739841/mysql-combine-two-columns-into-one-column

https://www.w3schools.com/sql/func_mysql_concat.asp

https://www.w3schools.com/jsref/jsref_indexof_array.asp

https://www.w3schools.com/sql/sql_join.asp

https://www.stoutlabs.com/blog/2019-09-17-add-color-to-console-output-with-chalk/

https://www.w3schools.com/sql/sql_alias.asp

https://www.w3schools.com/js/js_async.asp

https://learnsql.com/blog/how-to-join-two-tables-in-sql/





## License
This project is using the following license:

**MIT**

For further information regarding the license, please follow the link below:
 https://opensource.org/licenses/MIT

----------------------------------------------------------------

## Contact 
If you have any further questions, please contact via email or github.

<a href="mailto:caoimhejyoti@gmail.com"><img alt="Link to email contact address" src="https://img.shields.io/badge/email-D14836?style=for-the-badge" target="_blank" /></a>  <a href="https://github.com/caoimhejyoti"><img alt="badge for GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white" target="_blank" /></a>

