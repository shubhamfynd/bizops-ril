export interface StaffMember {
  id: string;
  name: string;
  role: 'Department Manager' | 'Customer Success Associate';
  department: string;
  image?: string;
}

export const storeStaff: StaffMember[] = [
  {
    id: 'dm1',
    name: 'Rajesh Kumar',
    role: 'Department Manager',
    department: 'Apparel',
    image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=random'
  },
  {
    id: 'dm2',
    name: 'Priya Sharma',
    role: 'Department Manager',
    department: 'Electronics',
    image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=random'
  },
  {
    id: 'csa1',
    name: 'Amit Patel',
    role: 'Customer Success Associate',
    department: 'Apparel',
    image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=random'
  },
  {
    id: 'csa2',
    name: 'Neha Gupta',
    role: 'Customer Success Associate',
    department: 'Electronics',
    image: 'https://ui-avatars.com/api/?name=Neha+Gupta&background=random'
  },
  {
    id: 'csa3',
    name: 'Vikram Singh',
    role: 'Customer Success Associate',
    department: 'Apparel',
    image: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=random'
  },
  {
    id: 'csa4',
    name: 'Ananya Reddy',
    role: 'Customer Success Associate',
    department: 'Electronics',
    image: 'https://ui-avatars.com/api/?name=Ananya+Reddy&background=random'
  },
  {
    id: 'csa5',
    name: 'Rahul Verma',
    role: 'Customer Success Associate',
    department: 'Apparel',
    image: 'https://ui-avatars.com/api/?name=Rahul+Verma&background=random'
  }
]; 