import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  UserPlus, 
  TrendingUp, 
  Award, 
  Target,
  Users,
  Calendar
} from 'lucide-react';
import { mockRegistrationData } from '../mock/mockData';

const RegistrationMetrics = ({ members }) => {
  const totalRegistrations = members.reduce((sum, member) => sum + member.registrationsBrought, 0);
  const avgRegistrationsPerMember = Math.round(totalRegistrations / members.length);
  const topRegistrationBringer = members.reduce((top, member) => 
    member.registrationsBrought > top.registrationsBrought ? member : top
  );

  // Calculate registration performance tiers
  const registrationTiers = members.map(member => {
    let tier = 'Bronze';
    let tierColor = 'bg-orange-100 text-orange-800';
    
    if (member.registrationsBrought >= 15) {
      tier = 'Platinum';
      tierColor = 'bg-purple-100 text-purple-800';
    } else if (member.registrationsBrought >= 12) {
      tier = 'Gold';
      tierColor = 'bg-yellow-100 text-yellow-800';
    } else if (member.registrationsBrought >= 8) {
      tier = 'Silver';
      tierColor = 'bg-gray-100 text-gray-800';
    }
    
    return { ...member, tier, tierColor };
  }).sort((a, b) => b.registrationsBrought - a.registrationsBrought);

  // Calculate monthly growth from mock data
  const monthlyGrowth = mockRegistrationData.map((month, index) => ({
    ...month,
    growth: index > 0 ? ((month.registrations - mockRegistrationData[index - 1].registrations) / mockRegistrationData[index - 1].registrations) * 100 : 0
  }));

  return (
    <div className="space-y-6">
      {/* Key Registration Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Registrations</CardTitle>
            <UserPlus className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRegistrations}</div>
            <p className="text-xs text-blue-100 mt-1">
              Brought by all members
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average per Member</CardTitle>
            <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRegistrationsPerMember}</div>
            <p className="text-xs text-emerald-100 mt-1">
              Team average
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <Award className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{topRegistrationBringer.registrationsBrought}</div>
            <p className="text-xs text-purple-100 mt-1">
              {topRegistrationBringer.name}
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{Math.round(monthlyGrowth[monthlyGrowth.length - 1]?.growth || 0)}%
            </div>
            <p className="text-xs text-orange-100 mt-1">
              Last month vs previous
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Registration Performance Tiers */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Award className="mr-2 h-5 w-5 text-emerald-600" />
            Registration Performance Tiers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {registrationTiers.map((member, index) => (
              <div key={member.id} className="bg-gradient-to-br from-slate-50 to-gray-100 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {index < 3 && (
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        index === 0 ? 'bg-yellow-400 text-yellow-900' 
                        : index === 1 ? 'bg-gray-300 text-gray-800' 
                        : 'bg-orange-300 text-orange-900'
                      }`}>
                        {index + 1}
                      </div>
                    )}
                    <Badge className={member.tierColor}>
                      {member.tier}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Registrations</span>
                    <span className="text-lg font-bold text-gray-900">{member.registrationsBrought}</span>
                  </div>
                  <Progress 
                    value={(member.registrationsBrought / Math.max(...members.map(m => m.registrationsBrought))) * 100} 
                    className="h-2"
                  />
                  <div className="text-xs text-gray-500">
                    {((member.registrationsBrought / totalRegistrations) * 100).toFixed(1)}% of total
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Monthly Registration Trends */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-emerald-600" />
            Monthly Registration Trends
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {monthlyGrowth.map((month, index) => (
              <div key={month.month} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-900">{month.month} 2024</h4>
                  {month.growth > 0 && (
                    <Badge className="bg-green-100 text-green-800">
                      +{month.growth.toFixed(1)}%
                    </Badge>
                  )}
                </div>
                <div className="text-2xl font-bold text-blue-700 mb-1">{month.registrations}</div>
                <div className="text-sm text-blue-600">registrations</div>
                <Progress 
                  value={(month.registrations / Math.max(...mockRegistrationData.map(m => m.registrations))) * 100} 
                  className="mt-2 h-2"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Registration Goals & Targets */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center">
            <Target className="mr-2 h-5 w-5" />
            Registration Goals & Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-emerald-100 mb-2">Current Performance</h4>
              <div className="text-3xl font-bold">{totalRegistrations}</div>
              <p className="text-emerald-200 text-sm">Total registrations</p>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-100 mb-2">Monthly Target</h4>
              <div className="text-3xl font-bold">75</div>
              <p className="text-emerald-200 text-sm">
                {totalRegistrations >= 75 ? '✓ Target achieved!' : `${75 - totalRegistrations} more needed`}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-emerald-100 mb-2">Success Rate</h4>
              <div className="text-3xl font-bold">{Math.round((totalRegistrations / 75) * 100)}%</div>
              <p className="text-emerald-200 text-sm">Of monthly goal</p>
            </div>
          </div>
          <div className="mt-4">
            <Progress 
              value={(totalRegistrations / 75) * 100} 
              className="h-3 bg-emerald-400/30"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationMetrics;