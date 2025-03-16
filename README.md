# Currency Converter Frontend

This is the frontend application for the Currency Conversion API Challenge. It's built with:

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

# Related Projects

This UI application works with a dedicated backend API:

- [Currency Exchange API](https://github.com/NiicooR/koywe-challenge) - NestJS backend service that powers this application

## Features

- User registration and login with JWT authentication
- Create currency conversions between fiat and cryptocurrencies
- Retrieve existing quotes by ID
- Responsive UI with Tailwind CSS
- Form validation with Zod
- API integration with React Query

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- The backend API service must be running (refer to the backend project's README)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd currency-converter-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following content:

```
NEXT_PUBLIC_API_URL=
```

4. Run the project: 

```bash
npm run dev
```

## AI Assistance
Using AI assistance allowed for significantly faster development while ensuring modern frontend best practices were followed. This approach enabled rapid prototyping and iteration of UI components while maintaining code quality and user experience standards.
The AI assistance was particularly valuable for:

Accelerating the creation of boilerplate code
Providing alternative implementation approaches for complex UI challenges
Ensuring consistency across the component library
Optimizing React performance patterns