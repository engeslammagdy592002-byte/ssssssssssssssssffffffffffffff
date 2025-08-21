import React from "react";
import { Result } from "../types";
import { Trophy, Medal, Award, User, Hash, BookOpen, Star } from "lucide-react";
import { getCategoryColor, getGradeColor } from "../utils/contestStats";

interface ResultCardProps {
  result: Result;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-8 h-8 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-8 h-8 text-gray-400" />;
    if (rank === 3) return <Award className="w-8 h-8 text-amber-600" />;
    return <Star className="w-8 h-8 text-blue-500" />;
  };

  const getRankText = (rank: number) => {
    if (rank === 1) return "المركز الأول";
    if (rank === 2) return "المركز الثاني";
    if (rank === 3) return "المركز الثالث";
    if (rank <= 10) return `المركز ${rank}`;
    return `الترتيب ${rank}`;
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 animate-fadeIn">
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
        {/* Header with rank */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            {getRankIcon(result.rank!)}
            <h3 className="text-2xl font-bold">{getRankText(result.rank!)}</h3>
          </div>
          <p className="text-blue-100">تهانينا على هذا الإنجاز الرائع!</p>
        </div>

        {/* Student details */}
        <div className="p-8 space-y-6">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <User className="w-6 h-6 text-blue-600" />
            <div className="flex-1 text-right">
              <p className="text-sm text-gray-600 mb-1">اسم الطالب</p>
              <p className="text-xl font-bold text-gray-800">{result.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
            <Hash className="w-6 h-6 text-green-600" />
            <div className="flex-1 text-right">
              <p className="text-sm text-gray-600 mb-1">رقم الطالب</p>
              <p className="text-xl font-bold text-gray-800">{result.no || result.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <BookOpen className="w-6 h-6 text-purple-600" />
            <div className="flex-1 text-right">
              <p className="text-sm text-gray-600 mb-1">الفئة</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                  result.category
                )}`}
              >
                {result.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl">
            <Star className="w-6 h-6 text-yellow-600" />
            <div className="flex-1 text-right">
              <p className="text-sm text-gray-600 mb-1">الدرجة</p>
              <div className="flex items-center justify-end gap-2">
                <span
                  className={`text-3xl font-bold px-4 py-2 rounded-lg ${getGradeColor(
                    result.grade
                  )}`}
                >
                  {result.grade}
                </span>
                <span className="text-lg text-gray-600">من 100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer message */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 text-center">
          <p className="font-semibold">
            {result.grade >= 95
              ? "أداء ممتاز! استمر في التميز"
              : result.grade >= 85
              ? "أداء جيد جداً! مبروك"
              : result.grade >= 75
              ? "أداء جيد! يمكنك تحسين أكثر"
              : "حاول مرة أخرى! النجاح يحتاج إلى مثابرة"}
          </p>
        </div>
      </div>
    </div>
  );
};
