import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Trophy, Users, TrendingUp, Crown, Star, Award, Phone, Mail, MapPin, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  dailySales: number;
  weeklySales: number;
  monthlySales: number;
  rank: number;
  isCurrentUser: boolean;
}

interface HierarchyMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  level: number;
  reportsTo?: string;
  email: string;
  phone: string;
  location: string;
  department: string;
  joinDate: string;
  performance: string;
}

const MyTeam = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'hierarchy'>('leaderboard');
  const [selectedPerson, setSelectedPerson] = useState<HierarchyMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const periods = [
    { id: 'daily', label: 'Daily', icon: TrendingUp },
    { id: 'weekly', label: 'Weekly', icon: TrendingUp },
    { id: 'monthly', label: 'Monthly', icon: TrendingUp }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Store Manager',
      avatar: 'SJ',
      dailySales: 12500,
      weeklySales: 87500,
      monthlySales: 350000,
      rank: 1,
      isCurrentUser: false
    },
    {
      id: '2',
      name: 'Mike Chen',
      role: 'Sales Associate',
      avatar: 'MC',
      dailySales: 11800,
      weeklySales: 82000,
      monthlySales: 325000,
      rank: 2,
      isCurrentUser: false
    },
    {
      id: '3',
      name: 'You',
      role: 'Sales Associate',
      avatar: 'YO',
      dailySales: 11200,
      weeklySales: 78500,
      monthlySales: 310000,
      rank: 3,
      isCurrentUser: true
    },
    {
      id: '4',
      name: 'Lisa Rodriguez',
      role: 'Cashier',
      avatar: 'LR',
      dailySales: 9800,
      weeklySales: 68500,
      monthlySales: 275000,
      rank: 4,
      isCurrentUser: false
    },
    {
      id: '5',
      name: 'David Kim',
      role: 'Stock Associate',
      avatar: 'DK',
      dailySales: 8900,
      weeklySales: 62500,
      monthlySales: 250000,
      rank: 5,
      isCurrentUser: false
    }
  ];

  const hierarchy: HierarchyMember[] = [
    { 
      id: '1', 
      name: 'Rajesh Kumar', 
      role: 'CEO', 
      avatar: 'RK', 
      level: 1,
      email: 'rajesh.kumar@company.com',
      phone: '+91 98765 43210',
      location: 'Mumbai, India',
      department: 'Executive',
      joinDate: 'Jan 2020',
      performance: 'Outstanding'
    },
    { 
      id: '2', 
      name: 'Priya Sharma', 
      role: 'COO', 
      avatar: 'PS', 
      level: 2, 
      reportsTo: '1',
      email: 'priya.sharma@company.com',
      phone: '+91 98765 43211',
      location: 'Delhi, India',
      department: 'Operations',
      joinDate: 'Mar 2020',
      performance: 'Excellent'
    },
    { 
      id: '3', 
      name: 'Amit Patel', 
      role: 'Regional Director', 
      avatar: 'AP', 
      level: 3, 
      reportsTo: '2',
      email: 'amit.patel@company.com',
      phone: '+91 98765 43212',
      location: 'Bangalore, India',
      department: 'Regional',
      joinDate: 'Jun 2020',
      performance: 'Very Good'
    },
    { 
      id: '4', 
      name: 'Neha Singh', 
      role: 'Area Manager', 
      avatar: 'NS', 
      level: 4, 
      reportsTo: '3',
      email: 'neha.singh@company.com',
      phone: '+91 98765 43213',
      location: 'Chennai, India',
      department: 'Area Management',
      joinDate: 'Sep 2020',
      performance: 'Good'
    },
    { 
      id: '5', 
      name: 'Sarah Johnson', 
      role: 'Store Manager', 
      avatar: 'SJ', 
      level: 5, 
      reportsTo: '4',
      email: 'sarah.johnson@company.com',
      phone: '+91 98765 43214',
      location: 'Store Location',
      department: 'Store Management',
      joinDate: 'Dec 2020',
      performance: 'Excellent'
    },
    { 
      id: '6', 
      name: 'Mike Chen', 
      role: 'Assistant Manager', 
      avatar: 'MC', 
      level: 6, 
      reportsTo: '5',
      email: 'mike.chen@company.com',
      phone: '+91 98765 43215',
      location: 'Store Location',
      department: 'Store Management',
      joinDate: 'Feb 2021',
      performance: 'Good'
    },
    { 
      id: '7', 
      name: 'You', 
      role: 'Sales Associate', 
      avatar: 'YO', 
      level: 7, 
      reportsTo: '6',
      email: 'you@company.com',
      phone: '+91 98765 43216',
      location: 'Store Location',
      department: 'Sales',
      joinDate: 'Apr 2021',
      performance: 'Very Good'
    },
    { 
      id: '8', 
      name: 'Lisa Rodriguez', 
      role: 'Cashier', 
      avatar: 'LR', 
      level: 7, 
      reportsTo: '6',
      email: 'lisa.rodriguez@company.com',
      phone: '+91 98765 43217',
      location: 'Store Location',
      department: 'Cash Management',
      joinDate: 'May 2021',
      performance: 'Good'
    },
    { 
      id: '9', 
      name: 'David Kim', 
      role: 'Stock Associate', 
      avatar: 'DK', 
      level: 7, 
      reportsTo: '6',
      email: 'david.kim@company.com',
      phone: '+91 98765 43218',
      location: 'Store Location',
      department: 'Inventory',
      joinDate: 'Jun 2021',
      performance: 'Good'
    }
  ];

  const getSalesValue = (member: TeamMember) => {
    switch (selectedPeriod) {
      case 'daily': return member.dailySales;
      case 'weekly': return member.weeklySales;
      case 'monthly': return member.monthlySales;
      default: return member.dailySales;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown size={16} className="text-yellow-500" />;
      case 2: return <Trophy size={16} className="text-gray-400" />;
      case 3: return <Award size={16} className="text-orange-500" />;
      default: return <Star size={16} className="text-blue-500" />;
    }
  };

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-red-100 text-red-800';
      case 2: return 'bg-orange-100 text-orange-800';
      case 3: return 'bg-yellow-100 text-yellow-800';
      case 4: return 'bg-green-100 text-green-800';
      case 5: return 'bg-blue-100 text-blue-800';
      case 6: return 'bg-purple-100 text-purple-800';
      case 7: return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePersonClick = (person: HierarchyMember) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  const sortedMembers = [...teamMembers].sort((a, b) => getSalesValue(b) - getSalesValue(a));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#181f60] w-full pt-6 pb-4 shadow-md">
        <div className="flex items-center mx-4">
          <button
            onClick={() => navigate('/home')}
            className="p-2 text-white"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="ml-2">
            <span className="text-white font-semibold text-lg">My Team</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex space-x-1 p-4">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'leaderboard'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Trophy size={16} className="inline mr-2" />
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('hierarchy')}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'hierarchy'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Users size={16} className="inline mr-2" />
            Hierarchy
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100vh-140px)] overflow-y-auto">
        {activeTab === 'leaderboard' && (
          <div className="p-4">
            {/* Period Selector */}
            <div className="flex space-x-1 mb-4">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id as 'daily' | 'weekly' | 'monthly')}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <period.icon size={14} className="inline mr-1" />
                  {period.label}
                </button>
              ))}
            </div>

            {/* Leaderboard */}
            <div className="space-y-3">
              {sortedMembers.map((member, index) => (
                <Card key={member.id} className={`${member.isCurrentUser ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-gray-400">#{member.rank}</span>
                          {getRankIcon(member.rank)}
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-blue-700">{member.avatar}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center">
                            {member.name}
                            {member.isCurrentUser && (
                              <Badge className="ml-2 bg-blue-100 text-blue-800">You</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{getSalesValue(member).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500 capitalize">{selectedPeriod} Sales</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'hierarchy' && (
          <div className="p-4">
            <div className="text-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Store Hierarchy</h2>
              <p className="text-sm text-gray-500">Complete organizational structure from CEO to store staff</p>
            </div>

            <div className="space-y-0">
              {hierarchy.map((member, index) => (
                <div key={member.id} className="relative">
                  {/* Vertical line for hierarchy levels */}
                  {member.level > 1 && (
                    <div 
                      className="absolute left-6 top-0 w-0.5 bg-gray-200"
                      style={{ height: '16px' }}
                    />
                  )}
                  
                  <Card 
                    className={`${member.name === 'You' ? 'ring-2 ring-blue-500' : ''} cursor-pointer hover:bg-gray-50 transition-colors border-0 shadow-none rounded-none border-b border-gray-100`}
                    style={{ 
                      marginLeft: `${(member.level - 1) * 32}px`,
                      borderRadius: '0'
                    }}
                    onClick={() => handlePersonClick(member)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center space-x-3">
                        {/* Horizontal connector line */}
                        {member.level > 1 && (
                          <div className="w-3 h-px bg-gray-200 flex-shrink-0" />
                        )}
                        
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-semibold text-blue-700">{member.avatar}</span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 flex items-center">
                            {member.name}
                            {member.name === 'You' && (
                              <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">You</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                        
                        {/* Crown for CEO */}
                        {member.level === 1 && <Crown size={16} className="text-yellow-500 flex-shrink-0" />}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Person Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Person Details</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={20} />
              </button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedPerson && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl font-semibold text-blue-700">{selectedPerson.avatar}</span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{selectedPerson.name}</h4>
                <p className="text-gray-500">{selectedPerson.role}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-500">{selectedPerson.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-500">{selectedPerson.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin size={16} className="text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Location</p>
                    <p className="text-sm text-gray-500">{selectedPerson.location}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">Department</p>
                  <p className="text-sm text-gray-500">{selectedPerson.department}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">Join Date</p>
                  <p className="text-sm text-gray-500">{selectedPerson.joinDate}</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">Performance</p>
                  <Badge className="bg-green-100 text-green-800">{selectedPerson.performance}</Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyTeam; 