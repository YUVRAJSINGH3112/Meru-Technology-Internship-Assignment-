import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Sidebar from "../components/sidebar";
import { Separator } from "@/components/ui/separator";

export default function CreateInvoice() {
  const [invoice, setInvoice] = useState({
    clientName: "",
    invoiceNumber: "",
    dueDate: "",
    address: "",
    items: [
      {
        itemName: "",
        quantity: 1,
        rate: "",
        total: 0,
      },
    ],
  });

  const updateItem = (index, field, value) => {
    setInvoice(prev => {
      const items = [...prev.items];
  
      if (field === "quantity" && value < 1) value = 1;
      if (field === "rate" && value < 1) value = 1;
  
      items[index] = {
        ...items[index],
        [field]: value,
      };
  
      const qty = Number(items[index].quantity) || 0;
      const rate = Number(items[index].rate) || 0;
  
      items[index].total = qty * rate;
  
      return { ...prev, items };
    });
  };
  
  const addItems = () => {
    setInvoice(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          itemName: "",
          quantity: 1,
          rate: 0,
          total: 0,
        },
      ],
    }));
  };

  // totals
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const discount = 0;

  const grandTotal = subtotal - discount;

  return (
    <div className="flex h-screen bg-muted/40">

     <Sidebar/>

      <main className="flex-1 p-6 space-y-6 overflow-y-auto">

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">New Invoice</h1>

          <div className="flex gap-3">
            <Button>Generate Invoice</Button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-6">

          {/* Left: Form */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <Input
                value={invoice.clientName}
                onChange={(e) =>
                  setInvoice(prev => ({
                    ...prev,
                    clientName: e.target.value,
                  }))
                }
                placeholder="Client name"
              />

              <Input
                value={invoice.invoiceNumber}
                onChange={(e) =>
                  setInvoice(prev => ({
                    ...prev,
                    invoiceNumber: e.target.value,
                  }))
                }
                placeholder="Invoice number"
              />

              <Input
                value={invoice.dueDate}
                onChange={(e) =>
                  setInvoice(prev => ({
                    ...prev,
                    dueDate: e.target.value,
                  }))
                }
                placeholder="Due date"
              />

              <Input
                value={invoice.address}
                onChange={(e) =>
                  setInvoice(prev => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
                placeholder="Address"
              />

              <Separator />

              <CardTitle className="text-base">Invoice Items</CardTitle>

              {invoice.items.map((item, i) => (
                <div key={i} className="space-y-2 border p-3 rounded-md">

                  <Input
                    placeholder="Item name"
                    value={item.itemName}
                    onChange={(e) =>
                      updateItem(i, "itemName", e.target.value)
                    }
                  />

                  {/* Labels */}
                  <div className="grid grid-cols-3 gap-2 text-xs font-medium text-muted-foreground">
                    <p>Quantity</p>
                    <p>Rate</p>
                    <p>Total</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(i, "quantity", +e.target.value)
                      }
                    />

                    <Input
                      type="number"
                      value={item.rate}
                      onChange={(e) =>
                        updateItem(i, "rate", +e.target.value)
                      }
                    />

                    <Input value={item.total} readOnly />
                  </div>
                </div>
              ))}

              <Button onClick={addItems} variant="outline" className="w-full">
                + Add Item
              </Button>
            </CardContent>
          </Card>

          {/* Right: Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="border rounded-lg p-4 space-y-2">
                <h2 className="text-lg font-semibold">Invoice</h2>
                <p className="text-sm text-muted-foreground">
                  Name :- {invoice.clientName}
                </p>
                <p className="text-sm text-muted-foreground">
                  Invoice Number :- {invoice.invoiceNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  Due Date :- {invoice.dueDate}
                </p>
                <p className="text-sm text-muted-foreground">
                  Address :- {invoice.address}
                </p>
              </div>

              {/* Items Preview */}
              <div className="border rounded-lg p-4 space-y-2">
                {invoice.items.map((item, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span>
                      {item.itemName || "Item"} × {item.quantity}
                    </span>
                    <span>${item.total}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>${discount}</span>
                </div>

                <div className="flex justify-between font-semibold text-base">
                  <span>Grand Total</span>
                  <span>${grandTotal}</span>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
}
