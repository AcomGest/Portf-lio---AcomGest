import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Animal, useAnimalContext } from "@/contexts/AnimalContext"
import { useToast } from "@/hooks/use-toast"

interface EditAnimalDialogProps {
  animal: Animal
  children: React.ReactNode
}

export function EditAnimalDialog({ animal, children }: EditAnimalDialogProps) {
  const { updateAnimal, lotes } = useAnimalContext()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    nome: animal.nome,
    raca: animal.raca,
    idade: animal.idade,
    tipo: animal.tipo,
    lote: animal.lote,
    pai: animal.pai || '',
    mae: animal.mae || '',
    observacoes: animal.observacoes || ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    updateAnimal(animal.id, {
      ...formData,
      pai: formData.pai || undefined,
      mae: formData.mae || undefined,
      observacoes: formData.observacoes || undefined
    })
    
    toast({
      title: "Animal atualizado",
      description: `${formData.nome} foi atualizado com sucesso.`
    })
    
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Animal - {animal.nome}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="raca">Raça *</Label>
              <Input
                id="raca"
                value={formData.raca}
                onChange={(e) => setFormData(prev => ({ ...prev, raca: e.target.value }))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idade">Idade *</Label>
              <Input
                id="idade"
                value={formData.idade}
                onChange={(e) => setFormData(prev => ({ ...prev, idade: e.target.value }))}
                placeholder="Ex: 3 anos, 24 meses"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo *</Label>
              <Select 
                value={formData.tipo} 
                onValueChange={(value: 'Leite' | 'Corte') => 
                  setFormData(prev => ({ ...prev, tipo: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Leite">Leite</SelectItem>
                  <SelectItem value="Corte">Corte</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lote">Lote *</Label>
              <Select 
                value={formData.lote} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, lote: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {lotes.map(lote => (
                    <SelectItem key={lote} value={lote}>{lote}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pai">Pai (Opcional)</Label>
              <Input
                id="pai"
                value={formData.pai}
                onChange={(e) => setFormData(prev => ({ ...prev, pai: e.target.value }))}
                placeholder="Registro do pai"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mae">Mãe (Opcional)</Label>
              <Input
                id="mae"
                value={formData.mae}
                onChange={(e) => setFormData(prev => ({ ...prev, mae: e.target.value }))}
                placeholder="Registro da mãe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
              placeholder="Observações gerais sobre o animal..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}