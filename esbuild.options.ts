import type { BuildOptions } from "esbuild";

/**esbuild nestjs bundle options  */
export const esbuildOptions : BuildOptions = {
    platform: 'node',
    bundle: true,
    keepNames: true,
    external: [
        'kafkajs',
        'mqtt',
        'amqplib',
        'amqp-connection-manager',
        'nats',
        '@nestjs/microservices',
        '@nestjs/platform-express',
        '@grpc/grpc-js',
        '@grpc/proto-loader',
        '@nestjs/websockets/socket-module',
        'class-transformer'
    ]
};