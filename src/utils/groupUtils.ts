import { Student } from '../types';

export interface Group {
  id: number;
  members: Student[];
}

export const createGroups = (students: Student[], size: number): Group[] => {
  if (students.length < 4) {
    throw new Error('საჭიროა მინიმუმ 4 მოსწავლე ჯგუფების შესაქმნელად');
  }

  const maxGroups = Math.floor(students.length / 2);
  const actualGroupSize = Math.min(size, maxGroups * 2);
  
  const shuffled = [...students].sort(() => Math.random() - 0.5);
  const newGroups: Group[] = [];
  const numGroups = Math.floor(shuffled.length / actualGroupSize);
  
  // Create initial groups
  for (let i = 0; i < numGroups; i++) {
    newGroups.push({
      id: Date.now() + i,
      members: shuffled.slice(i * actualGroupSize, (i + 1) * actualGroupSize)
    });
  }

  // Distribute remaining students fairly
  const remaining = shuffled.slice(numGroups * actualGroupSize);
  remaining.forEach((student, index) => {
    newGroups[index % newGroups.length].members.push(student);
  });

  // Ensure minimum group size of 2
  if (newGroups.length >= 2 && newGroups.some(g => g.members.length < 2)) {
    const lastGroup = newGroups.pop()!;
    newGroups[newGroups.length - 1].members.push(...lastGroup.members);
  }

  return newGroups;
};
