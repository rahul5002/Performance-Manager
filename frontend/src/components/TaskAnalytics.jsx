import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Target
} from 'lucide-react';
import axios from 'axios';

const TaskAnalytics = ({ members, loading }) => {
  const [taskCategories, setTaskCategories] = useState([]);
  const [taskAnalytics, setTaskAnalytics] = useState(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Use environment variable for backend URL
  // In development, falls back to localhost if not set
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 
    (process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : '');
  const API = `${BACKEND_URL}/api`;

  useEffect(() => {
    fetchTaskData();
  }, []);

  const fetchTaskData = async () => {
    try {
      setCategoriesLoading(true);
      const [categoriesResponse, analyticsResponse] = await Promise.all([
        axios.get(`${API}/task-categories`),
        axios.get(`${API}/analytics/tasks`)
      ]);
      setTaskCategories(categoriesResponse.data);
      setTaskAnalytics(analyticsResponse.data);
    } catch (error) {
      console.error('Error fetching task data:', error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  if (loading || categoriesLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  const totalTasks = taskAnalytics?.totalTasks || 0;
  const completedTasks = taskAnalytics?.completedTasks || 0;
  const pendingTasks = taskAnalytics?.pendingTasks || 0;
  const completionRate = taskAnalytics?.completionRate || 0;
  const avgEfficiency = taskAnalytics?.avgEfficiency || 0;

  // Use ranked members from API
  const rankedMembers = taskAnalytics?.rankedMembers || [];

  return (
    <div className="space-y-6">
      {/* Task Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <Target className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTasks}</div>
            <p className="text-xs text-emerald-100 mt-1">
              Across all members
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}</div>
            <p className="text-xs text-green-100 mt-1">
              {completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTasks}</div>
            <p className="text-xs text-amber-100 mt-1">
              {Math.round((pendingTasks / totalTasks) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Efficiency</CardTitle>
            <BarChart3 className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgEfficiency}%
            </div>
            <p className="text-xs text-blue-100 mt-1">
              Team performance
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Task Categories Breakdown */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="mr-2 h-5 w-5 text-emerald-600" />
            Task Categories Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {taskCategories.map((category) => {
              const completionRate = Math.round((category.completed / category.total) * 100);
              return (
                <div key={category.category} className="bg-gradient-to-br from-slate-50 to-gray-100 p-4 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">{category.category}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{completionRate}%</span>
                    </div>
                    <Progress value={completionRate} className="h-2" />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{category.completed} done</span>
                      <span>{category.pending} pending</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Ranking */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-emerald-600" />
            Member Performance Ranking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rankedMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    member.rank === 1 
                      ? 'bg-yellow-400 text-yellow-900' 
                      : member.rank === 2 
                      ? 'bg-gray-300 text-gray-800' 
                      : member.rank === 3
                      ? 'bg-orange-300 text-orange-900'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {member.rank}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{member.tasksCompleted}/{member.totalTasks} tasks</div>
                    <div className="text-sm text-gray-600">{member.registrationsBrought} registrations</div>
                  </div>
                  <Badge 
                    className={`${
                      member.efficiency >= 85 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : member.efficiency >= 70
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {member.efficiency}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Task Distribution by Member */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Task Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => {
              const taskLoad = member.totalTasks;
              const maxTasks = Math.max(...members.map(m => m.totalTasks));
              const loadPercentage = maxTasks > 0 ? (taskLoad / maxTasks) * 100 : 0;
              
              return (
                <div key={member.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-900">{member.name}</span>
                      <span className="text-sm text-gray-600 ml-2">({taskLoad} tasks)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {taskLoad > maxTasks * 0.8 && (
                        <AlertTriangle className="h-4 w-4 text-amber-500" />
                      )}
                      <span className="text-sm font-medium text-gray-700">{taskLoad}</span>
                    </div>
                  </div>
                  <Progress value={loadPercentage} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskAnalytics;