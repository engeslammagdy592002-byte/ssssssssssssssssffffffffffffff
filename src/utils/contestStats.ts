import { Student, ContestStats } from '../types';

export const calculateStats = (students: Student[]): ContestStats => {
  const categories = [...new Set(students.map(s => s.category))];
  const totalStudents = students.length;
  const averageGrade = Math.round(students.reduce((sum, s) => sum + s.grade, 0) / totalStudents);
  const topGrade = Math.max(...students.map(s => s.grade));

  return {
    totalStudents,
    categories,
    averageGrade,
    topGrade
  };
};

export const getCategoryColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    "ثلاثة أجزاء": "bg-blue-100 text-blue-800",
    "خمسة أجزاء": "bg-green-100 text-green-800",
    "ثمانية أجزاء": "bg-purple-100 text-purple-800",
    "عشرة أجزاء": "bg-orange-100 text-orange-800",
    "خمسة عشر جزءا": "bg-pink-100 text-pink-800",
    "عشرون جزءا": "bg-indigo-100 text-indigo-800",
    "خمسة وعشرون جزءا": "bg-yellow-100 text-yellow-800",
    "ثلاثون جزءا": "bg-red-100 text-red-800"
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

export const getGradeColor = (grade: number): string => {
  if (grade >= 95) return "text-green-600 bg-green-50";
  if (grade >= 85) return "text-blue-600 bg-blue-50";
  if (grade >= 75) return "text-yellow-600 bg-yellow-50";
  return "text-red-600 bg-red-50";
};