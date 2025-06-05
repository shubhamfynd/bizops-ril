export const tasks = [
  {
    id: 1,
    title: "Observe customer reactions to n...",
    priority: "High Priority",
    type: "Ad-Hoc",
    due: "2:30 PM",
    assignee: "Shrinivas Reddy",
    group: "my",
    adhocDetails: {}
  },
  {
    id: 2,
    title: "Complete category audit survey f...",
    priority: "High Priority",
    type: "Surveys",
    due: "2:30 PM",
    assignee: "Shrinivas Reddy",
    group: "my",
    adhocDetails: {}
  },
  {
    id: 3,
    title: "Fill in the category checklist form",
    priority: "Medium Priority",
    type: "Checklist",
    due: "2:30 PM",
    assignee: "Shrinivas Reddy",
    group: "my",
    checklistDetails: {}
  },
  {
    id: 4,
    title: "Observe customer reactions to n...",
    priority: "High Priority",
    type: "Ad-Hoc",
    due: "2:30 PM",
    assignee: "Brijesh Chaturvedi",
    group: "other",
    adhocDetails: {}
  },
  {
    id: 5,
    title: "Fill in the category checklist form",
    priority: "Medium Priority",
    type: "Checklist",
    due: "2:30 PM",
    assignee: "Shivanghi Srivast...",
    group: "other",
    checklistDetails: {}
  },
  {
    id: 6,
    title: "Track incoming deliveries from w...",
    priority: "New",
    type: null,
    due: "2:30 PM",
    assignee: "Jossy Thomas",
    group: "other",
    adhocDetails: null,
    checklistDetails: null
  },
  {
    id: 7,
    title: "Assist customers in zone 04",
    priority: "New",
    type: null,
    due: "2:30 PM",
    assignee: "--",
    group: "other",
    adhocDetails: null,
    checklistDetails: null
  },
  {
    id: 8,
    title: "Assist customers in zone 04",
    priority: "New",
    type: null,
    due: "2:30 PM",
    assignee: "--",
    group: "other",
    adhocDetails: null,
    checklistDetails: null
  },
  {
    id: 9,
    title: "Assist customers in zone 04",
    priority: "New",
    type: null,
    due: "2:30 PM",
    assignee: "--",
    group: "other",
    adhocDetails: null,
    checklistDetails: null
  },
  {
    id: 10,
    title: "Customer Service",
    priority: "High Priority",
    type: "Ad-Hoc",
    due: "2:30 PM",
    assignee: "Shrinivas Reddy",
    group: "my",
    adhocDetails: {}
  },
  {
    id: 11,
    title: "Vendor Relations",
    priority: "High Priority",
    type: "Ad-Hoc",
    due: "2:30 PM",
    assignee: "Shrinivas Reddy",
    group: "my",
    adhocDetails: {}
  }
];

export const adhocDetailsTemplate = {
  description: "Observe and note customer reactions to recently launched products to gain insights into their initial perception and interest levels. This can help refine marketing strategies and improve product placements.",
  keyMetrics: [
    {
      title: "Customer Behaviour & Sentiments",
      items: [
        "Note if customers approach the product naturally or need guidance.",
        "Pay attention to customer facial expressions and body language and listen for any verbal feedback, like comments on design, pricing, or quality.",
        "Observe if customers pick up the product, inspect the packaging, or compare it with similar items."
      ]
    },
    {
      title: "Interaction Duration",
      items: [
        "Track how long customers engage with the product.",
        "Note if they add it to their cart, leave it behind, or ask for more information.",
        "Observe if customers compare the product with similar items from other brands."
      ]
    },
    {
      title: "Feedback Collection",
      items: [
        "Ask a few customers for quick, informal feedback if appropriate."
      ]
    }
  ]
};

export const checklistDetailsTemplate = {
  questionsCount: 7,
  questions: [
    {
      question: "Which product category requires immediate restocking?",
      options: [
        "Grocery & Staples",
        "Biscuits & Snacks",
        "Beverages",
        "Personal Care & Hygiene"
      ]
    },
    {
      question: "Which section needs better organization or shelf arrangement?",
      options: [
        "Grocery & Staples",
        "Biscuits & Snacks",
        "Beverages",
        "Personal Care & Hygiene"
      ]
    },
    {
      question: "Which product category has the highest demand this week?",
      options: [
        "Grocery & Staples",
        "Biscuits & Snacks",
        "Beverages",
        "Personal Care & Hygiene"
      ]
    },
    {
      question: "Which category requires a price tag update or correction?",
      options: [
        "Frozen Foods",
        "Packaged Grains and Pulses",
        "Household Cleaning Supplies",
        "Fresh Meat and Poultry"
      ]
    },
    {
      question: "Which section needs improved visibility or better shelf placement?",
      options: [
        "Confectionery and Chocolates",
        "Health and Wellness Products",
        "Pet Food and Supplies",
        "Personal Care & Hygiene"
      ]
    },
    {
      question: "Which product category is facing frequent stockouts?",
      options: [
        "Grocery & Staples",
        "Biscuits & Snacks",
        "Beverages",
        "Personal Care & Hygiene"
      ]
    },
    {
      question: "Which section needs better signage or promotional displays?",
      options: [
        "Grocery & Staples",
        "Biscuits & Snacks",
        "Beverages",
        "Personal Care & Hygiene"
      ]
    }
  ]
};

for (const t of tasks) {
  if (t.type === 'Ad-Hoc') {
    t.adhocDetails = {...adhocDetailsTemplate};
  }
  if (t.type === 'Checklist') {
    t.checklistDetails = {...checklistDetailsTemplate};
  }
} 
