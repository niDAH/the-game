import { render, screen } from '@testing-library/react';
import Dropdown from './Dropdown';

test("renders 'hello content' w/'title' title", () => {
    render(
        <Dropdown
            id="test"
            label="Dropdown test"
            onClick={(value) => { console.log('onClick', value); }}
            options={[
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
            ]}
        />
    );

    const contentElement = screen.getByText(/Dropdown test/i);
    expect(contentElement).toBeInTheDocument();
});
