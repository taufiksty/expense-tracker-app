import { useContext, useEffect, useState } from 'react';
import ExpensesView from '../components/expenses';
import { ExpensesContext } from '../store/expenses';
import { fetchExpenses } from '../services/expenses';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { AuthContext } from '../store/auth';

function AllExpenses() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<string>('');

	const authCtx = useContext(AuthContext);
	const expensesCtx = useContext(ExpensesContext);

	useEffect(() => {
		const _retrieveData = async () => {
			try {
				setIsLoading(true);
				const retrievedData = await fetchExpenses(
					authCtx.token as string,
					authCtx.userId as string,
				);
				if (retrievedData && retrievedData.length > 0) {
					expensesCtx.initExpenses(retrievedData);
				}
				setIsLoading(false);
			} catch (error) {
				setIsError(
					'Could not retrieve expenses - please try again later!',
				);
				setIsLoading(false);
			}
		};

		_retrieveData();
	}, [authCtx]);

	if (isLoading) return <LoadingOverlay />;

	if (isError)
		return (
			<ErrorOverlay
				message={isError}
				onClose={() => setIsError('')}
			/>
		);

	const expenseSortByDateDesc = expensesCtx.expenses.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return (
		<ExpensesView
			period={0}
			expenses={expenseSortByDateDesc}
		/>
	);
}

export default AllExpenses;
