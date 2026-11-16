import { ENV } from "../config/env.js";

export const setupKeepAlive = (app) => {
  app.get('/ping', (req, res) => {
    res.status(200).json({ status: 'awake', time: new Date().toISOString() });
  });

  const RENDER_URL = ENV.RENDER_EXTERNAL_URL
  const INTERVAL = 14 * 60 * 1000;

  setInterval(async () => {
    try {
      const response = await fetch(`${RENDER_URL}/ping`);
      console.log(`[Keep-Alive] Ping successful: ${response.status}`);
    } catch (error) {
      console.error(`[Keep-Alive] Ping failed: ${error.message}`);
    }
  }, INTERVAL);
};