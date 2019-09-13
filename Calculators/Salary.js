import React from 'react';


export default class Salary {
	constructor(salary = 0, type = "brutto", typeOfEmployment = 'contractOfEmployment') {
		this.salary = salary;
		this.businessSalary = 2859;
		this.type = type;
		this.typeOfEmployment = typeOfEmployment;
		this.baseHealth = '';
		this.contributionsAmount = {};
		this.baseTax = '';
		this.employeeCostIncome = {
			in: 111.25,
		};
		this.taxFree = 46.33;
		this.contributionsPercent = {
			pension: {

				employee: 0.0976,
				employer: 0.0976
			},
			disability: {
				employee: 0.0150,
				employer: 0.0650,
			},
			accident: {
				employer: 0.0167,
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
	}

	threshold = (type = "brutto") => {
		if (type == "brutto") {
			return 85528;
		} else {
			return 70689;
		}
	}
	countTaxFree = () => {
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

	}


	countBaseSalary = () => {
		this.baseSalary = this.typeOfEmployment == 'business' ? this.businessSalary : this.salary;
	}

	count = () => {
		this.countBaseSalary();
		this.countPension();
		this.countDisability();
		this.countAccident();
		this.countMedical();
		this.countHealthBase();
		this.countHealth();
		this.countLaborFound();
		this.countFgsp();
		this.countTaxBase();
		this.countTax();
		this.countNetto();
		this.countEmployerCosts();
		return this.contributionsAmount;
	}
	countEmployerCosts = () => {
		this.contributionsAmount.employerCosts = {
			employer: this.salary + this.contributionsAmount.pension.employer + this.contributionsAmount.disability.employer + this.contributionsAmount.accident.employer + this.contributionsAmount.laborFound.employer + this.contributionsAmount.fgsp.employer
		}
	}
	countNetto = () => {
		let netto = this.baseHealth - this.contributionsAmount.health.employee - this.contributionsAmount.tax.employee;
		this.contributionsAmount.netto = {
			employee: netto
		}
	}
	countTax = () => {
		this.contributionsAmount.tax = {
			employee: (this.taxBase * 0.18) - this.taxFree - (0.0775 * this.baseHealth)
		}
	}

	countTaxBase = () => {
		this.taxBase = this.salary - (this.contributionsAmount.pension.employee + this.contributionsAmount.disability.employee + this.contributionsAmount.medical.employee) - this.employeeCostIncome.in
	}


	countPension = () => {
		this.contributionsAmount.pension = {
			employee: this.baseSalary * this.contributionsPercent.pension.employee,
			employer: this.baseSalary * this.contributionsPercent.pension.employer
		}
	}

	countDisability = () => {
		this.contributionsAmount.disability = {

			employee: this.baseSalary * this.contributionsPercent.disability.employee,
			employer: this.baseSalary * this.contributionsPercent.disability.employer
		}
	}

	countAccident = () => {
		this.contributionsAmount.accident = {
			employer: this.baseSalary * this.contributionsPercent.accident.employer

		}
	}

	countMedical = () => {
		this.contributionsAmount.medical = {
			employee: this.baseSalary * this.contributionsPercent.medical.employee

		}
	}

	countHealthBase = () => {
		//emerytalne + rentowe + chorobowe
		this.baseHealth = this.baseSalary - this.contributionsAmount.pension.employee - this.contributionsAmount.disability.employee - this.contributionsAmount.medical.employee;
	}

	countHealth = () => {
		this.contributionsAmount.health = {

			employee: this.baseHealth * this.contributionsPercent.health.employee

		}
	}

	countLaborFound = () => {
		this.contributionsAmount.laborFound = {

			employer: this.baseSalary * this.contributionsPercent.laborFound.employer


		}
	}

	countFgsp = () => {
		this.contributionsAmount.fgsp = {

			employer: this.baseSalary * this.contributionsPercent.fgsp.employer

		}
	}


}