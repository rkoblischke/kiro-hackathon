# Monster Brawl

A Halloween-themed insult combat game inspired by Monkey Island's sword fighting mechanics.

## Features

- Turn-based insult combat between Little Red Riding Hood and Dracula
- Hilarious cat fighting animations
- Data-driven insult/comeback system
- Built with React, TypeScript, and Vite

## Project Structure

```
monster-brawl/
├── server/              # Express server for serving static files
├── src/
│   ├── components/      # React components
│   │   └── __tests__/   # Component tests
│   ├── game/           # Game logic
│   │   └── __tests__/   # Game logic tests
│   ├── data/           # Game content (insults, comebacks)
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
└── dist/               # Production build output
```

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

The game will be available at `http://localhost:5173`

### Running Tests

```bash
npm test
```

For watch mode:

```bash
npm run test:watch
```

### Building for Production

```bash
npm run build
```

### Running the Production Server

```bash
npm start
```

The game will be available at `http://localhost:3000`

## Technology Stack

- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Backend**: Node.js with Express
- **Testing**: Vitest for unit tests, fast-check for property-based testing
- **Styling**: CSS3 with animations

## License

MIT
