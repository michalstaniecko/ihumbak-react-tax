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
	taxFree = () => {
		return 556.02;
	}

	countTax = () => {
		let tax;
		let surplus;
		if (this.type == "brutto") {
			if (this.salary <= this.threshold()) {
				tax = (this.salary * 0.18) - this.taxFree();
			} else {

				surplus = this.salary - this.threshold();
				tax = ((surplus * 0.32) + (this.threshold() * 0.18)) - this.taxFree();
			}

		} else {
			if (this.salary <= this.threshold("netto")) {
				let brutto = (this.salary - this.taxFree()) / 0.82;
				tax = brutto * 0.18 - this.taxFree();
			} else {

				surplus = (this.salary - this.taxFree() - (0.82 * this.threshold())) / 0.68;
				tax = ((surplus * 0.32) + (this.threshold() * 0.18)) - this.taxFree();


			}
		}
		return tax;
	}


	displayCounted = (salary, type) => {
		let counted = this.count(salary, type);
		return counted + ' counted';
	}

}
