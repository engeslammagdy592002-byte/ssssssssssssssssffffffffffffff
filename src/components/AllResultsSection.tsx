import React, { useState } from 'react';
import { Student, Result } from '../types';
import { ChevronDown, ChevronUp, List, Filter, Clock, Calendar, AlertCircle } from 'lucide-react';
import { getCategoryColor, getGradeColor } from '../utils/contestStats';
import { getAllResults } from '../utils/api';

interface AllResultsSectionProps {
  students: Student[];
  isDarkMode?: boolean;
}

export const AllResultsSection: React.FC<AllResultsSectionProps> = ({ students, isDarkMode = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [contestStarted] = useState(true); // المسابقة بدأت والنتائج متاحة
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const categories = [...new Set(results.map(r => r.category))];
  const filteredResults = selectedCategory === 'all' 
    ? results 
    : results.filter(r => r.category === selectedCategory);

  const loadResults = async () => {
    setIsLoading(true);
    try {
      const allResults = await getAllResults();
      setResults(allResults);
    } catch (error) {
      console.error('Error loading results:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && results.length === 0) {
      loadResults();
    }
  };

  return (
    <section className={`py-16 transition-colors duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <button
            onClick={handleExpand}
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-3 mx-auto font-semibold text-lg transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <List className="w-6 h-6 group-hover:animate-bounce" />
            عرض جميع النتائج
            {isExpanded ? <ChevronUp className="w-5 h-5 group-hover:animate-bounce" /> : <ChevronDown className="w-5 h-5 group-hover:animate-bounce" />}
          </button>
        </div>

        {isExpanded && (
          <div className="animate-fadeIn">
            {isLoading ? (
              <div className="text-center py-16">
                <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  جاري تحميل النتائج...
                </p>
              </div>
            ) : results.length === 0 ? (
              /* Contest not started message */
              <div className="max-w-2xl mx-auto">
                <div className={`border-2 rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-orange-900/20 via-yellow-900/20 to-amber-900/20 border-orange-600/50' 
                    : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 border-orange-200'
                }`}>
                  {/* Background decorative elements */}
                  <div className={`absolute top-4 right-4 opacity-30 ${isDarkMode ? 'text-orange-400' : 'text-orange-200'}`}>
                    <Clock className="w-16 h-16 animate-spin-slow" />
                  </div>
                  <div className={`absolute bottom-4 left-4 opacity-20 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-200'}`}>
                    <Calendar className="w-12 h-12 animate-bounce-slow" />
                  </div>
                  
                  <div className="text-center relative z-10">
                    <div className="flex justify-center items-center gap-3 mb-6">
                      <AlertCircle className={`w-12 h-12 animate-pulse ${isDarkMode ? 'text-orange-400' : 'text-orange-500'}`} />
                      <Clock className={`w-12 h-12 animate-tick ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`} />
                    </div>
                    
                    <h3 className={`text-3xl md:text-4xl font-bold mb-4 animate-fadeInScale ${isDarkMode ? 'text-orange-200' : 'text-orange-800'}`}>
                      لا توجد نتائج متاحة حالياً
                    </h3>
                    
                    <div className={`backdrop-blur-sm rounded-2xl p-6 mb-6 border transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/70 border-orange-600/30' 
                        : 'bg-white/70 border-orange-100'
                    }`}>
                      <p className={`text-lg md:text-xl leading-relaxed mb-4 ${isDarkMode ? 'text-orange-200' : 'text-orange-700'}`}>
                        النتائج ستكون متاحة قريباً إن شاء الله
                      </p>
                      <p className={`font-semibold ${isDarkMode ? 'text-orange-300' : 'text-orange-600'}`}>
                        يرجى المحاولة مرة أخرى لاحقاً
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className={`p-4 rounded-xl border transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-600/50' 
                          : 'bg-gradient-to-r from-blue-100 to-blue-200 border-blue-200'
                      }`}>
                        <Calendar className={`w-8 h-8 mx-auto mb-2 animate-bounce-slow ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                        <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-blue-200' : 'text-blue-800'}`}>تابع الجدول</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>راجع مواعيد الاختبارات</p>
                      </div>
                      
                      <div className={`p-4 rounded-xl border transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-600/50' 
                          : 'bg-gradient-to-r from-green-100 to-green-200 border-green-200'
                      }`}>
                        <AlertCircle className={`w-8 h-8 mx-auto mb-2 animate-pulse ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                        <h4 className={`font-bold mb-1 ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>استعد للمسابقة</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>احفظ الأجزاء المطلوبة</p>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border transition-colors duration-300 ${
                        isDarkMode 
                          ? 'bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-600/50' 
                          : 'bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200'
                      }`}>
                        <Clock className={`w-5 h-5 animate-tick ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`} />
                        <span className={`font-semibold ${isDarkMode ? 'text-amber-200' : 'text-amber-800'}`}>سيتم الإعلان عن النتائج فور انتهاء التصحيح</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Filter section */}
                {categories.length > 0 && (
                <div className={`p-6 rounded-xl mb-8 transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-4 justify-center flex-wrap">
                    <Filter className={`w-5 h-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedCategory === 'all' 
                          ? 'bg-blue-600 text-white' 
                          : isDarkMode
                          ? 'bg-gray-600 text-blue-400 hover:bg-gray-500'
                          : 'bg-white text-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      جميع الفئات
                    </button>
                    {categories.map(category => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full transition-all ${
                          selectedCategory === category 
                            ? 'bg-blue-600 text-white' 
                            : isDarkMode
                            ? 'bg-gray-600 text-blue-400 hover:bg-gray-500'
                            : 'bg-white text-blue-600 hover:bg-blue-50'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                )}

                {/* Results table */}
                <div className={`rounded-2xl shadow-lg overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <tr>
                          <th className="px-6 py-4 text-center">الترتيب</th>
                          <th className="px-6 py-4 text-center">الاسم</th>
                          <th className="px-6 py-4 text-center">رقم الطالب</th>
                          <th className="px-6 py-4 text-center">الفئة</th>
                          <th className="px-6 py-4 text-center">الدرجة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResults.slice(0, 50).map((result, index) => (
                          <tr key={result.id} className={`border-b transition-colors ${
                            isDarkMode 
                              ? 'border-gray-600 hover:bg-gray-600' 
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                                result.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                                result.rank === 2 ? 'bg-gray-100 text-gray-800' :
                                result.rank === 3 ? 'bg-amber-100 text-amber-800' :
                                'bg-blue-100 text-blue-800'
                              }`}>
                                {result.rank}
                              </span>
                            </td>
                            <td className={`px-6 py-4 text-center font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
                              {result.name}
                            </td>
                            <td className={`px-6 py-4 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              {result.no || result.id}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(result.category)}`}>
                                {result.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className={`inline-block px-3 py-1 rounded-lg font-bold text-lg ${getGradeColor(result.grade)}`}>
                                {result.grade}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {filteredResults.length > 50 && (
                    <div className={`p-4 text-center transition-colors duration-300 ${
                      isDarkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-50 text-gray-600'
                    }`}>
                      عرض أول 50 نتيجة من أصل {filteredResults.length} نتيجة
                    </div>
                  )}
                </div>
              </>
            )}
            
            {/* Quran Verse */}
            <div className={`border rounded-2xl p-6 mt-8 text-center transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-600/50' 
                : 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200'
            }`}>
              <p className={`text-xl md:text-2xl font-bold mb-2 ${isDarkMode ? 'text-yellow-200' : 'text-yellow-800'}`} style={{
                textShadow: '0 0 10px rgba(255, 193, 7, 0.5), 0 0 20px rgba(255, 193, 7, 0.3)'
              }}>
                "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا"
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                صدق الله العظيم - سورة المزمل
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};