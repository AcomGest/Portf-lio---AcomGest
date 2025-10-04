import React, { createContext, useContext, useState, ReactNode } from 'react'

export interface Animal {
  id: string
  nome: string
  raca: string
  idade: string
  tipo: 'Leite' | 'Corte'
  status: 'Gestante' | 'Ativo' | 'Inseminada' | 'Em Descanso' | 'Desmama'
  ultimoExame: string
  previsaoParto?: string
  statusColor: 'success' | 'primary' | 'warning' | 'secondary'
  lote: string
  pai?: string
  mae?: string
  observacoes?: string
  dataInseminacao?: string
  inicioDescanso?: string
  fimDescanso?: string
  producaoLeiteira?: {
    data: string
    quantidade: number
  }[]
  historico?: {
    data: string
    tipo: 'Inseminação' | 'Doença' | 'Tratamento' | 'Medicação' | 'Exame' | 'Parto'
    descricao: string
  }[]
  filhos?: string[]
}

export interface Evento {
  id: string
  data: string
  tipo: string
  animal: string
  descricao: string
  prioridade: 'alta' | 'media' | 'baixa'
  status: 'agendado' | 'concluido' | 'cancelado'
}

interface AnimalContextType {
  animais: Animal[]
  eventos: Evento[]
  lotes: string[]
  addAnimal: (animal: Omit<Animal, 'id'>) => void
  removeAnimal: (id: string) => void
  updateAnimal: (id: string, updates: Partial<Animal>) => void
  addEvento: (evento: Omit<Evento, 'id'>) => void
  removeEvento: (id: string) => void
  updateEvento: (id: string, updates: Partial<Evento>) => void
  registrarPrenhez: (animalId: string, dataInseminacao: string) => void
  registrarDescanso: (animalId: string, tipo: 'Leite' | 'Corte') => void
  getAnimaisByLote: (lote: string) => Animal[]
  getStatistics: () => {
    totalAnimais: number
    gestantes: number
    inseminadas: number
    emDescanso: number
    examesTotais: number
    taxaSucesso: number
  }
}

const AnimalContext = createContext<AnimalContextType | undefined>(undefined)

export const useAnimalContext = () => {
  const context = useContext(AnimalContext)
  if (!context) {
    throw new Error('useAnimalContext must be used within an AnimalProvider')
  }
  return context
}

export const AnimalProvider = ({ children }: { children: ReactNode }) => {
  const [animais, setAnimais] = useState<Animal[]>([
    {
      id: "127",
      nome: "Vaca Holstein 127",
      raca: "Holstein",
      idade: "4 anos",
      tipo: "Leite",
      status: "Gestante",
      ultimoExame: "2024-01-10",
      previsaoParto: "2024-03-15",
      statusColor: "success",
      lote: "Lote A - Reprodução",
      dataInseminacao: "2023-06-15",
      historico: [
        { data: "2023-06-15", tipo: "Inseminação", descricao: "IA com sêmen de touro Holstein premium" },
        { data: "2023-07-15", tipo: "Exame", descricao: "Confirmação de prenhez por ultrassom" }
      ],
      producaoLeiteira: [
        { data: "2024-01-01", quantidade: 25.5 },
        { data: "2024-01-02", quantidade: 24.8 }
      ]
    },
    {
      id: "128",
      nome: "Touro Angus 128",
      raca: "Angus",
      idade: "6 anos",
      tipo: "Corte",
      status: "Ativo",
      ultimoExame: "2024-01-08",
      statusColor: "primary",
      lote: "Lote B - Reprodutores",
      historico: [
        { data: "2023-12-01", tipo: "Exame", descricao: "Avaliação andrológica - aprovado" }
      ]
    },
    {
      id: "129",
      nome: "Vaca Nelore 129",
      raca: "Nelore",
      idade: "3 anos",
      tipo: "Corte",
      status: "Inseminada",
      ultimoExame: "2024-01-05",
      previsaoParto: "2024-04-12",
      statusColor: "warning",
      lote: "Lote C - Matrizes",
      dataInseminacao: "2023-07-12",
      historico: [
        { data: "2023-07-12", tipo: "Inseminação", descricao: "IA com sêmen de touro Nelore" }
      ]
    },
    {
      id: "130",
      nome: "Vaca Brahman 130",
      raca: "Brahman",
      idade: "5 anos",
      tipo: "Leite",
      status: "Em Descanso",
      ultimoExame: "2023-12-20",
      statusColor: "secondary",
      lote: "Lote D - Descanso",
      inicioDescanso: "2023-12-01",
      fimDescanso: "2024-02-01",
      filhos: ["131", "132"],
      historico: [
        { data: "2023-11-15", tipo: "Parto", descricao: "Parto normal - bezerro macho" },
        { data: "2023-12-01", tipo: "Tratamento", descricao: "Início do período de descanso" }
      ]
    }
  ])

  const [eventos, setEventos] = useState<Evento[]>([
    {
      id: "1",
      data: "2024-01-15",
      tipo: "Parto Previsto",
      animal: "Vaca Holstein #127",
      descricao: "Parto previsto - 283 dias de gestação",
      prioridade: "alta",
      status: "agendado"
    },
    {
      id: "2",
      data: "2024-01-18",
      tipo: "Exame de Controle",
      animal: "Vaca Nelore #129",
      descricao: "Confirmação de gestação - 30 dias pós IA",
      prioridade: "media",
      status: "agendado"
    },
    {
      id: "3",
      data: "2024-01-20",
      tipo: "Inseminação Artificial",
      animal: "Vaca Brahman #130",
      descricao: "Segunda inseminação artificial",
      prioridade: "alta",
      status: "agendado"
    }
  ])

  const addAnimal = (animalData: Omit<Animal, 'id'>) => {
    const newId = (Math.max(...animais.map(a => parseInt(a.id))) + 1).toString()
    const newAnimal: Animal = {
      ...animalData,
      id: newId
    }
    setAnimais(prev => [...prev, newAnimal])
  }

  const removeAnimal = (id: string) => {
    setAnimais(prev => prev.filter(animal => animal.id !== id))
  }

  const updateAnimal = (id: string, updates: Partial<Animal>) => {
    setAnimais(prev => prev.map(animal => 
      animal.id === id ? { ...animal, ...updates } : animal
    ))
  }

  const addEvento = (eventoData: Omit<Evento, 'id'>) => {
    const newId = (Math.max(...eventos.map(e => parseInt(e.id))) + 1).toString()
    const newEvento: Evento = {
      ...eventoData,
      id: newId
    }
    setEventos(prev => [...prev, newEvento])
  }

  const removeEvento = (id: string) => {
    setEventos(prev => prev.filter(evento => evento.id !== id))
  }

  const updateEvento = (id: string, updates: Partial<Evento>) => {
    setEventos(prev => prev.map(evento => 
      evento.id === id ? { ...evento, ...updates } : evento
    ))
  }

  const lotes = Array.from(new Set(animais.map(animal => animal.lote))).sort()

  const registrarPrenhez = (animalId: string, dataInseminacao: string) => {
    setAnimais(prev => prev.map(animal => 
      animal.id === animalId ? { 
        ...animal, 
        status: 'Gestante',
        statusColor: 'success',
        dataInseminacao,
        previsaoParto: new Date(new Date(dataInseminacao).getTime() + 283 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        historico: [
          ...(animal.historico || []),
          { data: new Date().toISOString().split('T')[0], tipo: 'Inseminação', descricao: `Gestação confirmada - IA realizada em ${dataInseminacao}` }
        ]
      } : animal
    ))
  }

  const registrarDescanso = (animalId: string, tipo: 'Leite' | 'Corte') => {
    const inicioDescanso = new Date().toISOString().split('T')[0]
    const animal = animais.find(a => a.id === animalId)
    let fimDescanso = inicioDescanso
    
    if (animal?.previsaoParto) {
      // Para vacas leiteiras: 60 dias antes do parto
      const partoDate = new Date(animal.previsaoParto)
      fimDescanso = new Date(partoDate.getTime() - 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }

    setAnimais(prev => prev.map(animal => 
      animal.id === animalId ? { 
        ...animal, 
        status: tipo === 'Leite' ? 'Em Descanso' : 'Desmama',
        statusColor: 'secondary',
        inicioDescanso,
        fimDescanso,
        historico: [
          ...(animal.historico || []),
          { 
            data: inicioDescanso, 
            tipo: 'Tratamento', 
            descricao: tipo === 'Leite' ? 'Início do período de descanso' : 'Início da desmama/descanso'
          }
        ]
      } : animal
    ))
  }

  const getAnimaisByLote = (lote: string) => {
    return animais.filter(animal => animal.lote === lote)
  }

  const getStatistics = () => {
    const totalAnimais = animais.length
    const gestantes = animais.filter(a => a.status === 'Gestante').length
    const inseminadas = animais.filter(a => a.status === 'Inseminada').length
    const emDescanso = animais.filter(a => a.status === 'Em Descanso' || a.status === 'Desmama').length
    const examesTotais = animais.reduce((total, animal) => total + (animal.historico?.filter(h => h.tipo === 'Exame').length || 0), 0) + eventos.filter(e => e.tipo.includes('Exame')).length
    const taxaSucesso = totalAnimais > 0 ? Math.round((gestantes / totalAnimais) * 100) : 0

    return {
      totalAnimais,
      gestantes,
      inseminadas,
      emDescanso,
      examesTotais,
      taxaSucesso
    }
  }

  return (
    <AnimalContext.Provider value={{
      animais,
      eventos,
      lotes,
      addAnimal,
      removeAnimal,
      updateAnimal,
      addEvento,
      removeEvento,
      updateEvento,
      registrarPrenhez,
      registrarDescanso,
      getAnimaisByLote,
      getStatistics
    }}>
      {children}
    </AnimalContext.Provider>
  )
}