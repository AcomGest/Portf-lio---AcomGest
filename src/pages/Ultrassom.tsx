import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAnimalContext } from "@/contexts/AnimalContext";
import { Upload, Image, CheckCircle, Clock, Search, Download, Eye, Calendar } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
export default function Ultrassom() {
  const [selectedAnimal, setSelectedAnimal] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [animalRegistry, setAnimalRegistry] = useState<string>("");
  const [selectedLote, setSelectedLote] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { animais } = useAnimalContext();
  const examenes = [{
    id: "E001",
    animal: "Vaca Holstein #127",
    data: "2024-01-10",
    imagens: 3,
    status: "Concluído",
    resultado: "Gestação confirmada - 45 dias",
    veterinario: "Dr. José Silva"
  }, {
    id: "E002",
    animal: "Vaca Nelore #129",
    data: "2024-01-08",
    imagens: 2,
    status: "Pendente",
    resultado: "Aguardando análise",
    veterinario: "Dra. Maria Santos"
  }, {
    id: "E003",
    animal: "Vaca Brahman #130",
    data: "2024-01-05",
    imagens: 4,
    status: "Concluído",
    resultado: "Não gestante - Repetir IA",
    veterinario: "Dr. João Costa"
  }];
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages([...uploadedImages, ...newImages]);
    }
  };
  return <DashboardLayout title="Análise Ultrassonográfica">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* AI Live View Section */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Image className="w-5 h-5 mr-2 text-primary" />
              Captura em Tempo Real - HDMI
            </h3>
            
            <div className="relative">
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                {isConnected ? (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/20 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                      </div>
                      <p className="text-sm">Recebendo imagem do ultrassom...</p>
                      <p className="text-xs text-gray-300 mt-1">Via HDMI - 1920x1080</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Aguardando conexão HDMI</p>
                    <p className="text-xs mt-1">Conecte o equipamento de ultrassom</p>
                  </div>
                )}
              </div>
              
              <div className="absolute top-3 right-3 flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`}></div>
                <span className="text-xs text-white bg-black/50 px-2 py-1 rounded">
                  {isConnected ? 'Conectado' : 'Desconectado'}
                </span>
              </div>
              
              <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                <Button 
                  size="sm" 
                  variant={isConnected ? "destructive" : "default"}
                  onClick={() => setIsConnected(!isConnected)}
                  className="text-xs"
                >
                  {isConnected ? 'Desconectar' : 'Conectar HDMI'}
                </Button>
                <Button size="sm" variant="outline" className="text-xs" disabled={!isConnected}>
                  <Download className="w-3 h-3 mr-1" />
                  Capturar
                </Button>
              </div>
            </div>
            
            {isConnected && (
              <div className="mt-4 p-3 bg-success/10 rounded-lg">
                <p className="text-sm text-success font-medium">✓ IA Ativa - Análise automática habilitada</p>
                <p className="text-xs text-muted-foreground mt-1">
                  As imagens serão processadas automaticamente para detecção de gestação
                </p>
              </div>
            )}
          </Card>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-primary" />
              Novo Exame
            </h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="lote-select">Lote</Label>
                <Select value={selectedLote} onValueChange={setSelectedLote}>
                  <SelectTrigger id="lote-select">
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

              <div>
                <Label htmlFor="animal-registry">Registro do Animal</Label>
                <Input
                  id="animal-registry"
                  type="text"
                  placeholder="Digite o número de registro (ex: 127)"
                  value={animalRegistry}
                  onChange={(e) => setAnimalRegistry(e.target.value)}
                  className="text-base"
                />
                {animalRegistry && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Animal encontrado: {animais.find(a => a.id === animalRegistry)?.nome || `Animal #${animalRegistry}`}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="exam-date">Data do Exame</Label>
                <Input id="exam-date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>

              <div>
                <Label htmlFor="image-upload">Imagens Ultrassonográficas</Label>
                <div className="mt-2">
                  <input id="image-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={() => document.getElementById('image-upload')?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Selecionar Imagens
                  </Button>
                </div>
              </div>

              {uploadedImages.length > 0 && <div>
                  <Label>Imagens Carregadas ({uploadedImages.length})</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {uploadedImages.map((image, index) => <div key={index} className="relative">
                        <img src={image} alt={`Upload ${index + 1}`} className="w-full h-20 object-cover rounded-lg" />
                        <Button size="sm" variant="destructive" className="absolute top-1 right-1 w-6 h-6 p-0" onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== index))}>
                          ×
                        </Button>
                      </div>)}
                  </div>
                </div>}

              <div>
                <Label htmlFor="observations">Observações</Label>
                <Textarea id="observations" placeholder="Descrição do exame, observações clínicas..." rows={4} />
              </div>

              <div className="flex space-x-2">
                <Button 
                  className="flex-1 veterinary-gradient text-white" 
                  disabled={!animalRegistry || (!uploadedImages.length && !isConnected)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Finalizar Exame
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Exams History */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Image className="w-5 h-5 mr-2 text-primary" />
                Histórico de Exames
              </h3>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Buscar exames..." className="pl-10 w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {examenes.map(exame => <Card key={exame.id} className="p-4 border border-border">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-sm sm:text-base truncate">{exame.animal}</h4>
                        <Badge variant={exame.status === 'Concluído' ? 'default' : 'secondary'} className={`text-xs whitespace-nowrap ${exame.status === 'Concluído' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}`}>
                          {exame.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-xs md:text-sm">
                        <div className="min-w-0">
                          <p className="text-muted-foreground">Código</p>
                          <p className="font-medium truncate">{exame.id}</p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-muted-foreground">Data</p>
                          <p className="font-medium flex items-center">
                            <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span className="truncate">{exame.data}</span>
                          </p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-muted-foreground">Imagens</p>
                          <p className="font-medium flex items-center">
                            <Image className="w-3 h-3 mr-1 flex-shrink-0" />
                            <span>{exame.imagens}</span>
                          </p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-muted-foreground">Veterinário</p>
                          <p className="font-medium truncate">{exame.veterinario}</p>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium text-muted-foreground mb-1">Resultado:</p>
                        <p className="text-sm break-words">{exame.resultado}</p>
                      </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-1" />
                        Ver
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </Card>)}
            </div>
          </Card>

          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Image className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Exames</p>
                  <p className="text-xl font-semibold">156</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
                  <p className="text-xl font-semibold">84%</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pendentes</p>
                  <p className="text-xl font-semibold">3</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>;
}