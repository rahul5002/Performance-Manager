import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  CheckCircle, 
  Clock,
  UserPlus
} from 'lucide-react';
import EditMemberDialog from './EditMemberDialog';

const MemberManagement = ({ members, onUpdateMember, onDeleteMember, loading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMember, setEditingMember] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditMember = (member) => {
    setEditingMember(member);
    setIsEditDialogOpen(true);
  };

  const handleUpdateMember = (updatedMember) => {
    onUpdateMember(updatedMember);
    setIsEditDialogOpen(false);
    setEditingMember(null);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Member Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <div className="text-sm text-gray-600 flex items-center">
              {filteredMembers.length} of {members.length} members
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card key={member.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mt-1 bg-emerald-100 text-emerald-800">
                    {member.role}
                  </Badge>
                </div>
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditMember(member)}
                    className="h-8 w-8 p-0 hover:bg-emerald-100"
                  >
                    <Edit className="h-4 w-4 text-emerald-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteMember(member.id)}
                    className="h-8 w-8 p-0 hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2 text-gray-400" />
                  {member.contact}
                </div>
                {member.phone && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {member.phone}
                  </div>
                )}
              </div>

              {/* Performance Metrics */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">Efficiency</span>
                    <span className="text-sm font-semibold text-gray-900">{member.efficiency}%</span>
                  </div>
                  <Progress value={member.efficiency} className="h-2" />
                </div>

                {/* Task Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-3 rounded-lg border border-emerald-100">
                    <div className="flex items-center justify-between">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-lg font-bold text-emerald-700">{member.tasksCompleted}</span>
                    </div>
                    <p className="text-xs text-emerald-600 mt-1">Completed</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-lg border border-amber-100">
                    <div className="flex items-center justify-between">
                      <Clock className="h-4 w-4 text-amber-600" />
                      <span className="text-lg font-bold text-amber-700">{member.tasksPending}</span>
                    </div>
                    <p className="text-xs text-amber-600 mt-1">Pending</p>
                  </div>
                </div>

                {/* Registrations */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg border border-blue-100">
                  <div className="flex items-center justify-between">
                    <UserPlus className="h-4 w-4 text-blue-600" />
                    <span className="text-lg font-bold text-blue-700">{member.registrationsBrought}</span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">Registrations Brought</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMembers.length === 0 && (
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardContent className="text-center py-12">
            <p className="text-gray-500 text-lg mb-2">No members found</p>
            <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
          </CardContent>
        </Card>
      )}

      <EditMemberDialog
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setEditingMember(null);
        }}
        member={editingMember}
        onUpdateMember={handleUpdateMember}
      />
    </div>
  );
};

export default MemberManagement;