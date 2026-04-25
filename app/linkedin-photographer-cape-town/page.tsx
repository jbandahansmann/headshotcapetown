import ServicePage, { getServiceMetadata } from "../../components/ServicePage";

const SLUG = "linkedin-photographer";

export const metadata = getServiceMetadata(SLUG);

export default function Page() {
  return <ServicePage slug={SLUG} />;
}
