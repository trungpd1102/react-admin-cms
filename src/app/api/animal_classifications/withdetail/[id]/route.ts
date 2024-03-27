import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import animalClassificationController from '../../../_controllers/animalClassification.controller';
import errorHandlerMiddleware from '@/middlewares/errorHandler';

export const GET = errorHandlerMiddleware(
  async (request: NextRequest, { params }: { params: { id: string } }) => {
    const id = Number(params.id);
    return NextResponse.json(
      await animalClassificationController.getByIdWithDetail(id)
    );
  }
);