export const fetchCache = 'force-no-store';

import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import type { Prediction } from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

interface RequestBody {
  prompt: string;
}

interface PredictionWithError extends Prediction {
  error?: string;
}

export async function POST(request: Request) {
  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
    );
  }

  const { prompt }: RequestBody = await request.json() as RequestBody;

  // Start SDXL Prediction
  const prediction = (await replicate.predictions.create({
    version: '7762fd07cf82c948538e41f63f77d685e02b063e37e496e96eefd46c929f9bdc',
    input: { prompt, num_outputs: 2 }
  })) as PredictionWithError;

  if (prediction.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  return NextResponse.json(prediction, { status: 201 });
}
