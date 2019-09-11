import React from 'react';


export default class Salary {
	constructor(salary = 0, type = "brutto") {
		this.salary = salary;
		this.type = type;
		this.contributionsPercent = {
			pension: {

				employee: 0.0976,
				employer: 0.0976
			},
			disability: {
				employee: 0.0150,
				employer: 0.0650,
			},
			medical: { //chorobowe
				employee: 0.0245
			},
			health: { //zdrowotne
				employee: 0.09
			},
			laborFound: { //fundusz pracy
				employer: 0.0245,
			},
			fgsp: { //Fundusz Gwarantowanych Świadczeń Pracowniczych
				employer: 0.001,
			}
		}
		console.log('salary', this.salary);
	}

	threshold = (type = "brutto") => {
		if (type == "brutto") {
			return 85528;
		} else {
			return 70689;
		}
	}
	taxFreeCount = () => {
		let taxFree;
		if (this.type == "brutto") {
			if (this.salary <= 8000) {
				taxFree = 1440;
			}
			if (this.salary > 8000 && this.salary <= 13000) {
				taxFree = 1440 - (883.98 * (this.salary - 8000) / 5000);
			}
			if (this.salary > 13000 && this.salary <= 85528) {
				taxFree = 556.02;
			}
			if (this.salary > 85528 && this.salary <= 127000) {
				taxFree = 556.02 - (556.02 * (this.salary - this.threshold()) / 41472);
			}
			if (this.salary > 127000) {
				taxFree = 0;
			}
		}
		console.log('taxFree',taxFree);
		this.taxFree = (taxFree/12);
		return taxFree/12;
	}

	count = () => {
		console.log(this.salary);
		this.yearSalary = this.salary * 12;
	}

	countSalaryBase = () => {
		let salaryBase = this.salary;
		return salaryBase;
	}

	countTax = () => {
		let tax;
		let surplus;
		let salaryBase = this.countSalaryBase();
		if (this.type == "brutto") {
			if (salaryBase <= this.threshold()) {
				tax = (salaryBase * 0.18) - this.taxFreeCount();
			} else {

				surplus = salaryBase - this.threshold();
				tax = ((surplus * 0.32) + (this.threshold() * 0.18)) - this.taxFreeCount();
			}

		} else {
			if (salaryBase <= this.threshold("netto")) {
				let brutto = (salaryBase - this.taxFreeCount()) / 0.82;
				tax = brutto * 0.18 - this.taxFreeCount();
			} else {

				surplus = (salaryBase - this.taxFreeCount() - (0.82 * this.threshold())) / 0.68;
				tax = ((surplus * 0.32) + (this.threshold() * 0.18)) - this.taxFreeCount();


			}
		}
		return tax < 0 ? 0 : (tax);
	}

	countContributionsAmount = () => {
		let salary = this.salary;
		this.contributionsAmount = {
			pension: {

				employee: salary * this.contributionsPercent.pension.employee,
				employer: salary * this.contributionsPercent.pension.employer
			},
			disability: {
				employee: salary * this.contributionsPercent.disability.employee,
				employer: salary * this.contributionsPercent.disability.employer,
			},
			medical: { //chorobowe
				employee: salary * this.contributionsPercent.medical.employee
			},
			health: { //zdrowotne
				employee: ((1 - this.contributionsPercent.pension.employee - this.contributionsPercent.disability.employee - this.contributionsPercent.medical.employee) * salary) * this.contributionsPercent.health.employee
			},
			laborFound: { //fundusz pracy
				employer: salary * this.contributionsPercent.laborFound.employer
			},
			fgsp: { //Fundusz Gwarantowanych Świadczeń Pracowniczych
				employer: salary * this.contributionsPercent.fgsp.employer
			}
		}
		this.salaryReducedBySocial = (1 - this.contributionsPercent.pension.employee - this.contributionsPercent.disability.employee - this.contributionsPercent.medical.employee) * salary;
		console.log(this.contributionsAmount);
	}


	displayCounted = (salary, type) => {
		let counted = this.count(salary, type);
		return counted + ' counted';
	}

}
