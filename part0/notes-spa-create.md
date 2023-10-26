``` mermaid

sequenceDiagram
    participant user
    participant browser

    user->>browser: completes form
    user->>browser: clicks submit button

    Note left of browser: On submission, submit event handler function is executed

    Note left of browser: Creates new note with data from user & sends it to the server

    Note left of browser: Then rerenders new notes including the new note 

    browser-->>user: shows updated list of notes to user

```