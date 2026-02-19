import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, FileText, 
  ArrowUpRight} from "lucide-react";
import { Link } from "react-router-dom";
// Shadcn UI Imports (Assuming path)
import { Separator } from "@/components/ui/separator";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SidebarProvider} from "@/components/ui/sidebar";


const DashboardPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const invoices = [
    { id: "INV-2026-001", client: "Acme Enterprise", date: "Feb 12, 2026", amount: "₹45,000", status: "Paid" },
    { id: "INV-2026-002", client: "Zentry Studio", date: "Feb 15, 2026", amount: "₹12,800", status: "Draft" },
    { id: "INV-2026-003", client: "Urban Kicks", date: "Feb 16, 2026", amount: "₹8,500", status: "Paid" },
    { id: "INV-2026-004", client: "Nova AI", date: "Feb 17, 2026", amount: "₹32,000", status: "Draft" },
  ];

  const filteredInvoices = activeFilter === "All" 
    ? invoices 
    : invoices.filter(inv => inv.status === activeFilter);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#FBFBFA]">
        
      
        <Sidebar/>
        
        {/* --- Main Content --- */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h1 className="text-4xl font-light text-slate-900 tracking-tight">Invoices</h1>
                <p className="text-slate-500 mt-1">Review and manage your billing history.</p>
              </div>

              <div className="flex items-center gap-4">
                {/* Filter Pills */}
                <div className="flex items-center bg-slate-100/80 p-1 rounded-full border border-slate-200">
                  {["All", "Paid", "Draft"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setActiveFilter(f)}
                      className={`px-5 py-1.5 rounded-full text-sm transition-all ${
                        activeFilter === f 
                        ? "bg-white text-slate-900 shadow-sm font-medium" 
                        : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <Button>
                <Link to="/invoice/create"> Create Invoice
                </Link>
                </Button>
              </div>
            </header>

            {/* --- Invoice List --- */}
            <div className="space-y-4">
              <div className="grid grid-cols-12 px-6 mb-4 text-xs font-medium text-slate-400 uppercase tracking-widest">
                <div className="col-span-5">Client</div>
                <div className="col-span-3 text-center">Status</div>
                <div className="col-span-3 text-right">Amount</div>
                <div className="col-span-1"></div>
              </div>

              <AnimatePresence mode="popLayout">
                {filteredInvoices.map((invoice, index) => (
                  <motion.div
                    key={invoice.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <a href={`/invoice/${invoice.id}`} className="block group">
                      <Card className="border-slate-100 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-500 group-hover:-translate-y-1 overflow-hidden bg-white/80 backdrop-blur-sm">
                        <div className="grid grid-cols-12 items-center p-6">
                          {/* Client Info */}
                          <div className="col-span-5 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors duration-500">
                              <FileText size={22} strokeWidth={1.5} />
                            </div>
                            <div>
                              <h3 className="font-medium text-slate-900">{invoice.client}</h3>
                              <p className="text-sm text-slate-400 font-mono">{invoice.id}</p>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="col-span-3 flex justify-center">
                            <Badge 
                              className={`rounded-full px-4 py-1 font-normal border-none shadow-none ${
                                invoice.status === 'Paid' 
                                ? 'bg-emerald-50 text-emerald-600' 
                                : 'bg-orange-50 text-orange-600'
                              }`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full mr-2 ${invoice.status === 'Paid' ? 'bg-emerald-500' : 'bg-orange-500'}`} />
                              {invoice.status}
                            </Badge>
                          </div>

                          {/* Amount */}
                          <div className="col-span-3 text-right">
                            <p className="text-lg font-light text-slate-900">{invoice.amount}</p>
                            <p className="text-xs text-slate-400 font-light">{invoice.date}</p>
                          </div>

                          {/* Action Arrow */}
                          <div className="col-span-1 flex justify-end text-slate-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                            <ArrowUpRight size={20} />
                          </div>
                        </div>
                      </Card>
                    </a>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;