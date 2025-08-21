import React, { useState, useEffect } from 'react';
import { Users, Trophy, TrendingUp, Target } from 'lucide-react';
import { ContestStats } from '../types';
import { getResultsStats } from '../utils/api';

interface StatsSectionProps {
  stats: ContestStats;
  isDarkMode?: boolean;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ stats, isDarkMode = false }) => {
  const [resultsStats, setResultsStats] = useState({
    totalStudents: 0,
    averageGrade: 0,
    topGrade: 0,
    categoriesCount: {} as { [key: string]: number }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadResultsStats();
  }, []);

  const loadResultsStats = async () => {
    try {
      setIsLoading(true);


      const stats = await getResultsStats();
      setResultsStats(stats);
    } catch (error) {
      console.error('Error loading results stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={`py-16 transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-700' 
        : 'bg-gradient-to-br from-blue-50 to-purple-50'
    }`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          إحصائيات المسابقة
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white'
          }`}>
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
              <Users className="w-8 h-8 text-green-600 animate-bounce-slow" />
            </div>
            <h3 className={`text-3xl font-bold mb-2 transition-all duration-300 ${
              isDarkMode ? 'text-green-400' : 'text-green-600'
            }`}>
              {isLoading ? (
                <div className="inline-block w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                resultsStats.totalStudents.toLocaleString('ar-EG')
              )}
            </h3>
            <p className={`font-semibold ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
              إجمالي الطلاب المشاركين
            </p>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white'
          }`}>
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
              <Trophy className="w-8 h-8 text-yellow-600 animate-bounce-slow" />
            </div>
            <h3 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-yellow-400' : 'text-yellow-600'
            }`}>
              {resultsStats.topGrade > 0 ? resultsStats.topGrade : 'لا توجد نتائج'}
            </h3>
            <p className={`font-semibold ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
              أعلى درجة
            </p>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white'
          }`}>
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
              <TrendingUp className="w-8 h-8 text-purple-600 animate-bounce-slow" />
            </div>
            <h3 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-purple-400' : 'text-purple-600'
            }`}>
              {resultsStats.averageGrade > 0 ? resultsStats.averageGrade : 'لا توجد نتائج'}
            </h3>
            <p className={`font-semibold ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>
              المتوسط العام
            </p>
          </div>

          <div className={`p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center ${
            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white'
          }`}>
            <div className="bg-gradient-to-r from-blue-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
              <Target className="w-8 h-8 text-blue-600 animate-bounce-slow" />
            </div>
            <h3 className={`text-3xl font-bold mb-2 ${
              isDarkMode ? 'text-blue-400' : 'text-blue-600'
            }`}>
              {Object.keys(resultsStats.categoriesCount).length || 8}
            </h3>
            <p className={`font-semibold ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>
              عدد الفئات
            </p>
          </div>
        </div>

        <div className={`mt-12 p-8 rounded-2xl shadow-lg transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-700' : 'bg-white'
        }`}>
          <h3 className={`text-2xl font-bold text-center mb-6 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>الفئات المشاركة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className={`p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 hover:from-green-800/40 hover:to-emerald-800/40' 
                : 'bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200'
            }`}>
              <p className={`font-bold ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>ثلاثة أجزاء</p>
            </div>
            <div className={`p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-blue-900/30 to-cyan-900/30 hover:from-blue-800/40 hover:to-cyan-800/40' 
                : 'bg-gradient-to-r from-blue-100 to-cyan-100 hover:from-blue-200 hover:to-cyan-200'
            }`}>
              <p className={`font-bold ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>خمسة أجزاء</p>
            </div>
            <div className={`p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-purple-900/30 to-pink-900/30 hover:from-purple-800/40 hover:to-pink-800/40' 
                : 'bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200'
            }`}>
              <p className={`font-bold ${isDarkMode ? 'text-purple-200' : 'text-purple-800'}`}>ثمانية أجزاء</p>
            </div>
            <div className={`p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-orange-900/30 to-yellow-900/30 hover:from-orange-800/40 hover:to-yellow-800/40' 
                : 'bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200'
            }`}>
              <p className={`font-bold ${isDarkMode ? 'text-orange-200' : 'text-orange-800'}`}>عشرة أجزاء</p>
            </div>
            <div className={`p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-teal-900/30 to-green-900/30 hover:from-teal-800/40 hover:to-green-800/40' 
                : 'bg-gradient-to-r from-teal-100 to-green-100 hover:from-teal-200 hover:to-green-200'
            }`}>
              <p className={`font-bold ${isDarkMode ? 'text-teal-200' : 'text-teal-800'}`}>خمسة عشر جزءا</p>
            </div>
            <div className={`p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-indigo-900/30 to-purple-900/30 hover:from-indigo-800/40 hover:to-purple-800/40' 
                : 'bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200'
            }`}>
              <p className={`font-bold ${isDarkMode ? 'text-indigo-200' : 'text-indigo-800'}`}>عشرون جزءا</p>
            </div>
            <div className={`p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-rose-900/30 to-pink-900/30 hover:from-rose-800/40 hover:to-pink-800/40' 
                : 'bg-gradient-to-r from-rose-100 to-pink-100 hover:from-rose-200 hover:to-pink-200'
            }`}>
              <p className={`font-bold ${isDarkMode ? 'text-rose-200' : 'text-rose-800'}`}>خمسة وعشرون جزءا</p>
            </div>
            <div className={`p-4 rounded-xl text-center hover:shadow-lg transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-amber-900/30 to-yellow-900/30 hover:from-amber-800/40 hover:to-yellow-800/40' 
                : 'bg-gradient-to-r from-amber-100 to-yellow-100 hover:from-amber-200 hover:to-yellow-200'
            }`}>
              <p className={`font-bold ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>ثلاثون جزءا</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};