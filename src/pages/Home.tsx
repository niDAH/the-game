import { Link } from "react-router-dom";

export default function Start() {
    return (
        <div>
            <h1>Home</h1>

            <p>Do you want to play a game?</p>

            <Link
                className="font-press-start-2p text-2xl link link-primary"
                to="/game"
            >
                Yes
            </Link>

            <p className="mt-4">
                Or perhaps you are here to {' '}
                <Link
                    className="link link-primary"
                    to="/editor"
                >
                    Edit
                </Link>

            </p>
        </div>
    );
}
