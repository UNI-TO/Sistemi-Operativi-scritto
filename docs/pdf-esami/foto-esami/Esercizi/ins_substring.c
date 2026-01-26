#include <stdio.h>
#include <stdlib.h>


/* La funzione alloca e ritorna una 
nuova stringa costruita a partire da s, 
sostituendo ad ogni occorrenza del carattere 
sel la stringa ins. Se sel non `e presente in s,
viene restituita una copia di s. Se, ad esempio, 
viene invocato ins_substring("Ciao a tutti",’i’,"123")
viene ritornata la stringa "C123ao a tutt123". */
char *ins_substring(char *s, char sel, char *ins);


int main() {

    char string[] = "Hello,  worl,d!,";
    char selection = ','; /* not a pointer, also because it's a single character */
    char *insertion = "aaah";

    char *ret = ins_substring(string, selection, insertion);

    printf("String before: %s\t String after: %s\n", string, ret);

    free(ret);

    return 0;
}


char *ins_substring(char *s, char sel, char *ins) {
    int i, j, k, selCount, insCount, sCount, alloc;
    char *new;

    /* Count occurances of sel in s */
    for(i = 0, selCount = 0; s[i] != '\0'; i++) {
        if(s[i] == sel ) selCount++;
    }
    sCount = i;
    printf("Found %d occurance(s) of <%c>, %d chars in total\n", selCount, sel, sCount);

    /* If there are no occurances, just return the original string */
    if(selCount == 0) return s;

    /* Count characters in ins */
    for(i = 0; ins[i] != '\0'; i++);
    insCount = i;
    printf("Characters in insertion: %d\n", insCount);


    /* Allocate based on: s - selCount + (selCount * insCount) */
    alloc = sCount + (selCount * insCount) + 1;
    new = malloc(alloc * sizeof(char));
    printf("Allocated %d chars\n", alloc);

    /* Insert ins in s where sel occurs */
    int new_i = 0;
    for (i = 0; s[i] != '\0'; i++) {
        if (s[i] == sel) {
            for (j = 0; ins[j] != '\0'; j++) {
                new[new_i++] = ins[j];
            }
        } else {
            new[new_i++] = s[i];
        }
    }
    
    new[alloc] = '\0';
    return new;
    
}