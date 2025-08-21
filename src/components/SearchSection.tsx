                            className={`absolute bottom-4 left-4 opacity-20 ${
                              isDarkMode ? "text-orange-400" : "text-orange-200"
                            }`}
                          >
                            <BookOpen className="w-12 h-12 animate-bounce-slow" />
                          </div>

                          <div className="text-center relative z-10">
                            <div className="flex justify-center items-center gap-3 mb-6">
                              <AlertCircle
                                className={`w-12 h-12 animate-pulse ${
                                  isDarkMode
                                    ? "text-red-400"
                                    : "text-red-500"
                                }`}
                              />
                            </div>

                            <h3
                              className={`text-3xl md:text-4xl font-bold mb-4 animate-fadeInScale ${
                                isDarkMode ? "text-red-200" : "text-red-800"
                              }`}
                            >
                              لم يتم العثور على النتيجة
                            </h3>

                            <div
                              className={`backdrop-blur-sm rounded-2xl p-6 mb-6 border transition-colors duration-300 ${
                                isDarkMode
                                  ? "bg-gray-800/70 border-red-600/30"
                                  : "bg-white/70 border-red-100"
                              }`}
                            >
                              <p
                                className={`text-lg md:text-xl leading-relaxed mb-4 ${
                                  isDarkMode
                                    ? "text-red-200"
                                    : "text-red-700"
                                }`}
                              >
                                لم يتم العثور على نتيجة لهذا الاسم
                              </p>
                              <p
                                className={`font-semibold ${
                                  isDarkMode
                                    ? "text-red-300"
                                    : "text-red-600"
                                }`}
                              >
                                تأكد من كتابة الاسم بشكل صحيح أو تواصل مع إدارة المسابقة
                              </p>
                            </div>
                          </div>
                        </div>
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
                ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-600/50' 
                : 'bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300'
    }
                          className={`border-2 rounded-3xl p-8 shadow-2xl relative overflow-hidden transition-colors duration-300 ${
                <BookOpen className={`w-8 h-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'} animate-bounce-slow`} />
                            isDarkMode
                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-green-200' : 'text-green-800'}`}>
                              ? "bg-gradient-to-br from-red-900/20 via-orange-900/20 to-red-900/20 border-red-600/50"
                  النتائج متاحة الآن!
                              : "bg-gradient-to-br from-red-50 via-orange-50 to-red-50 border-red-200"
                </h3>
                          }`}
              </div>
                        >
              <p className={`text-lg ${isDarkMode ? 'text-green-300' : 'text-green-700'}`}>
                          {/* Background decorative elements */}
                يمكنك الآن البحث عن نتيجتك في مسابقة المولد النبوي الشريف
                          <div
              </p>
                            className={`absolute top-4 right-4 opacity-30 ${
            </div>
                              isDarkMode ? "text-red-400" : "text-red-200"
          </div>
                            }`}
        </div>
                          >
      </div>
                            <AlertCircle className="w-16 h-16 animate-pulse" />
    </section>
                          </div>
  );
                          <div
};