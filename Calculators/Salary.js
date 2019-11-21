import React from 'react';

import {round} from './../Helpers/Round';


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
			in: 250,
		};
		this.taxPercent = 0.17;
		this.taxFree = 43.76;
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
		netto = round(netto, 2);
		this.contributionsAmount.netto = {
			employee: netto
		}
	}
	countTax = () => {
		let tax = (this.taxBase * this.taxPercent) - this.taxFree - (0.0775 * this.baseHealth);
		tax = round(tax);
		this.contributionsAmount.tax = {
			employee: tax
		}
	}

	countTaxBase = () => {
		let taxBase = this.salary - (this.contributionsAmount.pension.employee + this.contributionsAmount.disability.employee + this.contributionsAmount.medical.employee) - this.employeeCostIncome.in;
		this.taxBase = taxBase;
	}


	countPension = () => {
		this.contributionsAmount.pension = {
			employee: this.baseSalary * this.contributionsPercent.pension.employee,
			employer: this.baseSalary * this.contributionsPercent.pension.employer
		}
	}

	countDisability = () => {
		this.contributionsAmount.disability = {

			employee: round(this.baseSalary * this.contributionsPercent.disability.employee, 2),
			employer: round(this.baseSalary * this.contributionsPercent.disability.employer, 2)
		}
	}

	countAccident = () => {
		let accident = this.baseSalary * this.contributionsPercent.accident.employer;
		accident = round(accident, 2);
		this.contributionsAmount.accident = {
			employer: accident

		}
	}

	countMedical = () => {
		let medical = this.baseSalary * this.contributionsPercent.medical.employee;
		medical= round(medical, 2);
		this.contributionsAmount.medical = {
			employee: medical

		}
	}

	countHealthBase = () => {
		let healthBase = this.baseSalary - this.contributionsAmount.pension.employee - this.contributionsAmount.disability.employee - this.contributionsAmount.medical.employee
		//emerytalne + rentowe + chorobowe
		this.baseHealth = healthBase;
	}

	countHealth = () => {
		let healthBase =this.baseHealth * this.contributionsPercent.health.employee;
		healthBase = round(healthBase, 2);
		this.contributionsAmount.health = {

			employee: healthBase

		}
	}

	countLaborFound = () => {
		let laborFound = this.baseSalary * this.contributionsPercent.laborFound.employer;
		laborFound = round(laborFound, 2);
		this.contributionsAmount.laborFound = {

			employer: laborFound


		}
	}

	countFgsp = () => {
		let fgsp = this.baseSalary * this.contributionsPercent.fgsp.employer;
		fgsp = round(fgsp, 2);
		this.contributionsAmount.fgsp = {

			employer: fgsp

		}
	}


}