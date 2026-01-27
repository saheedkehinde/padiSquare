import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import { BottomNav } from "@/components/home/BottomNav";
import { ChatAssistant } from "@/components/home/ChatAssistant";
import { MessageSquare, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoLight from "@/assets/padis-logo-light.svg";
import logoDark from "@/assets/padis-logo-dark.svg";

const Messages = () => {
  const { theme } = useTheme();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const conversations = [
    {
      id: 1,
      name: "PadiSquare AI",
      lastMessage: "I found some great deals on electronics for you!",
      time: "2m ago",
      unread: 2,
      isAI: true,
    },
    {
      id: 2,
      name: "TechHub Electronics",
      lastMessage: "Your order has been shipped!",
      time: "1h ago",
      unread: 0,
      isAI: false,
    },
    {
      id: 3,
      name: "AutoMart Nigeria",
      lastMessage: "Thank you for your inquiry about the Toyota Altis.",
      time: "3h ago",
      unread: 1,
      isAI: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container flex h-14 items-center justify-between">
          <img src={theme === "dark" ? logoDark : logoLight} alt="PadiSquare" className="h-7 w-auto" />
          <ThemeToggle />
        </div>
      </header>

      {/* Messages Section */}
      <section className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => conversation.isAI && setIsChatOpen(true)}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-full ${
                conversation.isAI 
                  ? "gradient-primary glow-primary" 
                  : "bg-muted"
              }`}>
                {conversation.isAI ? (
                  <Bot className="h-6 w-6 text-primary-foreground" />
                ) : (
                  <User className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-foreground">{conversation.name}</span>
                  <span className="text-xs text-muted-foreground">{conversation.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>
              
              {conversation.unread > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {conversation.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No messages yet</h3>
            <p className="text-muted-foreground mb-4">Start a conversation with our AI assistant or vendors</p>
            <Button onClick={() => setIsChatOpen(true)} className="btn-glow">
              Chat with AI
            </Button>
          </div>
        )}
      </section>

      <BottomNav activeTab="messages" />
      
      <ChatAssistant isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Messages;
