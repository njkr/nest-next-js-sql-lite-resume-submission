import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../pages/index';
import { Provider } from 'react-redux';
import store from '@/redux/store';

jest.mock('../redux/hooks', () => ({
    useAppDispatch: () => jest.fn(),
    useAppSelector: () => ({
        data: [
            {
                id: 1,
                fullName: 'John Doe',
                dateOfBirth: '1990-01-01',
                preferredLocation: 'New York',
                programmingSkills: ['JavaScript', 'TypeScript'],
            },
        ],
    }),
}));

describe('Home component', () => {
    it('renders the table with correct headers', () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        // Check for table headers
        expect(screen.getByText('Id')).toBeInTheDocument();
        expect(screen.getByText('Full Name')).toBeInTheDocument();
        expect(screen.getByText('Date of Birth')).toBeInTheDocument();
        expect(screen.getByText('Preferred Location')).toBeInTheDocument();
        expect(screen.getByText('Programming Skills')).toBeInTheDocument();
    });

    it('renders a row with user data', () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('1990-01-01')).toBeInTheDocument();
        expect(screen.getByText('New York')).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
});
