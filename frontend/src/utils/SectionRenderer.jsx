export default function SectionRenderer({ render }) {
  return typeof render === "function" ? render() : null;
}
