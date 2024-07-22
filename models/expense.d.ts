type Expense = {
	id: string;
	description?: string;
	amount: number;
	owner: string;
	date: Date;
	createdAt?: Date;
	updatedAt?: Date;
};

export default Expense;
