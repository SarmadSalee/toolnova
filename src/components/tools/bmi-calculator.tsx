"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Activity, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import Button from "@/components/ui/button"
import Input from "@/components/ui/input"
import Card from "@/components/ui/card"
import EmptyState from "@/components/ui/empty-state"
import { useToolContext } from "./tool-wrapper"

function getCategory(bmi: number) {
  if (bmi < 18.5) return { label: "Underweight", color: "text-warning", barColor: "bg-warning", range: "Below 18.5" }
  if (bmi < 25) return { label: "Normal", color: "text-success", barColor: "bg-success", range: "18.5 - 24.9" }
  if (bmi < 30) return { label: "Overweight", color: "text-warning", barColor: "bg-warning", range: "25 - 29.9" }
  return { label: "Obese", color: "text-error", barColor: "bg-error", range: "30 & Above" }
}

export default function BmiCalculator() {
  const { reset: resetCtx } = useToolContext()
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(70)
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft">("cm")
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg")
  const [calculated, setCalculated] = useState(false)

  const bmi = useMemo(() => {
    let hCm = height
    if (heightUnit === "ft") hCm = height * 30.48
    let wKg = weight
    if (weightUnit === "lbs") wKg = weight * 0.453592
    if (hCm <= 0 || wKg <= 0) return null
    const hM = hCm / 100
    const val = wKg / (hM * hM)
    return { value: Math.round(val * 10) / 10, weightKg: wKg, heightCm: hCm }
  }, [height, weight, heightUnit, weightUnit])

  const category = bmi ? getCategory(bmi.value) : null

  const healthyRange = useMemo(() => {
    if (!bmi) return null
    const hM = bmi.heightCm / 100
    const min = 18.5 * hM * hM
    const max = 24.9 * hM * hM
    return { min: Math.round(min * 10) / 10, max: Math.round(max * 10) / 10 }
  }, [bmi])

  const calculate = useCallback(() => {
    if (height > 0 && weight > 0) setCalculated(true)
  }, [height, weight])

  const reset = useCallback(() => {
    setHeight(170)
    setWeight(70)
    setHeightUnit("cm")
    setWeightUnit("kg")
    setCalculated(false)
    resetCtx()
  }, [resetCtx])

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Height ({heightUnit === "cm" ? "cm" : "feet"})
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
            </div>
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value as "cm" | "ft")}
              className="h-10 w-20 rounded-lg border border-border bg-background px-2 text-sm text-foreground"
            >
              <option value="cm">cm</option>
              <option value="ft">ft</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Weight ({weightUnit === "kg" ? "kg" : "lbs"})
          </label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as "kg" | "lbs")}
              className="h-10 w-20 rounded-lg border border-border bg-background px-2 text-sm text-foreground"
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={calculate} icon={<Activity className="size-4" />}>
          Calculate BMI
        </Button>
        <Button variant="ghost" onClick={reset} icon={<RotateCcw className="size-4" />}>
          Reset
        </Button>
      </div>

      {calculated && bmi && category && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <Card className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Your BMI</p>
            <p className="text-5xl font-bold text-foreground">{bmi.value}</p>
            <p className={cn("mt-2 text-lg font-semibold", category.color)}>
              {category.label}
            </p>
          </Card>

          <div className="relative h-4 rounded-full bg-muted overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all", category.barColor)}
              style={{ width: `${Math.min((bmi.value / 40) * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Underweight</span>
            <span>Normal</span>
            <span>Overweight</span>
            <span>Obese</span>
          </div>

          {healthyRange && (
            <Card>
              <p className="text-xs text-muted-foreground mb-1">Healthy Weight Range</p>
              <p className="text-lg font-semibold text-foreground">
                {healthyRange.min.toFixed(1)} kg - {healthyRange.max.toFixed(1)} kg
              </p>
            </Card>
          )}
        </motion.div>
      )}

      {!calculated && (
        <EmptyState
          icon={<Activity className="size-8" />}
          title="Calculate your BMI"
          description="Enter height and weight, then click Calculate"
        />
      )}
    </div>
  )
}
