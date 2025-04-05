
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calendar, Clock, AlertTriangle, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { College } from '@/data/collegeData';
import { Progress } from '@/components/ui/progress';

interface TrackerStatus {
  [collegeId: string]: {
    applicationStatus: 'not-started' | 'essays' | 'in-progress' | 'submitted' | 'interview' | 'accepted' | 'rejected' | 'waitlisted';
    essays: { id: number; completed: boolean; deadline?: string; title: string; }[];
    documents: { id: number; completed: boolean; title: string; }[];
    financials: { id: number; completed: boolean; title: string; }[];
    notes: string;
  };
}

interface DeadlineItem {
  collegeId: string;
  collegeName: string;
  item: string;
  deadline: string;
  type: 'essay' | 'document' | 'application' | 'financial';
}

const getDefaultEssays = (college: College) => [
  {
    id: 1,
    title: 'Personal Statement',
    completed: false,
    deadline: '2024-11-15'
  },
  {
    id: 2,
    title: `Why ${college.name}?`,
    completed: false,
    deadline: '2024-11-15'
  },
  {
    id: 3,
    title: 'Extracurricular Activity Essay',
    completed: false,
    deadline: '2024-11-15'
  }
];

const getDefaultDocuments = () => [
  { id: 1, title: 'Transcripts', completed: false },
  { id: 2, title: 'Test Scores', completed: false },
  { id: 3, title: 'Recommendation Letters', completed: false },
  { id: 4, title: 'Resume/CV', completed: false }
];

const getDefaultFinancials = () => [
  { id: 1, title: 'FAFSA/Financial Aid Application', completed: false },
  { id: 2, title: 'CSS Profile (if required)', completed: false },
  { id: 3, title: 'Scholarship Applications', completed: false }
];

interface ApplicationTrackerProps {
  savedColleges: Array<{
    college: College;
    matchPercentage: number;
  }>;
}

const ApplicationTracker: React.FC<ApplicationTrackerProps> = ({ savedColleges }) => {
  const [trackerData, setTrackerData] = useState<TrackerStatus>({});
  const [upcomingDeadlines, setUpcomingDeadlines] = useState<DeadlineItem[]>([]);
  const [selectedCollege, setSelectedCollege] = useState<string | null>(
    savedColleges.length > 0 ? savedColleges[0].college.id : null
  );
  
  // Initialize tracker data for each college
  useEffect(() => {
    const initialData: TrackerStatus = {};
    
    savedColleges.forEach(({ college }) => {
      if (!trackerData[college.id]) {
        initialData[college.id] = {
          applicationStatus: 'not-started',
          essays: getDefaultEssays(college),
          documents: getDefaultDocuments(),
          financials: getDefaultFinancials(),
          notes: ''
        };
      }
    });
    
    // Merge with existing data (don't overwrite)
    setTrackerData(prev => ({ ...initialData, ...prev }));
    
    // Set selected college if needed
    if (!selectedCollege && savedColleges.length > 0) {
      setSelectedCollege(savedColleges[0].college.id);
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedColleges]);
  
  // Calculate upcoming deadlines
  useEffect(() => {
    const deadlines: DeadlineItem[] = [];
    const today = new Date();
    
    savedColleges.forEach(({ college }) => {
      const collegeData = trackerData[college.id];
      if (!collegeData) return;
      
      // Add essay deadlines
      collegeData.essays.forEach(essay => {
        if (essay.deadline && !essay.completed) {
          const deadlineDate = new Date(essay.deadline);
          if (deadlineDate > today && deadlineDate.getTime() - today.getTime() < 14 * 24 * 60 * 60 * 1000) {
            deadlines.push({
              collegeId: college.id,
              collegeName: college.name,
              item: essay.title,
              deadline: essay.deadline,
              type: 'essay'
            });
          }
        }
      });
      
      // Add application deadline based on status
      if (collegeData.applicationStatus !== 'submitted' && 
          collegeData.applicationStatus !== 'accepted' && 
          collegeData.applicationStatus !== 'rejected') {
        // Default application deadline (simplified)
        const applicationDeadline = '2024-12-01';
        const deadlineDate = new Date(applicationDeadline);
        
        if (deadlineDate > today && deadlineDate.getTime() - today.getTime() < 14 * 24 * 60 * 60 * 1000) {
          deadlines.push({
            collegeId: college.id,
            collegeName: college.name,
            item: 'Application Submission',
            deadline: applicationDeadline,
            type: 'application'
          });
        }
      }
    });
    
    // Sort by closest deadline first
    deadlines.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    setUpcomingDeadlines(deadlines);
  }, [savedColleges, trackerData]);
  
  const handleStatusChange = (collegeId: string, status: any) => {
    setTrackerData(prev => ({
      ...prev,
      [collegeId]: {
        ...prev[collegeId],
        applicationStatus: status
      }
    }));
  };
  
  const handleItemToggle = (collegeId: string, category: 'essays' | 'documents' | 'financials', itemId: number) => {
    setTrackerData(prev => ({
      ...prev,
      [collegeId]: {
        ...prev[collegeId],
        [category]: prev[collegeId][category].map(item => 
          item.id === itemId ? { ...item, completed: !item.completed } : item
        )
      }
    }));
  };
  
  const calculateProgress = (collegeId: string): number => {
    if (!trackerData[collegeId]) return 0;
    
    const data = trackerData[collegeId];
    const totalItems = data.essays.length + data.documents.length + data.financials.length;
    const completedItems = 
      data.essays.filter(i => i.completed).length + 
      data.documents.filter(i => i.completed).length + 
      data.financials.filter(i => i.completed).length;
    
    return Math.round((completedItems / totalItems) * 100);
  };
  
  // Format date to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      case 'waitlisted': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'submitted': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'interview': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'in-progress': 
      case 'essays': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  const getStatusName = (status: string) => {
    switch (status) {
      case 'not-started': return 'Not Started';
      case 'essays': return 'Writing Essays';
      case 'in-progress': return 'In Progress';
      case 'submitted': return 'Submitted';
      case 'interview': return 'Interview Stage';
      case 'accepted': return 'Accepted';
      case 'rejected': return 'Rejected';
      case 'waitlisted': return 'Waitlisted';
      default: return status;
    }
  };
  
  if (savedColleges.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8">
        <h3 className="text-xl font-medium mb-4">No Saved Colleges</h3>
        <p className="mb-4">Save some colleges to start tracking your applications.</p>
        <Button variant="outline" onClick={() => {
          document.querySelector('[data-value="discover"]')?.dispatchEvent(
            new MouseEvent('click', { bubbles: true })
          );
        }}>
          Go Discover Colleges
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {upcomingDeadlines.length > 0 && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-amber-800">
              <Clock className="mr-2 h-5 w-5" />
              Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {upcomingDeadlines.map((deadline, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-medium">{deadline.item}</span>
                    <span className="text-muted-foreground"> - {deadline.collegeName}</span>
                  </div>
                  <Badge variant="outline" className="bg-amber-100 border-amber-300 text-amber-800">
                    {formatDate(deadline.deadline)}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Colleges</CardTitle>
              <CardDescription>Track application progress</CardDescription>
            </CardHeader>
            <CardContent className="max-h-96 overflow-y-auto">
              <ul className="space-y-3">
                {savedColleges.map(({ college, matchPercentage }) => {
                  const progress = calculateProgress(college.id);
                  const status = trackerData[college.id]?.applicationStatus || 'not-started';
                  
                  return (
                    <li 
                      key={college.id} 
                      className={`p-3 rounded-md border cursor-pointer transition-colors ${
                        selectedCollege === college.id ? 'bg-muted border-primary/50' : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedCollege(college.id)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{college.name}</h4>
                        <Badge className="text-xs">{Math.round(matchPercentage)}%</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">{college.location}</div>
                      <div className="flex justify-between items-center text-sm">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(status)}`}
                        >
                          {getStatusName(status)}
                        </Badge>
                        <span className="text-xs">{progress}% Complete</span>
                      </div>
                      <Progress value={progress} className="h-1 mt-2" />
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:w-2/3">
          {selectedCollege && trackerData[selectedCollege] ? (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>
                      {savedColleges.find(c => c.college.id === selectedCollege)?.college.name}
                    </CardTitle>
                    <CardDescription>
                      Application tracker and checklist
                    </CardDescription>
                  </div>
                  <div>
                    <Select 
                      value={trackerData[selectedCollege].applicationStatus} 
                      onValueChange={(value) => handleStatusChange(selectedCollege, value)}
                    >
                      <SelectTrigger className={`w-[160px] text-xs h-8 ${getStatusColor(trackerData[selectedCollege].applicationStatus)}`}>
                        <SelectValue placeholder="Set status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="essays">Writing Essays</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="submitted">Submitted</SelectItem>
                        <SelectItem value="interview">Interview Stage</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="waitlisted">Waitlisted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="essays">
                  <TabsList className="w-full mb-4">
                    <TabsTrigger value="essays" className="flex-1">Essays</TabsTrigger>
                    <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
                    <TabsTrigger value="financials" className="flex-1">Financials</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="essays">
                    <ul className="space-y-3">
                      {trackerData[selectedCollege].essays.map(essay => {
                        const isApproaching = essay.deadline ? new Date(essay.deadline) > new Date() && 
                          new Date(essay.deadline).getTime() - new Date().getTime() < 14 * 24 * 60 * 60 * 1000 : false;
                          
                        const isPassed = essay.deadline ? new Date(essay.deadline) < new Date() : false;
                        
                        return (
                          <li 
                            key={essay.id} 
                            className={`p-3 rounded-md border flex items-center justify-between ${
                              essay.completed ? 'bg-green-50 border-green-200' : 
                              isPassed ? 'bg-red-50 border-red-200' :
                              isApproaching ? 'bg-amber-50 border-amber-200' : ''
                            }`}
                          >
                            <div className="flex items-center">
                              <div 
                                className={`h-5 w-5 rounded border mr-3 flex items-center justify-center cursor-pointer ${
                                  essay.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                                }`}
                                onClick={() => handleItemToggle(selectedCollege, 'essays', essay.id)}
                              >
                                {essay.completed && <Check className="h-3 w-3 text-white" />}
                              </div>
                              <div>
                                <div className="font-medium">{essay.title}</div>
                                {essay.deadline && (
                                  <div className={`text-xs flex items-center gap-1 ${
                                    isPassed && !essay.completed ? 'text-red-600' :
                                    isApproaching && !essay.completed ? 'text-amber-600' : 'text-muted-foreground'
                                  }`}>
                                    {isPassed && !essay.completed ? (
                                      <AlertTriangle className="h-3 w-3" />
                                    ) : (
                                      <Calendar className="h-3 w-3" />
                                    )}
                                    Due: {formatDate(essay.deadline)}
                                    {isPassed && !essay.completed && " (Overdue)"}
                                  </div>
                                )}
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="documents">
                    <ul className="space-y-3">
                      {trackerData[selectedCollege].documents.map(doc => (
                        <li 
                          key={doc.id} 
                          className={`p-3 rounded-md border flex items-center justify-between ${
                            doc.completed ? 'bg-green-50 border-green-200' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <div 
                              className={`h-5 w-5 rounded border mr-3 flex items-center justify-center cursor-pointer ${
                                doc.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                              }`}
                              onClick={() => handleItemToggle(selectedCollege, 'documents', doc.id)}
                            >
                              {doc.completed && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <div className="font-medium">{doc.title}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="financials">
                    <ul className="space-y-3">
                      {trackerData[selectedCollege].financials.map(item => (
                        <li 
                          key={item.id} 
                          className={`p-3 rounded-md border flex items-center justify-between ${
                            item.completed ? 'bg-green-50 border-green-200' : ''
                          }`}
                        >
                          <div className="flex items-center">
                            <div 
                              className={`h-5 w-5 rounded border mr-3 flex items-center justify-center cursor-pointer ${
                                item.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                              }`}
                              onClick={() => handleItemToggle(selectedCollege, 'financials', item.id)}
                            >
                              {item.completed && <Check className="h-3 w-3 text-white" />}
                            </div>
                            <div className="font-medium">{item.title}</div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
                
                <div className="mt-6">
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => {
                      const college = savedColleges.find(c => c.college.id === selectedCollege)?.college;
                      if (college) {
                        window.open(`https://${college.name.toLowerCase().replace(/\s+/g, '')}.edu/admissions`, '_blank');
                      }
                    }}
                  >
                    Visit Application Portal <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center text-center p-8">
                <h3 className="text-xl font-medium mb-2">Select a College</h3>
                <p className="text-muted-foreground">
                  Select a college from the list to view and track your application progress.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationTracker;
