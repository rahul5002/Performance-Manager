import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';

const EditMemberDialog = ({ isOpen, onClose, member, onUpdateMember }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    contact: '',
    phone: '',
    tasksCompleted: 0,
    tasksPending: 0,
    efficiency: 0,
    registrationsBrought: 0
  });

  const roleOptions = [
    'Team Lead',
    'Marketing Coordinator',
    'Event Coordinator', 
    'Outreach Specialist',
    'Communications Manager',
    'Project Manager',
    'Administrative Assistant',
    'Content Creator'
  ];

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || '',
        role: member.role || '',
        contact: member.contact || '',
        phone: member.phone || '',
        tasksCompleted: member.tasksCompleted || 0,
        tasksPending: member.tasksPending || 0,
        efficiency: member.efficiency || 0,
        registrationsBrought: member.registrationsBrought || 0
      });
    }
  }, [member]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.role && formData.contact) {
      const updatedMember = {
        ...member,
        ...formData,
        totalTasks: formData.tasksCompleted + formData.tasksPending
      };
      onUpdateMember(updatedMember);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSliderChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value[0] }));
  };

  if (!member) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Edit Member</DialogTitle>
          <DialogDescription>
            Update member information and performance metrics.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                  Role *
                </Label>
                <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <Input
                  id="contact"
                  type="email"
                  value={formData.contact}
                  onChange={(e) => handleChange('contact', e.target.value)}
                  placeholder="Enter email address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Performance Metrics</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tasksCompleted" className="text-sm font-medium text-gray-700">
                  Tasks Completed
                </Label>
                <Input
                  id="tasksCompleted"
                  type="number"
                  min="0"
                  value={formData.tasksCompleted}
                  onChange={(e) => handleChange('tasksCompleted', parseInt(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tasksPending" className="text-sm font-medium text-gray-700">
                  Tasks Pending
                </Label>
                <Input
                  id="tasksPending"
                  type="number"
                  min="0"
                  value={formData.tasksPending}
                  onChange={(e) => handleChange('tasksPending', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="efficiency" className="text-sm font-medium text-gray-700">
                Efficiency Score: {formData.efficiency}%
              </Label>
              <Slider
                id="efficiency"
                min={0}
                max={100}
                step={1}
                value={[formData.efficiency]}
                onValueChange={(value) => handleSliderChange('efficiency', value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationsBrought" className="text-sm font-medium text-gray-700">
                Registrations Brought
              </Label>
              <Input
                id="registrationsBrought"
                type="number"
                min="0"
                value={formData.registrationsBrought}
                onChange={(e) => handleChange('registrationsBrought', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Update Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMemberDialog;