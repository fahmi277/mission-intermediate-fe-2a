import React, { useState, useEffect } from 'react';
import { User, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import APIService from '../../services/api';
import type { User as UserType } from '../../types/user';

interface UserListCardProps {
  onSelectUser?: (email: string, password: string) => void;
  mode?: 'login' | 'register';
}

const UserListCard: React.FC<UserListCardProps> = ({ onSelectUser, mode = 'login' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userData = await APIService.getAllUsers();
        setUsers(userData.slice(0, 5)); // Tampilkan hanya 5 user pertama
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && users.length === 0) {
      fetchUsers();
    }
  }, [isOpen, users.length]);

  const togglePasswordVisibility = (userId: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleUserSelect = (email: string, password: string) => {
    if (onSelectUser) {
      onSelectUser(email, password);
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 flex items-center gap-2"
        title={mode === 'login' ? 'Test Users untuk Login' : 'Sample Users untuk Referensi'}
      >
        <User size={20} />
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Floating Card */}
      {isOpen && (
        <div className="absolute top-14 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 w-80 max-h-96 overflow-y-auto">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              {mode === 'login' ? 'Test Users' : 'Sample Users'}
            </h3>
            <p className="text-xs text-gray-500">
              {mode === 'login' 
                ? 'Klik user untuk auto-fill login form' 
                : 'Klik untuk referensi data user'}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Loading users...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((user, index) => (
                <div
                  key={user.id}
                  className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleUserSelect(user.userEmail, user.userPassword)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                          User {index + 1}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          user.userGender === 'male' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-pink-100 text-pink-800'
                        }`}>
                          {user.userGender}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.userEmail}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-gray-600 font-mono">
                          {showPasswords[user.id] 
                            ? user.userPassword 
                            : '••••••••••••'
                          }
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePasswordVisibility(user.id);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {showPasswords[user.id] ? (
                            <EyeOff size={12} />
                          ) : (
                            <Eye size={12} />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {user.userPhoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-400 text-center">
              💡 Data dari MockAPI - {mode === 'login' ? 'Klik untuk login otomatis' : 'Gunakan sebagai referensi'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserListCard;