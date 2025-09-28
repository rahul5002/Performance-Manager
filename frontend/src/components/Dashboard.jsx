import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import PerformanceOverview from './PerformanceOverview';
import MemberManagement from './MemberManagement';
import TaskAnalytics from './TaskAnalytics';
import RegistrationMetrics from './RegistrationMetrics';
import AddMemberDialog from './AddMemberDialog';
import { mockCommitteeMembers } from '../mock/mockData';

const Dashboard = () => {
  const [members, setMembers] = useState(mockCommitteeMembers);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleAddMember = (newMember) => {
    const member = {
      ...newMember,
      id: String(members.length + 1),
      tasksCompleted: 0,
      tasksPending: 0,
      totalTasks: 0,
      efficiency: 0,
      registrationsBrought: 0,
      performanceHistory: []
    };
    setMembers([...members, member]);
  };

  const handleUpdateMember = (updatedMember) => {
    setMembers(members.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
  };

  const handleDeleteMember = (memberId) => {
    setMembers(members.filter(member => member.id !== memberId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Committee Performance Dashboard</h1>
            <p className="text-gray-600">Track member performance, tasks, and registrations</p>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg transition-all duration-200 hover:shadow-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="members" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              Members
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="registrations" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">
              Registrations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <PerformanceOverview members={members} />
          </TabsContent>

          <TabsContent value="members">
            <MemberManagement 
              members={members}
              onUpdateMember={handleUpdateMember}
              onDeleteMember={handleDeleteMember}
            />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskAnalytics members={members} />
          </TabsContent>

          <TabsContent value="registrations">
            <RegistrationMetrics members={members} />
          </TabsContent>
        </Tabs>

        <AddMemberDialog 
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAddMember={handleAddMember}
        />
      </div>
    </div>
  );
};

export default Dashboard;