import React from 'react';

export type RouteStackParams = {
	OverviewExpenses: {} | undefined;
	ManageExpenses: { expenseId?: string } | undefined;
};
