import {
  Activity, ArrowRight, Banknote, Binary, Boxes, Braces, Briefcase,
  Calculator, Calendar, CaseSensitive, Check, ChevronDown, ChevronRight,
  Clock, Code2, Crop, File, FileText, Flame, Image, Key, Link, Lock,
  Mail, Palette, Percent, QrCode, Search, SearchCode, Shield, Shuffle,
  Sparkles, Star, Text, Type, Users, Zap, type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  "arrow-right": ArrowRight,
  banknote: Banknote,
  binary: Binary,
  boxes: Boxes,
  braces: Braces,
  briefcase: Briefcase,
  calculator: Calculator,
  calendar: Calendar,
  "case-sensitive": CaseSensitive,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  clock: Clock,
  "code-2": Code2,
  crop: Crop,
  file: File,
  "file-text": FileText,
  fire: Flame,
  gradient: Palette,
  image: Image,
  key: Key,
  link: Link,
  lock: Lock,
  mail: Mail,
  palette: Palette,
  percent: Percent,
  "qr-code": QrCode,
  search: Search,
  "search-code": SearchCode,
  shield: Shield,
  shuffle: Shuffle,
  sparkles: Sparkles,
  star: Star,
  text: Text,
  type: Type,
  users: Users,
  zap: Zap,
}

interface IconProps {
  name: string
  className?: string
  size?: number
}

export function Icon({ name, className, size = 20 }: IconProps) {
  const LucideIcon = iconMap[name.toLowerCase()]
  if (!LucideIcon) return null
  return <LucideIcon className={cn("shrink-0", className)} size={size} />
}

export default Icon
