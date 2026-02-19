import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/api";
import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function InvoiceDetailPage() {
  const { id } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await api.get(`/invoices/${id}`);
        setInvoice(res.data.invoice);
        setLines(res.data.lines);
      } catch (err) {
        console.log(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [id]);

  const handlePay = async () => {
    try {
      const res = await api.post(`/invoices/${id}/pay`, {
        amount: invoice.balanceDue,
      });

      setInvoice(res.data.invoice);
      alert("Invoice Paid Successfully");
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  if (loading)
    return <p className="p-8 text-center">Loading...</p>;

  if (!invoice)
    return <p className="p-8 text-center">Invoice not found</p>;

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-[#FBFBFA] w-screen ">
        <Sidebar />

        {/* Main */}
        <main className="flex-1 flex justify-center overflow-hidden self-center">

          {/* Center Container */}
          <div className="w-full max-w-4xl h-full flex flex-col p-8 gap-8">

            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-semibold">
                  Invoice #{invoice.invoiceNumber}
                </h1>
                <p className="text-slate-500 mt-1">
                  {new Date(invoice.issueDate).toLocaleDateString()}
                </p>
              </div>

              <Badge
                className={`px-4 py-1 rounded-full ${
                  invoice.status === "PAID"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {invoice.status}
              </Badge>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="p-6">
                <p className="text-sm text-slate-500">Client</p>
                <p className="text-lg font-medium mt-2">
                  {invoice.customerName}
                </p>
              </Card>

              <Card className="p-6">
                <p className="text-sm text-slate-500">Total</p>
                <p className="text-lg font-medium mt-2">
                  ₹{invoice.total}
                </p>
              </Card>

              <Card className="p-6">
                <p className="text-sm text-slate-500">Balance Due</p>
                <p className="text-lg font-medium mt-2">
                  ₹{invoice.balanceDue}
                </p>
              </Card>
            </div>

            {/* Scrollable Items Section */}
            <Card className="flex-1 p-6 flex flex-col overflow-hidden">
              <h2 className="text-lg font-medium mb-4">
                Invoice Items
              </h2>

              <div className="grid grid-cols-12 text-xs uppercase text-slate-400 border-b pb-3">
                <div className="col-span-6">Description</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-2">
                {lines.map((line) => (
                  <div
                    key={line._id}
                    className="grid grid-cols-12 items-center border-b pb-3"
                  >
                    <div className="col-span-6">
                      {line.description}
                    </div>
                    <div className="col-span-2 text-center">
                      {line.quantity}
                    </div>
                    <div className="col-span-2 text-center">
                      ₹{line.unitPrice}
                    </div>
                    <div className="col-span-2 text-right font-medium">
                      ₹{line.lineTotal}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Sticky Bottom Payment */}
            {invoice.status !== "PAID" && (
              <Card className="p-6 flex justify-between items-center shadow-sm">
                <div>
                  <p className="text-sm text-slate-500">
                    Remaining Balance
                  </p>
                  <p className="text-xl font-semibold">
                    ₹{invoice.balanceDue}
                  </p>
                </div>

                <Button onClick={handlePay}>
                  Pay Now
                </Button>
              </Card>
            )}

          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
