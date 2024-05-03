import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    NatsModule,
    // ClientsModule.register([
    //   {
    //     name: NATS_SERVICE, //  Replace PRODUCT_SERVICE
    //     transport: Transport.NATS, // Replace TCP to NATS
    //     options: {
    //       servers: envs.natsServers, // Replace:  host: envs.productsMicroserviceHost, port: envs.productsMicroservicePort,
    //     },
    //   },
    // ]),
  ],
})
export class ProductsModule {}
