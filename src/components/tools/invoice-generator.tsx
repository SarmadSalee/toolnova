"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Download, FileText, Plus, RotateCcw, Trash2 } from "lucide-react"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

interface LineItem {
  id: string
  description: string
  quantity: number
  rate: number
}

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "INR", symbol: "₹" },
  { code: "JPY", symbol: "¥" },
  { code: "CAD", symbol: "C$" },
  { code: "AUD", symbol: "A$" },
]

function createItem(): LineItem {
  return { id: Math.random().toString(36).substring(2), description: "", quantity: 1, rate: 0 }
}

export default function InvoiceGenerator() {
  const { copy, reset: resetCtx } = useToolContext()
  const [currency, setCurrency] = useState("USD")
  const [invoiceNo, setInvoiceNo] = useState(`INV-${Date.now()}`)
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [dueDate, setDueDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  )
  const [companyName, setCompanyName] = useState("")
  const [companyAddress, setCompanyAddress] = useState("")
  const [clientName, setClientName] = useState("")
  const [clientAddress, setClientAddress] = useState("")
  const [items, setItems] = useState<LineItem[]>([createItem()])
  const [taxRate, setTaxRate] = useState(0)
  const [notes, setNotes] = useState("")
  const [showPreview, setShowPreview] = useState(false)

  const curSymbol = currencies.find((c) => c.code === currency)?.symbol || "$"

  const { subtotal, tax, total } = useMemo(() => {
    const s = items.reduce((sum, item) => sum + item.quantity * item.rate, 0)
    const t = s * (taxRate / 100)
    return { subtotal: s, tax: t, total: s + t }
  }, [items, taxRate])

  const addItem = useCallback(() => setItems((prev) => [...prev, createItem()]), [])
  const removeItem = useCallback((id: string) => {
    setItems((prev) => (prev.length > 1 ? prev.filter((i) => i.id !== id) : prev))
  }, [])
  const updateItem = useCallback(
    (id: string, field: keyof LineItem, value: string | number) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
      )
    },
    []
  )

  const reset = useCallback(() => {
    setCurrency("USD")
    setInvoiceNo(`INV-${Date.now()}`)
    setDate(new Date().toISOString().split("T")[0])
    setDueDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])
    setCompanyName("")
    setCompanyAddress("")
    setClientName("")
    setClientAddress("")
    setItems([createItem()])
    setTaxRate(0)
    setNotes("")
    setShowPreview(false)
    resetCtx()
  }, [resetCtx])

  const download = useCallback(() => {
    const rows = items
      .map(
        (item) =>
          `<tr><td>${item.description}</td><td>${item.quantity}</td><td>${curSymbol}${item.rate.toFixed(2)}</td><td>${curSymbol}${(item.quantity * item.rate).toFixed(2)}</td></tr>`
      )
      .join("")

    const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Invoice ${invoiceNo}</title><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px}table{width:100%;border-collapse:collapse;margin:20px 0}th,td{padding:12px;text-align:left;border-bottom:1px solid #ddd}th{background:#f5f5f5}.totals{text-align:right;margin-top:20px}.totals p{margin:5px 0}</style></head><body><h1>INVOICE</h1><p><strong>Invoice #:</strong> ${invoiceNo}</p><p><strong>Date:</strong> ${date}</p><p><strong>Due Date:</strong> ${dueDate}</p><hr><h3>From:</h3><p>${companyName || "Your Company"}<br>${companyAddress}</p><h3>To:</h3><p>${clientName || "Client Name"}<br>${clientAddress}</p><table><thead><tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr></thead><tbody>${rows}</tbody></table><div class="totals"><p>Subtotal: ${curSymbol}${subtotal.toFixed(2)}</p><p>Tax (${taxRate}%): ${curSymbol}${tax.toFixed(2)}</p><p><strong>Total: ${curSymbol}${total.toFixed(2)}</strong></p></div>${notes ? `<hr><p><strong>Notes:</strong><br>${notes}</p>` : ""}</body></html>`

    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `invoice-${invoiceNo}.html`
    a.click()
    URL.revokeObjectURL(url)
  }, [invoiceNo, date, dueDate, companyName, companyAddress, clientName, clientAddress, items, taxRate, notes, curSymbol, subtotal, tax, total])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <div className="w-32">
          <label className="mb-1.5 block text-xs font-medium text-foreground">Currency</label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-background px-2 text-sm text-foreground"
          >
            {currencies.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 min-w-[120px]">
          <label className="mb-1.5 block text-xs font-medium text-foreground">Invoice #</label>
          <Input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} />
        </div>
        <div className="w-36">
          <label className="mb-1.5 block text-xs font-medium text-foreground">Date</label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="w-36">
          <label className="mb-1.5 block text-xs font-medium text-foreground">Due Date</label>
          <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">From (Your Company)</label>
          <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
          <textarea
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            placeholder="Address"
            className="mt-2 h-16 w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground placeholder:text-muted-foreground resize-none"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-foreground">Bill To (Client)</label>
          <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" />
          <textarea
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            placeholder="Address"
            className="mt-2 h-16 w-full rounded-lg border border-border bg-background p-2 text-xs text-foreground placeholder:text-muted-foreground resize-none"
          />
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Line Items</span>
          <Button variant="outline" size="sm" onClick={addItem} icon={<Plus className="size-3.5" />}>
            Add Item
          </Button>
        </div>
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-2">
              <div className="flex-1">
                <input
                  value={item.description}
                  onChange={(e) => updateItem(item.id, "description", e.target.value)}
                  placeholder="Description"
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="w-20">
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => updateItem(item.id, "quantity", Math.max(1, Number(e.target.value)))}
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground"
                />
              </div>
              <div className="w-28">
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={item.rate}
                  onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
                  className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground"
                />
              </div>
              <div className="w-28 pt-2 text-sm text-foreground font-mono text-right">
                {curSymbol}{(item.quantity * item.rate).toFixed(2)}
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-error transition-colors mt-1"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="w-32">
          <label className="mb-1.5 block text-xs font-medium text-foreground">Tax Rate (%)</label>
          <Input
            type="number"
            min={0}
            max={100}
            value={taxRate}
            onChange={(e) => setTaxRate(Number(e.target.value))}
          />
        </div>
        <div className="flex-1">
          <label className="mb-1.5 block text-xs font-medium text-foreground">Notes</label>
          <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Payment terms, etc." />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-background p-4 text-right space-y-1">
        <p className="text-sm text-muted-foreground">Subtotal: {curSymbol}{subtotal.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">Tax ({taxRate}%): {curSymbol}{tax.toFixed(2)}</p>
        <p className="text-lg font-bold text-foreground">Total: {curSymbol}{total.toFixed(2)}</p>
      </div>

      <div className="flex gap-3">
        <Button onClick={download} icon={<Download className="size-4" />}>
          Download HTML
        </Button>
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>
    </div>
  )
}
