import {
  Code2,
  Text,
  Image,
  File,
  Palette,
  Search,
  Braces,
  Briefcase,
  Banknote,
  Calculator,
  QrCode,
  Shuffle,
  Zap,
  Sparkles,
  Boxes,
  type LucideIcon,
} from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  "code-2": Code2,
  text: Text,
  image: Image,
  file: File,
  palette: Palette,
  search: Search,
  braces: Braces,
  briefcase: Briefcase,
  banknote: Banknote,
  calculator: Calculator,
  "qr-code": QrCode,
  shuffle: Shuffle,
  zap: Zap,
  sparkles: Sparkles,
  boxes: Boxes,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Code2
}
