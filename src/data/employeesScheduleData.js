export const employees = Array.from({ length: 31 }, (_, index) => {
  const date = new Date(2024, 11, index + 1) // December 2024
  const formattedDate = date.toISOString().split('T')[0] // Format as YYYY-MM-DD

  return [
    {
      title: `Lisandra Miguel`,
      with: 'Role A',
      isDayOff: false,
      time: { start: `${formattedDate} 08:00`, end: `${formattedDate} 16:00` }, // Morning shift
      color: 'blue',
      isEditable: true,
      id: `${index * 2 + 1}`,
      description: `Morning shift for Lisandra Miguel ${index * 2 + 1}.`,
      daysOff: [], // No predefined days off for simplicity
    },
    {
      title: `Pedro Calado`,
      with: 'Role B',
      isDayOff: false,
      time: { start: `${formattedDate} 16:00`, end: `${formattedDate} 23:59` }, // Evening shift
      color: 'green',
      isEditable: true,
      id: `${index * 2 + 2}`,
      description: `Evening shift for Pedro Calado ${index * 2 + 2}.`,
      daysOff: [],
    },
  ]
}).flat() // Flatten the array to have a single array with all employees
