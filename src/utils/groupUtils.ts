import { Student } from '../types';

export interface Group {
  id: number;
  members: Student[];
}

export const createGroups = (students: Student[], requestedGroupSize: number): Group[] => {
  if (students.length < 4) {
    throw new Error('საჭიროა მინიმუმ 4 მოსწავლე ჯგუფების შესაქმნელად');
  }

  // Shuffle students
  const shuffled = [...students].sort(() => Math.random() - 0.5);
  
  // Calculate optimal number of groups
  const totalStudents = shuffled.length;
  const numGroups = Math.max(2, Math.ceil(totalStudents / requestedGroupSize));
  
  // Calculate minimum students per group
  const minStudentsPerGroup = Math.floor(totalStudents / numGroups);
  const extraStudents = totalStudents % numGroups;

  // Create groups array
  const groups: Group[] = [];
  let currentIndex = 0;

  // Create groups with distributed students
  for (let i = 0; i < numGroups && currentIndex < totalStudents; i++) {
    // Calculate this group's size
    const groupSize = i < extraStudents ? minStudentsPerGroup + 1 : minStudentsPerGroup;
    
    // Only create group if we have at least 2 students for it
    if (groupSize >= 2) {
      groups.push({
        id: Date.now() + i,
        members: shuffled.slice(currentIndex, currentIndex + groupSize)
      });
    }
    currentIndex += groupSize;
  }

  // If we have any remaining students, add them to existing groups
  if (currentIndex < totalStudents) {
    const remaining = shuffled.slice(currentIndex);
    remaining.forEach((student, index) => {
      groups[index % groups.length].members.push(student);
    });
  }

  return groups;
};
