import { Link } from "react-router-dom";

import GameGrid from "@components/GameGrid/GameGrid";

export default function Game(): JSX.Element {
    return (
        <div>
            <h1>Game</h1>

            <Link
                className="link link-primary"
                to="/"
            >
                No (go back to home)
            </Link>

            <GameGrid />
        </div>
    );
}
