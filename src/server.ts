import {CONFIGS} from './common/configs';
import http from 'http';
import { app as createExpressApp } from './app';
import {logger} from './common/configs/logger';
let server: http.Server;

// Start server
async function startServer(): Promise<void> {
    try {
        const { SERVER_PORT, NODE_ENV, BASE_URL } = CONFIGS;
        // Create HTTP server
        const expressApp = await createExpressApp()
        server = http.createServer(expressApp);

        server.listen(SERVER_PORT, () => {
            logger.info(`Server running on port ${SERVER_PORT}`);
            logger.info(`Environment: ${NODE_ENV}`);
            logger.info(`Host: ${BASE_URL}`);
        });

    } catch (error) {
        logger.error('Server startup error:', error);
        process.exit(1);
    }
}

// Graceful shutdown
function shutdownGracefully(): void {
    logger.info('Shutting down gracefully...');
    
    server.close(() => {
        logger.info('HTTP server closed');

        setTimeout(() => {
            logger.error('Could not close connections in time, forcefully shutting down');
            process.exit(1);
        }, 10000);
    });
}

process.on('SIGTERM', shutdownGracefully);
process.on('SIGINT', shutdownGracefully);

(async () => {
    await startServer();
})();