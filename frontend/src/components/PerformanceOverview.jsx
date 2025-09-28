import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  UserPlus,
  Target
} from 'lucide-react';

const PerformanceOverview = ({ members, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
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
    );
  }

  const totalMembers = members.length;
  const totalTasksCompleted = members.reduce((sum, member) => sum + member.tasksCompleted, 0);
  const totalTasksPending = members.reduce((sum, member) => sum + member.tasksPending, 0);
  const totalRegistrations = members.reduce((sum, member) => sum + member.registrationsBrought, 0);
  const avgEfficiency = totalMembers > 0 ? Math.round(members.reduce((sum, member) => sum + member.efficiency, 0) / totalMembers) : 0;

  const topPerformer = members.length > 0 ? members.reduce((top, member) => 
    member.efficiency > top.efficiency ? member : top
  ) : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Key Metrics Cards */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Members</CardTitle>
          <Users className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{totalMembers}</div>
          <p className="text-xs text-green-600 mt-1">
            <TrendingUp className="inline h-3 w-3 mr-1" />
            Active committee size
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Tasks Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{totalTasksCompleted}</div>
          <p className="text-xs text-gray-500 mt-1">{totalTasksPending} pending</p>
          <Progress 
            value={(totalTasksCompleted / (totalTasksCompleted + totalTasksPending)) * 100} 
            className="mt-2 h-2"
          />
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Registrations</CardTitle>
          <UserPlus className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{totalRegistrations}</div>
          <p className="text-xs text-green-600 mt-1">
            <Target className="inline h-3 w-3 mr-1" />
            Total brought by team
          </p>
        </CardContent>
      </Card>

      {/* Team Performance Summary */}
      <Card className="md:col-span-2 lg:col-span-3 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Team Performance Summary</CardTitle>
          <CardDescription>Average efficiency: {avgEfficiency}%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {members.map((member) => (
              <div key={member.id} className="bg-gradient-to-br from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{member.name}</h4>
                  <Badge 
                    variant={member.efficiency >= 85 ? "default" : member.efficiency >= 70 ? "secondary" : "destructive"}
                    className={
                      member.efficiency >= 85 
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" 
                        : member.efficiency >= 70
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }
                  >
                    {member.efficiency}%
                  </Badge>
                </div>
                <p className="text-xs text-gray-600 mb-2">{member.role}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tasks:</span>
                    <span className="text-gray-700">{member.tasksCompleted}/{member.totalTasks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Registrations:</span>
                    <span className="text-gray-700">{member.registrationsBrought}</span>
                  </div>
                </div>
                <Progress value={member.efficiency} className="mt-2 h-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Performer Highlight */}
      {topPerformer && (
        <Card className="md:col-span-2 lg:col-span-3 border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Top Performer This Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{topPerformer.name}</h3>
                <p className="text-emerald-100">{topPerformer.role}</p>
                <p className="text-sm text-emerald-200 mt-1">
                  {topPerformer.tasksCompleted} tasks completed • {topPerformer.registrationsBrought} registrations
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{topPerformer.efficiency}%</div>
                <div className="text-emerald-200 text-sm">Efficiency Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PerformanceOverview;