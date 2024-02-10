```mermaid
erDiagram
    boards { int gridId PK "auto increment" string title
        string gridType FK "enum to other table (gridTypes)"
        string boardData
        int userId
        int defaultGrid
        int northEdgeBoardId FK "back reference to different board"
        int southEdgeBoardId FK "back reference to different board"
        int eastEdgeBoardId FK "back reference to different board"
        int westEdgeBoardId FK "back reference to different board"
    }

    boards ||--|{ boards : "directional border"

    boards ||--|{ events : has
    events {
        int eventId PK "auto increment"
        int gridId FK "one board to many events"
        int userId FK
        int gotoId
        string name
        string message
        enum gridType
        int col
        int row
    }

    user ||--|{ boards : owns
    user {
        int userId PK "auto increment"
        string firstName
        string lastName
        string email
        string password
    }
