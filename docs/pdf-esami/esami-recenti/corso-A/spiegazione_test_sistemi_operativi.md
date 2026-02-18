# Test Sistemi Operativi - 27 Gennaio 2026
## Spiegazioni Dettagliate delle 10 Domande

---

## DOMANDA 1 - Allocazione Concatenata Senza FAT

### Testo
Un hard disk ha la dimensione di 512 Gigabyte, è formattato in blocchi da 0x1000 byte e adotta una allocazione concatenata (senza FAT) dello spazio su disco. Sull'hard disk è memorizzato un file A della dimensione di 0x4000 byte. Quanti byte del file sono memorizzati nell'ultimo blocco di dati del file?

### Risposta Corretta: **16 byte**

### Spiegazione Dettagliata

#### Passo 1: Calcolare dimensione del puntatore

```
Hard disk: 512 GB = 2^39 byte
Blocco: 0x1000 = 2^12 = 4096 byte
Numero blocchi totali = 2^39 / 2^12 = 2^27 blocchi
```

Per indirizzare 2^27 blocchi servono **4 byte (32 bit)** per il puntatore.

#### Passo 2: Spazio dati in ogni blocco

Con allocazione concatenata **senza FAT**, ogni blocco contiene:
- **Puntatore** al blocco successivo: 4 byte
- **Dati effettivi**: 4096 - 4 = **4092 byte**

#### Passo 3: Distribuzione del file

```
File A: 0x4000 = 2^14 = 16384 byte

Blocco 1: 4092 byte
Blocco 2: 4092 byte
Blocco 3: 4092 byte
Blocco 4: 4092 byte
Totale primi 4 blocchi: 4 × 4092 = 16368 byte

Ultimo blocco (5°): 16384 - 16368 = 16 byte ✅
```

#### Schema visivo

```
┌──────────────────────────┐
│ Blocco 1                 │
│ ┌──────────┬───────────┐ │
│ │4092 dati │4b pointer │ │
│ └──────────┴───────────┘ │
└──────────────────────────┘
         ↓
┌──────────────────────────┐
│ Blocco 2                 │
│ ┌──────────┬───────────┐ │
│ │4092 dati │4b pointer │ │
│ └──────────┴───────────┘ │
└──────────────────────────┘
         ↓
         ...
         ↓
┌──────────────────────────┐
│ Blocco 5 (ultimo)        │
│ ┌────┬─────────────────┐ │
│ │16b │   spazio vuoto  │ │
│ └────┴─────────────────┘ │
└──────────────────────────┘
```

---

## DOMANDA 2 - Allocazione Indicizzata Concatenata

### Testo
Un hard disk ha la dimensione di 512 Gigabyte, è formattato in blocchi da 0x400 byte e adotta una qualche forma di allocazione indicizzata dello spazio su disco. Sull'hard disk è memorizzato un file A della dimensione di 600 Kbyte. Quante operazioni di I/O sono necessarie per leggere l'ultimo blocco di dati del file, assumendo già in RAM tutti gli attributi del file, incluso il numero del primo blocco indice, e assumendo uno schema di allocazione indicizzata concatenato (a livello zero)?

### Risposta Corretta: **4 operazioni I/O**

### Spiegazione Dettagliata

#### Passo 1: Parametri di base

```
Hard disk: 512 GB = 2^39 byte
Blocco: 0x400 = 1024 byte = 2^10 byte
Blocchi totali: 2^39 / 2^10 = 2^29 blocchi
```

#### Passo 2: Dimensione entry e capacità blocco indice

```
Puntatore: 4 byte (per indirizzare 2^29 blocchi)
Puntatori per blocco indice: 1024 / 4 = 256 puntatori
Capacità blocco indice: 256 × 1024 byte = 256 KB
```

#### Passo 3: Numero di blocchi indice necessari

```
File A: 600 KB

Blocco indice 1: copre 0-256 KB
Blocco indice 2: copre 256-512 KB  
Blocco indice 3: copre 512-600 KB ← ultimo blocco dati qui

Servono 3 blocchi indice totali
```

#### Passo 4: Operazioni I/O (schema concatenato)

Con schema concatenato, già in RAM il numero del **primo blocco indice**:

```
1. Leggi blocco indice 1 (noto dalla RAM)
2. Leggi blocco indice 2 (puntatore nel blocco 1)
3. Leggi blocco indice 3 (puntatore nel blocco 2)
4. Leggi ultimo blocco dati (puntatore nel blocco 3)

Totale: 4 operazioni I/O ✅
```

#### Schema visivo

```
RAM
 ↓
[Blocco indice 1] → [Blocco indice 2] → [Blocco indice 3] → [Ultimo blocco dati]
   ↓ I/O 1            ↓ I/O 2              ↓ I/O 3             ↓ I/O 4
```

---

## DOMANDA 3 - System Call fork()

### Testo
Sia A un file di testo all'interno di un file system Unix. Viene eseguito con successo il comando: `ln A B` dove B non esisteva prima dell'esecuzione del comando. Che cosa succede nelle strutture interne al sistema?

### Codice
```c
int a, b, c, d, n, pid1, pid2, pid3;
a=30, b=4, c=50, d=60;
n = fork();

if (n == 0) {
    a = 35; 
    b = 45; 
    pid1 = getppid(); 
    printf("%d", pid1); 
    exit(0);
} 
else {
    c = 55; 
    d = 65; 
    pid2 = getpid(); 
    printf("%d", pid2); 
    pid3 = wait(...); 
    exit(0);
}
```

### Risposta Corretta
- Valore di **a** nel figlio prima di exit: **35**
- Valore di **c** nel figlio prima di exit: **50**
- Valore di **a** nel padre prima di exit: **30**
- Valore di **b** nel padre prima di exit: **4**
- Relazione tra pid1 e pid2: **pid1 = pid2**

### Spiegazione Dettagliata

#### Come funziona fork()

`fork()` crea un processo figlio che è una **copia** del processo padre:
- Il **figlio** riceve n = 0
- Il **padre** riceve n = PID del figlio
- Padre e figlio hanno **copie separate** delle variabili

#### Analisi delle variabili

**Nel PROCESSO FIGLIO (n=0):**
```
Valori iniziali (copiati): a=30, b=4, c=50, d=60

Modifiche nel ramo if:
a = 35  ← modificato
b = 45  ← modificato
c = 50  ← NON modificato (valore originale) ✅
d = 60  ← NON modificato

Prima di exit(0):
a = 35 ✅
c = 50 ✅
```

**Nel PROCESSO PADRE (n≠0):**
```
Valori iniziali: a=30, b=4, c=50, d=60

Modifiche nel ramo else:
c = 55  ← modificato
d = 65  ← modificato
a = 30  ← NON modificato (valore originale) ✅
b = 4   ← NON modificato ✅

Prima di exit(0):
a = 30 ✅
b = 4 ✅
```

#### Analisi dei PID

```c
// Nel FIGLIO:
pid1 = getppid();  // Ottiene il PID del PARENT (padre)

// Nel PADRE:
pid2 = getpid();   // Ottiene il proprio PID
pid3 = wait(...);  // Ottiene il PID del figlio terminato

Relazione:
pid1 = PID del padre (visto dal figlio)
pid2 = PID del padre (visto da se stesso)
→ pid1 = pid2 ✅
```

#### Schema visivo

```
┌─────────────────────────────┐  ┌─────────────────────────────┐
│   PROCESSO FIGLIO (n=0)     │  │   PROCESSO PADRE (n≠0)      │
├─────────────────────────────┤  ├─────────────────────────────┤
│ a = 35  (modificato)        │  │ a = 30  (NON modificato)    │
│ b = 45  (modificato)        │  │ b = 4   (NON modificato)    │
│ c = 50  (NON modificato) ✅ │  │ c = 55  (modificato)        │
│ d = 60  (NON modificato)    │  │ d = 65  (modificato)        │
│                             │  │                             │
│ pid1 = getppid()            │  │ pid2 = getpid()             │
│   → PID del PADRE           │  │   → PID del PADRE (stesso!) │
│ printf("%d", pid1)          │  │ printf("%d", pid2)          │
│                             │  │ pid3 = wait(...)            │
│                             │  │   → PID del FIGLIO          │
└─────────────────────────────┘  └─────────────────────────────┘
```

---

## DOMANDA 4 - Hard Link (ln A B)

### Testo
Sia A un file di testo all'interno di un file system Unix. Viene eseguito con successo il comando: `ln A B` dove B non esisteva prima dell'esecuzione del comando. Che cosa succede nelle strutture interne al sistema?

### Risposta Corretta
Viene creata una **nuova entry nella directory** che punta allo **stesso inode** di A. Il **link count** dell'inode viene **incrementato** da 1 a 2.

### Spiegazione Dettagliata

#### Prima del comando ln A B

```
DIRECTORY
┌─────────────────┐
│ Nome: A         │──→ inode #1234
└─────────────────┘

INODE #1234
┌──────────────────────┐
│ Permessi, dimensione │
│ Data creazione       │
│ Link count: 1        │ ← Importante!
│ Puntatori ai blocchi │──→ [Dati del file]
└──────────────────────┘
```

#### Dopo il comando ln A B

```
DIRECTORY
┌─────────────────┐
│ Nome: A         │──→ inode #1234
│ Nome: B         │──→ inode #1234 (stesso!) ✅
└─────────────────┘

INODE #1234
┌──────────────────────┐
│ Permessi, dimensione │
│ Data creazione       │
│ Link count: 2        │ ← Incrementato! ✅
│ Puntatori ai blocchi │──→ [Dati del file]
└──────────────────────┘
                           (stessi dati fisici)
```

#### Cosa succede esattamente

1. **NON** viene creata una copia del file
2. **NON** viene creato un nuovo inode
3. Viene creato un **nuovo nome** (B) nella directory
4. Il nome B punta allo **stesso inode** di A
5. Il **link count** nell'inode viene incrementato da 1 a 2
6. I **dati fisici** rimangono gli stessi (un solo file su disco)

#### Conseguenze pratiche

```bash
echo "test" > A
ln A B

# A e B sono lo stesso file:
echo "modificato" > A
cat B  # Output: "modificato" ✅

# Cancellare A non elimina il file:
rm A
cat B  # Output: "modificato" (B esiste ancora!)

# Il file viene eliminato solo quando link count = 0
```

#### Differenza con cp (copia)

| Comando | Inodes | Dati su disco | Link count |
|---------|--------|---------------|------------|
| `ln A B` | 1 inode condiviso | 1 copia | 2 |
| `cp A B` | 2 inode separati | 2 copie | 1+1 |

---

## DOMANDA 5 - Paginazione e Spazio Fisico

### Testo
In un sistema paginato è noto che lo spreco di memoria primaria dovuto alla frammentazione interna è in media di circa 4 Kbyte per processo, e un indirizzo logico è scritto su 32 bit. Se la tabella delle pagine più grande di questo sistema è grande 1024 Kilobyte, quanto può essere grande al massimo lo spazio di indirizzamento fisico del sistema?

### Risposta Corretta: **512 MB**

### Spiegazione Dettagliata

#### Passo 1: Calcolare dimensione della pagina

La frammentazione interna media è circa **metà** della dimensione della pagina.

```
Frammentazione media = Dimensione pagina / 2
4 KB = Dimensione pagina / 2
Dimensione pagina = 8 KB = 2^13 byte ✅
```

#### Passo 2: Struttura indirizzo logico (32 bit)

```
Indirizzo logico (32 bit):
┌──────────────────┬─────────────────┐
│ Numero di pagina │ Offset in pagina│
│     19 bit       │     13 bit      │
└──────────────────┴─────────────────┘

Offset = log₂(8 KB) = log₂(2^13) = 13 bit
Numero pagina = 32 - 13 = 19 bit

Numero di pagine logiche = 2^19 = 524,288 pagine
```

#### Passo 3: Dimensione entry nella tabella

```
Tabella delle pagine: 1024 KB = 2^20 byte
Numero di entry: 2^19

Dimensione entry = 2^20 byte / 2^19 entry
                 = 2 byte = 16 bit ✅
```

#### Passo 4: Calcolare spazio fisico massimo

Nel caso massimo, tutti i 16 bit sono usati per indirizzare frame fisici:

```
Numero frame fisici massimo = 2^16 frame
Dimensione frame = 8 KB = 2^13 byte

Spazio fisico massimo = 2^16 × 2^13
                      = 2^29 byte
                      = 512 MB ✅
```

#### Schema visivo

```
INDIRIZZO LOGICO (32 bit)
┌──────────────┬─────────────┐
│ Num. Pagina  │   Offset    │
│   19 bit     │   13 bit    │
└──────────────┴─────────────┘
      ↓
TABELLA DELLE PAGINE (1024 KB)
┌────────────────────────┐
│ Entry 0: 16 bit        │→ Frame fisico
│ Entry 1: 16 bit        │→ Frame fisico
│ ...                    │
│ Entry 2^19-1: 16 bit   │→ Frame fisico
└────────────────────────┘
      ↓
SPAZIO FISICO
┌─────────────────┐
│ Frame 0 (8 KB)  │
│ Frame 1 (8 KB)  │
│ ...             │
│ Frame 2^16-1    │ ← Massimo 2^16 frame
└─────────────────┘
= 2^16 × 8 KB = 512 MB ✅
```

---

## DOMANDA 6 - Problema Lettori-Scrittori

### Testo
Ricostruite il codice del generico lettore nel problema dei lettori-scrittori.

```c
semaphore mutex = 1, scrivi = 1; 
int numlettori = 0; 

Processo lettore { 
    wait(mutex); 
    [ ]; 
    [ ]; 
    signal(mutex); 
    
    ... leggi il file ...; 
    
    wait(mutex); 
    [ ]; 
    [ ]; 
    signal(mutex) 
}
```

### Risposta Corretta
```c
wait(mutex);
numlettori++;                    // ✅
if (numlettori == 1)             // ✅
    wait(scrivi);                // ✅
signal(mutex);

... leggi il file ...

wait(mutex);
numlettori--;                    // ✅
if (numlettori == 0)             // ✅
    signal(scrivi);              // ✅
signal(mutex);
```

### Spiegazione Dettagliata

#### Obiettivo
- **Più lettori** possono leggere contemporaneamente
- **Solo uno scrittore** alla volta può scrivere
- **Lettori e scrittori si escludono**

#### Variabili
```c
semaphore mutex = 1;      // Protegge numlettori
semaphore scrivi = 1;     // Coordina lettori/scrittori
int numlettori = 0;       // Conta lettori attivi
```

#### Parte 1: Prima di leggere

```c
wait(mutex);                    // Entra in sezione critica
numlettori++;                   // Incrementa contatore
if (numlettori == 1)            // Primo lettore?
    wait(scrivi);               // → Blocca gli scrittori
signal(mutex);                  // Esce da sezione critica
```

**Logica:**
- Il **primo lettore** fa `wait(scrivi)` → blocca gli scrittori
- I lettori **successivi** (2°, 3°, 4°...) NON fanno `wait(scrivi)`, solo incrementano
- `mutex` protegge `numlettori` da race condition

#### Parte 2: Dopo aver letto

```c
wait(mutex);                    // Entra in sezione critica
numlettori--;                   // Decrementa contatore
if (numlettori == 0)            // Ultimo lettore?
    signal(scrivi);             // → Sblocca gli scrittori
signal(mutex);                  // Esce da sezione critica
```

**Logica:**
- L'**ultimo lettore** fa `signal(scrivi)` → sblocca gli scrittori
- I lettori che escono prima NON fanno `signal(scrivi)`

#### Timeline esempio

```
Tempo  L1              L2              L3              scrivi  numlettori
──────────────────────────────────────────────────────────────────────
  0    wait(mutex)                                      1       0
  1    numlettori++                                     1       1
  2    if(1==1) → wait(scrivi) ✓                        0       1  ← Scrittori bloccati
  3    signal(mutex)                                    0       1
  4    LEGGE...                                         0       1
  
  5                   wait(mutex)                       0       1
  6                   numlettori++                      0       2
  7                   if(2==1)? NO                      0       2
  8                   signal(mutex)                     0       2
  9                   LEGGE...                          0       2
  
 10                                   wait(mutex)       0       2
 11                                   numlettori++      0       3
 12                                   if(3==1)? NO      0       3
 13                                   LEGGE...          0       3
 
 14                   wait(mutex)                       0       3
 15                   numlettori--                      0       2
 16                   if(2==0)? NO                      0       2
 
 17    wait(mutex)                                      0       2
 18    numlettori--                                     0       1
 19    if(1==0)? NO                                     0       1
 
 20                                   wait(mutex)       0       1
 21                                   numlettori--      0       0
 22                                   if(0==0)? SÌ!     0       0
 23                                   signal(scrivi) ✓  1       0  ← Scrittori sbloccati
```

---

## DOMANDA 7 - Scheduling SRTF

### Testo
In un sistema operativo che adotta uno scheduling con diritto di prelazione, quattro processi arrivano al tempo indicato e consumano la quantità di CPU indicata nella tabella sottostante:

| Processo | T. arrivo | T. burst |
|----------|-----------|----------|
| Pa       | 0         | 8        |
| Pb       | 2         | 8        |
| Pc       | 4         | 2        |
| Pd       | 6         | 1        |

Qual è il waiting time medio ottenuto per lo scheduling dei quattro processi della tabella se si usa l'algoritmo di scheduling preemptive che fornisce il miglior turnaround time possibile?

### Risposta Corretta: **3.00**

### Spiegazione Dettagliata

#### Algoritmo: SRTF (Shortest Remaining Time First)

L'algoritmo preemptive che minimizza il turnaround time è **SRTF**:
- Ad ogni istante, esegue il processo con il **minor tempo rimanente**
- Se arriva un processo più corto, c'è **prelazione**

#### Costruzione Diagramma di Gantt

```
t=0: Disponibili: Pa(8)
     Eseguo: Pa

t=2: Arriva Pb(8)
     Confronto: Pa ha 6 rimanenti, Pb ha 8
     Eseguo: Pa (6 < 8)

t=4: Arriva Pc(2)
     Confronto: Pa ha 4, Pb ha 8, Pc ha 2
     PRELAZIONE! Eseguo: Pc (2 è il minore)

t=6: Pc finisce. Arriva Pd(1)
     Confronto: Pa ha 4, Pb ha 8, Pd ha 1
     Eseguo: Pd (1 è il minore)

t=7: Pd finisce
     Confronto: Pa ha 4, Pb ha 8
     Eseguo: Pa (4 < 8)

t=11: Pa finisce
     Rimane: Pb
     Eseguo: Pb

t=19: Pb finisce
```

#### Diagramma di Gantt

```
 0    2    4    6  7     11         19
|─Pa──|─Pa──|─Pc──|Pd|─Pa──|───Pb────|
```

#### Calcolo Waiting Time

**Formula:** Waiting Time = Turnaround Time - Burst Time

| Processo | Completion | Turnaround (C-A) | Burst | Waiting (T-B) |
|----------|------------|------------------|-------|---------------|
| Pa       | 11         | 11-0 = 11        | 8     | 11-8 = 3      |
| Pb       | 19         | 19-2 = 17        | 8     | 17-8 = 9      |
| Pc       | 6          | 6-4 = 2          | 2     | 2-2 = 0       |
| Pd       | 7          | 7-6 = 1          | 1     | 1-1 = 0       |

**Waiting Time medio** = (3 + 9 + 0 + 0) / 4 = **3.00** ✅

#### Spiegazione SRTF

SRTF sceglie sempre il processo che finisce prima:
- Quando arriva **Pc** (solo 2 unità), interrompe **Pa** (ancora 4 unità)
- Quando arriva **Pd** (solo 1 unità), interrompe tutto
- Questo minimizza l'attesa media perché i job corti terminano subito

---

## DOMANDA 8 - Sistema RAID

### Testo
Si deve configurare un sistema RAID sapendo che è importante avere a disposizione un ampio spazio di memorizzazione, mentre l'affidabilità del sistema non è importante. Quale livello RAID conviene scegliere?

### Risposta Corretta: **RAID 0 (Striping)**

### Spiegazione Dettagliata

#### Obiettivo
- ✅ **Massimo spazio** di memorizzazione
- ❌ L'affidabilità **NON** è importante

#### RAID 0 - Striping (RISPOSTA CORRETTA)

**Come funziona:**
I dati vengono divisi in "strip" e distribuiti su tutti i dischi.

```
Esempio con 4 dischi da 1 TB:

Disco 1    Disco 2    Disco 3    Disco 4
[Strip A1] [Strip A2] [Strip A3] [Strip A4]
[Strip B1] [Strip B2] [Strip B3] [Strip B4]
[Strip C1] [Strip C2] [Strip C3] [Strip C4]
```

**Caratteristiche:**
- ✅ **Spazio totale**: 4 TB (100% disponibile!)
- ✅ **Velocità**: Molto alta (legge da più dischi insieme)
- ❌ **Affidabilità**: ZERO! Se si rompe 1 disco, perdi TUTTO

**Perché è la risposta corretta:**
Massimizza lo spazio (usa il 100% dei dischi) e non spreca spazio per la ridondanza.

#### Confronto con altri livelli RAID

**RAID 1 - Mirroring:**
```
Disco 1    Disco 2    Disco 3    Disco 4
[Dati A]   [Dati A]   [Dati B]   [Dati B]
  ↓ copia speculare ↓  ↓ copia speculare ↓

Spazio: 2 TB (solo 50%!)
Affidabilità: Alta
❌ Non adatto (troppo poco spazio)
```

**RAID 4 - Striping con parità:**
```
Disco 1    Disco 2    Disco 3    Disco 4 (Parità)
[Strip A1] [Strip A2] [Strip A3] [Parità A]
[Strip B1] [Strip B2] [Strip B3] [Parità B]

Spazio: 3 TB (75%, perde 1 disco)
Affidabilità: Buona
❌ Non adatto (spreca spazio per parità)
```

**RAID 01 - Combinato:**
```
Spazio: 2 TB (solo 50%)
Affidabilità: Molto alta
❌ Non adatto (peggio ancora per lo spazio)
```

#### Tabella comparativa

| RAID | Spazio disponibile | Affidabilità | Adatto? |
|------|-------------------|--------------|---------|
| **RAID 0** | **4 TB (100%)** ✅ | Nessuna ❌ | **SÌ** ✅ |
| RAID 1 | 2 TB (50%) | Alta ✅ | NO ❌ |
| RAID 4 | 3 TB (75%) | Buona ✅ | NO ❌ |
| RAID 01 | 2 TB (50%) | Molto alta ✅ | NO ❌ |

---

## DOMANDA 9 - TLB e Paginazione a Due Livelli

### Testo
Un sistema ha un tempo di accesso in RAM di 120 ns, adotta un TLB con un tempo di accesso di 10 ns e un hit rate del 95%, usa una paginazione a due livelli e non ha bisogno di usare un algoritmo di rimpiazzamento delle pagine. Qual è il tempo medio di accesso alla RAM (medium access time - mat) del sistema? (per semplicità in caso di miss si ignori il costo di interrogazione del TLB)

### Risposta Corretta: **141.5 ns**

### Spiegazione Dettagliata

#### Dati del problema
- Tempo accesso RAM: 120 ns
- Tempo accesso TLB: 10 ns
- Hit rate TLB: 95% (miss rate = 5%)
- Paginazione: a due livelli
- Nota: in caso di miss TLB, ignorare costo interrogazione TLB

#### Cos'è il TLB?

Il **TLB (Translation Lookaside Buffer)** è una cache veloce che memorizza le traduzioni più recenti da indirizzo logico a fisico.

```
Indirizzo Logico
      ↓
   [TLB] ← Cache veloce (10 ns)
   /    \
HIT     MISS
 ↓       ↓
Già    Vai alla
pronto  Tabella Pagine
```

#### Scenario 1: TLB HIT (95% dei casi)

```
1. Interrogo TLB: 10 ns
2. ✅ Trovo traduzione (hit!)
3. Accedo dati in RAM: 120 ns

Tempo totale hit: 10 + 120 = 130 ns
```

#### Scenario 2: TLB MISS (5% dei casi)

Con paginazione a **due livelli**:

```
1. TLB miss (costo ignorato per il problema)
2. Accesso Tabella Livello 1 in RAM: 120 ns
3. Accesso Tabella Livello 2 in RAM: 120 ns
4. Accesso dati in RAM: 120 ns

Tempo totale miss: 120 + 120 + 120 = 360 ns
```

**Schema visivo TLB miss:**
```
┌──────────┐
│   TLB    │ ← Miss
└──────────┘
     ↓
┌──────────────────────┐
│ Tabella Livello 1    │ ← Accesso 1: 120 ns
└──────────────────────┘
     ↓
┌──────────────────────┐
│ Tabella Livello 2    │ ← Accesso 2: 120 ns
└──────────────────────┘
     ↓
┌──────────────────────┐
│ Dati effettivi       │ ← Accesso 3: 120 ns
└──────────────────────┘
```

#### Calcolo MAT (Medium Access Time)

```
MAT = P(hit) × Tempo_hit + P(miss) × Tempo_miss
    = 0.95 × 130 + 0.05 × 360
    = 123.5 + 18
    = 141.5 ns ✅
```

#### Confronto

| Situazione | Accessi RAM | Tempo | Probabilità | Contributo |
|------------|-------------|-------|-------------|------------|
| TLB Hit | 1 (solo dati) | 130 ns | 95% | 123.5 ns |
| TLB Miss | 3 (tab1+tab2+dati) | 360 ns | 5% | 18 ns |
| **MAT** | — | **141.5 ns** | — | — |

---

## DOMANDA 10 - Algoritmo Seconda Chance

### Testo
Supponiamo che in un sistema in cui la pagina vittima è scelta con algoritmo di seconda chance, la lista delle pagine caricate (e relativi bit di riferimento) sia la seguente: 

**p1(1) → p2(1) → p3(0) → p4(0) → p5(1)**

Supponendo di partire da p1, quali sono la configurazione della lista e la vittima identificata, dopo la passata dell'algoritmo?

### Risposta Corretta
- **Configurazione:** p3(0) → p4(0) → p5(1) → p1(0) → p2(0)
- **Vittima:** p3

### Spiegazione Dettagliata

#### Algoritmo di Seconda Chance

È una variante migliorata di **FIFO** che usa il **bit di riferimento**:

**Regola:**
- Bit = **0** → Pagina vittima (viene rimossa)
- Bit = **1** → "Seconda chance":
  - Resetta il bit a **0**
  - Sposta la pagina in **fondo** alla lista
  - Continua con la pagina successiva

#### Passata dell'algoritmo

**Stato iniziale:**
```
p1(1) → p2(1) → p3(0) → p4(0) → p5(1)
↑
Partiamo da qui
```

**Step 1: Esamina p1**
```
p1(1) → bit = 1 → Seconda chance!

Azione:
1. Reset bit: p1(1) → p1(0)
2. Sposta in fondo
3. Avanza al prossimo

Risultato:
p2(1) → p3(0) → p4(0) → p5(1) → p1(0)
↑
```

**Step 2: Esamina p2**
```
p2(1) → bit = 1 → Seconda chance!

Azione:
1. Reset bit: p2(1) → p2(0)
2. Sposta in fondo
3. Avanza al prossimo

Risultato:
p3(0) → p4(0) → p5(1) → p1(0) → p2(0)
↑
```

**Step 3: Esamina p3**
```
p3(0) → bit = 0 → VITTIMA TROVATA! ✓

Azione:
- p3 è la vittima (nessuna seconda chance)
- Algoritmo si ferma

Configurazione finale:
p3(0) → p4(0) → p5(1) → p1(0) → p2(0)
↑
VITTIMA
```

#### Schema completo

```
INIZIO:
┌────┬────┬────┬────┬────┐
│p1(1)│p2(1)│p3(0)│p4(0)│p5(1)│
└────┴────┴────┴────┴────┘
  ↑

Step 1: p1 ha bit=1 → seconda chance
┌────┬────┬────┬────┬────┐
│p2(1)│p3(0)│p4(0)│p5(1)│p1(0)│ ← p1 spostato, bit=0
└────┴────┴────┴────┴────┘
  ↑

Step 2: p2 ha bit=1 → seconda chance
┌────┬────┬────┬────┬────┐
│p3(0)│p4(0)│p5(1)│p1(0)│p2(0)│ ← p2 spostato, bit=0
└────┴────┴────┴────┴────┘
  ↑

Step 3: p3 ha bit=0 → VITTIMA
┌────┬────┬────┬────┬────┐
│p3(0)│p4(0)│p5(1)│p1(0)│p2(0)│
└────┴────┴────┴────┴────┘
  ↑
VITTIMA! ✅
```

#### Perché "Seconda Chance"?

Le pagine con **bit = 1** hanno una **seconda opportunità**:
- Prima chance: erano state caricate
- Seconda chance: quando l'algoritmo le incontra, invece di rimuoverle subito, le mette in fondo alla lista

Solo le pagine con **bit = 0** (non usate recentemente) vengono rimosse.

---

## RIEPILOGO FINALE

| # | Domanda | Risposta Corretta | Stato |
|---|---------|-------------------|-------|
| 1 | Allocazione concatenata | 16 byte | ✅ |
| 2 | Allocazione indicizzata | 4 I/O | ✅ |
| 3 | fork() | a=35,c=50; a=30,b=4; pid1=pid2 | ✅ |
| 4 | Hard link | Nuova entry, stesso inode, link++ | ✅ |
| 5 | Spazio fisico | 512 MB | ✅ |
| 6 | Lettori-scrittori | Codice corretto | ✅ |
| 7 | Scheduling SRTF | 3.00 | ✅ |
| 8 | RAID | RAID 0 | ✅ |
| 9 | TLB MAT | 141.5 ns | ✅ |
| 10 | Seconda Chance | p3 vittima, config corretta | ✅ |

## **RISULTATO: 10/10** 🎉

Tutte le risposte sono corrette! Ottimo lavoro!

---

## Concetti chiave affrontati

### File System
- Allocazione concatenata (con/senza FAT)
- Allocazione indicizzata
- Hard link e symbolic link
- Inode e directory entry

### Gestione Processi
- System call fork()
- Spazio di indirizzamento separato
- PID e relazioni parent-child

### Memoria
- Paginazione
- Frammentazione interna
- Spazio di indirizzamento logico/fisico
- TLB (Translation Lookaside Buffer)
- Tabelle delle pagine multilivello

### Sincronizzazione
- Semafori
- Problema lettori-scrittori
- Mutua esclusione

### Scheduling
- SRTF (Shortest Remaining Time First)
- Prelazione
- Waiting time e turnaround time
- Diagramma di Gantt

### Storage
- RAID (livelli 0, 1, 4, 01)
- Striping, mirroring, parità

### Algoritmi di Rimpiazzamento
- Seconda Chance (Second Chance)
- Bit di riferimento
- FIFO modificato

---

*Test completato con successo!*
