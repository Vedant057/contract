"use client";

import ContractAnalysisResults from "@/components/analysis/contract-analysis-results";
import { useCurrentUser } from "@/hooks/use-current-user";
import { ContractAnalysis } from "@/interfaces/contract.interface";
import { api } from "@/lib/api";
import { notFound } from "next/navigation";
import { useEffect, useState, useRef, Children } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, MessageCircle, Send, Loader2, ArrowDownCircleIcon } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion"
import { useChat } from "@ai-sdk/react"
import { Button } from "@/components/ui/button";


interface IContractResultsProps {
  contractId: any;
}

export default function ContractResults({ contractId }: IContractResultsProps) {
  const { user } = useCurrentUser();
  const [analysisResults, setAnalysisResults] = useState<ContractAnalysis>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const chatIconRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const {messages, input, handleInputChange, handleSubmit, isLoading, stop, reload} = useChat({api:"/api/gemini"})

  useEffect(() => {
    if (user) {
      fetchAnalysisResults(contractId);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () =>{
      if(window.scrollY > 50){
        setShowChatIcon(true)
      }else{
        setShowChatIcon(false);
        setIsChatOpen(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll",handleScroll);

    return () =>{
      window.removeEventListener("scroll",handleScroll);
    }
  }, []);

  const toggleChat = () =>{
    setIsChatOpen(!isChatOpen);
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth"});
    }
  }, [messages]);


  const fetchAnalysisResults = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/contracts/contract/${id}`);
      setAnalysisResults(response.data);
      console.log(response.data);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return notFound();
  }

  if (!analysisResults) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <ContractAnalysisResults
      contractId={contractId}
      analysisResults={analysisResults}
      isActive={true}
      />

      <AnimatePresence>
        {showChatIcon && (
          <motion.div 
            initial={{ opacity: 0, y:100 }}
            animate={{ opacity: 1, y:0 }}
            exit={{ opacity: 0, y:100 }}
            transition={{ duration:0.2 }}
            className="fixed bottom-4 right-4 z-50"
            >
              <Button ref={chatIconRef} onClick={toggleChat} size="icon" className="rounded-full size-14 p-2 shadow-lg">
                {!isChatOpen ? (
                  <MessageCircle className="size-12" />
                ):(
                  <ArrowDownCircleIcon  />
                )}
              </Button>
            </motion.div>
        )}
        </AnimatePresence>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration:0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[95%] md:w-[500px]"
            >
              <Card className="border-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <CardTitle className="text-lg font-bold">
                    Chat with AI
                  </CardTitle>
                  <Button 
                    onClick={toggleChat}
                    size='sm'
                    variant='ghost'
                    className="px-2 py-0"
                    >
                      <X className="size-4" />
                      <span className="sr-only">Close Chat</span>
                    </Button>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] pr-4">
                    {messages?.length===0 &&(
                    <div className="w-full mt-32 text-gray-500 items-center justify-center flex gap-3">
                      No Messages Yet
                    </div>
                    )}
                    {messages?.map((message, index) =>(
                      <div key={index} className={`mb-4 ${message.role === "user" ? "text-right":"text-left"}`}>
                        <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <ReactMarkdown 
                              children={message.content}
                              remarkPlugins={[remarkGfm]}
                              components={{
                                code({ node, inline, className, children, ...props}){
                                  return inline ? (
                                    <code {...props} className="bg-gray-200 px-1 rounded">{children}</code>
                                  ):(
                                    <pre {...props} className="bg-gray-200 px-2 rounded">
                                      <code>{children}</code>
                                    </pre>
                                  );
                                },
                                ul: ({children})=>(
                                  <ul className="list-disc ml-4">
                                    {children}
                                  </ul>
                                ),
                                ol: ({children})=>(
                                  <li className="list-decimal ml-4">
                                    {children}
                                  </li>
                                )
                              }}
                            />
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="w-full items-center flex justify-center gap-3">
                        <Loader2 className="animate-spin h-5 w-5 text-primary" />
                        <button
                          className="underline"
                          type="button"
                          onClick={() => stop()}
                          >
                            abort
                          </button>
                      </div>
                    )}
                    <div ref={scrollRef}></div>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                        <Input value={input} onChange={handleInputChange} className="flex-1" placeholder="Type your message here..."/>
                        <Button type="submit" className="size-9" disabled={isLoading} size="icon">
                          <Send className="size-4" />
                        </Button>
                  </form>
                </CardFooter>
              </Card>
            </motion.div>
          )}
      </AnimatePresence>

      </>
  );
}