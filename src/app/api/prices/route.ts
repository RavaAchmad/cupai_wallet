export async function GET() {
  // Mock data with random changes
  const assets = [
    { name: "Bitcoin", symbol: "BTC", price: 650000000, change24h: Math.random() * 10 - 5 },
    { name: "Ethereum", symbol: "ETH", price: 35000000, change24h: Math.random() * 10 - 5 },
    { name: "Solana", symbol: "SOL", price: 1845000, change24h: Math.random() * 10 - 5 },
    { name: "Tether", symbol: "USDT", price: 16000, change24h: Math.random() * 2 - 1 },
    { name: "Dogecoin", symbol: "DOGE", price: 2500, change24h: Math.random() * 10 - 5 },
  ];
  return Response.json(assets);
}