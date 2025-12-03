require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
const port = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';
const useViteMiddleware = process.env.USE_VITE_MIDDLEWARE === 'true';
const clientRootPath = path.join(__dirname, 'client');
const clientBuildPath = path.join(clientRootPath, 'dist');

// Import routes
const postRoutes = require('./routes/post');
const { connect } = require('./config/database');

// Middleware
app.use(express.json());

// API routes
app.use('/api/v1/admin/posts', postRoutes);

const attachFrontend = async () => {
  // In Docker/production we always serve the built files from client/dist.
  // Vite middleware is only used for local development when USE_VITE_MIDDLEWARE=true.
  if (isProduction || !useViteMiddleware) {
    app.use(express.static(clientBuildPath));
    app.get('/*splat', (req, res, next) => {
      if (req.path.startsWith('/api')) {
        return next();
      }
      res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
    return;
  }

  // Development: run Vite in middleware mode so frontend + API share the same port
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    root: clientRootPath,
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
};

const startServer = async () => {
  try {
    await connect();
    await attachFrontend();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
