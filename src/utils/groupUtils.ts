import { Student } from '../types';

export interface Group {
  id: number;
  members: Student[];
}

export const createGroups = (students: Student[], requestedSize: number): Group[] => {
  if (students.length < 4) {
    throw new Error('საჭიროა მინიმუმ 4 მოსწავლე ჯგუფების შესაქმნელად');
  }

  // Shuffle students
  const shuffled = [...students].sort(() => Math.random() - 0.5);
  
  // Calculate optimal number of groups to minimize size difference
  const totalStudents = shuffled.length;
  const minGroupSize = 2;
  const maxGroups = Math.floor(totalStudents / minGroupSize);
  const numGroups = Math.min(
    Math.ceil(totalStudents / requestedSize), // Requested number of groups
    maxGroups // Maximum possible groups with min 2 students
  );

  // Initialize groups
  const groups: Group[] = Array.from({ length: numGroups }, (_, i) => ({
    id: Date.now() + i,
    members: []
  }));

  // Calculate base size and remainder
  const baseSize = Math.floor(totalStudents / numGroups);
  const remainder = totalStudents % numGroups;

  // Distribute students evenly
  let currentIndex = 0;
  
  // First, distribute base size + 1 to first 'remainder' groups
  for (let i = 0; i < remainder; i++) {
    groups[i].members = shuffled.slice(currentIndex, currentIndex + baseSize + 1);
    currentIndex += baseSize + 1;
  }
  
  // Then distribute base size to remaining groups
  for (let i = remainder; i < numGroups; i++) {
    groups[i].members = shuffled.slice(currentIndex, currentIndex + baseSize);
    currentIndex += baseSize;
  }

  return groups;
};
