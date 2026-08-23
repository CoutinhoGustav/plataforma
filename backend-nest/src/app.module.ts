import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AlunosModule } from "./alunos/alunos.module";
import { TurmasModule } from "./turmas/turmas.module";
import { DevelopersModule } from "./developers/developers.module";
import { AdminModule } from "./admin/admin.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        let url = configService.get<string>("DATABASE_URL") ?? "";
        // pg 8.16 treats sslmode=require as verify-full; that hangs on Vercel.
        // uselibpqcompat restores libpq require semantics for Neon/serverless.
        if (url.includes("sslmode=require") && !url.includes("uselibpqcompat")) {
          url += "&uselibpqcompat=true";
        }
        const needsSsl =
          url.includes("neon") ||
          url.includes("supabase") ||
          url.includes("sslmode=require");
        return {
          type: "postgres",
          url,
          autoLoadEntities: true,
          migrations: [
            __dirname.replace(/\\/g, "/") + "/migrations/*{.ts,.js}",
          ],
          synchronize: false,
          extra: {
            connectionTimeoutMillis: 5000,
            idleTimeoutMillis: 10000,
          },
          ssl: needsSsl ? { rejectUnauthorized: false } : false,
        };
      },
    }),
    AlunosModule,
    TurmasModule,
    DevelopersModule,
    AdminModule,
  ],
})
export class AppModule {}
