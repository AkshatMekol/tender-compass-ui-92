import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ArrowLeft, FileText, Bot, MessageSquare, StickyNote, Send, Download, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'NIT' | 'Work Item' | 'Corrigendum';
  pages: number;
  url: string;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  citations?: Array<{ page: number; text: string; }>;
}

const DocumentViewer = () => {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [activeTab, setActiveTab] = useState<'chat' | 'notes'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! I\'m here to help you understand the selected document. Ask me anything about the tender requirements, specifications, or procedures.',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [notes, setNotes] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [highlightedCitations, setHighlightedCitations] = useState<Array<{ page: number; text: string; }>>([]);

  // Mock documents data
  const documents: Document[] = [
    // NIT Documents
    { id: 'nit-1', name: 'Notice Inviting Tender', type: 'NIT', pages: 25, url: '/docs/nit-notice.pdf' },
    { id: 'nit-2', name: 'Technical Specifications', type: 'NIT', pages: 45, url: '/docs/nit-specs.pdf' },
    
    // Work Item Documents
    { id: 'work-1', name: 'Bill of Quantities', type: 'Work Item', pages: 67, url: '/docs/boq.pdf' },
    { id: 'work-2', name: 'General Conditions of Contract', type: 'Work Item', pages: 34, url: '/docs/gcc.pdf' },
    { id: 'work-3', name: 'Special Conditions of Contract', type: 'Work Item', pages: 28, url: '/docs/scc.pdf' },
    { id: 'work-4', name: 'Technical Specifications for Road Works', type: 'Work Item', pages: 89, url: '/docs/tech-specs-road.pdf' },
    { id: 'work-5', name: 'Bridge Construction Standards', type: 'Work Item', pages: 56, url: '/docs/bridge-standards.pdf' },
    
    // Corrigendum Documents
    { id: 'corr-1', name: 'Corrigendum No. 1', type: 'Corrigendum', pages: 3, url: '/docs/corr-1.pdf' },
    { id: 'corr-2', name: 'Corrigendum No. 2', type: 'Corrigendum', pages: 5, url: '/docs/corr-2.pdf' },
    { id: 'corr-3', name: 'Amendment to Technical Specifications', type: 'Corrigendum', pages: 8, url: '/docs/corr-amendment.pdf' }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response with citations
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Based on the selected document "${selectedDoc?.name || 'current document'}", here's what I found: ${inputMessage.includes('payment') ? 'The payment terms are outlined in Section 4.2. Payments will be made based on completed milestones as specified in the payment schedule.' : 'The information you requested can be found in the relevant sections of the document. Please refer to the highlighted portions for specific details.'}`,
        timestamp: new Date(),
        citations: [
          { page: 12, text: 'Payment Schedule and Terms' },
          { page: 15, text: 'Milestone Requirements' }
        ]
      };

      setMessages(prev => [...prev, botResponse]);
      
      // Highlight citations in document
      if (botResponse.citations) {
        setHighlightedCitations(botResponse.citations);
      }
    }, 1500);

    setInputMessage('');
  };

  const handleDocumentSelect = (doc: Document) => {
    setSelectedDoc(doc);
    setCurrentPage(1);
    setHighlightedCitations([]);
    
    // Add a welcome message for the selected document
    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'bot',
      content: `I've loaded "${doc.name}" (${doc.pages} pages). Feel free to ask me questions about this document's content, requirements, or specifications.`,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, welcomeMessage]);
  };

  const getDocumentsByType = (type: 'NIT' | 'Work Item' | 'Corrigendum') => {
    return documents.filter(doc => doc.type === type);
  };

  const getTypeColor = (type: 'NIT' | 'Work Item' | 'Corrigendum') => {
    switch (type) {
      case 'NIT':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Work Item':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Corrigendum':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/analysis')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Analysis
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-semibold">Document Viewer</h1>
              </div>
            </div>
            {selectedDoc && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getTypeColor(selectedDoc.type)}>
                  {selectedDoc.type}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {selectedDoc.name} - Page {currentPage} of {selectedDoc.pages}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Document Selection Panel */}
      <div className="border-b border-border bg-card/30 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-3">Select Document</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* NIT Documents */}
              <Card className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Badge variant="outline" className={getTypeColor('NIT')}>
                    NIT Documents
                  </Badge>
                  <span className="text-sm text-muted-foreground">({getDocumentsByType('NIT').length})</span>
                </h3>
                <div className="space-y-2">
                  {getDocumentsByType('NIT').map((doc) => (
                    <Button
                      key={doc.id}
                      variant={selectedDoc?.id === doc.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleDocumentSelect(doc)}
                      className="w-full justify-start text-left h-auto p-2"
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-medium">{doc.name}</span>
                        <span className="text-xs text-muted-foreground">{doc.pages} pages</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Work Item Documents */}
              <Card className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Badge variant="outline" className={getTypeColor('Work Item')}>
                    Work Item Documents
                  </Badge>
                  <span className="text-sm text-muted-foreground">({getDocumentsByType('Work Item').length})</span>
                </h3>
                <div className="space-y-2">
                  {getDocumentsByType('Work Item').map((doc) => (
                    <Button
                      key={doc.id}
                      variant={selectedDoc?.id === doc.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleDocumentSelect(doc)}
                      className="w-full justify-start text-left h-auto p-2"
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-medium">{doc.name}</span>
                        <span className="text-xs text-muted-foreground">{doc.pages} pages</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Corrigendum Documents */}
              <Card className="p-4">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Badge variant="outline" className={getTypeColor('Corrigendum')}>
                    Corrigendum Documents
                  </Badge>
                  <span className="text-sm text-muted-foreground">({getDocumentsByType('Corrigendum').length})</span>
                </h3>
                <div className="space-y-2">
                  {getDocumentsByType('Corrigendum').map((doc) => (
                    <Button
                      key={doc.id}
                      variant={selectedDoc?.id === doc.id ? "default" : "ghost"}
                      size="sm"
                      onClick={() => handleDocumentSelect(doc)}
                      className="w-full justify-start text-left h-auto p-2"
                    >
                      <div className="flex flex-col items-start gap-1">
                        <span className="text-sm font-medium">{doc.name}</span>
                        <span className="text-xs text-muted-foreground">{doc.pages} pages</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {selectedDoc ? (
        <div className="flex-1">
          <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-280px)]">
            {/* Left Panel - Chat/Notes */}
            <ResizablePanel defaultSize={35} minSize={25}>
              <div className="h-full border-r border-border">
                <div className="p-4 border-b border-border">
                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'chat' | 'notes')}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="chat" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Chat
                      </TabsTrigger>
                      <TabsTrigger value="notes" className="flex items-center gap-2">
                        <StickyNote className="h-4 w-4" />
                        Notes
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <TabsContent value="chat" className="h-full mt-0">
                  <div className="flex flex-col h-[calc(100vh-360px)]">
                    {/* Chat Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex flex-col gap-2 ${
                              message.type === 'user' ? 'items-end' : 'items-start'
                            }`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${
                                message.type === 'user'
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              {message.citations && (
                                <div className="mt-2 pt-2 border-t border-border/50">
                                  <p className="text-xs text-muted-foreground mb-1">References:</p>
                                  {message.citations.map((citation, index) => (
                                    <button
                                      key={index}
                                      onClick={() => setCurrentPage(citation.page)}
                                      className="block w-full text-left text-xs text-primary hover:underline"
                                    >
                                      Page {citation.page}: {citation.text}
                                    </button>
                                  ))}
                                </div>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-border">
                      <div className="flex gap-2">
                        <Textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          placeholder="Ask questions about the document..."
                          className="flex-1 min-h-[40px] max-h-[100px]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          onClick={handleSendMessage}
                          disabled={!inputMessage.trim()}
                          size="sm"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="h-full mt-0">
                  <div className="p-4 h-[calc(100vh-360px)]">
                    <Textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Take notes while reviewing the document..."
                      className="h-full resize-none"
                    />
                  </div>
                </TabsContent>
              </div>
            </ResizablePanel>

            <ResizableHandle />

            {/* Right Panel - Document Viewer */}
            <ResizablePanel defaultSize={65} minSize={50}>
              <div className="h-full bg-muted/30">
                {/* Document Controls */}
                <div className="p-4 border-b border-border bg-card/50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm px-3">
                      Page {currentPage} of {selectedDoc.pages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(Math.min(selectedDoc.pages, currentPage + 1))}
                      disabled={currentPage >= selectedDoc.pages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoomLevel(Math.max(50, zoomLevel - 25))}
                    >
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="text-sm px-2">{zoomLevel}%</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoomLevel(Math.min(200, zoomLevel + 25))}
                    >
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                    <Separator orientation="vertical" className="h-4" />
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Document Display */}
                <ScrollArea className="h-[calc(100vh-400px)]">
                  <div className="p-8">
                    <div 
                      className="bg-white border border-border shadow-sm mx-auto"
                      style={{ 
                        transform: `scale(${zoomLevel / 100})`,
                        transformOrigin: 'top center',
                        width: '210mm',
                        minHeight: '297mm',
                        position: 'relative'
                      }}
                    >
                      {/* Mock Document Content */}
                      <div className="p-8 space-y-6">
                        <div className="text-center border-b border-gray-300 pb-4">
                          <h1 className="text-xl font-bold">{selectedDoc.name}</h1>
                          <p className="text-sm text-gray-600 mt-2">Page {currentPage}</p>
                        </div>

                        <div className="space-y-4 text-sm leading-relaxed">
                          <p>
                            This is a mock document viewer showing page {currentPage} of {selectedDoc.name}. 
                            In a real implementation, this would display the actual PDF content using a PDF viewer library.
                          </p>

                          {highlightedCitations.map((citation, index) => (
                            citation.page === currentPage && (
                              <div
                                key={index}
                                className="bg-yellow-200 p-3 rounded border-l-4 border-yellow-500"
                              >
                                <strong>Highlighted Section:</strong> {citation.text}
                              </div>
                            )
                          ))}

                          <div className="space-y-2">
                            <h3 className="font-semibold">Sample Content Section</h3>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                              nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p>
                              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                              sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                          </div>

                          <div className="border border-gray-300 p-4 rounded">
                            <h4 className="font-medium mb-2">Technical Specifications</h4>
                            <ul className="list-disc list-inside space-y-1">
                              <li>Requirement 1: Lorem ipsum dolor sit amet</li>
                              <li>Requirement 2: Consectetur adipiscing elit</li>
                              <li>Requirement 3: Sed do eiusmod tempor incididunt</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-280px)]">
          <div className="text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Select a Document</h3>
            <p className="text-muted-foreground">
              Choose a document from the categories above to start viewing and analyzing
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;