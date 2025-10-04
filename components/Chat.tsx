"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Bot, Loader2, MessageSquare, Send, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface Message {
    id: string;
    content: string;
    role: "user" | "assistant";
    createdAt?: Date;
}

/**
 * Simple AI Chatbot component
 * 
 * @returns A JSX element representing the chat interface.
 */
export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();

        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input.trim(),
            role: "user",
            createdAt: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const response = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to send message: ${response.status}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: data.message || "I'm here to help!",
                role: "assistant",
                createdAt: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error("Error sending message:", error);

            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: error instanceof Error ? error.message : "Sorry, I encountered an error. Please try again.",
                role: "assistant",
                createdAt: new Date(),
            };

            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <main className="container mx-auto px-6 py-8 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-12rem)]">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="border-0 shadow-medium">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Bot className="h-5 w-5 text-primary" />
                                    AI Assistant
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`h-2 w-2 rounded-full ${isLoading ? "bg-yellow-500" : "bg-green-500"
                                            }`}
                                    ></div>
                                    <span className="text-sm text-muted-foreground">
                                        {isLoading ? "Thinking..." : "Online"}
                                    </span>
                                </div>
                                <p className="text-sm">
                                    Hello! I'm here to help you with any questions or conversations you'd like to have.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Chat Interface */}
                    <div className="lg:col-span-3 flex flex-col">
                        <Card className="border-0 shadow-medium flex-1 flex flex-col">
                            <CardHeader className="border-b">
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    AI Chat
                                </CardTitle>
                            </CardHeader>

                            {/* Scrollable Messages Container */}
                            <CardContent className="flex-1 p-0">
                                <div className="h-96 overflow-y-auto p-6 space-y-6">
                                    {messages.length === 0 && (
                                        <div className="flex items-center justify-center h-full text-muted-foreground">
                                            <div className="text-center">
                                                <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                                <p className="text-sm">
                                                    Start a conversation with the AI assistant
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex gap-3 ${message.role === "user"
                                                    ? "justify-end"
                                                    : "justify-start"
                                                }`}
                                        >
                                            {message.role !== "user" && (
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <Bot className="h-4 w-4 text-primary" />
                                                </div>
                                            )}

                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.role === "user"
                                                        ? "bg-primary text-primary-foreground"
                                                        : "bg-muted"
                                                    }`}
                                            >
                                                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                                    {message.content}
                                                </div>
                                                {message.createdAt && (
                                                    <p
                                                        className={`text-xs mt-2 ${message.role === "user"
                                                                ? "text-primary-foreground/70"
                                                                : "text-muted-foreground"
                                                            }`}
                                                    >
                                                        {message.createdAt.getHours().toString().padStart(2, "0")}
                                                        :
                                                        {message.createdAt.getMinutes().toString().padStart(2, "0")}
                                                    </p>
                                                )}
                                            </div>

                                            {message.role === "user" && (
                                                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                                    <User className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Loading indicator */}
                                    {isLoading && (
                                        <div className="flex gap-3 justify-start">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Bot className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="bg-muted rounded-2xl px-4 py-3">
                                                <div className="flex items-center gap-2">
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                    <span className="text-sm text-muted-foreground">
                                                        Thinking...
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={messagesEndRef} />
                                </div>
                            </CardContent>

                            {/* Input Section */}
                            <div className="p-6 border-t">
                                <form onSubmit={handleSubmit} className="space-y-2">
                                    <div className="flex gap-3">
                                        <Input
                                            name="prompt"
                                            value={input}
                                            type="text"
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                            placeholder="Type your message here..."
                                            className="flex-1"
                                            disabled={isLoading}
                                        />

                                        <Button
                                            type="submit"
                                            disabled={!input.trim() || isLoading}
                                            className="shadow-medium"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Send className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        Press Enter to send • AI responses are generated in real-time
                                    </p>
                                </form>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}