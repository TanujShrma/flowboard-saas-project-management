import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOkResponse({ description: 'API process is reachable' })
  check(): { status: 'ok'; service: string; timestamp: string } {
    return { status: 'ok', service: 'flowboard-api', timestamp: new Date().toISOString() };
  }
}
