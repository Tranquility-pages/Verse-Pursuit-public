import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    applinks: {
      apps: [],
      details: [
        {
          appID: "JX23RL7W4D.com.versepursuit.app",
          paths: ["/app-redirect", "/app-redirect/*"]
        }
      ]
    }
  };

  return NextResponse.json(data);
}
