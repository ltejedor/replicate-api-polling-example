# Demo: Replicate API Polling


This project demonstrates how to use Replicate APIs with polling in a Next.js application deployed on Vercel. It's built using the T3 Stack and showcases image generation using Stable Diffusion XL (SDXL).

## Tutorial

For a detailed guide on how this project works and how to implement polling with Replicate APIs, check out the tutorial:

[Using Replicate APIs in Vercel Without Timeouts: A Guide to Polling](https://www.leandratejedor.com/post/replicate-apis-vercel-polling)

## Features

- Image generation using SDXL via Replicate API
- Polling mechanism to handle long-running tasks
- Next.js with App Router
- TypeScript for type safety
- Tailwind CSS for styling

## Getting Started

1. Clone the repository
2. Install dependencies:
`npm install`
3. Set up your environment variables:
- Create a `.env` file in the root directory
- Add your Replicate API token:
  ```
  REPLICATE_API_TOKEN=your_token_here
  ```
4. Run the development server:
`npm run dev`

## Project Structure

- `src/app/_components/generate_form.tsx`: Form component for image generation
- `src/app/_components/image_generator.tsx`: Main component handling image generation and polling
- `src/app/api/predictions/route.ts`: API route for starting predictions
- `src/app/api/predictions/[id]/route.ts`: API route for checking prediction status
- `src/app/page.tsx`: Main page component
- `src/app/layout.tsx`: Root layout component

## Deployment

This project is designed to be deployed on Vercel. Make sure to set up your environment variables in your Vercel project settings.
Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## License

This project is open source and available under the [MIT License](LICENSE).

