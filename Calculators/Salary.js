import React from 'react';


export default class Salary {
	constructor(salary = 0, type = "brutto") {
		this.salary = salary;
		this.type = type;
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
				taxFree = 1440 - (883.98 * (this.salary-8000) / 5000);
			}
			if (this.salary > 13000 && this.salary <= 85528) {
				taxFree = 556.02;
			}
			if (this.salary > 85528 && this.salary <=127000) {
				taxFree = 556.02 - (556.02 * (this.salary - this.threshold()) / 41472);
			}
			if (this.salary > 127000) {
				taxFree = 0;
			}
		}
		this.taxFree = Math.round(taxFree);
		return taxFree;
	}

	countTax = () => {
		let tax;
		let surplus;
		if (this.type == "brutto") {
			if (this.salary <= this.threshold()) {
				tax = (this.salary * 0.18) - this.taxFreeCount();
			} else {

				surplus = this.salary - this.threshold();
				tax = ((surplus * 0.32) + (this.threshold() * 0.18)) - this.taxFreeCount();
			}

		} else {
			if (this.salary <= this.threshold("netto")) {
				let brutto = (this.salary - this.taxFreeCount()) / 0.82;
				tax = brutto * 0.18 - this.taxFreeCount();
			} else {

				surplus = (this.salary - this.taxFreeCount() - (0.82 * this.threshold())) / 0.68;
				tax = ((surplus * 0.32) + (this.threshold() * 0.18)) - this.taxFreeCount();


			}
		}
		return tax < 0 ? "0" : Math.round(tax);
	}


	displayCounted = (salary, type) => {
		let counted = this.count(salary, type);
		return counted + ' counted';
	}

}
