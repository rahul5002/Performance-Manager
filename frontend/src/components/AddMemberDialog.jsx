import React, { useState } from 'react';
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

const AddMemberDialog = ({ isOpen, onClose, onAddMember }) => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    contact: '',
    phone: ''
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.role && formData.contact) {
      onAddMember(formData);
      setFormData({ name: '', role: '', contact: '', phone: '' });
      onClose();
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">Add New Member</DialogTitle>
          <DialogDescription>
            Add a new committee member to the performance tracking system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
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

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Add Member
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;