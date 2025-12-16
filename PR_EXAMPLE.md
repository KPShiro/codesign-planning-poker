## Description

This PR implements the deck of cards interface for the game room. It allows users to select a Fibonacci card (0, 1, 2, 3, 5, 8, 13, 21, ?, ☕) to cast their vote.

This connects the UI to the backend using the `CAST_VOTE` socket event defined in the shared package.

## Changes

- Created a reusable `Card` component in `apps/web/src/components`.
- Added a responsive grid layout for the card deck.
- Integrated `socket.emit('cast-vote')` when a card is clicked.
- Added visual feedback (highlighting) for the currently selected card.

## How to Test

1. Start the app: `pnpm dev`.
2. Open two browser tabs at `http://localhost:5173`.
3. In Tab 1: Join room "test" as "Alice".
4. In Tab 2: Join room "test" as "Bob".
5. In Tab 1: Click on card **"5"**.
    - **Expected:** The card "5" should become blue (selected).
    - **Expected:** In the server console, you should see `Vote received from Alice: 5`.
6. Refresh Tab 1.
    - **Expected:** The selection should persist (if persistence logic was added) OR reset correctly.

## Screenshots

<!-- ADD only if applicable -->

## Checklist

- [x] My code follows the style guidelines of this project
- [x] I have performed a self-review of my own code
- [x] No console errors appear in the browser dev tools
