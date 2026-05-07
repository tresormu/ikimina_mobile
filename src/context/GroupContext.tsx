import React, { createContext, useContext, useState } from 'react';
import { MockGroup, mockGroups } from '../data/mockData';

interface GroupContextType {
  activeGroup: MockGroup;
  groups: MockGroup[];
  switchGroup: (groupId: string) => void;
  leaveGroup: (groupId: string) => void;
  loading: boolean;
}

const GroupContext = createContext<GroupContextType | undefined>(undefined);

export const GroupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [groups, setGroups] = useState<MockGroup[]>(mockGroups);
  const [activeGroup, setActiveGroup] = useState<MockGroup>(mockGroups[0]);
  const [loading, setLoading] = useState(false);

  const switchGroup = (groupId: string) => {
    setLoading(true);
    setTimeout(() => {
      const group = groups.find((g) => g.id === groupId);
      if (group) setActiveGroup(group);
      setLoading(false);
    }, 600);
  };

  const leaveGroup = (groupId: string) => {
    const remaining = groups.filter((g) => g.id !== groupId);
    setGroups(remaining);
    if (activeGroup.id === groupId && remaining.length > 0) {
      setActiveGroup(remaining[0]);
    }
  };

  return (
    <GroupContext.Provider value={{ activeGroup, groups, switchGroup, leaveGroup, loading }}>
      {children}
    </GroupContext.Provider>
  );
};

export const useGroup = () => {
  const context = useContext(GroupContext);
  if (!context) throw new Error('useGroup must be used within a GroupProvider');
  return context;
};
