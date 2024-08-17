import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ConfigService } from "@nestjs/config";

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    let apiKey: string | string[] = request.headers['x-api-key'];
    if (Array.isArray(apiKey) && apiKey.length > 0) {
      apiKey = apiKey[0];
    }
    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    const keyConfigs = this.configService.get<string>('API_KEY');
    const validApiKeys = keyConfigs.split(',');

    if (!validApiKeys.includes(apiKey as string)) {
      throw new UnauthorizedException('Invalid API key');
    }

    return true;
  }
}
