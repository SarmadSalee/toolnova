"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Calculator, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Card from "@/components/ui/card"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

export default function EmiCalculator() {
  const { reset: resetCtx } = useToolContext()
  const [amount, setAmount] = useState(100000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(5)
  const [calculated, setCalculated] = useState(false)

  const results = useMemo(() => {
    const p = amount
    const r = rate / 12 / 100
    const n = tenure * 12
    if (p <= 0 || r <= 0 || n <= 0) return null
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
    const totalPayment = emi * n
    const totalInterest = totalPayment - p
    const schedule = Array.from({ length: n }, (_, i) => {
      const balance = p * Math.pow(1 + r, i + 1) - (emi * (Math.pow(1 + r, i + 1) - 1)) / r
      const interest = i === 0 ? p * r : (p * Math.pow(1 + r, i) - (emi * (Math.pow(1 + r, i) - 1)) / r) * r
      const principal = emi - interest
      return {
        month: i + 1,
        emi: Math.round(emi * 100) / 100,
        principal: Math.round(principal * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        balance: Math.round(Math.max(0, balance) * 100) / 100,
      }
    })
    return {
      emi: Math.round(emi * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      schedule,
      principalPercent: (p / totalPayment) * 100,
      interestPercent: (totalInterest / totalPayment) * 100,
    }
  }, [amount, rate, tenure])

  const calculate = useCallback(() => {
    setCalculated(true)
  }, [])

  const reset = useCallback(() => {
    setAmount(100000)
    setRate(8.5)
    setTenure(5)
    setCalculated(false)
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Loan Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Interest Rate (% p.a.)</label>
          <Input
            type="number"
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Tenure (Years)</label>
          <Input
            type="number"
            min={1}
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={calculate} icon={<Calculator className="size-4" />}>
          Calculate
        </Button>
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>

      {calculated && results && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <p className="text-xs text-muted-foreground mb-1">Monthly EMI</p>
              <p className="text-2xl font-bold text-primary">₹{results.emi.toLocaleString("en-IN")}</p>
            </Card>
            <Card>
              <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
              <p className="text-2xl font-bold text-warning">₹{results.totalInterest.toLocaleString("en-IN")}</p>
            </Card>
            <Card>
              <p className="text-xs text-muted-foreground mb-1">Total Payment</p>
              <p className="text-2xl font-bold text-foreground">₹{results.totalPayment.toLocaleString("en-IN")}</p>
            </Card>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-semibold text-foreground">Principal vs Interest</h3>
            <div className="flex h-6 rounded-full overflow-hidden">
              <div
                className="bg-primary transition-all"
                style={{ width: `${results.principalPercent}%` }}
              />
              <div
                className="bg-warning transition-all"
                style={{ width: `${results.interestPercent}%` }}
              />
            </div>
            <div className="mt-2 flex gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-primary" />
                Principal: {results.principalPercent.toFixed(1)}%
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full bg-warning" />
                Interest: {results.interestPercent.toFixed(1)}%
              </span>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Amortization Schedule</h3>
            <div className="max-h-64 overflow-auto rounded-xl border border-border">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-muted text-muted-foreground">
                    <th className="p-2 text-left">Month</th>
                    <th className="p-2 text-right">EMI</th>
                    <th className="p-2 text-right">Principal</th>
                    <th className="p-2 text-right">Interest</th>
                    <th className="p-2 text-right">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {results.schedule.slice(0, 12).map((row) => (
                    <tr key={row.month} className="border-t border-border text-foreground">
                      <td className="p-2">{row.month}</td>
                      <td className="p-2 text-right">₹{row.emi.toLocaleString("en-IN")}</td>
                      <td className="p-2 text-right">₹{row.principal.toLocaleString("en-IN")}</td>
                      <td className="p-2 text-right">₹{row.interest.toLocaleString("en-IN")}</td>
                      <td className="p-2 text-right">₹{row.balance.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {results.schedule.length > 12 && (
                <p className="p-2 text-center text-xs text-muted-foreground">
                  Showing first 12 of {results.schedule.length} months
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {!calculated && (
        <EmptyState
          icon={<Calculator className="size-8" />}
          title="Calculate your EMI"
          description="Enter loan details and click Calculate"
        />
      )}
    </div>
  )
}
