import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAnimalContext } from "@/contexts/AnimalContext"
import { Plus, Calendar } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface EventDialogProps {
  children: React.ReactNode
}

export function EventDialog({ children }: EventDialogProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    data: '',
    tipo: '',
    animal: '',
    descricao: '',
    prioridade: 'media' as 'alta' | 'media' | 'baixa'
  })
  
  const { addEvento, animais } = useAnimalContext()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.data || !formData.tipo || !formData.animal) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive"
      })
      return
    }

    addEvento({
      ...formData,
      status: 'agendado'
    })

    toast({
      title: "Evento agendado!",
      description: "O evento foi adicionado ao cronograma com sucesso."
    })

    setFormData({
      data: '',
      tipo: '',
      animal: '',
      descricao: '',
      prioridade: 'media'
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-primary" />
            Agendar Evento
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="data">Data *</Label>
              <Input
                id="data"
                type="date"
                value={formData.data}
                onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="tipo">Tipo de Evento *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData(prev => ({ ...prev, tipo: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Parto Previsto">Parto Previsto</SelectItem>
                  <SelectItem value="Exame de Controle">Exame de Controle</SelectItem>
                  <SelectItem value="Exame Ultrassom">Exame Ultrassom</SelectItem>
                  <SelectItem value="Inseminação Artificial">Inseminação Artificial</SelectItem>
                  <SelectItem value="Início do Descanso">Início do Descanso</SelectItem>
                  <SelectItem value="Vacinação">Vacinação</SelectItem>
                  <SelectItem value="Consulta Veterinária">Consulta Veterinária</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="animal">Animal *</Label>
            <Select value={formData.animal} onValueChange={(value) => setFormData(prev => ({ ...prev, animal: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar animal" />
              </SelectTrigger>
              <SelectContent>
                {animais.map((animal) => (
                  <SelectItem key={animal.id} value={`${animal.nome} #${animal.id}`}>
                    {animal.nome} #{animal.id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="prioridade">Prioridade</Label>
            <Select value={formData.prioridade} onValueChange={(value: 'alta' | 'media' | 'baixa') => setFormData(prev => ({ ...prev, prioridade: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alta">Alta</SelectItem>
                <SelectItem value="media">Média</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Detalhes sobre o evento..."
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="veterinary-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Agendar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}