export const fetchCache = 'force-no-store';

import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import type { Prediction } from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

interface Params {
  id: string;
}

interface PredictionWithError extends Prediction {
  error?: string;
}

export async function GET(request: Request, { params }: { params: Params }) {
  const { id } = params;
  const prediction = (await replicate.predictions.get(id)) as PredictionWithError;

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }

  const response = NextResponse.json(prediction);

  return response;
}
