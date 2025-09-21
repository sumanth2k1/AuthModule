AuthBackend

A simple Authentication Backend using Node.js, Express v5, MongoDB, and PNPM.
Supports environment-based configuration, custom error handling, and async-safe route handling.

Setup & Installation

Clone the repository:

git clone <repo-url>
cd AuthBackend


Install dependencies with PNPM:

pnpm install


Create environment files:

.env.development
.env.production


Start the development server:

pnpm run dev


Start the production server:

pnpmp start






NODE_ENV=production node server.js
