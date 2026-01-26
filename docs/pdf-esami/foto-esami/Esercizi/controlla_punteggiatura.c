#include <stdio.h>
#include <stdlib.h>

#define TRUE 1
#define FALSE 0

int controlla_punteggiatura(char *string);
int num_characters(char *string, char character);

int main() {
    char *string = "Ciao, come va?";
    int result = controlla_punteggiatura(string);
    printf("%d ", result);
    return 0;
}

int controlla_punteggiatura(char * string) {
    int i, punti_esclamativi = 0, punti_interrogativi = 0;

    punti_esclamativi = num_characters(string, '!');
    punti_interrogativi = num_characters(string, '?');

    if(punti_esclamativi != punti_interrogativi) {
        return FALSE;
    }

    return TRUE;
}

int num_characters(char *string, char character) {
    int i, count = 0;
    for (i = 0; string[i] != '\0'; i++) {
        if (string[i] == character) {
            count++;
        }
    }
    return count;
}