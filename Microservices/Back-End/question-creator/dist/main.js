"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.REDIS,
        options: {
            url: process.env.REDIS_URL,
            retryAttempts: 5,
            retryDelay: 10,
        },
    });
    await app.startAllMicroservicesAsync();
    app.enableCors();
    await app.listen(process.env.PORT || 8080);
    common_1.Logger.log(`Application is running on ${await app.getUrl()}`);
}
bootstrap();
//# sourceMappingURL=main.js.map