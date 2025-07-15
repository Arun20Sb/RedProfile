export function parsePersonaTxt(text) {
  const sections = text.split(/\*\*([A-Z &]+)\*\*/g);
  const result = {};

  for (let i = 1; i < sections.length; i += 2) {
    const section = sections[i].trim().toLowerCase().replace(/ /g, "_");
    const content = sections[i + 1].trim();
    result[section] = content;
  }

  // Extract BASIC INFO
  const basicLines = result.basic_info?.split("\n") || [];
  const basic_info = {};
  for (let line of basicLines) {
    const [k, ...v] = line.split(":");
    basic_info[k.trim().toLowerCase()] = v.join(":").trim();
  }

  // Parse traits
  const traits =
    result.personality_traits?.split(",").map((t) => t.trim()) || [];

  // Parse motivations (label: number)
  const motivations = {};
  result.motivations?.split("\n").forEach((line) => {
    const [k, v] = line.split(":");
    if (k && v) motivations[k.trim()] = Number(v.trim());
  });

  // Parse personality scales
  const personality = {};
  result.personality_scales?.split("\n").forEach((line) => {
    const [k, v] = line.split(":");
    if (k && v) personality[k.trim()] = Number(v.trim());
  });

  // Lists (like habits, goals, frustrations)
  // Lists (like habits, goals, frustrations)
  const parseList = (block) =>
    block
      ?.split("\n")
      .filter((line) => line.startsWith("-"))
      .map((line) => line.replace("- ", "").trim()) || [];

  const habits = parseList(result["behaviour_&_habits"]);
  const goals = parseList(result["goals_&_needs"]);
  const frustrations = parseList(result.frustrations);

  // Quote
  const quote = result.quote?.replace(/^"|"$/g, "").trim();

  return {
    basic_info,
    traits,
    motivations,
    personality,
    habits,
    goals,
    frustrations,
    quote,
  };
}
