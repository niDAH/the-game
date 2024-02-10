import { render, screen } from '@testing-library/react';

import RightSidebar from './RightSidebar';

// import { terrainTypes } from '../../../data/terrainTypes';

test("renders 'RightSidebar' w/'Cell Info' title", () => {
    render(
        <RightSidebar
        />
    );

    const contentElement = screen.getByText(/Cell Info/i);
    expect(contentElement).toBeInTheDocument();

    const titleElement = screen.getByText(/description/i);
    expect(titleElement).toBeInTheDocument();
});
