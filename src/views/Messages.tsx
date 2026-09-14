import React, { useMemo, useState } from 'react';
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  CheckCheck,
  X,
  Building2,
  Handshake,
  FlaskConical,
  FileText,
  Image as ImageIcon,
  Users,
  CalendarDays,
} from 'lucide-react';

type Conversation = {
  id: number;
  name: string;
  role: string;
  initials: string;
  color: string;
  lastMessage: string;
  time: string;
  unread?: number;
};

type Message = {
  id: number;
  sender: 'me' | 'them';
  text: string;
  time: string;
};

type ChatDetail = {
  relationship: string;
  company: string;
  sector: string;
  collaboration: string;
  collaborationStatus: string;
  pilot: string;
  pilotScore: number;
  pilotStatus: string;
  deal: string;
  dealValue: string;
  dealStatus: string;
  connectedDate: string;
};

const conversations: Conversation[] = [
  {
    id: 1,
    name: 'Aarav Sharma',
    role: 'Founder, GreenTech Labs',
    initials: 'AS',
    color: 'bg-emerald-600',
    lastMessage: 'Thank you for your interest!',
    time: '10:42 AM',
    unread: 2,
  },
  {
    id: 2,
    name: 'Priya Mehta',
    role: 'Founder, HealthNova',
    initials: 'PM',
    color: 'bg-purple-600',
    lastMessage: 'Can we schedule a meeting?',
    time: 'Yesterday',
  },
  {
    id: 3,
    name: 'Rohan Verma',
    role: 'Founder, AgriConnect',
    initials: 'RV',
    color: 'bg-blue-600',
    lastMessage: 'I have shared the proposal.',
    time: 'Monday',
  },
];

const chatDetails: Record<number, ChatDetail> = {
  1: {
    relationship: 'Startup – Innovation Partner',
    company: 'GreenTech Labs',
    sector: 'Clean energy and industrial sustainability',
    collaboration: 'Smart Energy Monitoring',
    collaborationStatus: 'Completed',
    pilot: 'Pune Smart City Testbed',
    pilotScore: 92,
    pilotStatus: 'Passed',
    deal: 'Energy Monitoring Procurement',
    dealValue: '₹18,50,000',
    dealStatus: 'Completed',
    connectedDate: '12 August 2026',
  },

  2: {
    relationship: 'Healthcare Startup – Government Partner',
    company: 'HealthNova',
    sector: 'Healthcare technology and digital health',
    collaboration: 'Digital Health Screening Platform',
    collaborationStatus: 'Active',
    pilot: 'Rural Health Screening Pilot',
    pilotScore: 88,
    pilotStatus: 'Running',
    deal: 'Healthcare Technology Proposal',
    dealValue: '₹12,00,000',
    dealStatus: 'Under Review',
    connectedDate: '20 August 2026',
  },

  3: {
    relationship: 'AgriTech Startup – Manufacturing Partner',
    company: 'AgriConnect',
    sector: 'Agriculture, IoT, and smart farming',
    collaboration: 'Smart Irrigation Hardware',
    collaborationStatus: 'NDA Pending',
    pilot: 'Smart Farming Field Trial',
    pilotScore: 84,
    pilotStatus: 'Evaluation Pending',
    deal: 'Agricultural IoT Equipment',
    dealValue: '₹9,75,000',
    dealStatus: 'Proposal Submitted',
    connectedDate: '25 August 2026',
  },
};

const initialMessages: Record<number, Message[]> = {
  1: [
    {
      id: 1,
      sender: 'them',
      text: 'Hello! Thank you for connecting with GreenTech Labs.',
      time: '10:35 AM',
    },
    {
      id: 2,
      sender: 'me',
      text: 'I would like to know more about your clean-energy solution.',
      time: '10:38 AM',
    },
    {
      id: 3,
      sender: 'them',
      text: 'Our solution helps industries reduce energy consumption and emissions.',
      time: '10:40 AM',
    },
    {
      id: 4,
      sender: 'them',
      text: 'Thank you for your interest!',
      time: '10:42 AM',
    },
  ],

  2: [
    {
      id: 1,
      sender: 'them',
      text: 'Hello! Would you like to discuss our healthcare platform?',
      time: 'Yesterday',
    },
  ],

  3: [
    {
      id: 1,
      sender: 'them',
      text: 'I have shared the proposal.',
      time: 'Monday',
    },
  ],
};

export function Messages() {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [search, setSearch] = useState('');
  const [messageText, setMessageText] = useState('');
  const [showDetails, setShowDetails] = useState(true);
  const [activeDetailsTab, setActiveDetailsTab] = useState('overview');
  const [messages, setMessages] = useState(initialMessages);

  const selectedContact = conversations.find(
    (conversation) => conversation.id === selectedConversation
  );

  const selectedDetails = chatDetails[selectedConversation];

  const filteredConversations = useMemo(() => {
    return conversations.filter(
      (conversation) =>
        conversation.name.toLowerCase().includes(search.toLowerCase()) ||
        conversation.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const currentMessages = messages[selectedConversation] || [];

  const sendMessage = () => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'me',
      text: trimmedMessage,
      time: 'Just now',
    };

    setMessages((previousMessages) => ({
      ...previousMessages,
      [selectedConversation]: [
        ...(previousMessages[selectedConversation] || []),
        newMessage,
      ],
    }));

    setMessageText('');
  };

  const selectConversation = (conversationId: number) => {
    setSelectedConversation(conversationId);
    setActiveDetailsTab('overview');
  };

  return (
    <div className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Messages</h1>

        <p className="mt-2 text-slate-500">
          Connect and communicate with founders, startups, and innovation
          partners.
        </p>
      </div>

      {/* Main Messaging Layout */}
      <div className="grid min-h-[650px] grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[290px_1fr] xl:grid-cols-[290px_1fr_320px]">
        {/* Conversation Sidebar */}
        <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-200 p-4">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              Conversations
            </h2>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search conversations..."
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="max-h-[520px] overflow-y-auto">
            {filteredConversations.map((conversation) => {
              const isSelected = selectedConversation === conversation.id;

              return (
                <button
                  key={conversation.id}
                  onClick={() => selectConversation(conversation.id)}
                  className={`flex w-full items-start gap-3 border-b border-slate-100 p-4 text-left transition ${
                    isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${conversation.color}`}
                  >
                    {conversation.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-semibold text-slate-900">
                        {conversation.name}
                      </p>

                      <span className="shrink-0 text-xs text-slate-400">
                        {conversation.time}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {conversation.role}
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <p className="truncate text-sm text-slate-600">
                        {conversation.lastMessage}
                      </p>

                      {conversation.unread && (
                        <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-semibold text-white">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredConversations.length === 0 && (
              <p className="p-5 text-center text-sm text-slate-500">
                No conversations found.
              </p>
            )}
          </div>
        </aside>

        {/* Chat Window */}
        <section className="flex min-h-[650px] min-w-0 flex-col">
          {selectedContact && (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-white ${selectedContact.color}`}
                  >
                    {selectedContact.initials}
                  </div>

                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {selectedContact.name}
                    </h2>

                    <p className="text-sm text-slate-500">
                      {selectedContact.role}
                    </p>

                    <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Online
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                  aria-label="Toggle chat details"
                  title="Chat details"
                >
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              {/* Message Area */}
              <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 sm:p-6">
                <div className="text-center">
                  <span className="rounded-full bg-white px-3 py-1 text-xs text-slate-400 shadow-sm">
                    Today
                  </span>
                </div>

                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'me' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[70%] ${
                        message.sender === 'me'
                          ? 'rounded-br-md bg-blue-600 text-white'
                          : 'rounded-bl-md border border-slate-200 bg-white text-slate-800'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">
                        {message.text}
                      </p>

                      <div
                        className={`mt-2 flex items-center justify-end gap-1 text-xs ${
                          message.sender === 'me'
                            ? 'text-blue-100'
                            : 'text-slate-400'
                        }`}
                      >
                        <span>{message.time}</span>

                        {message.sender === 'me' && (
                          <CheckCheck className="h-3.5 w-3.5" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-slate-200 bg-white p-4">
                <div className="flex items-end gap-2">
                  <button
                    className="rounded-lg p-3 text-slate-500 transition hover:bg-slate-100"
                    aria-label="Attach file"
                    title="Attach file"
                  >
                    <Paperclip className="h-5 w-5" />
                  </button>

                  <textarea
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Write a message..."
                    rows={1}
                    className="max-h-32 min-h-[46px] flex-1 resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    onClick={sendMessage}
                    disabled={!messageText.trim()}
                    className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send message"
                    title="Send message"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Press Enter to send. Use Shift + Enter for a new line.
                </p>
              </div>
            </>
          )}
        </section>

        {/* Chat Details Panel */}
        {showDetails && selectedContact && (
          <aside className="border-t border-slate-200 bg-white xl:border-l xl:border-t-0">
            {/* Details Header */}
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h2 className="font-semibold text-slate-900">Chat Details</h2>

              <button
                onClick={() => setShowDetails(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                aria-label="Close chat details"
                title="Close details"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Contact Profile */}
            <div className="border-b border-slate-200 p-5 text-center">
              <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold text-white ${selectedContact.color}`}
              >
                {selectedContact.initials}
              </div>

              <h3 className="mt-3 font-semibold text-slate-900">
                {selectedContact.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {selectedContact.role}
              </p>
            </div>

            {/* Details Tabs */}
            <div className="grid grid-cols-2 border-b border-slate-200">
              <button
                onClick={() => setActiveDetailsTab('overview')}
                className={`px-3 py-3 text-sm font-medium ${
                  activeDetailsTab === 'overview'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-500'
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => setActiveDetailsTab('media')}
                className={`px-3 py-3 text-sm font-medium ${
                  activeDetailsTab === 'media'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-slate-500'
                }`}
              >
                Media & Files
              </button>
            </div>

            {/* Overview Tab */}
            {activeDetailsTab === 'overview' && (
              <div className="space-y-5 p-4">
                {/* Relationship */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Relationship
                  </p>

                  <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
                    <Users className="mt-0.5 h-5 w-5 text-blue-600" />

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {selectedDetails.relationship}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Connected through the MahaSetu innovation network.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Company Information
                  </p>

                  <div className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-slate-500" />

                      <span className="font-medium text-slate-900">
                        {selectedDetails.company}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-500">
                      {selectedDetails.sector}
                    </p>
                  </div>
                </div>

                {/* Past Collaborations */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Past Collaborations
                  </p>

                  <div className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-start gap-3">
                      <Handshake className="mt-0.5 h-5 w-5 text-emerald-600" />

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedDetails.collaboration}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Collaboration status:{' '}
                          {selectedDetails.collaborationStatus}
                        </p>

                        <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">
                          {selectedDetails.collaborationStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Past Pilots */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Past Pilots
                  </p>

                  <div className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-start gap-3">
                      <FlaskConical className="mt-0.5 h-5 w-5 text-purple-600" />

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedDetails.pilot}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Aggregate score: {selectedDetails.pilotScore}/100
                        </p>

                        <span className="mt-2 inline-block rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
                          {selectedDetails.pilotStatus}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Previous Deals */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Previous Deals
                  </p>

                  <div className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-5 w-5 text-orange-600" />

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {selectedDetails.deal}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Deal value: {selectedDetails.dealValue}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          Status: {selectedDetails.dealStatus}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Dates */}
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Important Dates
                  </p>

                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CalendarDays className="h-4 w-4 text-slate-400" />

                    Connected on {selectedDetails.connectedDate}
                  </div>
                </div>
              </div>
            )}

            {/* Media and Files Tab */}
            {activeDetailsTab === 'media' && (
              <div className="space-y-3 p-4">
                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5 text-blue-600" />

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Shared Images
                      </p>

                      <p className="text-xs text-slate-500">4 images</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-orange-600" />

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Project Proposal.pdf
                      </p>

                      <p className="text-xs text-slate-500">
                        Shared document
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-emerald-600" />

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Pilot Scorecard.pdf
                      </p>

                      <p className="text-xs text-slate-500">
                        Shared document
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        )}
      </div>

      {/* Reopen Details Button */}
      {!showDetails && (
        <button
          onClick={() => setShowDetails(true)}
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Show Chat Details
        </button>
      )}
    </div>
  );
}