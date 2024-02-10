import { render, screen } from '@testing-library/react';
import Modal from './Modal';

test("renders 'hello content' w/'title' title", () => {
    render(
        <Modal
            primaryAction={() => { console.log('primaryAction'); }}
            id="test"
            title="title"
        >
            <div>hello content</div>
        </Modal>
    );

    const contentElement = screen.getByText(/hello content/i);
    expect(contentElement).toBeInTheDocument();

    const titleElement = screen.getByText(/title/i);
    expect(titleElement).toBeInTheDocument();
});
