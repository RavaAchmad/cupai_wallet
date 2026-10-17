export async function GET() {
  return Response.json({
    idr: 10000000,
    assets: {
      BTC: 0.05,
      ETH: 1.2,
    },
  });
}