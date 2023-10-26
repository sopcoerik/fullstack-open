``` mermaid

sequenceDiagram
    participant user
    participant browser

    user->>browser: completes form
    user->>browser: clicks submit button

    Note left of browser: The browser sends the data to the server through a POST request

    Note left of browser: The server responds with status code 302 & asks the browser to reload the /notes page

    Note left of browser: After the browser reloads the page it will ask again for the CSS/JavaScript/JSON data

    Note left of browser: The browser executes the callback function that renders the notes

    browser-->>user: shows updated list of notes to user

```