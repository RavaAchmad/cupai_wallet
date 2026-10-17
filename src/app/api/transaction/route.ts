export async function POST() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return Response.json({
    success: true,
    txid: "MOCK-ATM-12345",
  });
}