export default function SectionTitle({ title, icon }) {
  return (
    <h2 className="flex items-center space-x-2 py-2 px-4 pb-0 font-semibold text-gray-700 md:text-lg">
      <span className={`text-gray-700`}>{icon}</span>
      <span>{title}</span>
    </h2>
  );
}
