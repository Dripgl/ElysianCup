# Usa un'immagine Node.js ufficiale come base.
# Scegli una versione LTS (Long Term Support) che si adatti al tuo progetto.
# 'alpine' è una versione più leggera.
# NOTA: L'immagine node:20-alpine potrebbe contenere vulnerabilità note.
# Per applicazioni in produzione, valuta l'uso di immagini più sicure o l'analisi delle vulnerabilità.
FROM node:20-alpine AS base

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia solo i file necessari per l'installazione delle dipendenze pnpm
COPY package.json pnpm-lock.yaml ./

# Usa pnpm per installare le dipendenze
# L'opzione --frozen-lockfile è importante per garantire che le dipendenze
# siano esattamente quelle specificate nel lock file.
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Stage di sviluppo (per avviare l'app in sviluppo)
FROM base AS development

# Copia il resto dei file del progetto
COPY . .

# Espone la porta su cui l'applicazione girerà (default di Vite è 5173)
EXPOSE 5173

# Comando per avviare l'applicazione in modalità sviluppo
CMD ["pnpm", "run", "dev"]

# Stage di produzione (per creare la build finale e servirla)
FROM base AS build

# Copia il resto dei file del progetto
COPY . .

# Crea la build di produzione
RUN pnpm run build

# Stage finale per servire l'applicazione in produzione (usando Nginx o un server http-server leggero)
FROM node:20-alpine AS production

# Installa 'serve' globalmente per servire i file statici.
# Se preferisci Nginx, dovrai usare un'immagine Nginx e copiare i file nella sua directory di default.
RUN npm install -g serve

WORKDIR /app

# Copia i file di build dallo stage 'build'
COPY --from=build /app/dist ./dist

# Espone la porta su cui il server di produzione girerà
EXPOSE 3000
# Puoi cambiarla, 3000 è comune per server statici

# Comando per avviare il server di produzione
CMD ["serve", "-s", "dist", "-l", "3000"]