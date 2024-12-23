export interface Student {
  name: string;
  timestamp: number;
  classId: string;
}

export interface Class {
  id: string;
  name: string;
  students: Student[];
}
