import PageShell from "../components/layouts/PageShell";

export default function Home() {
  return (
    <PageShell
      title="Home"
      subtitle="This is a placeholder page. Replace this content as needed."
    >
      {/* Put real home sections here later */}
      <div className="p-3 border rounded">
        <p className="mb-0">Welcome to the company portfolio.</p>
      </div>
    </PageShell>
  );
}
