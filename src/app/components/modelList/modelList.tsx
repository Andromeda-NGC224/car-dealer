interface Model {
  Model_ID: number;
  Model_Name: string;
}

export function ModelList({ models }: { models: Model[] }) {
  return (
    <ul className="space-y-4 p-8 border rounded-md backdrop-blur-sm">
      {models.map((model) => (
        <li
          key={model.Model_ID}
          className="bg-transperant rounded p-4 shadow-lg shadow-zinc-950	 border-l-4 border-zinc-800
          "
        >
          {model.Model_Name}
        </li>
      ))}
    </ul>
  );
}
