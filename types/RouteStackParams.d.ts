import React from 'react';

export type RouteStackParams = {
	Login: {} | undefined;
	Signup: {} | undefined;
	OverviewExpenses: {} | undefined;
	ManageExpenses: { expenseId?: string } | undefined;
};
