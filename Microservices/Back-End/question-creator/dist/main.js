"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('auth');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.REDIS,
        options: {
            url: 'redis://localhost:6379',
        },
    });
    await app.startAllMicroservicesAsync();
    app.enableCors();
    await app.listen(3020);
    logger.log(`Application is running on ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map