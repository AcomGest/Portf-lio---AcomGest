import { useState } from "react"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AnimalCard } from "@/components/AnimalCard"
import { useAnimalContext } from "@/contexts/AnimalContext"
import { 
  Plus, 
  Search, 
  Calendar,
  Heart,
  Activity,
  List,
  Grid3X3
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function Animais() {
  const { animais, lotes, getAnimaisByLote, getStatistics } = useAnimalContext()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLote, setSelectedLote] = useState<string>("todos")
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  
  const stats = getStatistics()

  const filteredAnimais = animais.filter(animal => {
    const matchesSearch = animal.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.id.includes(searchTerm) ||
                         animal.raca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.status.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLote = selectedLote === "todos" || animal.lote === selectedLote
    
    return matchesSearch && matchesLote
  })

  return (
    <DashboardLayout title="Gestão de Animais">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por número, raça ou status..." 
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedLote} onValueChange={setSelectedLote}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrar por lote" />
              </SelectTrigger>
              <SelectContent className="bg-card border border-border shadow-lg">
                <SelectItem value="todos">Todos os lotes</SelectItem>
                {lotes.map((lote) => (
                  <SelectItem key={lote} value={lote}>{lote}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex rounded-md border border-border">
              <Button 
                variant={viewMode === 'card' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('card')}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button 
                variant={viewMode === 'list' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button className="veterinary-gradient text-white" onClick={() => window.location.href = '/animais/novo'}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Animal
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-xl font-semibold">{stats.totalAnimais}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gestantes</p>
                <p className="text-xl font-semibold">{stats.gestantes}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Inseminadas</p>
                <p className="text-xl font-semibold">{stats.inseminadas}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Em Descanso</p>
                <p className="text-xl font-semibold">{stats.emDescanso}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Animals Display */}
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {filteredAnimais.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} view="list" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnimais.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} view="card" />
            ))}
          </div>
        )}

        {filteredAnimais.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Nenhum animal encontrado com os filtros aplicados.</p>
          </Card>
        )}

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" disabled>Anterior</Button>
            <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Próximo</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}