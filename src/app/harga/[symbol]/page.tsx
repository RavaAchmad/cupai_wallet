import { redirect } from "next/navigation";

export default function HargaDetailRedirect({
  params,
}: {
  params: { symbol: string };
}) {
  redirect(`/pasar/${params.symbol}`);
}