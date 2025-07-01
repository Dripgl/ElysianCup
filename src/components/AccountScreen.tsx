// src/components/AccountScreen.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

// Importazioni React Icons
import { FaUser, FaSignOutAlt, FaCog, FaPaintBrush, FaSpinner } from 'react-icons/fa'; // Rimosso FaEnvelope
import { GoCheck } from 'react-icons/go';


// Interfaccia fittizia per l'utente
interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
}

export default function AccountScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  // const [userProfile, setUserProfile] = useState<UserProfile | null>(null); // <-- Rimosso setUserProfile se non lo usi più
  const [formData, setFormData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Simula il caricamento dei dati dell'utente
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un ritardo di rete
      const mockUser: UserProfile = {
        id: '123',
        username: 'fantallenatore_pro',
        email: 'user@example.com',
        firstName: 'Mario',
        lastName: 'Rossi',
        bio: 'Appassionato di calcio e fantacalcio, sempre alla ricerca di nuovi talenti!',
      };
      // setUserProfile(mockUser); // <-- Rimosso l'uso di setUserProfile qui
      setFormData(mockUser); // Inizializza formData con i dati mock
      setLoading(false);
    };
    fetchUserProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev!,
      [id]: value,
    }));
  };

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula salvataggio API
    // setUserProfile(formData); // Puoi rimuovere anche questo, visto che usi formData per i valori dei campi
    setIsSaving(false);
    toast({
      title: "Profilo Aggiornato",
      description: "Le tue informazioni sono state salvate con successo.",
      variant: "success",
      icon: <GoCheck className="h-5 w-5 text-green-500" />
    });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Errore Password",
        description: "Le nuove password non corrispondono.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword.length < 6) {
      toast({
        title: "Errore Password",
        description: "La nuova password deve essere di almeno 6 caratteri.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simula salvataggio API
    setIsSaving(false);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    toast({
      title: "Password Aggiornata",
      description: "La tua password è stata modificata con successo.",
      variant: "success",
      icon: <GoCheck className="h-5 w-5 text-green-500" />
    });
  };

  const handleLogout = () => {
    // Logica di logout
    console.log("Utente disconnesso.");
    toast({
      title: "Disconnessione Effettuata",
      description: "Sei stato disconnesso con successo.",
    });
    navigate('/login'); // Reindirizza alla pagina di login
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-background text-foreground">
        <FaSpinner className="h-12 w-12 animate-spin text-football-green" />
        <span className="ml-4 text-xl">Caricamento profilo...</span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6 bg-background text-foreground animate-fade-in">
      <h1 className="text-3xl font-bold text-football-green">Impostazioni Account</h1>
      <p className="text-muted-foreground">Gestisci le tue informazioni personali e le preferenze del tuo account.</p>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
          <TabsTrigger value="profile">
            <FaUser className="h-4 w-4 mr-2" /> Profilo
          </TabsTrigger>
          <TabsTrigger value="password">
            <FaCog className="h-4 w-4 mr-2" /> Sicurezza
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <FaPaintBrush className="h-4 w-4 mr-2" /> Aspetto
          </TabsTrigger>
        </TabsList>

        {/* Tab Profilo */}
        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Dati Personali</CardTitle>
              <CardDescription>Aggiorna le informazioni del tuo account. Questo sarà visibile agli altri utenti.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nome</Label>
                    <Input id="firstName" value={formData?.firstName || ''} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Cognome</Label>
                    <Input id="lastName" value={formData?.lastName || ''} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" value={formData?.username || ''} onChange={handleInputChange} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={formData?.email || ''} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" value={formData?.bio || ''} onChange={handleInputChange} />
                </div>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : <GoCheck className="mr-2 h-4 w-4" />}
                  {isSaving ? "Salvataggio..." : "Salva Modifiche"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Sicurezza */}
        <TabsContent value="password" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Cambia Password</CardTitle>
              <CardDescription>Aggiorna la tua password per una maggiore sicurezza.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="old-password">Vecchia Password</Label>
                  <Input id="old-password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nuova Password</Label>
                  <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Conferma Nuova Password</Label>
                  <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> : <GoCheck className="mr-2 h-4 w-4" />}
                  {isSaving ? "Aggiornamento..." : "Aggiorna Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab Aspetto (Qui puoi aggiungere le impostazioni del tema se vuoi, altrimenti puoi eliminare questo tab o usarlo per altre personalizzazioni) */}
        <TabsContent value="appearance" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Aspetto</CardTitle>
              <CardDescription>Personalizza l'aspetto dell'applicazione.</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Qui potresti inserire il ModeToggle o altre opzioni di tema */}
              <p className="text-muted-foreground">Le opzioni di tema sono disponibili nella sidebar principale.</p>
              <div className="mt-4">
                <Button onClick={() => toast({ title: "Tema Light", description: "Impostato il tema Light." })}>
                  <FaPaintBrush className="mr-2 h-4 w-4" />
                  Test Light Theme Toast
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Logout Button */}
      <div className="mt-8 flex justify-end">
        <Button variant="destructive" onClick={handleLogout}>
          <FaSignOutAlt className="mr-2 h-4 w-4" />
          Esci
        </Button>
      </div>
    </div>
  );
}