export const workFilters = [
  {
    id: "category",
    label: "Category",
    options: [
      { value: "all", label: "All Categories" },
      { value: "webdev", label: "Web Development" },
      { value: "design", label: "Design" },
      { value: "writing", label: "Writing" },
      { value: "marketing", label: "Marketing" },
    ],
  },
  {
    id: "budget",
    label: "Budget Range",
    options: [
      { value: "all", label: "Any Budget" },
      { value: "0-500", label: "Under $500" },
      { value: "500-2000", label: "$500 - $2000" },
      { value: "2000+", label: "$2000+" },
    ],
  },
  {
    id: "duration",
    label: "Project Duration",
    options: [
      { value: "all", label: "Any Duration" },
      { value: "lessThanWeek", label: "Less than a week" },
      { value: "1-4weeks", label: "1-4 weeks" },
      { value: "1-3months", label: "1-3 months" },
      { value: "3months+", label: "3+ months" },
    ],
  },
  {
    id: "experience",
    label: "Experience Level",
    options: [
      { value: "all", label: "Any Level" },
      { value: "entry", label: "Entry Level" },
      { value: "intermediate", label: "Intermediate" },
      { value: "expert", label: "Expert" },
    ],
  },
];
