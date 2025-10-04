import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAnimalContext } from "@/contexts/AnimalContext";
import { useToast } from "@/hooks/use-toast";
import { ChevronLeft, Upload, Check, Calendar, Users, FileText } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NovoAnimal() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addAnimal } = useAnimalContext();
  
  const [formData, setFormData] = useState({
    numero: "",
    nome: "",
    especie: "",
    raca: "",
    sexo: "",
    dataNascimento: "",
    peso: "",
    pai: "",
    mae: "",
    observacoes: "",
    lote: "",
    foto: null as File | null
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.numero || !formData.nome || !formData.especie || !formData.raca) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const hoje = new Date().toISOString().split('T')[0];
    const calcularIdade = (dataNascimento: string) => {
      if (!dataNascimento) return "N/A";
      const nascimento = new Date(dataNascimento);
      const hoje = new Date();
      const anos = hoje.getFullYear() - nascimento.getFullYear();
      return `${anos} anos`;
    };

    addAnimal({
      nome: formData.nome,
      raca: formData.raca,
      idade: calcularIdade(formData.dataNascimento),
      tipo: "Leite" as const,
      status: "Ativo" as const,
      ultimoExame: hoje,
      statusColor: "primary" as const,
      lote: formData.lote || "lote-d",
      pai: formData.pai,
      mae: formData.mae,
      observacoes: formData.observacoes
    });

    toast({
      title: "Animal cadastrado com sucesso!",
      description: `${formData.nome} foi adicionado ao sistema.`
    });

    setTimeout(() => {
      navigate("/animais");
    }, 1500);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        foto: file
      }));
    }
  };

  return (
    <DashboardLayout title="Cadastrar Novo Animal">
      <div className="max-w-4xl">
        <Button variant="ghost" onClick={() => navigate('/animais')} className="mb-6">
          <ChevronLeft className="w-4 h-4 mr-2" />
          Voltar para Lista de Animais
        </Button>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Informações Básicas
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numero">Número de Registro *</Label>
                <Input
                  id="numero"
                  placeholder="Ex: 001, BR123..."
                  value={formData.numero}
                  onChange={e => handleInputChange("numero", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="nome">Nome do Animal *</Label>
                <Input
                  id="nome"
                  placeholder="Nome ou identificação"
                  value={formData.nome}
                  onChange={e => handleInputChange("nome", e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="especie">Espécie *</Label>
                <Select value={formData.especie} onValueChange={value => handleInputChange("especie", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar espécie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bovino">Bovino</SelectItem>
                    <SelectItem value="equino">Equino</SelectItem>
                    <SelectItem value="suino">Suíno</SelectItem>
                    <SelectItem value="ovino">Ovino</SelectItem>
                    <SelectItem value="caprino">Caprino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="raca">Raça *</Label>
                <Select value={formData.raca} onValueChange={value => handleInputChange("raca", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar raça" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="holstein">Holstein</SelectItem>
                    <SelectItem value="nelore">Nelore</SelectItem>
                    <SelectItem value="angus">Angus</SelectItem>
                    <SelectItem value="brahman">Brahman</SelectItem>
                    <SelectItem value="gir">Gir</SelectItem>
                    <SelectItem value="guzerá">Guzerá</SelectItem>
                    <SelectItem value="tabapuã">Tabapuã</SelectItem>
                    <SelectItem value="canchim">Canchim</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="lote">Lote</Label>
                <Select value={formData.lote} onValueChange={(value) => handleInputChange('lote', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar lote" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lote-a">Lote A - Reprodução</SelectItem>
                    <SelectItem value="lote-b">Lote B - Gestantes</SelectItem>
                    <SelectItem value="lote-c">Lote C - Descanso</SelectItem>
                    <SelectItem value="lote-d">Lote D - Geral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={() => navigate('/animais')}>
              Cancelar
            </Button>
            <Button type="submit" className="veterinary-gradient text-white">
              <Check className="w-4 h-4 mr-2" />
              Cadastrar Animal
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}