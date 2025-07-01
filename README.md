# ElysianCup 

Un'applicazione di fantacalcio moderna e intuitiva, sviluppata con React e TypeScript, che offre una gestione completa della squadra, partecipazione a leghe, e un mercato giocatori dinamico.

---

## 🚀 Funzionalità Principali

* **Dashboard Personalizzata**: Visualizza rapidamente le statistiche della tua squadra e gli eventi importanti.
* **Gestione Squadra**: Tieni sotto controllo i tuoi giocatori, il loro valore e le loro prestazioni.
* **Mercato Giocatori**: Acquista e vendi giocatori per migliorare la tua rosa.
* **Leghe**: Partecipa a leghe private o pubbliche e sfida i tuoi amici.
* **Autenticazione**: Processo di login e registrazione sicuro.

---

## 🛠️ Tecnologie Utilizzate

* **React**: Per l'interfaccia utente interattiva.
* **TypeScript**: Per un codice più robusto e privo di errori.
* **Vite**: Per un ambiente di sviluppo rapido e ottimizzato.
* **Tailwind CSS**: Per uno styling veloce e reattivo.
* **Shadcn UI**: Componenti UI riutilizzabili e personalizzabili.
* **Lucide React**: Libreria di icone.
* **React Router DOM**: Per la navigazione tra le pagine.
* **pnpm**: Come gestore di pacchetti.

---

## 🚀 Iniziare il Progetto

Segui questi passaggi per avviare il progetto sulla tua macchina locale.

### Prerequisiti

Assicurati di aver installato [Node.js](https://nodejs.org/) (versione 18 o superiore) e [pnpm](https://pnpm.io/installation).

### Installazione

1.  **Clona il repository:**
    ```bash
    git clone [https://github.com/tuo-utente/tuo-repo.git](https://github.com/tuo-utente/tuo-repo.git)
    cd tuo-repo-folder
    ```
    (Sostituisci `tuo-utente/tuo-repo.git` con il link al tuo repository GitHub/GitLab)

2.  **Installa le dipendenze:**
    ```bash
    pnpm install
    ```

3.  **Inizializza Shadcn UI (se non l'hai già fatto):**
    ```bash
    pnpm dlx shadcn-ui@latest init
    ```
    Segui le istruzioni nel terminale.

4.  **Aggiungi i componenti Shadcn UI (se necessario):**
    ```bash
    pnpm shadcn-ui add button card input badge tabs select toast # e altri che usi
    ```

### Avvio dell'Applicazione

Per avviare l'applicazione in modalità sviluppo:

```bash
pnpm run dev