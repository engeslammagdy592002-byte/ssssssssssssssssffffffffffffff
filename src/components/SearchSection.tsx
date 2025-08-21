import React, { useState } from 'react';
import { Search, User, AlertCircle, Clock, BookOpen } from 'lucide-react';
import { Student, Result } from '../types';
import { searchResults } from '../utils/api';

interface SearchSectionProps {
  students: Student[];
  onResult: (result: Result | null) => void;
  isDarkMode?: boolean;
}

export const SearchSection: React.FC<SearchSectionProps> = ({ students, onResult, isDarkMode = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      onResult(null);
      setSearchError('');
      return;
    }

    // التحقق من أن الاسم يحتوي على كلمتين على الأقل
    const nameParts = searchTerm.trim().split(/\s+/);
    if (nameParts.length < 2) {
      setSearchError('يجب كتابة الاسم ثنائي على الأقل (الاسم الأول والثاني)');
      onResult(null);
      return;
    }

    setSearchError('');
    setIsLoading(true);
    
    try {
      const results = await searchResults(searchTerm);
      if (results.length > 0) {
        onResult(results[0]); // إرجاع أول نتيجة
      } else {
        onResult(null);
      }
    } catch (error: any) {
      console.error('Search error:', error);
      setSearchError(error.message || 'حدث خطأ أثناء البحث');
      onResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className={`py-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slideInDown">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Search className="w-12 h-12 text-blue-600 animate-bounce-slow" />
              <h2 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-gray-100' : 'gradient-text-animated'}`}>
                البحث عن النتائج
              </h2>
            </div>
            <p className={`text-xl mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              ابحث عن نتيجتك باستخدام الاسم أو رقم الطالب
            </p>
          </div>

          {/* Search Section */}
          <div className={`p-8 rounded-3xl shadow-2xl transition-colors duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-2 border-gray-600/50' 
              : 'bg-gradient-to-r from-white to-blue-50 border-2 border-blue-200'
          }`}>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className={`flex rounded-2xl overflow-hidden border-2 focus-within:border-blue-500 transition-all duration-300 shadow-lg ${
                  isDarkMode ? 'border-gray-600 bg-gray-800' : 'border-gray-200 bg-white'
                }`}>
                  <div className={`px-6 py-4 flex items-center ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <User className={`w-6 h-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`} />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="ادخل الاسم الثنائي للطالب (مثال: أحمد محمد)..."
                    className={`flex-1 px-6 py-4 text-right focus:outline-none text-lg transition-colors duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-gray-100 placeholder-gray-400' 
                        : 'bg-white text-gray-900 placeholder-gray-500'
                    }`}
                    dir="rtl"
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className={`px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 font-bold text-lg transform hover:scale-105 shadow-xl ${
                  isLoading
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl hover:shadow-blue-500/25'
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    جاري البحث...
                  </>
                ) : (
                  <>
                    <Search className="w-6 h-6" />
                    بحث عن النتيجة
                  </>
                )}
              </button>
            </div>
            
            {/* رسالة خطأ */}
            {searchError && (
              <div className={`mt-6 p-4 rounded-xl border-2 text-center animate-fadeIn ${
                isDarkMode 
                  ? 'bg-red-900/30 border-red-600/50 text-red-300' 
                  : 'bg-red-100 border-red-300 text-red-700'
              }`}>
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">{searchError}</span>
                </div>
              </div>
            )}
            
            {/* رسالة توضيحية */}
            <div className={`mt-6 p-6 rounded-2xl border-2 text-center transition-colors duration-300 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-600/50' 
                : 'bg-gradient-to-r from-green-100 to-blue-100 border-green-300'
            }`}>
              <div className="flex justify-center items-center gap-3 mb-4">
                <BookOpen className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'} animate-bounce-slow`} />
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                  البحث عن النتائج متاح الآن
                </h3>
              </div>
              <p className={`text-lg ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                اكتب الاسم الثنائي للطالب للبحث عن نتيجته في المسابقة
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};