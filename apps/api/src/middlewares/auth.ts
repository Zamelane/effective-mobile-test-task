import express from 'express';
export function authPlugin(request: express.Request, response: express.Response, next: express.NextFunction) {
  console.log(`${request.method} ${request.path}`)
  next()
} 