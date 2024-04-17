import type { BuildOptions } from "esbuild";

/**
 * esbuild nestjs bundle options
 *
 * nestjs has conflict with esbuild, this options will be required
 * for sst bundle work
 * */
export const esbuildOptions: BuildOptions = {
  platform: "node",
  bundle: true,
  keepNames: true,
  external: [
    "kafkajs",
    "mqtt",
    "amqplib",
    "amqp-connection-manager",
    "nats",
    "@nestjs/microservices",
    "@nestjs/platform-express",
    "@grpc/grpc-js",
    "@grpc/proto-loader",
    "@nestjs/websockets/socket-module",
    "class-transformer",
    "@nestjs/common",
    "@nestjs/core",
    "@nestjs/config",
    "@anyun-slalom/nest-lambda-core",
    "class-validator",
  ],
};
