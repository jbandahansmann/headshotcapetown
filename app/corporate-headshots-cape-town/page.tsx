import ServicePage, { getServiceMetadata } from "../../components/ServicePage";

const SLUG = "corporate-headshots";

export const metadata = getServiceMetadata(SLUG);

export default function Page() {
  return <ServicePage slug={SLUG} />;
}
