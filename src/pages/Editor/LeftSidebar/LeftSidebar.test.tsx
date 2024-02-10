import { render, screen } from '@testing-library/react';
import { IBoard } from '../../../types/global';

import LeftSidebar from './LeftSidebar';

test("renders 'LeftSidebar' w/'Board Type' title", () => {
    render(
        <LeftSidebar
            currentBoard={[] as unknown as IBoard}
            newBoard={jest.fn()}
        />
    );

    const contentElement = screen.getByText(/Board Type/i);
    expect(contentElement).toBeInTheDocument();

    // const titleElement = screen.getByText(/description/i);
    // expect(titleElement).toBeInTheDocument();
});
