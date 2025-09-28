// Mock data for committee performance dashboard
export const mockCommitteeMembers = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Team Lead",
    contact: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    tasksCompleted: 15,
    tasksPending: 3,
    totalTasks: 18,
    efficiency: 85,
    registrationsBrought: 12,
    performanceHistory: [
      { month: "Jan", score: 78 },
      { month: "Feb", score: 82 },
      { month: "Mar", score: 85 }
    ]
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Marketing Coordinator", 
    contact: "michael.chen@email.com",
    phone: "+1 (555) 234-5678",
    tasksCompleted: 22,
    tasksPending: 5,
    totalTasks: 27,
    efficiency: 92,
    registrationsBrought: 18,
    performanceHistory: [
      { month: "Jan", score: 88 },
      { month: "Feb", score: 90 },
      { month: "Mar", score: 92 }
    ]
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Event Coordinator",
    contact: "emily.rodriguez@email.com", 
    phone: "+1 (555) 345-6789",
    tasksCompleted: 11,
    tasksPending: 7,
    totalTasks: 18,
    efficiency: 72,
    registrationsBrought: 8,
    performanceHistory: [
      { month: "Jan", score: 75 },
      { month: "Feb", score: 70 },
      { month: "Mar", score: 72 }
    ]
  },
  {
    id: "4", 
    name: "David Kim",
    role: "Outreach Specialist",
    contact: "david.kim@email.com",
    phone: "+1 (555) 456-7890",
    tasksCompleted: 19,
    tasksPending: 2,
    totalTasks: 21,
    efficiency: 88,
    registrationsBrought: 15,
    performanceHistory: [
      { month: "Jan", score: 85 },
      { month: "Feb", score: 87 },
      { month: "Mar", score: 88 }
    ]
  },
  {
    id: "5",
    name: "Lisa Thompson",
    role: "Communications Manager",
    contact: "lisa.thompson@email.com",
    phone: "+1 (555) 567-8901", 
    tasksCompleted: 13,
    tasksPending: 4,
    totalTasks: 17,
    efficiency: 79,
    registrationsBrought: 10,
    performanceHistory: [
      { month: "Jan", score: 76 },
      { month: "Feb", score: 78 },
      { month: "Mar", score: 79 }
    ]
  }
];

export const mockTaskCategories = [
  { category: "Event Planning", completed: 25, pending: 8, total: 33 },
  { category: "Marketing", completed: 18, pending: 5, total: 23 },
  { category: "Outreach", completed: 22, pending: 4, total: 26 },
  { category: "Administration", completed: 15, pending: 7, total: 22 }
];

export const mockRegistrationData = [
  { month: "Jan", registrations: 35 },
  { month: "Feb", registrations: 42 },
  { month: "Mar", registrations: 53 }
];